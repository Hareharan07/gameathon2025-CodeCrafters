const quizQuestions = [
    //question 1
    {
        question: "What is Machine Learning?",
        options: [
            "A type of computer game 🎮",
            "The ability of computers to learn without explicit programming 🤖",
            "A new programming language 💻",
            "A type of computer hardware 🔧"
        ],
        correct: 1
    },
    //question 2
    {
        question: "Which of the following is a type of Machine Learning?",
        options: [
            "Supervised Learning 🎯",
            "Unmonitored Learning 🚫",
            "Self-Taught Learning 📚",
            "Automated Computing ⚙️"
        ],
        correct: 1
    },
    //question 3
    {
        question: "What is the goal of Machine Learning?",
        options: [
            "To build intelligent systems 🧠",
            "To build accurate models of the world 🌍",
            "To predict future events 🚀",
            "All of the above ✅"
        ],
        correct: 2  
    },
    //question 4
    {
        question: "Which of the following is NOT a Machine Learning technique?",
        options: [
            "Linear Regression ➖",
            "Data Mining ⛏️",
            "Decision Trees 🌲",
            "Neural Networks 🧠"
        ],
        correct: 1
    },
    //question 5
    {
        question: "What is the most popular programming language for Machine Learning?",
        options: [
            "Java ☕",
            "Python 🐍",
            "C++ 🐱‍👤",
            "JavaScript 🟨"
        ],
        correct: 1
    },
    //question 6
    {
        question: "Which of the following is a Machine Learning library?",
        options: [
            "TensorFlow 🤖",
            "React ⚛️",
            "Django 🐍",
            "Express 🚂"
        ],
        correct: 0
    },
    //question 7
    {
        question: "What is the name of the process of teaching a Machine Learning model?",
        options: [
            "Learning 📚",
            "Training 🏋️",
            "Educating 🎓",
            "Teaching 🍎"
        ],
        correct: 1
    },
    //question 8
    {
        question: "Which of the following is a Machine Learning model?",
        options: [
            "Linear Equation ➖",
            "Decision Tree 🌲",
            "For Loop 🔁",
            "If Statement ❓"
        ],
        correct: 1
    },
    //question 9
    {
        question: "What is the name of the process of testing a Machine Learning model?",
        options: [
            "Testing 📝",
            "Validating ✔️",
            "Evaluating 📊",
            "Predicting 🎯"
        ],
        correct: 2
    },
    //question 10
    {
        question: "Which of the following is NOT a type of Machine Learning?",
        options: [
            "Reinforcement Learning 🏆",
            "Deep Learning 🧠",
            "Machine Vision 👁️",
            "Machine Thinking 🤔"
        ],
        correct: 3
    }
];

let currentQuestion = 0;
let score = 0;

function showQuestion() {
    const quizContent = document.getElementById('quizContent');
    const question = quizQuestions[currentQuestion];

    const questionHTML = `
        <div class="question">
            <h3>${question.question}</h3>
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="option" onclick="checkAnswer(${index})">
                        ${option}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    quizContent.innerHTML = questionHTML;
    updateProgress();
}

function checkAnswer(selectedIndex) {
    const options = document.querySelectorAll('.option');
    const correct = quizQuestions[currentQuestion].correct;
    const character = document.getElementById('quizCharacter');

    options.forEach(option => option.style.pointerEvents = 'none');

    if (selectedIndex === correct) {
        options[selectedIndex].classList.add('correct');
        score++;
        updateScore();
        createConfetti();
        character.classList.remove('sad');
        character.classList.add('happy');
        setTimeout(() => character.classList.remove('happy'), 2000);
    } else {
        options[selectedIndex].classList.add('wrong');
        options[correct].classList.add('correct');
        
        character.classList.remove('happy');
        character.classList.add('sad');
        setTimeout(() => character.classList.remove('sad'), 2000);
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            showQuestion();
        } else {
            showFinalScore();
        }
    }, 1500);
}

function createConfetti() {
    const celebration = document.getElementById('celebration');
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animation = `confettiFall ${Math.random() * 2 + 1}s linear`;
        celebration.appendChild(confetti);

        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
}

function updateProgress() {
    const progress = (currentQuestion / quizQuestions.length) * 100;
    document.querySelector('.progress-bar').style.width = `${progress}%`;
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function showFinalScore() {
    const quizContent = document.getElementById('quizContent');
    const percentage = (score / quizQuestions.length) * 100;
    const courseTitle = document.querySelector('.quiz-header h2').textContent.replace(' Adventure', '');
    const myCourses = JSON.parse(localStorage.getItem('myCourses')) || [];
    const courseIndex = myCourses.findIndex(course => course.title === courseTitle);
    
    if (courseIndex !== -1) {
        myCourses[courseIndex].progress = percentage;
        localStorage.setItem('myCourses', JSON.stringify(myCourses));
    }

    quizContent.innerHTML = `
        <div class="question">
            <h3>Quiz Complete! 🎉</h3>
            <p>You scored ${score} out of ${quizQuestions.length} (${percentage}%)</p>
            <button onclick="restartQuiz()" class="restart-btn">Try Again</button>
            <a href="mylearning.html" class="back-btn">Back to My Learning</a>
        </div>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    updateScore();
    showQuestion();
}

showQuestion();

//chat bot

const GEMINI_API_KEY = 'AIzaSyBuOOCJ15OKD-Qb7CxaY3r-ZrgEkQz6kCM';
const chatToggle = document.getElementById('chatToggle');
const chatContainer = document.getElementById('chatContainer');
const closeChat = document.getElementById('closeChat');
const chatForm = document.getElementById('chatForm');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');

