const quizQuestions = [
    {
        question: "What is Data Analytics?",
        options: [
            "The process of examining data to find insights 📊",
            "Creating new data 📝",
            "Storing data in databases 💾",
            "Programming websites 🌐"
        ],
        correct: 0
    },
    {
        question: "Which tool is commonly used for Data Analytics?",
        options: [
            "Microsoft Paint 🎨",
            "Excel and PowerBI 📈",
            "Photoshop 🖼️",
            "Media Player 🎵"
        ],
        correct: 1
    },
    {
        question: "What is Business Intelligence (BI)?",
        options: [
            "Artificial Intelligence for business 🤖",
            "Business strategies 📋",
            "Data-driven decision making tools 📊",
            "Company secrets 🤫"
        ],
        correct: 2
    },
    {
        question: "What is A/B Testing?",
        options: [
            "Testing computer hardware 🔧",
            "Comparing two versions to see which performs better 🔄",
            "Basic programming test 💻",
            "Blood type testing 🩺"
        ],
        correct: 1
    },
    {
        question: "What is KPI?",
        options: [
            "Key Performance Indicator 📈",
            "Knowledge Process Integration 🔄",
            "Keyboard Protocol Interface ⌨️",
            "Kinetic Process Information 🔠"
        ],
        correct: 0
    },
    {
        question: "Which chart type is best for showing trends over time?",
        options: [
            "Pie Chart 🥧",
            "Bar Chart 📊",
            "Line Chart 📈",
            "Scatter Plot 📍"
        ],
        correct: 2
    },
    {
        question: "What is Data Segmentation?",
        options: [
            "Dividing data into meaningful groups 🎯",
            "Deleting data segments 🗑️",
            "Creating new data 📝",
            "Converting data types 🔄"
        ],
        correct: 0
    },
    {
        question: "What is ROI in Analytics?",
        options: [
            "Rate Of Information 📊",
            "Return On Investment 💰",
            "Range Of Integration 🔄",
            "Report On Internet 🌐"
        ],
        correct: 1
    },
    {
        question: "What is Cohort Analysis?",
        options: [
            "Analyzing computer codes 💻",
            "Study of genetic cohorts 🧬",
            "Analyzing groups with shared characteristics 👥",
            "Analysis of website colors 🎨"
        ],
        correct: 2
    },
    {
        question: "Which is NOT a type of Analytics?",
        options: [
            "Descriptive Analytics 📊",
            "Predictive Analytics 🔮",
            "Prescriptive Analytics 💡",
            "Restrictive Analytics ⛔"
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

// Chat helpers
const hints = {
    // Question 1
    "What is Data Analytics?": {
        hint: "Think about examining data sets to uncover meaningful patterns and insights 📊",
        keywords: ["examine", "insights", "patterns", "data"]
    },
    // Question 2
    "Which tool is commonly used for Data Analytics?": {
        hint: "Consider popular Microsoft tools used for data visualization and analysis 📈",
        keywords: ["excel", "powerbi", "microsoft", "tools"]
    },
    // Question 3
    "What is Business Intelligence (BI)?": {
        hint: "Think about how data helps businesses make better decisions 💡",
        keywords: ["decision", "business", "data-driven", "tools"]
    },
    // Question 4
    "What is A/B Testing?": {
        hint: "Consider how we compare two versions to find which one performs better 🔄",
        keywords: ["compare", "test", "version", "performance"]
    },
    // Question 5
    "What is KPI?": {
        hint: "Think about metrics that measure success in achieving business objectives 📈",
        keywords: ["measure", "performance", "indicator", "key"]
    },
    // Question 6
    "Which chart type is best for showing trends over time?": {
        hint: "Consider which visualization best shows continuous data changes over time 📈",
        keywords: ["trend", "time", "continuous", "line"]
    },
    // Question 7
    "What is Data Segmentation?": {
        hint: "Think about grouping similar data points together for better analysis 🎯",
        keywords: ["group", "divide", "segment", "categorize"]
    },
    // Question 8
    "What is ROI in Analytics?": {
        hint: "Consider how businesses measure the value gained from their investments 💰",
        keywords: ["return", "investment", "value", "measure"]
    },
    // Question 9
    "What is Cohort Analysis?": {
        hint: "Think about analyzing groups of users who share common characteristics 👥",
        keywords: ["group", "shared", "characteristics", "analysis"]
    },
    // Question 10
    "Which is NOT a type of Analytics?": {
        hint: "Look for the option that doesn't fit with common analytics categories 🤔",
        keywords: ["type", "analytics", "category", "analysis"]
    }
};

async function getAIResponse(userInput, currentQuestion) {
    const prompt = `
Context: This is a Generative AI quiz. Current question: "${currentQuestion.question}"
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
        return "Try breaking down the question and think about what you know about Generative AI concepts! 🧠";
    }

    return "Focus on the question and trust your knowledge! You can do this! 🎯";
}

addMessage("👋 Hi! I'm your AI Quiz Assistant. Need help? Just ask me anything!");