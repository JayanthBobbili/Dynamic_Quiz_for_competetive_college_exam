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
        title: 'OS-examination',
        time: 15 * 60 * 1000, // 15 minutes in milliseconds
        questions: [
            {
                text: 'Which of the following is a type of operating system?',
                options: ['Batch Operating System', 'Time-Travel Operating System', 'Sequential Operating System', 'Quantum Operating System'],
                correct: [2], // The index of the correct option
                explanation: ' Batch Operating System is a type of operating system where jobs are batched together and processed sequentially.',
                selected: null
            },
            {
                text: 'What is the main function of the kernel in an operating system?',
                options: ['Manage the system’s hardware resources', 'Provide a graphical user interface', ' Store user data securely', 'Execute user applications'],
                correct: [1],
                explanation: ' The kernel is the core component of an operating system that manages hardware resources such as CPU, memory, and I/O devices.',
                selected: null
            },
            {
                text: 'In a multiprogramming environment, what does the term ‘context switching’ refer to?',
                options: ['Switching the user interface', 'Switching between different I/O devices', 'Switching the CPU from one process to another', ' Switching from one operating system to another'],
                correct: [3], // The index of the correct option
                explanation: 'Context switching is the process of storing the state of a process so that it can be resumed from the same point at a later time, allowing the CPU to switch from one process to another.',
                selected: null
            },
            {
                text: 'Which of the following is a deadlock prevention technique?',
                options: ['Resource allocation graph', 'Wait-for graph', 'Hold and wait', 'Circular wait'],
                correct: [1],
                explanation: '  Circular wait is a necessary condition for deadlock. Preventing circular wait by imposing an ordering on resource acquisition can prevent deadlock.',
                selected: null
            },
            {
                text: 'In UNIX, which command is used to change the access permissions of a file?',
                options: ['chmod', 'chperm', 'setperm', ' permchange'],
                correct: [1],
                explanation: 'The `chmod` command in UNIX is used to change the access permissions of files and directories',
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