document.addEventListener('DOMContentLoaded', () => {
    // Apply the theme from local storage
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        themeToggle.checked = true;
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    } else {
        themeToggle.checked = false;
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
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


    // Redirect to demo.html on card or profile click
    const verbalReasoningCard = document.getElementById('verbal-reasoning');
    const quantitativeAptitudeCard = document.getElementById('quantitative-aptitude');
    const profile = document.getElementById('profile');

    verbalReasoningCard.addEventListener('click', () => {
        window.location.href = 'verbal-instructions.html';
    });

    quantitativeAptitudeCard.addEventListener('click', () => {
        window.location.href = 'quant-instructions.html';
    });

    profile.addEventListener('click', () => {
        window.location.href = 'demo.html';
    });
});