import { json, parseBody, verifyCode } from './_lib.js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
    const body = parseBody(req);
    const { session = '', phone = '', code = '' } = body;

    if (!session || !phone || !code) {
      return json(res, 400, { error: 'session, phone, code are required' });
    }

    const data = await verifyCode(session, { phone, code });
    json(res, 200, { action: data.action || '' });
  } catch (error) {
    json(res, 500, { error: error.message || 'check code failed' });
  }
}
