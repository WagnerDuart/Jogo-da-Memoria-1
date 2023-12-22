const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer')
const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login_form');
const characters = [
    'boneco-de-neve',
    'coelho',
    'arvore-de-natal',
    'mulher-biscoito',
    'papai-noel',
    'urso-teddy',
];
let score = 0;

// login
const validarInput = ({target}) => {
    if (target.value.length > 2) {
        button.removeAttribute('disabled');
        return
    }
    button.setAttribute('disabled', '');
}

const handlesubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('player', input.value);
    
    // Esconde o formulário
    form.style.display = 'none';

    // Mostra a seção do jogo
    const gameSection = document.querySelector('.game-section');
    gameSection.style.display = 'block';
}


// game
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}


let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled_card');

    if (disabledCards.length == 12) {
        clearInterval(this.loop);
        alert (`Parabéns, ${spanPlayer.innerHTML} Você conseguiu! Seu tempo foi: ${timer.innerHTML}`);
    }
}

const checkCards = () =>{
    const firstCharacter = firstCard.getAttribute('data_character');
    const secondCharacter = secondCard.getAttribute('data_character');

    if (firstCharacter == secondCharacter) {

        firstCard.firstChild.classList.add('disabled_card');
        secondCard.firstChild.classList.add('disabled_card');

        increaseScore();

        firstCard = '';
        secondCard = '';

        checkEndGame ();

    } else {
        setTimeout(() => {

            firstCard.classList.remove('reveal_card');
            secondCard.classList.remove('reveal_card');

            firstCard = '';
            secondCard = '';
        }, 600);
    }
}

const revealCard = ({target}) =>{

    if (target.parentNode.className.includes('revealCard')){
        return;
    }

    if (firstCard == '') {
        target.parentNode.classList.add('reveal_card');
        firstCard = target.parentNode;
    } else if (secondCard == '') {
        target.parentNode.classList.add('reveal_card');
        secondCard = target.parentNode;

        checkCards();
    }

    
}

const createCard = (character) =>{
    const card = createElement('div', 'card');
    const card_front = createElement('div', 'face card_front');
    const card_back = createElement('div', 'face card_back');

    card_front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(card_front);
    card.appendChild(card_back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data_character', character)

    return card;
}

const loadGame = () => {

    const duplicateCharacters = [... characters, ...characters];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() -0.5);
 
    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;

    },1000);
}

window.onload = () => {
    
    const playerName = localStorage.getItem('player');
    spanPlayer.innerHTML = playerName;
    startTimer();
    loadGame();
}

const increaseScore = () => {
    score += 10; 
    document.querySelector('.score').textContent = score;
}

document.querySelector('.play-again-button').addEventListener('click', () => {
    resetGame();
});

const resetGame = () => {
    clearInterval(this.loop); // Pára o temporizador
    timer.innerHTML = '00'; // Reinicia o temporizador
    score = 0; // Zera a pontuação
    document.querySelector('.score').textContent = score; // Atualiza a exibição da pontuação

    // Aqui você pode redefinir o tabuleiro, embaralhar as cartas novamente, etc.
    // Por exemplo:
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.remove()); // Remove todas as cartas do tabuleiro

    loadGame(); // Carrega o jogo novamente (seu método para criar as cartas)
    startTimer(); // Reinicia o temporizador
}

input.addEventListener('input', validarInput);
form.addEventListener('submit', handlesubmit);
