// /api/pages/auth.js

import { renderPage } from '../../lib/ssr-helpers.js';

export default async function handler(request, response) {
  await renderPage(response, 'auth.ejs');
}