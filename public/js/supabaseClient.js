// /public/js/supabaseClient.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = window.SUPABASE_CONFIG.url;
const supabaseAnonKey = window.SUPABASE_CONFIG.key;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);