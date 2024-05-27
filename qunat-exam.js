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
        title: 'Quantitative Reasoning - Comparision',
        time: 15 * 60 * 1000, // 15 minutes in milliseconds
        questions: [
            {
                text: 'Compare the value of xx and yy. x=100x=100 y=10y=10',
                options: ['x>y x>y', 'x<y x<y', 'x=y x=y', 'The relationship cannot be determined from the information given'],
                correct: [3], // The index of the correct option
                explanation: '100=10100=10, so x=10x=10 which is equal to yy.',
                selected: null
            },
            {
                text: 'Compare the value of xx and yy. x=53x=35 y=1.6y=1.6',
                options: ['x>yx>y', 'x<yx<y', 'The relationship cannot be determined from the information given', ' x=yx=y'],
                correct: [2],
                explanation: '53≈1.6735≈1.67, which is less than y=1.6y=1.6.',
                selected: null
            },
            {
                text: 'What is the value of 13+16+11231+61+121?',
                options: [' 1221', '2332', '3443', 'reiterated'],
                correct: [1], // The index of the correct option
                explanation: '5665',
                selected: null
            },
            {
                text: 'If a rectangle has a length of 8 units and a width of 5 units, what is its area? ',
                options: [' 13 square units', '40 square units', '35 square units', '24 square units'],
                correct: [2],
                explanation: ' The area of a rectangle is calculated by multiplying its length by its width. So, Area=8×5=40Area=8×5=40 square units [4].',
                selected: null
            },
            {
                text: 'What is the perimeter of a square with a side length of 6 units?',
                options: [' 12 units', ' 24 units', ' 36 units', '48 units'],
                correct: [1],
                explanation: 'The perimeter of a square is calculated by multiplying the length of one side by 4. So,Perimeter=6×4=24Perimeter=6×4=24 units [4].',
                selected: null
            }
        ],
        answered: 5
    },
    {
        title: 'Quantitative Reasoning - Numeric Entry',
        time: 15 * 60 * 1000, // 15 minutes in milliseconds
        questions: [
            {
                text: 'What is the value of (34+52)÷4(34+52)÷4?',
                options: [' 13.5', '16', '17', ' 18',],
                correct: [0],
                explanation: '(34+52)÷4=(81+25)÷4=106÷4=26.5(34+52)÷4=(81+25)÷4=106÷4=26.5',
                selected: null
            },
            {
                text: ' The sum of three consecutive even numbers is 126. What is the largest of these numbers?',
                options: ['42', '44', '46', '48'],
                correct: [1],
                explanation: 'Let the smallest even number be xx. Then, the three consecutive even numbers are xx,x+2x+2, and x+4x+4. So, x+(x+2)+(x+4)=126x+(x+2)+(x+4)=126. Solving, we get x=42x=42, so the largest number is x+4=46x+4=46',
                selected: null
            },
            {
                text: 'If 3x-7=113x-7=11, what is the value of xx?',
                options: ['6','7','8','9'],
                correct: [1],
                explanation: '3x-7=113x-7=11 implies 3x=11+7=183x=11+7=18 implies x=183=6x=318=6 ',
                selected: null
            },
            {
                text: 'If a+2b=10a+2b=10 and 3a-b=43a-b=4, what is the value of aa?',
                options: ['2','3','4','5'],
                correct: [1],
                explanation: 'Solving the given equations simultaneously, we find a=2a=2',
                selected: null
            },
            {
                text: 'The length of a rectangle is 33 more than twice its width. If the perimeter of the rectangle is 5454, what is its length?',
                options: ['15','18','21','24'],
                correct: [1],
                explanation: 'Let the width be ww. Then, the length is 2u+32w+3. So, 2(2w+3)+2w=542(2w+3)+2w=54. Solving, we get w=9w=9 and length =2(9)+3=21=2(9)+3=21',
                selected: null
            }
        ],
        answered: 5
    },
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