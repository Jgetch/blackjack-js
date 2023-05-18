let messageEl = document.getElementById("message-el");
// let sumEl = document.getElementById("sum-el");
let sumEl = document.querySelector("#sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
let cashEl = document.getElementById("cash-amount");
let cardImg = document.getElementById("card-img");
let cardImgTwo = document.getElementById("card-img-2");

let cashOutAmount = 0;
let cards = [];
let player = {
  name: "Winnings",
  chips: 10,
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

//images
const king = "../cards/king.png";
const ace = "../cards/ace.png";
const two = "../cards/2.png";
const three = "../cards/3.png";
const four = "../cards/4.png";
const five = "../cards/5.png";
const six = "../cards/6.png";
const seven = "../cards/7.png";
const eight = "../cards/8.png";
const nine = "../cards/9.png";
const ten = "../cards/10.png";

//image function

function getImg(card) {
  if (card === 11) {
    cardImg.src = ace;
  }
}

//core functions
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

//button functions

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
    message = "Better luck next time!";
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
    getImg();
  }
}

function resetGame() {
  location.reload();
}

function cashOut() {
  if (sum >= 0) {
    cashOutAmount += player.chips;
    cashEl.textContent = `You have banked: $${cashOutAmount}`;
    player.chips = 0;
    playerEl.textContent = `${player.name} : $${player.chips}`;
  }
  if (cashOutAmount < 0) {
    cashEl.textContent = `You owe the table: $${Math.abs(cashOutAmount)}`;
    playerEl.textContent = `${player.name} : $${player.chips}`;
  }
}
