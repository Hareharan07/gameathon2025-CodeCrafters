const quizQuestions = [
    {
        question: "What is Generative AI?",
        options: [
            "AI that creates new content 🎨",
            "AI that only analyzes data 📊",
            "AI that plays games 🎮",
            "AI that controls robots 🤖"
        ],
        correct: 0
    },
    {
        question: "Which is a popular Generative AI model?",
        options: [
            "Windows 11 🪟",
            "ChatGPT 🤖",
            "Microsoft Office 📑",
            "Google Chrome 🌐"
        ],
        correct: 1
    },
    {
        question: "What can Generative AI create?",
        options: [
            "Only text 📝",
            "Only images 🖼️",
            "All of the above plus more 🎨",
            "Only computer code 💻"
        ],
        correct: 2
    },
    {
        question: "What is a prompt in Generative AI?",
        options: [
            "A computer error ❌",
            "Instructions given to the AI 💭",
            "A type of AI model 🤖",
            "A programming language 💻"
        ],
        correct: 1
    },
    {
        question: "What is 'hallucination' in Generative AI?",
        options: [
            "AI generating false information 🎭",
            "AI dreaming 💭",
            "AI playing games 🎮",
            "AI sleeping 😴"
        ],
        correct: 0
    },
    {
        question: "Which field does NOT use Generative AI?",
        options: [
            "Art Creation 🎨",
            "Music Composition 🎵",
            "Time Travel ⌛",
            "Story Writing 📚"
        ],
        correct: 2
    },
    {
        question: "What is 'tokenization' in Generative AI?",
        options: [
            "Breaking text into smaller pieces 📝",
            "Creating cryptocurrencies 💰",
            "Generating images 🖼️",
            "Programming robots 🤖"
        ],
        correct: 0
    },
    {
        question: "What are 'parameters' in AI models?",
        options: [
            "Computer viruses 🦠",
            "AI's learning patterns 🧠",
            "Internet connections 🌐",
            "Social media posts 📱"
        ],
        correct: 1
    },
    {
        question: "What is 'fine-tuning' in AI?",
        options: [
            "Playing music 🎵",
            "Fixing computers 🔧",
            "Adapting AI for specific tasks 🎯",
            "Creating websites 🌐"
        ],
        correct: 2
    },
    {
        question: "Which company created GPT?",
        options: [
            "OpenAI 🤖",
            "Google 🔍",
            "Microsoft 🪟",
            "Apple 🍎"
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
    "What is Generative AI?": {
        hint: "Think about AI systems that can create new content rather than just analyze existing data 🎨",
        keywords: ["create", "generate", "content", "new"]
    },
    // Question 2
    "Which is a popular Generative AI model?": {
        hint: "Consider OpenAI's conversational AI model that's been making headlines 🤖",
        keywords: ["chat", "gpt", "openai", "model"]
    },
    // Question 3
    "What can Generative AI create?": {
        hint: "Think about all the different types of content AI can generate - from words to pictures and more 🎭",
        keywords: ["text", "images", "content", "create"]
    },
    // Question 4
    "What is a prompt in Generative AI?": {
        hint: "Consider how users communicate their requirements to the AI system 💭",
        keywords: ["instruction", "input", "command", "request"]
    },
    // Question 5
    "What is 'hallucination' in Generative AI?": {
        hint: "Think about when AI creates content that seems plausible but isn't factually correct 🎭",
        keywords: ["false", "incorrect", "fabricate", "wrong"]
    },
    // Question 6
    "Which field does NOT use Generative AI?": {
        hint: "Look for the option that's scientifically impossible rather than an AI application 🤔",
        keywords: ["impossible", "unrealistic", "fake", "sci-fi"]
    },
    // Question 7
    "What is 'tokenization' in Generative AI?": {
        hint: "Consider how AI breaks down text into smaller, manageable pieces 📝",
        keywords: ["split", "divide", "chunk", "process"]
    },
    // Question 8
    "What are 'parameters' in AI models?": {
        hint: "Think about the learning patterns and knowledge stored in the AI model 🧠",
        keywords: ["learning", "patterns", "weights", "knowledge"]
    },
    // Question 9
    "What is 'fine-tuning' in AI?": {
        hint: "Consider how we can customize an AI model for specific tasks or domains 🎯",
        keywords: ["customize", "adapt", "specific", "train"]
    },
    // Question 10
    "Which company created GPT?": {
        hint: "Think about the AI research company that developed ChatGPT and DALL-E 🤖",
        keywords: ["openai", "company", "developer", "creator"]
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