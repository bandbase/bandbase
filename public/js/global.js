// In: /public/js/global.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// This relies on the <script> block in the HTML from the server
const supabase = createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.key);

// This function will now update our new toolbar
const updateToolbar = (user) => {
  const loggedInDiv = document.querySelector('#toolbar-logged-in');
  const loggedOutDiv = document.querySelector('#toolbar-logged-out');
  const userEmailSpan = document.querySelector('#toolbar-user-email');
  const logoutButton = document.querySelector('#logout-button');

  if (user) {
    // User is logged in
    if (loggedInDiv) loggedInDiv.style.display = 'block';
    if (loggedOutDiv) loggedOutDiv.style.display = 'none';
    if (userEmailSpan) userEmailSpan.textContent = user.email;

    if (logoutButton) {
      logoutButton.addEventListener('click', async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          alert(error.message);
        }
      });
    }
  } else {
    // User is logged out
    if (loggedInDiv) loggedInDiv.style.display = 'none';
    if (loggedOutDiv) loggedOutDiv.style.display = 'block';
    if (userEmailSpan) userEmailSpan.textContent = '';
  }


};

// Check the session when the page loads
supabase.auth.getSession().then(({ data: { session } }) => {
  updateToolbar(session?.user);
});

// Listen for future auth state changes
supabase.auth.onAuthStateChange((_event, session) => {
  updateToolbar(session?.user);
});

