import { useEffect, useMemo, useState } from "react";
import { Send, CalendarCheck, Check, X, ChevronLeft, Loader2 } from "lucide-react";
import { brand } from "@/data/brand";
import { trackGoal } from "@/components/YandexMetrika";

const serviceOptions = [
  {
    id: "classic",
    serviceId: "22342194",
    title: "Классический маникюр",
    price: "400 ₽",
    duration: "30 мин.",
  },
  {
    id: "men",
    serviceId: "22342200",
    title: "Мужской маникюр",
    price: "500 ₽",
    duration: "30 мин.",
  },
  {
    id: "gel",
    serviceId: "22342203",
    title: "Маникюр с покрытием гель-лаком",
    price: "850 ₽",
    duration: "1 ч 30 мин.",
  },
  {
    id: "strengthening",
    serviceId: "22342207",
    title: "Укрепление гелем",
    price: "1 100 ₽",
    duration: "1 ч 15 мин.",
  },
  {
    id: "correction",
    serviceId: "22342213",
    title: "Коррекция наращённых ногтей",
    price: "1 300 ₽",
    duration: "1 ч 30 мин.",
  },
  {
    id: "extension",
    serviceId: "22342216",
    title: "Наращивание ногтей",
    price: "1 500 ₽",
    duration: "2 ч 30 мин.",
  },
] as const;

const bookingTriggers = new Set(["booking", "booking-online", "header-booking", "hero-booking", "service-book"]);

type ServiceId = (typeof serviceOptions)[number]["id"];
type Step = 1 | 2 | 3;
type BootstrapResponse = { session: string };
type AvailabilityResponse = {
  availableDates: string[];
  selectedDate: string | null;
  times: string[];
};

type PrepareResponse = {
  smsRequired: boolean;
  warning?: string | null;
};

function formatDateLabel(value: string) {
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
  }).format(date);
}

function formatWeekdayLabel(value: string) {
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("ru-RU", {
    weekday: "short",
  }).format(date);
}

function formatMonthLabel(value: string) {
  if (!value || !/^\d{4}-\d{2}$/.test(value)) return "";
  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("ru-RU", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, 1));
}

function formatTimeLabel(value: string) {
  return value.slice(11, 16);
}

function addDays(dateValue: string, days: number) {
  const date = new Date(`${dateValue}T12:00:00`);
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function shiftMonth(monthKey: string, delta: number) {
  const base = /^\d{4}-\d{2}$/.test(monthKey) ? `${monthKey}-01` : `${new Date().toISOString().slice(0, 7)}-01`;
  const date = new Date(`${base}T12:00:00`);
  date.setMonth(date.getMonth() + delta);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function buildCalendarDays(availableDates: string[], monthKey: string) {
  const source = monthKey || availableDates[0]?.slice(0, 7);
  if (!source) return [] as Array<{ key: string; label: string; date?: string; available: boolean }>;

  const [year, month] = source.split("-").map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const startWeekday = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month, 0).getDate();
  const availableSet = new Set(availableDates);
  const cells: Array<{ key: string; label: string; date?: string; available: boolean }> = [];

  for (let i = 0; i < startWeekday; i += 1) {
    cells.push({ key: `empty-${i}`, label: "", available: false });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    cells.push({
      key: date,
      label: String(day),
      date,
      available: availableSet.has(date),
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ key: `tail-${cells.length}`, label: "", available: false });
  }

  return cells;
}

function splitName(fullName: string) {
  const clean = fullName.trim().replace(/\s+/g, " ");
  if (!clean) return { firstName: "", lastName: "" };
  const [firstName, ...rest] = clean.split(" ");
  return { firstName, lastName: rest.join(" ") };
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((data && (data.error || data.message)) || "Ошибка запроса");
  }
  return data as T;
}

