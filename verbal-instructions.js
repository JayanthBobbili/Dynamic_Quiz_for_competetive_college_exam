document.addEventListener('DOMContentLoaded', () => {
    // Apply the theme from local storage
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        themeToggle.checked = true;
        body.classList.add('dark-mode');
    } else {
        themeToggle.checked = false;
        body.classList.add('light-mode');
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            localStorage.setItem('theme', 'dark');
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
        } else {
            localStorage.setItem('theme', 'light');
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
        }
    });

    // Redirect to demo.html on button click
    const beginTestButton = document.getElementById('begin-test');
    const quitButton = document.getElementById('quit');
    const profileButton = document.getElementById('profile');

    beginTestButton.addEventListener('click', () => {
        window.location.href = 'verbal-exam.html';
    });

    quitButton.addEventListener('click', () => {
        window.history.back();
    });

    profileButton.addEventListener('click', () => {
        window.location.href = 'demo.html';
    });
});
