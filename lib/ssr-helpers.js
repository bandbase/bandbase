// /lib/ssr-helpers.js

import ejs from 'ejs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function renderPage(response, templateName, viewData = {}) {
  try {
    const dataForRender = {
      ...viewData,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY
    };

    const templatePath = path.join(process.cwd(), 'templates', templateName);
    const html = await ejs.renderFile(templatePath, dataForRender);

    response.setHeader('Content-Type', 'text/html');
    response.status(200).send(html);

  } catch (error) {
    console.error(`Error rendering page ${templateName}:`, error);
    response.status(500).send('Server error');
  }
}