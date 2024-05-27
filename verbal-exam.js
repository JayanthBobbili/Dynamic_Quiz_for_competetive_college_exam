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
        title: 'Verbal Reasoning - Text Completion',
        time: 15 * 60 * 1000, // 15 minutes in milliseconds
        questions: [
            {
                text: 'The CEOs latest speech on the company prospects was so _____ that it left the audience feeling reassured and optimistic about the future.',
                options: ['ambiguous', 'inspirational', 'tedious', 'apathetic'],
                correct: [1], // The index of the correct option
                explanation: 'The word "inspirational" fits best as it means the speech left the audience feeling reassured and optimistic.',
                selected: null
            },
            {
                text: 'Despite the complexity of the subject, the professors explanation was so _____ that even the least prepared students could understand the concept.',
                options: ['convoluted', 'opaque', 'lucid', 'obtuse'],
                correct: [2],
                explanation: '"Lucid" means clear and easy to understand, which fits the context of the professors explanation.',
                selected: null
            },
            {
                text: 'The scientists groundbreaking discovery _____ the traditional theories that had been accepted for decades.',
                options: ['corroborated', 'refuted', 'elucidated', 'reiterated'],
                correct: [1], // The index of the correct option
                explanation: ' "Refuted" means disproved or challenged, which matches the context of the discovery challenging traditional theories.',
                selected: null
            },
            {
                text: 'The athletes performance was so _____ that it set a new standard for excellence in the sport. ',
                options: ['medicore', 'lackluster', 'exemplary', 'subpar'],
                correct: [2],
                explanation: ' "Exemplary" means serving as a desirable model, which fits the context of setting a new standard. ',
                selected: null
            },
            {
                text: 'The novels protagonist is portrayed as a _____ individual, constantly questioning societal norms and conventions. ',
                options: ['conformist', 'rebellious', 'complacent', 'indifferent'],
                correct: [1],
                explanation: '  "Rebellious" fits the context of questioning societal norms and conventions. ',
                selected: null
            }
        ],
        answered: 5
    },
    {
        title: 'Verbal Reasoning - Sentence Equivalence',
        time: 15 * 60 * 1000, // 15 minutes in milliseconds
        questions: [
            {
                text: 'Although he was generally considered an attractive candidate, his stance on certain issues was so  ________ that he alienated much of his constituency. ',
                options: ['controversial', 'ambiguous', 'clear', 'vacillating', 'polarizing', 'decisive'],
                correct: [0],
                explanation: 'Both "controversial" and "polarizing" fit the context as they describe a stance that can cause  division and alienation among people. ',
                selected: null
            },
            {
                text: 'The scientist was celebrated for her ________ approach, which enabled her to make groundbreaking discoveries that others had overlooked. ',
                options: ['meticulous', 'innovative', 'methodical', 'erratic', 'revolutionary', 'unorthodox'],
                correct: [1],
                explanation: 'Both "innovative" and "revolutionary" describe an approach that leads to new and groundbreaking  discoveries. ',
                selected: null
            },
            {
                text: 'The teachers lecture was so ________ that most of the students struggled to stay awake.  ',
                options: ['engaging', 'tedious', 'monotonous', 'inspiring', 'soporific', 'enlightening'],
                correct: [1],
                explanation: '  Both "tedious" and "soporific" describe a lecture that could make students struggle to stay awake due to boredom or sleepiness. ',
                selected: null
            },
            {
                text: 'Despite the managers ________ attempts to improve morale, the staff remained indifferent and unmotivated.',
                options: ['sincere', 'halfhearted', 'enthusiastic', 'perfunctory', 'genuine', 'diligent'],
                correct: [1],
                explanation: 'Both "halfhearted" and "perfunctory" describe attempts that lack genuine effort, leading to poor results in improving morale.',
                selected: null
            },
            {
                text: 'Her novel was praised not only for its gripping plot but also for its ________ language.',
                options: ['banal', 'florid', 'prosaic', 'vivid', 'lush', 'pedestrian'],
                correct: [1],
                explanation: 'Both "florid" and "lush" describe language that is richly elaborate and vivid, contributing to the praise of the novel. ',
                selected: null
            }
        ],
        answered: 5
    },
    {
        title: 'Verbal Reasoning - Reading Comprehension',
        time: 10 * 60 * 1000, // 10 minutes in milliseconds
        questions: [
            {
                text: 'Passage: The Industrial Revolution, which took place from the 18th to 19th centuries, was a period during which predominantly agrarian, rural societies in Europe and America became industrial and urban. Prior to the   Industrial Revolution, which began in Britain in the late 1700s, manufacturing was often done in peoples homes,   using hand tools or basic machines. Industrialization marked a shift to powered, special-purpose machinery,   factories, and mass production. The iron and textile industries, along with the development of the steam engine,  played central roles in the Industrial Revolution, which also saw improved systems of transportation,  communication, and banking. While industrialization brought about an increased volume and variety of  manufactured goods and an improved standard of living for some, it also resulted in often-grim employment and living conditions for the poor and working classes.',
                questions: [
                    {
                        text: ' According to the passage, what was one significant effect of the Industrial Revolution on society?',
                        options: [' A decrease in the number of people working in agriculture ', 'The end of mass production', ' A reduction in the use of steam engines', ' Improved conditions for all classes'],
                        correct: [0],
                        explanation: 'The passage states that the Industrial Revolution transformed agrarian, rural societies into  industrial and urban ones, implying a decrease in the number of people working in agriculture.',
                        selected: null
                    },
                    {
                        text: ' What role did the steam engine play during the Industrial Revolution? ',
                        options: ['It was primarily used in agriculture.', 'It was central to the iron and textile industries.', 'It led to the decline of transportation systems.', ' It reduced the need for communication systems.'],
                        correct: [1],
                        explanation: ' The passage mentions that the steam engine, along with the iron and textile industries, played central roles in the Industrial Revolution.',
                        selected: null
                    },
                    {
                        text: ' What is the primary focus of the passage?',
                        options: ['The decline of rural societies', ' The invention of hand tools', ' The benefits and drawbacks of the Industrial Revolution', ' The development of the steam engine'],
                        correct: [2],
                        explanation: 'The passage discusses both the positive effects, such as improved standard of living and increased production, and the negative effects, such as grim living conditions for the working class, of the Industrial Revolution.',
                        selected: null
                    },
                    {
                        text: 'Which of the following was NOT a development during the Industrial Revolution as mentioned in the passage? ',
                        options: ['Improvement in communication systems', 'Use of hand tools in manufacturing', ' Improvement in transportation systems', ' Development of banking systems'],
                        correct: [1],
                        explanation: 'The passage mentions that before the Industrial Revolution, manufacturing was done using hand tools, but during the Industrial Revolution, there was a shift to powered, special-purpose machinery. ',
                        selected: null
                    },
                    {
                        text: ' The word "grim" in the passage most nearly means: ',
                        options: ['Bright', 'Cheerful', 'Severe', 'Pleasant'],
                        correct: [2],
                        explanation: 'The context of the passage suggests that "grim" is used to describe the harsh and severe employment and living conditions experienced by the poor and working classes during the Industrial Revolution. ',
                        selected: null
                    }
                ],
            },
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