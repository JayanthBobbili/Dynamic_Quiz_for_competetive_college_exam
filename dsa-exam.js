document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById('question-container');
    const explanationBtn = document.getElementById('explanation-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn');
    const sectionTitle = document.getElementById('section-title');
    const timerDisplay = document.getElementById('timer');
    const timerCircle = document.getElementById('timer-circle');
    const toggleModeBtn = document.getElementById('toggle-mode');

    let currentSectionIndex = 0;
    let currentQuestionIndex = 0;
    let timerInterval;

    const sections = [
    {
        title: 'DSA-examination',
        time: 15 * 60 * 1000, // 15 minutes in milliseconds
        questions: [
            {
                text: 'Which data structure is used for implementing recursion?',
                options: ['Queue', 'Stack', 'Linked List', 'Tree'],
                correct: [2], // The index of the correct option
                explanation: ' Recursion uses the system call stack to keep track of function calls, parameters, and return addresses.',
                selected: null
            },
            {
                text: 'What is the time complexity of inserting an element at the beginning of a singly linkedlist?',
                options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
                correct: [1],
                explanation: 'Inserting an element at the beginning of a singly linked list involves updating the head pointer, which is a constant time operation',
                selected: null
            },
            {
                text: 'Which of the following sorting algorithms has the best average-case time complexity?',
                options: [' Bubble Sort', 'Selection Sort', 'Merge Sort', ' Quick Sort'],
                correct: [3], // The index of the correct option
                explanation: 'Merge Sort has an average-case time complexity of O(n log n), which is better than Bubble Sort and Selection Sort, both of which have O(n²).',
                selected: null
            },
            {
                text: 'Which of the following operations is not supported by a queue? ',
                options: ['Insertion at rear', 'Deletion at front', ' Insertion at front', 'None of the above'],
                correct: [1],
                explanation: '  A queue supports insertion at the rear (enqueue) and deletion at the front (dequeue). Insertion at the front is not supported.',
                selected: null
            },
            {
                text: 'What is the height of a complete binary tree with n nodes?',
                options: [' O(n)', ' O(log n)', ' O(n log n)', ' O(1)'],
                correct: [1],
                explanation: 'The height of a complete binary tree is log(n), where n is the number of nodes.',
                selected: null
            }
        ],
        answered: 5
    }
];

function loadSection(sectionIndex) {
    const section = sections[sectionIndex];
    sectionTitle.textContent = section.title;
    currentQuestionIndex = 0;
    loadQuestion(currentQuestionIndex);
    startTimer(section.time);
}

function loadQuestion(questionIndex) {
    const section = sections[currentSectionIndex];
    const questionGroup = section.questions[questionIndex];
    if (section.title === 'Verbal Reasoning - Reading Comprehension') {
        questionContainer.innerHTML = `
            <div>
                <p>${questionGroup.text}</p>
                ${questionGroup.questions.map((question, qIndex) => `
                    <div>
                        <p>${question.text}</p>
                        ${question.options.map((option, index) => `
                            <label>
                                <input type="radio" name="option${qIndex}" value="${index}" ${question.selected === index ? 'checked' : ''}> ${option}
                            </label>`).join('')}
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        const question = questionGroup;
        questionContainer.innerHTML = `
            <div>
                <p>${question.text}</p>
                ${question.options.map((option, index) => `
                    <label>
                        <input type="radio" name="option" value="${index}" ${question.selected === index ? 'checked' : ''}> ${option}
                    </label>`).join('')}
            </div>
        `;
        explanationBtn.onclick = () => showExplanation(question.explanation);
    }
    addOptionListeners();
}

function addOptionListeners() {
    const options = document.querySelectorAll('input[name="option"]');
    options.forEach(option => {
        option.addEventListener('change', (event) => {
            const selectedValue = parseInt(event.target.value);
            const question = sections[currentSectionIndex].questions[currentQuestionIndex];
            if (event.target.type === 'checkbox') {
                if (event.target.checked) {
                    question.selected.push(selectedValue);
                } else {
                    question.selected = question.selected.filter(val => val !== selectedValue);
                }
            } else {
                question.selected = [selectedValue];
            }
        });
    });
}

function showExplanation(explanation) {
    alert(explanation);
}

function startTimer(duration) {
    clearInterval(timerInterval);
    let timeRemaining = duration;
    timerInterval = setInterval(() => {
        timeRemaining -= 10;
        const minutes = Math.floor(timeRemaining / (60 * 1000));
        const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);
        const milliseconds = timeRemaining % 1000;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 100 ? '0' : ''}${milliseconds}`;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            nextSection();
        }
        if (timeRemaining <= 2 * 60 * 1000) {
            timerCircle.classList.add('red');
        }
        timerCircle.style.background = `conic-gradient(blue ${timeRemaining / duration * 100}%, white ${timeRemaining / duration * 100}%)`;
    }, 10);
}

function nextSection() {
    currentSectionIndex++;
    if (currentSectionIndex < sections.length) {
        loadSection(currentSectionIndex);
    } else {
        alert('All sections completed!');
    }
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
}

prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < sections[currentSectionIndex].questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});

finishBtn.addEventListener('click', () => nextSection());

toggleModeBtn.addEventListener('click', toggleMode);

// Initialize the first section
loadSection(currentSectionIndex);
});