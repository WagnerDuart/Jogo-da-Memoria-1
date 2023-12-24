const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login_form');
let score = 0;
let loop;

const victoryScreen = document.getElementById('victoryScreen');
const playerSpan = victoryScreen.querySelector('.player');
const timerSpan = victoryScreen.querySelector('.timer');
const playAgainButton = victoryScreen.querySelector('.play-again-button');

const validarInput = ({ target }) => {
  if (target.value.length > 2) {
    button.removeAttribute('disabled');
    return;
  }
  button.setAttribute('disabled', '');
};

const handlesubmit = (event) => {
  event.preventDefault();
  
  localStorage.setItem('player', input.value);
  
  spanPlayer.innerHTML = input.value;

  form.style.display = 'none';
  const gameSection = document.querySelector('.game-section');
  gameSection.style.display = 'block';
  loadGame();
  startTimer();
};

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = '';
let secondCard = '';

const resetGame = () => {
  clearInterval(loop); 
  timer.innerHTML = '00';
  score = 0; 
  document.querySelector('.score').textContent = score; 

  const gameSection = document.querySelector('.game-section');
  gameSection.style.display = 'none'; 

  const form = document.querySelector('.login_form');
  form.style.display = 'flex'; 

  victoryScreen.style.display = 'none'; 

  if (grid.children.length > 0) {
    grid.innerHTML = ''; 
    loadGame(); 
  }
};

playAgainButton.addEventListener('click', resetGame);

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled_card');

  if (disabledCards.length == 12) {
    clearInterval(loop);

    const playerName = localStorage.getItem('player');
    playerSpan.textContent = playerName;
    timerSpan.textContent = timer.innerHTML;

    const victoryScore = victoryScreen.querySelector('.score'); 
    victoryScore.textContent = score;

    const gameSection = document.querySelector('.game-section');
    gameSection.style.display = 'none'; 

    const form = document.querySelector('.login_form');
    form.style.display = 'none'; 

    victoryScreen.style.display = 'block'; 
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data_character');
  const secondCharacter = secondCard.getAttribute('data_character');

  if (firstCharacter == secondCharacter) {
    firstCard.firstChild.classList.add('disabled_card');
    secondCard.firstChild.classList.add('disabled_card');

    increaseScore();

    firstCard = '';
    secondCard = '';

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal_card');
      secondCard.classList.remove('reveal_card');

      firstCard = '';
      secondCard = '';
    }, 600);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('revealCard')) {
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
};

const createCard = (character) => {
  const card = createElement('div', 'card');
  const card_front = createElement('div', 'face card_front');
  const card_back = createElement('div', 'face card_back');

  card_front.style.backgroundImage = `url('./images/${character}.png')`;

  card.appendChild(card_front);
  card.appendChild(card_back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data_character', character);

  return card;
};

const loadGame = () => {
  const characters = [
    'boneco-de-neve',
    'coelho',
    'arvore-de-natal',
    'mulher-biscoito',
    'papai-noel',
    'urso-teddy',
  ];
  const duplicateCharacters = [...characters, ...characters];
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  const totalCards = 12;

  const cardsToShow = shuffledArray.slice(0, totalCards);

  grid.innerHTML = '';

  cardsToShow.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

const increaseScore = () => {
  score += 10;
  document.querySelector('.score').textContent = score;
};

input.addEventListener('input', validarInput);
form.addEventListener('submit', handlesubmit);

window.onload = () => {
  const playerName = localStorage.getItem('player');
  spanPlayer.innerHTML = playerName;
  loadGame();
};