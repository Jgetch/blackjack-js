let messageEl = document.getElementById("message-el");
// let sumEl = document.getElementById("sum-el");
let sumEl = document.querySelector("#sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");

let cards = [];
let player = {
  name: "Winnings",
  chips: 100,
  chipCount: function (hasBlackJack, isAlive) {
    if (hasBlackJack === true) {
      this.chips += 10;
    } else if (isAlive != true) {
      this.chips -= 5;
    }
  },
};
playerEl.textContent = `${player.name} : $${player.chips}`;
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";

function startGame() {
  isAlive = true;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  hasBlackJack = false;
  message = "";
  renderGame();
}

function getRandomCard() {
  random = Math.floor(Math.random() * 13) + 1;
  if (random === 1) {
    return 11;
  } else if (random >= 11) {
    return 10;
  } else {
    return random;
  }
}

function renderGame() {
  cardsEl.textContent = "CARDS: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += `${cards[i]}, `;
  }
  sumEl.textContent = `TOTAL: ${sum}`;
  if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    message = "You've got Blackjack!";
    hasBlackJack = true;
    player.chipCount(hasBlackJack);
    playerEl.textContent = `${player.name} : $${player.chips}`;
  } else {
    message = "You're out of the game!";
    isAlive = false;
    player.chipCount(isAlive);
    playerEl.textContent = `${player.name} : $${player.chips}`;
  }
  messageEl.textContent = message;
  console.log(message);
}

function newCard() {
  if (isAlive === true && hasBlackJack != true) {
    let card = getRandomCard();
    cards.push(card);
    sum = card + sum;
    renderGame();
  }
}

function resetGame() {
  location.reload();
}
