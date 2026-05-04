import { json, getAvailability } from './_lib.js';

export default async function handler(req, res) {
  try {
    const { session = '', serviceId = '', date = '' } = req.query || {};
    if (!session || !serviceId) {
      return json(res, 400, { error: 'session and serviceId are required' });
    }

    const data = await getAvailability(session, serviceId, date || undefined);
    json(res, 200, data);
  } catch (error) {
    json(res, 500, { error: error.message || 'availability failed' });
  }
}
