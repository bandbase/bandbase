// /public/js/auth.js

import { supabase } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', () => {

  const loginForm = document.querySelector('#login-form');
  const userStatusDiv = document.querySelector('#user-status');
  const userEmailSpan = document.querySelector('#user-email');
  const logoutButton = document.querySelector('#logout-button');
  console.log('ready');

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

  supabase.auth.getSession().then(({ data: { session } }) => {
    console.log(session);
    updateUserStatus(session?.user);
  });

  supabase.auth.onAuthStateChange((_event, session) => {
    updateUserStatus(session?.user);
  });

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('email-input').value;
      try {
        const { data, error } = await supabase.auth.signInWithOtp({
          email: email,
          options: {
            shouldCreateUser: true,
          },
        })
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