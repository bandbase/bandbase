// /public/js/global.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.key);

supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth event:', event, session);
  if (event === 'SIGNED_IN') {
    // update a shared navbar here to show auth state
    console.log('User signed in!');
    // redirect to a dashboard
    // window.location.href = '/dashboard'; 
  } else if (event === 'SIGNED_OUT') {
    console.log('User signed out!');
  }
});