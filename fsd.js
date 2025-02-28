const quizQuestions = [
    {
        question: "What is Full Stack Development?",
        options: [
            "Development of both frontend and backend 💻",
            "Only frontend development 🎨",
            "Only backend development 🗄️",
            "Mobile app development 📱"
        ],
        correct: 0
    },
    {
        question: "Which of these is a frontend framework?",
        options: [
            "Node.js ⚙️",
            "MongoDB 🗄️",
            "React.js ⚛️",
            "Express.js 🚂"
        ],
        correct: 2
    },
    {
        question: "What does API stand for?",
        options: [
            "Advanced Programming Interface 💻",
            "Application Programming Interface 🔌",
            "Automated Program Integration 🤖",
            "Advanced Program Integration 🔄"
        ],
        correct: 1
    },
    {
        question: "Which database is NoSQL?",
        options: [
            "MySQL 🎲",
            "PostgreSQL 🐘",
            "Oracle 🏢",
            "MongoDB 🍃"
        ],
        correct: 3
    },
    {
        question: "What is REST?",
        options: [
            "Remote Estate Service Transfer 🏠",
            "Representational State Transfer 🔄",
            "Real Estate Service Time ⏰",
            "Remote Electronic Service Tool 🔧"
        ],
        correct: 1
    },
    {
        question: "Which protocol is used for secure data transfer?",
        options: [
            "HTTP 🌐",
            "FTP 📁",
            "HTTPS 🔒",
            "SMTP 📧"
        ],
        correct: 2
    },
    {
        question: "What is Docker used for?",
        options: [
            "Containerization 📦",
            "Database management 🗄️",
            "Frontend styling 🎨",
            "API testing 🧪"
        ],
        correct: 0
    },
    {
        question: "Which is a version control system?",
        options: [
            "Jenkins 🤖",
            "Git 📝",
            "Docker 🐋",
            "Kubernetes ⚓"
        ],
        correct: 1
    },
    {
        question: "What is middleware?",
        options: [
            "Frontend framework 🎨",
            "Database system 🗄️",
            "Software between client and server 🔄",
            "Programming language 💻"
        ],
        correct: 2
    },
    {
        question: "Which tool is used for CI/CD?",
        options: [
            "Jenkins 🤖",
            "React ⚛️",
            "MongoDB 🍃",
            "Redis 🔴"
        ],
        correct: 0
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
    "What is Full Stack Development?": {
        hint: "Think about the different layers of web development and who handles both sides 💻",
        keywords: ["frontend", "backend", "full", "stack"]
    },
    // Question 2
    "Which of these is a frontend framework?": {
        hint: "Consider the popular JavaScript library with an atomic symbol ⚛️",
        keywords: ["react", "frontend", "ui", "javascript"]
    },
    // Question 3
    "What does API stand for?": {
        hint: "Think about how different software components communicate with each other 🔌",
        keywords: ["application", "programming", "interface", "api"]
    },
    // Question 4
    "Which database is NoSQL?": {
        hint: "Look for the database with the leaf logo that stores documents instead of tables 🍃",
        keywords: ["mongodb", "nosql", "document", "database"]
    },
    // Question 5
    "What is REST?": {
        hint: "Consider the architectural style for distributed systems that uses state transfer 🔄",
        keywords: ["representational", "state", "transfer", "rest"]
    },
    // Question 6
    "Which protocol is used for secure data transfer?": {
        hint: "Think about the protocol that adds a security layer to regular HTTP 🔒",
        keywords: ["https", "secure", "protocol", "encryption"]
    },
    // Question 7
    "What is Docker used for?": {
        hint: "Consider how we package applications with all their dependencies 📦",
        keywords: ["container", "package", "deploy", "docker"]
    },
    // Question 8
    "Which is a version control system?": {
        hint: "Think about the tool that helps track changes in your code 📝",
        keywords: ["git", "version", "control", "track"]
    },
    // Question 9
    "What is middleware?": {
        hint: "Consider the software that acts as a bridge between different components 🌉",
        keywords: ["middle", "between", "bridge", "software"]
    },
    // Question 10
    "Which tool is used for CI/CD?": {
        hint: "Think about the automation server with a butler logo 🤖",
        keywords: ["jenkins", "automation", "pipeline", "ci/cd"]
    }
};

async function getAIResponse(userInput, currentQuestion) {
    const prompt = `
Context: This is a Full Stack Development quiz. Current question: "${currentQuestion.question}"
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
        return "Try breaking down the question and think about what you know about Full Stack Development concepts! 🧠";
    }

    return "Focus on the question and trust your knowledge! You can do this! 🎯";
}

addMessage("👋 Hi! I'm your AI Quiz Assistant. Need help? Just ask me anything!");