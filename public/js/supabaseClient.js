// In: /public/js/supabaseClient.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Read the configuration that was rendered into the HTML by the server
const supabaseUrl = window.SUPABASE_CONFIG.url;
const supabaseAnonKey = window.SUPABASE_CONFIG.key;

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);