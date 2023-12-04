const term = document.querySelector('.term');
const definition = document.querySelector('.definition');
const checkButton = document.querySelector('.check');
const nextButton = document.querySelector('.next');
const termInput = document.getElementById('termInput');
const definitionInput = document.getElementById('definitionInput');
const addButton = document.querySelector('.add');
const definitionText = document.getElementById('definitionText');
const card = document.querySelector('.card');

let words = JSON.parse(localStorage.getItem('flashcards')) || {
    Hello: "こんにちは",
    Goodbye: "さようなら",
    "I enjoy playing football": "私はサッカーをするのが楽しいです",
    "Define time dilation": "a physical phenomenon in which time moves differently for different observers in the same inertial frame", 
    "Formula for the circumference of a circle": "2*pi*r"
};

let data = Object.entries(words);

function getRandomWord() {
    randomTerm = data[Math.floor(Math.random() * data.length)];
    term.innerHTML = `<h3>${randomTerm[0]}</h3>`;
    definitionText.innerHTML = `<h3>${randomTerm[1]}</h3>`;
    definition.style.opacity = '0';
    card.classList.remove('show');
}

function checkDefinition() {
    definition.style.opacity = '1';
    card.classList.add('show');
}

nextButton.addEventListener('click', function () {
    getRandomWord();
    checkDefinition(); 
});

checkButton.addEventListener('click', function () {
    checkDefinition();
});

function addWord() {
    const newTerm = termInput.value.trim();
    const newDefinition = definitionInput.value.trim();

    if (newTerm && newDefinition) {
        words[newTerm] = newDefinition;
        data = Object.entries(words);
        termInput.value = '';
        definitionInput.value = '';
        saveFlashcardsToLocalStorage();
        getRandomWord();
        displayMessage('success', 'Flashcard added successfully!');
    } else {
        displayMessage('error', 'Please enter both term and definition.');
    }
}

function saveFlashcardsToLocalStorage() {
    localStorage.setItem('flashcards', JSON.stringify(words));
}

function displayMessage(type, message) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.innerText = message;

    
    const container = document.querySelector('.container');
    container.appendChild(messageElement);

    
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}


getRandomWord();
