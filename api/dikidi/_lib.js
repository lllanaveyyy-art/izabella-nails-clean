const PAGE_URL = "https://dikidi.net/record/w209336";
const LANG = "en";
const COMPANY_ID = "2064459";
const MASTER_ID = "4424675";

const pageHeaders = {
  "User-Agent": "Mozilla/5.0",
};

const ajaxHeaders = {
  "User-Agent": "Mozilla/5.0",
  Referer: PAGE_URL,
  Origin: "https://dikidi.net",
  "X-Requested-With": "XMLHttpRequest",
};

function normalizePhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("8")) return `7${digits.slice(1)}`;
  return digits;
}

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "object") return req.body;
  try {
    return JSON.parse(req.body);
  } catch {
    return {};
  }
}

async function getPageHtml() {
  const response = await fetch(PAGE_URL, { headers: pageHeaders });
  if (!response.ok) throw new Error("Не удалось открыть страницу записи");
  return await response.text();
}

function parseSession(html) {
  const clientMarker = '"client":';
  const clientIndex = html.indexOf(clientMarker);
  if (clientIndex !== -1) {
    const snippet = html.slice(clientIndex, clientIndex + 500);
    const match = snippet.match(/"session":"([^"]+)"/);
    if (match) return match[1];
  }

  const fallback = html.match(/"session":"([^"]+)"/);
  if (!fallback) throw new Error("Не удалось получить сессию записи");
  return fallback[1];
}

async function getBootstrap() {
  const html = await getPageHtml();
  return {
    session: parseSession(html),
    companyId: COMPANY_ID,
    masterId: MASTER_ID,
  };
}

async function fetchJsonFromDikidi(url, params, { method = "GET", body } = {}) {
  let finalUrl = url;
  if (params) {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        value.forEach((item) => search.append(key, item));
      } else if (value !== undefined && value !== null && value !== "") {
        search.append(key, String(value));
      }
    }
    finalUrl += `?${search.toString()}`;
  }

  const response = await fetch(finalUrl, {
    method,
    headers: {
      ...ajaxHeaders,
      ...(method === "POST" ? { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" } : {}),
    },
    body:
      method === "POST"
        ? new URLSearchParams(
            Object.entries(body || {}).flatMap(([key, value]) => {
              if (Array.isArray(value)) return value.map((item) => [key, String(item)]);
              if (value === undefined || value === null) return [];
              return [[key, String(value)]];
            }),
          ).toString()
        : undefined,
  });

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(text.includes("Page error") ? "Dikidi вернул ошибку" : "Не удалось разобрать ответ Dikidi");
  }
}

async function getAvailability(session, serviceId, date) {
  const payload = await fetchJsonFromDikidi(`https://dikidi.net/${LANG}/mobile/ajax/newrecord/get_datetimes/`, {
    session,
    company_id: COMPANY_ID,
    master_id: MASTER_ID,
    with_first: 1,
    "service_id[]": [serviceId],
    date,
  });

  if (payload.error?.code && payload.error.code !== 0) {
    throw new Error(payload.error.message || "Не удалось загрузить слоты");
  }

  const data = payload.data || {};
  const selectedDate = date || data.date_near || data.first_date_true || (data.dates_true || [])[0] || null;
  const times = selectedDate ? ((data.times || {})[MASTER_ID] || []).filter((value) => value.startsWith(selectedDate)) : [];

  return {
    availableDates: data.dates_true || [],
    selectedDate,
    times,
  };
}

async function clearReservation(session) {
  await fetchJsonFromDikidi(`https://dikidi.net/${LANG}/ajax/newrecord/time_reservation_clear/`, {
    session,
    social_key: "",
  });
}

async function reserveTime(session, serviceId, datetime) {
  const payload = await fetchJsonFromDikidi(`https://dikidi.net/${LANG}/ajax/newrecord/time_reservation/`, {
    company_id: COMPANY_ID,
    master_id: MASTER_ID,
    "services_id[]": [serviceId],
    time: datetime,
    action_source: "direct_link",
    session,
  });

  if (payload.error) {
    throw new Error(payload.message || payload.error.message || "Не удалось зарезервировать слот");
  }

  if (!payload.record_id) {
    throw new Error("Свободный слот не подтвердился");
  }

  return payload;
}

async function checkContact(session, { firstName, lastName, phone, comment }) {
  const normalizedPhone = normalizePhone(phone);
  const payload = await fetchJsonFromDikidi(
    `https://dikidi.net/${LANG}/mobile/newrecord/check/`,
    {
      company: COMPANY_ID,
      session,
      social_key: "",
    },
    {
      method: "POST",
      body: {
        company: COMPANY_ID,
        type: "normal",
        session,
        social_key: "",
        share_id: 0,
        phone: normalizedPhone,
        first_name: firstName,
        last_name: lastName,
        remind: 0,
        comments: comment || "",
        promocode_appointment_id: "",
      },
    },
  );

  if (payload.error && payload.error !== 0) {
    throw new Error(payload.message || "Не удалось проверить контактные данные");
  }

  return payload;
}

async function sendCode(session, { firstName, lastName, phone }) {
  const normalizedPhone = normalizePhone(phone);
  const payload = await fetchJsonFromDikidi(`https://dikidi.net/${LANG}/ajax/newrecord/send_code/`, {
    company_id: COMPANY_ID,
    name: firstName,
    first_name: firstName,
    last_name: lastName,
    phone: normalizedPhone,
    action_source: "direct_link",
    session,
    push: 0,
    telegram: 0,
  });

  if (payload.status === "success") {
    return payload;
  }

  throw new Error(payload.info || payload.message || "Не удалось отправить код");
}

async function verifyCode(session, { phone, code }) {
  const normalizedPhone = normalizePhone(phone);
  const payload = await fetchJsonFromDikidi(`https://dikidi.net/${LANG}/ajax/newrecord/check_code/`, {
    company_id: COMPANY_ID,
    phone: normalizedPhone,
    code,
    action_source: "direct_link",
    session,
  });

  if (payload.status !== "ok") {
    throw new Error(payload.message || "Код не подошёл");
  }

  return payload;
}

async function finalizeBooking(session, { firstName, lastName, phone, comment, code, action }) {
  const normalizedPhone = normalizePhone(phone);
  const payload = await fetchJsonFromDikidi(
    `https://dikidi.net/${LANG}/ajax/newrecord/record/`,
    {
      company_id: COMPANY_ID,
      session,
      social_key: "",
      action: action || "",
      unique_num: Date.now(),
    },
    {
      method: "POST",
      body: {
        type: "normal",
        bookings: "",
        name: firstName,
        first_name: firstName,
        last_name: lastName || "",
        phone: normalizedPhone,
        code: code || "",
        remind: 0,
        comments: comment || "",
        is_show_all_times: 3,
        captcha_token: "",
        action_source: "direct_link",
        session,
        social_key: "",
        active_cart_id: 0,
        active_method: 0,
        agreement: 1,
      },
    },
  );

  if (payload.error) {
    throw new Error(payload.message || "Не удалось завершить запись");
  }

  if (!payload.bookings) {
    throw new Error("Dikidi не подтвердил запись");
  }

  return payload;
}

export {
  COMPANY_ID,
  MASTER_ID,
  json,
  parseBody,
  getBootstrap,
  getAvailability,
  clearReservation,
  reserveTime,
  checkContact,
  sendCode,
  verifyCode,
  finalizeBooking,
};