chatToggle.addEventListener('click', () => {
    console.log('Chat toggle clicked'); 
    chatContainer.style.display = 'flex';
    chatToggle.style.display = 'none';
});

console.log('Chat elements:', {
    chatToggle: chatToggle,
    chatContainer: chatContainer,
    closeChat: closeChat
});

closeChat.addEventListener('click', () => {
    chatContainer.style.display = 'none';
    chatToggle.style.display = 'flex';
});

const hints = {
    // Question 1
    "What is Machine Learning?": {
        hint: "Think about computers learning and improving from experience, without being explicitly programmed 🤖",
        keywords: ["automated", "learn", "improve", "experience"]
    },
    // Question 2
    "Which of the following is a type of Machine Learning?": {
        hint: "In this type of learning, the model learns from labeled training data 🎯",
        keywords: ["supervised", "labeled", "training"]
    },
    // Question 3
    "What is the goal of Machine Learning?": {
        hint: "Consider all the ways ML can help: making systems smarter, understanding patterns, and looking into the future 🎯",
        keywords: ["predict", "intelligent", "model"]
    },
    // Question 4
    "Which of the following is NOT a Machine Learning technique?": {
        hint: "Look for the option that's more about extracting information rather than learning from data 🔍",
        keywords: ["mining", "extraction", "data"]
    },
    // Question 5
    "What is the most popular programming language for Machine Learning?": {
        hint: "This language is known for its simplicity and rich ML libraries like TensorFlow and PyTorch 🐍",
        keywords: ["python", "programming", "language"]
    },
    // Question 6
    "Which of the following is a Machine Learning library?": {
        hint: "Google developed this powerful framework for deep learning and neural networks 🤖",
        keywords: ["tensorflow", "framework", "library"]
    },
    // Question 7
    "What is the name of the process of teaching a Machine Learning model?": {
        hint: "Just like athletes improve through this process, ML models get better this way too 🏋️",
        keywords: ["training", "teaching", "learning"]
    },
    // Question 8
    "Which of the following is a Machine Learning model?": {
        hint: "This model makes decisions by splitting data into branches, like a flowchart 🌲",
        keywords: ["decision", "tree", "model"]
    },
    // Question 9
    "What is the name of the process of testing a Machine Learning model?": {
        hint: "We need to measure how well the model performs and assess its accuracy 📊",
        keywords: ["evaluate", "assess", "measure"]
    },
    // Question 10
    "Which of the following is NOT a type of Machine Learning?": {
        hint: "Look for the option that sounds like human cognitive processes rather than established ML techniques 🤔",
        keywords: ["thinking", "cognitive", "human"]
    }
};

async function getAIResponse(userInput, currentQuestion) {
    const prompt = `
Context: This is a Machine Learning quiz. Current question: "${currentQuestion.question}"
User message: "${userInput}"
You are a helpful quiz assistant. Provide a hint or guidance without giving away the answer.
Keep responses short and encouraging.
`;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', errorText);
            return generateFallbackResponse(userInput, currentQuestion);
        }

        const result = await response.json();
        console.log('Gemini Response:', result); 

        if (result.candidates && result.candidates[0]?.content?.parts?.[0]?.text) {
            return result.candidates[0].content.parts[0].text;
        } else {
            return generateFallbackResponse(userInput, currentQuestion);
        }
    } catch (error) {
        console.error('Gemini API Error:', error);
        return generateFallbackResponse(userInput, currentQuestion);
    }
}

function logApiError(error) {
    console.error('API Error Details:', {
        message: error.message,
        status: error.status,
        code: error.code,
        details: error.details
    });
}

function addMessage(text, isUser = false) {
    const message = document.createElement('div');
    message.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addTypingIndicator() {
    const typing = document.createElement('div');
    typing.className = 'message bot-message typing';
    typing.id = 'typingIndicator';
    typing.innerHTML = '<span>.</span><span>.</span><span>.</span>';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, true);
    userInput.value = '';
    addTypingIndicator();

    try {
        const aiResponse = await getAIResponse(text, quizQuestions[currentQuestion]);
        removeTypingIndicator();
        addMessage(aiResponse);
    } catch (error) {
        logApiError(error);
        removeTypingIndicator();
        const fallbackResponse = generateFallbackResponse(text, quizQuestions[currentQuestion]);
        addMessage(fallbackResponse);
    }
});

function generateFallbackResponse(userInput, currentQuestion) {
    const input = userInput.toLowerCase();
    const questionText = currentQuestion.question;
    if (hints[questionText]) {
        if (input.includes('hint') || input.includes('help')) {
            return hints[questionText].hint;
        }
        
        const keywords = hints[questionText].keywords;
        for (let keyword of keywords) {
            if (input.includes(keyword.toLowerCase())) {
                return hints[questionText].hint;
            }
        }
    }

    if (input.includes('score') || input.includes('progress')) {
        return `You've answered ${score} questions correctly out of ${currentQuestion + 1} so far! 📊`;
    }

    if (input.includes('difficult') || input.includes('hard')) {
        return "Don't worry! Take your time and think it through. You've got this! 💪";
    }

    if (input.includes('explain') || input.includes('understand')) {
        return "Try breaking down the question and think about what you know about Machine Learning concepts! 🧠";
    }

    return "Focus on the question and trust your knowledge! You can do this! 🎯";
}

addMessage("👋 Hi! I'm your AI Quiz Assistant. Need help? Just ask me anything!");