// Create floating hearts background
function createFloatingHearts() {
    const heartBg = document.getElementById('heartBg');
    const hearts = ['💕', '💖', '💗', '💝', '💘', '❤️'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heartBg.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 300);
}

createFloatingHearts();

let currentQuestion = 1;
let selectedAnswers = {};

const wrongMessages = {
    1: "Tu iske baad mil moti! 😤",
    2: "Call kyu nahi uthati moti! 📱😠",
    3: "Dekh raha hu pyaar kam ho rha hai! 💔",
    4: "Phone kyu ni uthati moti! 📞😤",
    5: "Dekh raha hu pyaar kam ho rha hai! 😔💔"
};

function selectOption(element, questionNum, isCorrect) {
    const options = element.parentElement.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    element.classList.add('selected');
    
    if (isCorrect) {
        selectedAnswers[questionNum] = true;
        document.getElementById('next' + questionNum).disabled = false;
    } else {
        showWrongPopup(questionNum);
        setTimeout(() => {
            element.classList.remove('selected');
        }, 500);
    }
}

function checkRechargeAnswer() {
    const answer = document.getElementById('rechargeAnswer').value.trim();
    if (answer.length > 0) {
        selectedAnswers[2] = true;
        document.getElementById('next2').disabled = false;
        setTimeout(() => {
            showWrongPopup(2);
        }, 500);
    }
}

function showWrongPopup(questionNum) {
    const wrongPopup = document.getElementById('wrongPopup');
    const wrongMessage = document.getElementById('wrongMessage');
    const wrongTitle = document.getElementById('wrongTitle');
    
    if (questionNum === 2) {
        wrongTitle.textContent = "📱 Arre!";
    } else {
        wrongTitle.textContent = "😤 Wrong Answer!";
    }
    
    wrongMessage.textContent = wrongMessages[questionNum];
    wrongPopup.classList.add('show');
}

function closeWrongPopup() {
    document.getElementById('wrongPopup').classList.remove('show');
}

function nextQuestion(nextQ) {
    const current = document.getElementById('q' + currentQuestion);
    const next = document.getElementById('q' + nextQ);
    
    current.classList.add('hidden');
    next.classList.remove('hidden');
    currentQuestion = nextQ;
    
    const progress = (nextQ / 5) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function showFinalPopup() {
    document.getElementById('popupOverlay').classList.add('show');
    createConfetti();
}

function moveNoButton(event) {
    event.preventDefault();
    const noBtn = document.getElementById('noBtn');
    const popup = noBtn.closest('.popup');
    
    const maxX = 300;
    const maxY = 100;
    
    const randomX = Math.random() * maxX - maxX/2;
    const randomY = Math.random() * maxY - maxY/2;
    
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    noBtn.style.animation = 'none';
    setTimeout(() => {
        noBtn.style.animation = '';
    }, 10);
}

function handleYes() {
    document.getElementById('questionSection').style.display = 'none';
    document.getElementById('celebration').classList.add('show');
    createMassiveConfetti();
}

function createConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff6b6b', '#ffd700', '#00ff00', '#ff69b4'];
    const popup = document.querySelector('.popup');
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            popup.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

function createMassiveConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff6b6b', '#ffd700', '#00ff00', '#ff69b4', '#ff00ff'];
    const popup = document.querySelector('.popup');
    
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() + 's';
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            popup.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 20);
    }
}
