/*------Constants------*/
const cardEls = document.querySelectorAll(".cards");
console.log(cardEls);
const timerEl = document.querySelector("h2");
const messageEl = document.querySelector("h3");
const playBtn = document.getElementById("play-again");

/*------Variables------*/
let cards = [];
let matchingCards = 0;
let playerPicks = [];
let winner;

/*------Functions------*/
// State of the cards
init()

// INITLIZE FUNCTION
function init () {
    cardEls.forEach((card) => {
    card.isFacedown = true; 
    })
}

// FUNCTION 2
const flipCard = (card) => {
  if (card.isFacedown) {
    card.isFacedown = false; // change to face-up
    card.style.backgroundColor = "red"; // change background color
    console.log("Card flipped to face up");
  } else {
    console.log("Card is already face up");
  }
};

// FUNCTION 3

const itsAMatch = () => {
    const [card1, card2] = playerPicks;
}

/*------Event Listeners------*/
// Play button event listener
playBtn.addEventListener("click", function () {
  console.log("Button was clicked");
});

cardEls.forEach((card) => {
  card.addEventListener("click", function () {
    flipCard(card);
  });
});
