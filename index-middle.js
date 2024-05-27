document.addEventListener('DOMContentLoaded', function() {
  // Add event listeners to the login and signup buttons
  document.getElementById('login-button').addEventListener('click', function() {
    loadPage('login.html');
  });

  document.getElementById('signup-button').addEventListener('click', function() {
    loadPage('login-createAccount.html');
  });
});

function loadPage(page) {
  fetch(page)
    .then(response => response.text())
    .then(html => {
      document.body.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading the page: ', error);
    });
}
