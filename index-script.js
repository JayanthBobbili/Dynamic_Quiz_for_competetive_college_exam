setTimeout(() => {
  document.getElementById('next-button').classList.remove('hide');
}, 3300);

document.getElementById('next-button').addEventListener('click', function() {
  // Load the new content into the current page
  fetch('index-middle.html')
    .then(response => response.text())
    .then(html => {
      document.body.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading the page: ', error);
    });
});
