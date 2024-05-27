// Theme toggle switch functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    }
});

// Preserve theme across pages
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        themeToggle.checked = true;
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    } else {
        themeToggle.checked = false;
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    }
});

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

document.addEventListener('DOMContentLoaded', () => {
    const greCard = document.getElementById('gre');
    greCard.addEventListener('click', () => {
        window.location.href = 'gre.html';
    });

    const btechCard = document.getElementById('btech');
    btechCard.addEventListener('click', () => {
        window.location.href = 'btech.html';
    });
});