export function Booking() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [session, setSession] = useState("");
  const [serviceId, setServiceId] = useState<ServiceId>("gel");
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [visibleMonth, setVisibleMonth] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [smsRequested, setSmsRequested] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const selectedService = useMemo(
    () => serviceOptions.find((item) => item.id === serviceId) ?? serviceOptions[1],
    [serviceId],
  );

  const selectedTime = selectedSlot ? formatTimeLabel(selectedSlot) : "";
  const selectedDateTime = selectedSlot || "";
  const calendarDays = useMemo(() => buildCalendarDays(availableDates, visibleMonth), [availableDates, visibleMonth]);

  const resetBookingState = () => {
    setStep(1);
    setSession("");
    setAvailableDates([]);
    setSelectedDate("");
    setVisibleMonth("");
    setSelectedSlot("");
    setTimeOptions([]);
    setSmsCode("");
    setSmsRequested(false);
    setSuccessMessage("");
    setMessage("");
    setLoading(false);
    setSubmitting(false);
  };

  const closeModal = () => {
    setOpen(false);
    resetBookingState();
  };

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const cta = anchor.getAttribute("data-cta") || "";
      const href = anchor.getAttribute("href") || "";
      const serviceTriggerId = anchor.getAttribute("data-service-id") as ServiceId | null;
      const serviceName = anchor.getAttribute("data-service-name") || undefined;
      const price = anchor.getAttribute("data-service-price") || undefined;

      if (!bookingTriggers.has(cta) && href !== brand.bookingUrl) return;

      trackGoal("booking_click");
      trackGoal("dikidi_open");
      if (serviceTriggerId || serviceName) {
        trackGoal("service_click", {
          service_id: serviceTriggerId || undefined,
          service_name: serviceName,
          price,
        });
      }

      event.preventDefault();
      setSuccessMessage("");
      setMessage("");
      setSmsRequested(false);
      setSmsCode("");
      if (serviceTriggerId && serviceOptions.some((item) => item.id === serviceTriggerId)) {
        setServiceId(serviceTriggerId);
      }
      setOpen(true);
      setStep(1);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const ensureBootstrap = async () => {
    if (session) return session;
    const data = await fetchJson<BootstrapResponse>("/api/dikidi/bootstrap");
    setSession(data.session);
    return data.session;
  };

  const applyAvailability = (data: AvailabilityResponse, options?: { preserveMonth?: boolean; preserveDate?: boolean }) => {
    setAvailableDates((prev) => Array.from(new Set([...prev, ...data.availableDates])).sort());
    const nextDate = data.selectedDate || data.availableDates[0] || "";
    if (!options?.preserveDate) {
      setSelectedDate(nextDate);
    }
    if (!options?.preserveMonth) {
      setVisibleMonth(nextDate ? nextDate.slice(0, 7) : "");
    }

    const filteredTimes = data.times.filter((value) => Number(value.slice(14, 16)) % 15 === 0);
    setTimeOptions(filteredTimes);
    setSelectedSlot(filteredTimes[0] || "");
  };

  const applyMonthState = (dates: string[], date: string, times: string[], monthKey?: string) => {
    const sortedDates = Array.from(new Set(dates)).sort();
    const filteredTimes = times.filter((value) => Number(value.slice(14, 16)) % 15 === 0);

    setAvailableDates(sortedDates);
    setSelectedDate(date);
    setVisibleMonth(monthKey || date.slice(0, 7));
    setTimeOptions(filteredTimes);
    setSelectedSlot(filteredTimes[0] || "");
  };

  const loadAllAvailability = async (currentSession: string, nextServiceId: ServiceId, seedDate?: string) => {
    const service = serviceOptions.find((item) => item.id === nextServiceId) ?? selectedService;
    const mergedDates = new Set<string>();
    let selectedDateFromApi = "";
    let cursor = seedDate;
    let lastTimes: string[] = [];

    for (let i = 0; i < 12; i += 1) {
      const query = new URLSearchParams({ session: currentSession, serviceId: service.serviceId });
      if (cursor) query.set("date", cursor);
      const data = await fetchJson<AvailabilityResponse>(`/api/dikidi/availability?${query.toString()}`);
      data.availableDates.forEach((value) => mergedDates.add(value));
      if (!selectedDateFromApi && data.selectedDate) selectedDateFromApi = data.selectedDate;
      if (data.times.length) lastTimes = data.times;

      const sorted = Array.from(mergedDates).sort();
      const lastDate = sorted[sorted.length - 1];
      if (!lastDate || data.availableDates.length < 8) {
        return { availableDates: sorted, selectedDate: selectedDateFromApi || sorted[0] || null, times: lastTimes } satisfies AvailabilityResponse;
      }

      const nextCursor = addDays(lastDate, 1);
      if (nextCursor === cursor) {
        return { availableDates: sorted, selectedDate: selectedDateFromApi || sorted[0] || null, times: lastTimes } satisfies AvailabilityResponse;
      }
      cursor = nextCursor;
    }

    const sorted = Array.from(mergedDates).sort();
    return { availableDates: sorted, selectedDate: selectedDateFromApi || sorted[0] || null, times: lastTimes } satisfies AvailabilityResponse;
  };

  const loadAvailability = async (nextServiceId: ServiceId, nextDate?: string) => {
    setLoading(true);
    setMessage("");
    try {
      const currentSession = await ensureBootstrap();
      const monthKey = (nextDate || new Date().toISOString().slice(0, 10)).slice(0, 7);
      const monthData = await loadAllAvailability(currentSession, nextServiceId, `${monthKey}-01`);
      const monthDates = monthData.availableDates.filter((value) => value.startsWith(monthKey));
      const targetDate = nextDate && monthDates.includes(nextDate) ? nextDate : monthDates[0] || monthData.availableDates[0] || "";

      if (!targetDate) {
        setAvailableDates(monthData.availableDates);
        setSelectedDate("");
        setVisibleMonth(monthKey);
        setTimeOptions([]);
        setSelectedSlot("");
        setMessage("Пока не вижу свободных окон. Попробуй другой месяц.");
        return;
      }

      const service = serviceOptions.find((item) => item.id === nextServiceId) ?? selectedService;
      const detailQuery = new URLSearchParams({ session: currentSession, serviceId: service.serviceId, date: targetDate });
      const detail = await fetchJson<AvailabilityResponse>(`/api/dikidi/availability?${detailQuery.toString()}`);
      applyMonthState([...monthData.availableDates, ...detail.availableDates], targetDate, detail.times, monthKey);
    } catch (error) {
      setAvailableDates([]);
      setSelectedDate("");
      setSelectedSlot("");
      setTimeOptions([]);
      setVisibleMonth((nextDate || new Date().toISOString().slice(0, 10)).slice(0, 7));
      setMessage("Онлайн-запись временно недоступна");
    } finally {
      setLoading(false);
    }
  };

  const loadMonthAvailability = async (monthKey: string) => {
    setLoading(true);
    setMessage("");
    setVisibleMonth(monthKey);
    try {
      const currentSession = await ensureBootstrap();
      const monthData = await loadAllAvailability(currentSession, serviceId, `${monthKey}-01`);
      const monthDates = monthData.availableDates.filter((value) => value.startsWith(monthKey));
      const fallbackDate = monthData.selectedDate && monthData.selectedDate.startsWith(monthKey) ? monthData.selectedDate : "";
      const targetDate = monthDates[0] || fallbackDate;

      if (!targetDate) {
        setAvailableDates((prev) => Array.from(new Set([...prev, ...monthData.availableDates])).sort());
        setSelectedDate("");
        setSelectedSlot("");
        setTimeOptions([]);
        setMessage("В этом месяце свободных окон пока нет. Попробуй соседний месяц.");
        return;
      }

      const service = serviceOptions.find((item) => item.id === serviceId) ?? selectedService;
      const detailQuery = new URLSearchParams({ session: currentSession, serviceId: service.serviceId, date: targetDate });
      const detail = await fetchJson<AvailabilityResponse>(`/api/dikidi/availability?${detailQuery.toString()}`);

      applyMonthState([...monthData.availableDates, ...detail.availableDates], targetDate, detail.times, monthKey);
    } catch (error) {
      setAvailableDates([]);
      setSelectedDate("");
      setSelectedSlot("");
      setTimeOptions([]);
      setMessage("Онлайн-запись временно недоступна");
    } finally {
      setLoading(false);
    }
  };

  const openDateTimeStep = async () => {
    setStep(2);
    await loadAvailability(serviceId, selectedDate || undefined);
  };

  const handleDateSelect = async (value: string) => {
    setLoading(true);
    setMessage("");
    setSelectedDate(value);
    try {
      const currentSession = await ensureBootstrap();
      const service = serviceOptions.find((item) => item.id === serviceId) ?? selectedService;
      const query = new URLSearchParams({ session: currentSession, serviceId: service.serviceId, date: value });
      const detail = await fetchJson<AvailabilityResponse>(`/api/dikidi/availability?${query.toString()}`);
      const mergedDates = Array.from(new Set([...availableDates, ...detail.availableDates])).sort();
      applyMonthState(mergedDates, value, detail.times, value.slice(0, 7));
    } catch (error) {
      setSelectedSlot("");
      setTimeOptions([]);
      setMessage("Онлайн-запись временно недоступна");
    } finally {
      setLoading(false);
    }
  };

  const goToConfirmation = () => {
    if (!selectedDateTime) {
      setMessage("Сначала выбери доступное время");
      return;
    }
    setMessage("");
    setStep(3);
  };

  const startConfirmation = async () => {
    if (!selectedDateTime) {
      setMessage("Сначала выбери дату и время");
      return;
    }

    const { firstName, lastName } = splitName(fullName);
    if (!firstName || !phone.trim()) {
      setMessage("Заполни имя и телефон");
      return;
    }

    setSubmitting(true);
    setMessage("");
    setSuccessMessage("");
    try {
      const currentSession = await ensureBootstrap();
      const prepare = await fetchJson<PrepareResponse>("/api/dikidi/prepare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session: currentSession,
          serviceId: selectedService.serviceId,
          datetime: selectedDateTime,
          firstName,
          lastName,
          phone,
          comment,
        }),
      });

      if (prepare.warning) setMessage(prepare.warning);

      if (prepare.smsRequired) {
        await fetchJson<{ message: string }>("/api/dikidi/send-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session: currentSession,
            firstName,
            lastName,
            phone,
          }),
        });
        setSmsRequested(true);
        setMessage("Код отправлен. Введи его ниже и подтверди запись.");
        return;
      }

      await fetchJson<{ success: true }>("/api/dikidi/finalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session: currentSession,
          firstName,
          lastName,
          phone,
          comment,
          code: "",
          action: "",
        }),
      });

      setSuccessMessage("Запись подтверждена 🎉");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Не удалось подтвердить запись");
    } finally {
      setSubmitting(false);
    }
  };

  const finalizeWithCode = async () => {
    const { firstName, lastName } = splitName(fullName);
    if (!smsCode.trim()) {
      setMessage("Введи код из SMS");
      return;
    }

    setSubmitting(true);
    setMessage("");
    try {
      const currentSession = await ensureBootstrap();
      const verify = await fetchJson<{ action?: string }>("/api/dikidi/check-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session: currentSession,
          phone,
          code: smsCode.trim(),
        }),
      });

      await fetchJson<{ success: true }>("/api/dikidi/finalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session: currentSession,
          firstName,
          lastName,
          phone,
          comment,
          code: smsCode.trim(),
          action: verify.action || "",
        }),
      });

      setSuccessMessage("Запись подтверждена 🎉");
      setMessage("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Не удалось завершить запись");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section id="booking" className="bg-gradient-rose py-6 md:py-16">
        <div className="mx-auto max-w-5xl px-3 md:px-6">
          <div className="rounded-2xl bg-card p-3 text-center shadow-elegant md:rounded-[2rem] md:p-14">
            <span className="text-xs uppercase tracking-[0.25em] text-primary font-medium">Запись</span>
            <h2 className="mt-2 mb-2 font-display text-xl md:mt-3 md:mb-5 md:text-5xl">
              Готовы к <span className="italic text-gradient-gold">красивому маникюру?</span>
            </h2>
            <p className="mx-auto mb-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:mb-8">
              Выберите удобный способ записи. Отвечу быстро и помогу подобрать удобное время и нужную услугу.
            </p>

            <div className="mb-5 flex flex-wrap justify-center gap-2 md:mb-10 md:gap-3">
              <a
                href={brand.bookingUrl}
                data-cta="booking"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-2 text-xs font-medium text-primary-foreground md:text-sm shadow-soft hover:opacity-90 md:px-7 md:py-3.5"
              >
                <CalendarCheck className="h-4 w-4" /> Записаться онлайн
              </a>
              <a
                href={brand.telegram}
                target="_blank"
                rel="noreferrer noopener"
                data-cta="telegram"
                onClick={() => trackGoal("telegram_click")}
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-3 py-2 text-xs font-medium text-foreground md:text-sm hover:bg-secondary md:px-7 md:py-3.5"
              >
                <Send className="h-4 w-4" /> Написать в Telegram
              </a>
              <a
                href={brand.vk}
                target="_blank"
                rel="noreferrer noopener"
                data-cta="vk"
                onClick={() => trackGoal("vk_click")}
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-3 py-2 text-xs font-medium text-foreground md:text-sm hover:bg-secondary md:px-7 md:py-3.5"
              >
                <span className="font-bold text-xs">VK</span> Написать в ВКонтакте
              </a>
            </div>

            <div id="contacts" className="mt-4 overflow-hidden rounded-[1.5rem] border border-border bg-background text-left shadow-card md:mt-10">
              <div className="border-b border-border/70 px-4 py-3 md:px-6 md:py-5">
                <div className="text-sm font-semibold text-foreground">Как добраться</div>
                <div className="text-sm text-muted-foreground mt-1">Смоленск, ул. 25 Сентября, 16</div>
              </div>
              <iframe
                title="Карта Izabella Nails"
                src="https://yandex.ru/map-widget/v1/?ll=32.0657229%2C54.7656936&mode=whatshere&whatshere%5Bpoint%5D=32.0657229%2C54.7656936&whatshere%5Bzoom%5D=17&z=17"
                className="h-[180px] w-full border-0 md:h-[320px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex flex-wrap gap-2.5 px-4 py-3 md:gap-3 md:px-6 md:py-4">
                <a
                  href="https://yandex.ru/maps/?ll=32.0657229%2C54.7656936&mode=whatshere&whatshere%5Bpoint%5D=32.0657229%2C54.7656936&whatshere%5Bzoom%5D=17&z=17"
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cta="map"
                  onClick={() => {
                    trackGoal("map_click");
                    trackGoal("route_click");
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary md:px-5 md:py-2.5"
                >
                  Открыть в Яндекс Картах
                </a>
                <a
                  href={brand.bookingUrl}
                  data-cta="booking"
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary md:px-5 md:py-2.5"
                >
                  Перейти к записи
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {open ? (
        <div
          className="fixed inset-0 z-[9999] flex items-end justify-center bg-foreground/55 px-0 backdrop-blur-sm md:items-center md:px-4"
          onClick={closeModal}
        >
          <div
            className="relative h-[100dvh] w-full overflow-hidden rounded-none border border-border bg-card shadow-elegant md:h-auto md:max-h-[90vh] md:max-w-5xl md:rounded-[2rem]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Закрыть"
              onClick={closeModal}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-sm hover:bg-secondary md:right-4 md:top-4"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="border-b border-border/70 px-3 pb-2 pt-9 md:p-8">
              {!successMessage ? (
                <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
                  Онлайн-запись
                </div>
              ) : null}
              <h3 className="pr-10 font-display text-xl text-foreground md:text-4xl">
                {successMessage
                  ? <>Запись <span className="italic text-gradient-gold">подтверждена</span></>
                  : step === 1
                    ? <>Шаг 1: <span className="italic text-gradient-gold">услуга</span></>
                    : step === 2
                      ? <>Шаг 2: <span className="italic text-gradient-gold">дата и время</span></>
                      : <>Шаг 3: <span className="italic text-gradient-gold">подтверждение</span></>}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:mt-3 md:text-base">
                {!successMessage && step === 1 && "Сначала выбери услугу."}
              </p>
            </div>

            <div className="h-[calc(100dvh-92px)] overflow-y-auto md:h-auto md:max-h-[calc(90vh-120px)]">

            {message ? (
              <div className="mx-4 mt-4 rounded-2xl border border-primary/20 bg-rose-soft px-4 py-3 text-sm text-foreground md:mx-8 md:mt-6">
                {message}
              </div>
            ) : null}

            {successMessage ? (
              <div className="mx-4 mt-4 mb-4 md:mx-8 md:mt-6 md:mb-8">
                <div className="grid overflow-hidden rounded-[1.75rem] border border-[#efe4db] bg-white shadow-[0_24px_80px_rgba(42,23,15,0.12)] lg:min-h-[360px] lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="h-full bg-[#fff6f2] px-6 pt-8 pb-8 md:px-8 md:pt-8 md:pb-8">
                    <div className="inline-flex items-center rounded-full border border-primary/15 bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-primary">
                      Запись подтверждена
                    </div>
                    <div className="mt-5 text-3xl font-semibold leading-tight md:text-[2.2rem]">{selectedService.title}</div>
                    <div className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      Ждём Вас в назначенное время. Если планы поменяются – напишите мастеру заранее.
                    </div>
                    <div className="mt-6 grid gap-3 text-sm text-foreground/85">
                      <div className="rounded-[1.25rem] border border-white/70 bg-white/75 px-4 py-3">
                        <span className="font-medium text-foreground">Мастер:</span> {brand.masterFullName}
                      </div>
                      <div className="rounded-[1.25rem] border border-white/70 bg-white/75 px-4 py-3">
                        <span className="font-medium text-foreground">Адрес:</span> {brand.city}, {brand.address}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#efe4db] bg-white/70 px-6 pt-8 pb-8 rounded-b-[1.5rem] lg:border-l lg:border-t-0 lg:px-8 lg:pt-8 lg:pb-8">
                    <div className="grid gap-3">
                      <div className="rounded-[1.35rem] border border-[#efe4db] bg-white px-4 py-4 text-center">
                        <div className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Дата</div>
                        <div className="mt-2 text-xl font-semibold">{selectedDate ? formatDateLabel(selectedDate) : "–"}</div>
                      </div>
                      <div className="rounded-[1.35rem] border border-[#efe4db] bg-white px-4 py-4 text-center">
                        <div className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Время</div>
                        <div className="mt-2 text-xl font-semibold">{selectedTime || "–"}</div>
                      </div>
                      <div className="rounded-[1.35rem] border border-[#efe4db] bg-white px-4 py-4 text-center">
                        <div className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Цена</div>
                        <div className="mt-2 text-xl font-semibold">{selectedService.price}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="p-3 md:p-8">
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {serviceOptions.map((option) => {
                    const active = option.id === serviceId;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setServiceId(option.id)}
                        className={`rounded-xl border p-2.5 md:rounded-2xl text-left transition-all md:p-4 ${
                          active
                            ? "border-primary bg-rose-soft shadow-soft"
                            : "border-border bg-background hover:border-primary/40 hover:bg-secondary/40"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-medium text-foreground leading-snug">{option.title}</div>
                            <div className="mt-1 text-sm text-muted-foreground">{option.duration}</div>
                          </div>
                          {active ? <Check className="mt-0.5 h-4 w-4 text-primary" /> : null}
                        </div>
                        <div className="mt-1.5 font-display text-base text-foreground md:mt-3 md:text-xl">{option.price}</div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 flex justify-end md:mt-6">
                  <button
                    type="button"
                    onClick={openDateTimeStep}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft hover:opacity-90 disabled:opacity-60 md:px-7 md:py-3.5"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    Дальше
                  </button>
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="p-3 md:p-8">
                <div className="rounded-xl border border-border bg-background p-3 md:rounded-2xl md:p-5">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Выбрано</div>
                  <div className="font-medium text-foreground">{selectedService.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{selectedService.duration} · {selectedService.price}</div>
                </div>

                <div className="mt-3 grid gap-2.5 md:gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="rounded-xl border border-border bg-background p-3 md:rounded-2xl md:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-foreground">Дата</div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {selectedDate ? formatDateLabel(selectedDate) : "Выбери дату"}
                        </div>
                      </div>

                      {!visibleMonth ? (
                        <div className="text-sm text-muted-foreground">Загружаю даты…</div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => loadMonthAvailability(shiftMonth(visibleMonth, -1))}
                            disabled={loading}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground disabled:opacity-40"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <div className="min-w-[7rem] text-center text-sm text-foreground md:min-w-[9rem]">{formatMonthLabel(visibleMonth) || "Даты"}</div>
                          <button
                            type="button"
                            onClick={() => loadMonthAvailability(shiftMonth(visibleMonth, 1))}
                            disabled={loading}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground disabled:opacity-40"
                          >
                            <ChevronLeft className="h-4 w-4 rotate-180" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wide text-muted-foreground md:mt-4 md:gap-2 md:text-xs">
                      {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((day) => (
                        <div key={day} className="py-1">{day}</div>
                      ))}
                    </div>

                    <div className="mt-2 grid grid-cols-7 gap-1 md:gap-2">
                      {calendarDays.map((cell) => {
                        if (!cell.date) {
                          return <div key={cell.key} className="h-8 rounded-xl md:h-11 md:rounded-2xl" />;
                        }

                        const date = cell.date;
                        const active = date === selectedDate;
                        return (
                          <button
                            key={cell.key}
                            type="button"
                            onClick={() => handleDateSelect(date)}
                            disabled={!cell.available || loading}
                            className={`h-8 rounded-xl text-xs md:rounded-2xl md:text-sm transition-all md:h-11 ${
                              active
                                ? 'bg-primary text-primary-foreground'
                                : cell.available
                                  ? 'border border-border bg-card text-foreground hover:bg-secondary'
                                  : 'border border-border/50 bg-muted/40 text-muted-foreground/45'
                            }`}
                          >
                            <span className="block leading-none">{cell.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-background p-3 md:rounded-2xl md:p-5">
                    <div className="text-sm font-semibold text-foreground mb-3">Время</div>
                    <div className="max-h-[260px] overflow-y-auto pr-1 md:max-h-[320px]">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {timeOptions.map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setSelectedSlot(value)}
                          className={`rounded-2xl px-3 py-2 text-xs transition-all md:py-3 md:text-sm ${
                            value === selectedSlot
                              ? 'bg-primary text-primary-foreground'
                              : 'border border-border bg-card text-foreground hover:bg-secondary'
                          }`}
                        >
                          {formatTimeLabel(value)}
                        </button>
                      ))}
                    </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col-reverse gap-2.5 sm:flex-row sm:flex-wrap sm:justify-between md:mt-6 md:gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary md:px-6 md:py-3"
                  >
                    <ChevronLeft className="h-4 w-4" /> Назад
                  </button>
                  <button
                    type="button"
                    onClick={goToConfirmation}
                    disabled={!selectedDateTime || loading}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft hover:opacity-90 disabled:opacity-60 md:px-7 md:py-3.5"
                  >
                    К подтверждению
                  </button>
                </div>
              </div>
            ) : null}

            {step === 3 && !successMessage ? (
              <div className="p-3 md:p-8">
                <div className="rounded-xl border border-border bg-background p-3 md:rounded-2xl md:p-5">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Подтверждаем запись</div>
                  <div className="font-medium text-foreground">{selectedService.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {selectedDate ? formatDateLabel(selectedDate) : ""} · {selectedTime}
                  </div>
                </div>

                <div className="mt-3 grid gap-2.5 md:gap-4 lg:grid-cols-2">
                  <div className="rounded-xl border border-border bg-background p-3 md:rounded-2xl md:p-5">
                    <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="booking-name">
                      Имя
                    </label>
                    <input
                      id="booking-name"
                      value={fullName}
                      onChange={(event) => {
                        setFullName(event.target.value);
                        setSmsRequested(false);
                        setSmsCode("");
                        setSuccessMessage("");
                      }}
                      className="h-12 w-full rounded-2xl border border-border bg-card px-4 text-base text-foreground outline-none transition focus:border-primary md:h-14"
                      placeholder="Как вас зовут"
                    />
                  </div>

                  <div className="rounded-xl border border-border bg-background p-3 md:rounded-2xl md:p-5">
                    <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="booking-phone">
                      Телефон
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(event) => {
                        setPhone(event.target.value);
                        setSmsRequested(false);
                        setSmsCode("");
                        setSuccessMessage("");
                      }}
                      className="h-12 w-full rounded-2xl border border-border bg-card px-4 text-base text-foreground outline-none transition focus:border-primary md:h-14"
                      placeholder="+7 999 123-45-67"
                    />
                  </div>
                </div>

                <div className="mt-3 rounded-2xl border border-border bg-background p-4 md:mt-4 md:p-5">
                  <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="booking-comment">
                    Комментарий (необязательно)
                  </label>
                  <textarea
                    id="booking-comment"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    className="min-h-24 w-full rounded-2xl border border-border bg-card px-4 py-3 text-base text-foreground outline-none transition focus:border-primary md:min-h-28"
                    placeholder="Например: нужен дизайн или снятие"
                  />
                </div>

                {smsRequested ? (
                  <div className="mt-3 rounded-2xl border border-border bg-background p-4 md:mt-4 md:p-5">
                    <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="booking-code">
                      Код из SMS
                    </label>
                    <input
                      id="booking-code"
                      value={smsCode}
                      onChange={(event) => setSmsCode(event.target.value)}
                      className="h-12 w-full rounded-2xl border border-border bg-card px-4 text-base text-foreground outline-none transition focus:border-primary md:h-14"
                      placeholder="Введите код"
                    />
                  </div>
                ) : null}

                <div className="mt-4 flex flex-wrap justify-between gap-2.5 md:mt-6 md:gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary md:px-6 md:py-3"
                  >
                    <ChevronLeft className="h-4 w-4" /> Назад
                  </button>

                  {smsRequested ? (
                    <button
                      type="button"
                      onClick={finalizeWithCode}
                      disabled={submitting}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft hover:opacity-90 disabled:opacity-60 md:px-7 md:py-3.5"
                    >
                      {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck className="h-4 w-4" />}
                      Подтвердить запись
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={startConfirmation}
                      disabled={submitting}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft hover:opacity-90 disabled:opacity-60 md:px-7 md:py-3.5"
                    >
                      {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck className="h-4 w-4" />}
                      Подтвердить запись
                    </button>
                  )}
                </div>
              </div>
            ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
