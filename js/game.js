const grid = document.querySelector('.grid');

const characters = [
    'boneco-de-neve',
    'coelho',
    'arvore-de-natal',
    'mulher-biscoito',
    'papai-noel',
    'urso-teddy',
];

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
        alert ('Parabéns, Você conseguiu!')
    }
}

const checkCards = () =>{
    const firstCharacter = firstCard.getAttribute('data_character');
    const secondCharacter = secondCard.getAttribute('data_character');

    if (firstCharacter == secondCharacter) {

        firstCard.firstChild.classList.add('disabled_card');
        secondCard.firstChild.classList.add('disabled_card');

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

loadGame();



