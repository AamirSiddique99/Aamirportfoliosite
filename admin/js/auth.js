/* ==========================================================================
   AHMED PORTFOLIO — ADMIN LOGIN
   Client-side credential check against AhmedStore (see js/store.js).
   Note: this is a *front-end only* gate suitable for a personal/static
   site — see the dashboard's Account Security notice for what this does
   and doesn't protect against.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  // Already logged in? skip straight to the dashboard.
  if (AhmedStore.isLoggedIn()) {
    window.location.href = 'dashboard.html';
    return;
  }

  var form = document.getElementById('loginForm');
  var errorBox = document.getElementById('loginError');
  var pwInput = document.getElementById('password');
  var pwToggle = document.getElementById('pwToggle');

  pwToggle.addEventListener('click', function () {
    var isPw = pwInput.type === 'password';
    pwInput.type = isPw ? 'text' : 'password';
    pwToggle.setAttribute('aria-label', isPw ? 'Hide password' : 'Show password');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var username = document.getElementById('username').value.trim();
    var password = pwInput.value;

    if (AhmedStore.login(username, password)) {
      window.location.href = 'dashboard.html';
    } else {
      errorBox.textContent = 'Incorrect username or password. Please try again.';
      errorBox.classList.add('show');
      pwInput.value = '';
      pwInput.focus();
    }
  });

});
