import { json, parseBody, clearReservation, reserveTime, checkContact } from './_lib.js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
    const body = parseBody(req);
    const { session = '', serviceId = '', datetime = '', firstName = '', lastName = '', phone = '', comment = '' } = body;

    if (!serviceId || !datetime || !firstName || !phone) {
      return json(res, 400, { error: 'serviceId, datetime, firstName, phone are required' });
    }

    await clearReservation(session);
    await reserveTime(session, serviceId, datetime);
    const check = await checkContact(session, { firstName, lastName, phone, comment });

    json(res, 200, {
      smsRequired: Boolean(check.sms),
      warning: check.warning || null,
    });
  } catch (error) {
    json(res, 500, { error: error.message || 'prepare failed' });
  }
}
