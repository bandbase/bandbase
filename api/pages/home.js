// In: /api/pages/home.js

import ejs from 'ejs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// This client is initialized on the server, so it can use regular env vars
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(request, response) {
  // Fetch all stores from the database
  const { data: stores, error } = await supabase
    .from('stores')
    .select('name, slug, description');

  if (error) {
    console.error('Error fetching stores:', error);
    return response.status(500).send('Error fetching stores');
  }

  const templatePath = path.join(process.cwd(), 'templates', 'home.ejs');
  const html = await ejs.renderFile(templatePath, { stores: stores });

  response.setHeader('Content-Type', 'text/html');
  response.status(200).send(html);
}