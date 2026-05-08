import { json, getAvailability } from './_lib.js';

export default async function handler(req, res) {
  try {
    const { session = '', serviceId = '', date = '' } = req.query || {};
    if (!serviceId) {
      return json(res, 400, { error: 'serviceId is required' });
    }

    const data = await getAvailability(session, serviceId, date || undefined);
    json(res, 200, data);
  } catch (error) {
    console.error('[dikidi availability]', {
      serviceId: req.query?.serviceId || '',
      date: req.query?.date || '',
      error: error.message || 'availability failed',
    });
    json(res, 500, { error: error.message || 'availability failed' });
  }
}
