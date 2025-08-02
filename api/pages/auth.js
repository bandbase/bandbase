// In: /api/pages/auth.js

import ejs from 'ejs';
import path from 'path';

export default async function handler(request, response) {
  // These keys are safely accessed on the server side
  const viewData = {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY
  };

  const templatePath = path.join(process.cwd(), 'templates', 'auth.ejs');
  const html = await ejs.renderFile(templatePath, viewData);

  response.setHeader('Content-Type', 'text/html');
  response.status(200).send(html);
}