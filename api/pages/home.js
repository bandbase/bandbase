// /api/pages/home.js

import { supabase, renderPage } from '../../lib/ssr-helpers.js';

export default async function handler(request, response) {
  const { data: stores, error } = await supabase
    .from('stores')
    .select('name, slug, description');

  if (error) {
    console.error('Error fetching stores:', error);
    return response.status(500).send('Error fetching stores');
  }

  await renderPage(response, 'home.ejs', { stores: stores });
}