import { json, getBootstrap } from './_lib.js';

export default async function handler(req, res) {
  try {
    const data = await getBootstrap();
    json(res, 200, { session: data.session });
  } catch (error) {
    json(res, 500, { error: error.message || 'bootstrap failed' });
  }
}
