// In: /public/js/auth.js

import { supabase } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', () => {

  const loginForm = document.querySelector('#login-form');
  const userStatusDiv = document.querySelector('#user-status');
  const userEmailSpan = document.querySelector('#user-email');
  const logoutButton = document.querySelector('#logout-button');

  // --- 1. A single function to update the UI based on auth state ---
  // This avoids repeating code and makes it easy to call.
  const updateUserStatus = (user) => {
    if (user) {
      // User is logged in
      if (userStatusDiv) userStatusDiv.style.display = 'block';
      if (loginForm) loginForm.style.display = 'none';
      if (userEmailSpan) userEmailSpan.textContent = user.email;
    } else {
      // User is logged out
      if (userStatusDiv) userStatusDiv.style.display = 'none';
      if (loginForm) loginForm.style.display = 'block';
      if (userEmailSpan) userEmailSpan.textContent = '';
    }
  };

  // --- 2. Check the user's session when the page loads ---
  // This is the crucial new part. We get the session right away.
  supabase.auth.getSession().then(({ data: { session } }) => {
    updateUserStatus(session?.user);
  });

  // --- 3. Listen for future auth state changes ---
  // This handles what happens when the user logs in or out in another tab,
  // or when they return to the page after clicking a magic link.
  supabase.auth.onAuthStateChange((_event, session) => {
    updateUserStatus(session?.user);
  });

  // --- Event listeners for the form and button (no changes here) ---
  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.getElementById('email-input').value;
      try {
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) throw error;
        alert('Check your email for the magic link!');
      } catch (error) {
        alert(error.message);
      }
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        alert(error.message);
      }
    });
  }
});