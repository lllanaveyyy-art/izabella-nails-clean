import { json, parseBody, finalizeBooking } from './_lib.js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
    const body = parseBody(req);
    const { session = '', firstName = '', lastName = '', phone = '', comment = '', code = '', action = '' } = body;

    if (!firstName || !phone) {
      return json(res, 400, { error: 'firstName, phone are required' });
    }

    await finalizeBooking(session, { firstName, lastName, phone, comment, code, action });
    json(res, 200, { success: true });
  } catch (error) {
    json(res, 500, { error: error.message || 'finalize failed' });
  }
}
