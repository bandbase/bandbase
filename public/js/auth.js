// In: /public/js/auth.js

import { supabase } from './supabaseClient.js';

const loginForm = document.querySelector('#login-form');
const userStatusDiv = document.querySelector('#user-status');
const userEmailSpan = document.querySelector('#user-email');
const logoutButton = document.querySelector('#logout-button');

// --- Listen for authentication state changes ---
// This is the most important part. It runs when the page loads and
// anytime the user logs in or out.
supabase.auth.onAuthStateChange((event, session) => {
  if (session && session.user) {
    // User is logged in
    userStatusDiv.style.display = 'block';
    loginForm.style.display = 'none';
    userEmailSpan.textContent = session.user.email;
  } else {
    // User is logged out
    userStatusDiv.style.display = 'none';
    loginForm.style.display = 'block';
    userEmailSpan.textContent = '';
  }
});

// --- Handle form submission for magic link ---
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

// --- Handle logout ---
logoutButton.addEventListener('click', async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert(error.message);
  }
});