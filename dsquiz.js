const quizQuestions = [
    {
        question: "What is Data Science?",
        options: [
            "The study of computer hardware 💻",
            "The art of extracting insights from data 📊",
            "A type of database software 💾",
            "A programming language 👨‍💻"
        ],
        correct: 1
    },
    {
        question: "Which of these is a popular Data Science library in Python?",
        options: [
            "React.js 🌐",
            "jQuery 📱",
            "Pandas 🐼",
            "Angular 🅰️"
        ],
        correct: 2
    },
    {
        question: "What is Data Visualization?",
        options: [
            "Writing code 👨‍💻",
            "Creating databases 💾",
            "Making data readable through graphs and charts 📈",
            "Testing software 🧪"
        ],
        correct: 2
    },
    {
        question: "What does EDA stand for in Data Science?",
        options: [
            "Extra Data Analysis 📝",
            "Exploratory Data Analysis 🔍",
            "Extended Database Application 💽",
            "Electronic Data Assembly 🔌"
        ],
        correct: 1
    },
    {
        question: "Which tool is commonly used for Big Data processing?",
        options: [
            "Apache Hadoop 🐘",
            "Microsoft Word 📝",
            "Paint 🎨",
            "Calculator 🔢"
        ],
        correct: 0
    },
    {
        question: "What is a Data Warehouse?",
        options: [
            "A physical storage room 🏢",
            "A type of computer 💻",
            "A centralized repository for data 📦",
            "A cloud service provider ☁️"
        ],
        correct: 2
    },
    {
        question: "What is Data Mining?",
        options: [
            "Extracting patterns from data 🔍",
            "Creating new data 📝",
            "Deleting old data 🗑️",
            "Copying data 📋"
        ],
        correct: 0
    },
    {
        question: "Which of these is NOT a type of Data Analysis?",
        options: [
            "Predictive Analysis 🔮",
            "Descriptive Analysis 📊",
            "Suspicious Analysis 🕵️",
            "Prescriptive Analysis 💡"
        ],
        correct: 2
    },
    {
        question: "What is Data Cleaning?",
        options: [
            "Deleting all data 🗑️",
            "Organizing files 📁",
            "Removing errors and inconsistencies 🧹",
            "Backing up data 💾"
        ],
        correct: 2
    },
    {
        question: "What tool is commonly used for Data Visualization?",
        options: [
            "Tableau 📊",
            "Notepad 📝",
            "Calculator 🔢",
            "File Explorer 📁"
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
    
    // Save progress to localStorage
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
    "What is Data Science?": {
        hint: "Think about extracting meaningful insights from data using various techniques 📊",
        keywords: ["insights", "data", "analysis", "extract"]
    },
    // Question 2
    "Which of these is a popular Data Science library in Python?": {
        hint: "Consider the library named after a black and white bear that's great for data manipulation 🐼",
        keywords: ["pandas", "python", "library", "data"]
    },
    // Question 3
    "What is Data Visualization?": {
        hint: "Think about how we make data easier to understand through visual representations 📈",
        keywords: ["visual", "graphs", "charts", "represent"]
    },
    // Question 4
    "What does EDA stand for in Data Science?": {
        hint: "Consider the initial phase where we investigate and understand our data 🔍",
        keywords: ["exploratory", "analysis", "investigate", "understand"]
    },
    // Question 5
    "Which tool is commonly used for Big Data processing?": {
        hint: "Think about Apache's elephant-logoed framework for distributed computing 🐘",
        keywords: ["hadoop", "apache", "big data", "processing"]
    },
    // Question 6
    "What is a Data Warehouse?": {
        hint: "Consider where organizations store their historical data for analysis 📦",
        keywords: ["storage", "repository", "historical", "data"]
    },
    // Question 7
    "What is Data Mining?": {
        hint: "Think about discovering patterns and relationships within large datasets 🔍",
        keywords: ["patterns", "discover", "extract", "relationships"]
    },
    // Question 8
    "Which of these is NOT a type of Data Analysis?": {
        hint: "Look for the option that sounds more like detective work than data analysis 🕵️",
        keywords: ["suspicious", "unusual", "fake", "incorrect"]
    },
    // Question 9
    "What is Data Cleaning?": {
        hint: "Consider how we prepare data by fixing errors and inconsistencies 🧹",
        keywords: ["clean", "fix", "prepare", "errors"]
    },
    // Question 10
    "What tool is commonly used for Data Visualization?": {
        hint: "Think about the popular tool that helps create interactive dashboards 📊",
        keywords: ["tableau", "visualize", "dashboard", "charts"]
    }
};

async function getAIResponse(userInput, currentQuestion) {
    const prompt = `
Context: This is a Data Science quiz. Current question: "${currentQuestion.question}"
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
        return "Try breaking down the question and think about what you know about Data Science concepts! 🧠";
    }

    return "Focus on the question and trust your knowledge! You can do this! 🎯";
}

addMessage("👋 Hi! I'm your AI Quiz Assistant. Need help? Just ask me anything!");