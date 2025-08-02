// In: /public/js/auth.js

import { supabase } from './supabaseClient.js';

// Wait for the HTML document to be fully loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {

  // --- All of your code now goes INSIDE this listener ---

  const loginForm = document.querySelector('#login-form');
  const userStatusDiv = document.querySelector('#user-status');
  const userEmailSpan = document.querySelector('#user-email');
  const logoutButton = document.querySelector('#logout-button');

  // --- Listen for authentication state changes ---
  supabase.auth.onAuthStateChange((event, session) => {
    // This part is tricky. We need to make sure the elements exist
    // before we try to change them.
    if (session && session.user) {
      // User is logged in
      if (userStatusDiv) userStatusDiv.style.display = 'block';
      if (loginForm) loginForm.style.display = 'none';
      if (userEmailSpan) userEmailSpan.textContent = session.user.email;
    } else {
      // User is logged out
      if (userStatusDiv) userStatusDiv.style.display = 'none';
      if (loginForm) loginForm.style.display = 'block';
      if (userEmailSpan) userEmailSpan.textContent = '';
    }
  });

  // --- Handle form submission for magic link ---
  // We also check if the form exists before adding a listener to be safe.
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

  // --- Handle logout ---
  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        alert(error.message);
      }
    });
  }
});