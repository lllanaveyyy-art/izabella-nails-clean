import { json, parseBody, sendCode } from './_lib.js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
    const body = parseBody(req);
    const { session = '', firstName = '', lastName = '', phone = '' } = body;

    if (!session || !firstName || !phone) {
      return json(res, 400, { error: 'session, firstName, phone are required' });
    }

    await sendCode(session, { firstName, lastName, phone });
    json(res, 200, { message: 'Код отправлен' });
  } catch (error) {
    json(res, 500, { error: error.message || 'send code failed' });
  }
}
