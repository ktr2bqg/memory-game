/*------Constants------*/
const cardEls = document.querySelectorAll(".cards");
const timerEl = document.querySelector("h2");
const messageEl = document.querySelector("h3");
const playBtn = document.getElementById("play-again");

/*------Variables------*/
let colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple"
];
let playerPicks = [];
let matchedCards = 0;
let timer;
let timeLeft = 15;

/*------Functions------*/

// INITLIZE FUNCTION - initial state of the board/ refresh state
function init() {
  playerPicks = [];
  messageEl.textContent = "";
  matchedCards = 0;

  timeLeft = 15;
  clearInterval(timer);
  timerEl.textContent = `Time Left: ${timeLeft}s`;
  startCards();
  timerStart = false;

  const shuffledColors = shuffleColors(makePairs(colors));

  cardEls.forEach((card, idx) => {
    card.isFacedown = true;
    card.style.backgroundColor = "";
    card.color = shuffledColors[idx];
    card.classList.remove("flipped");
  });
}

// FUNCTION 2 - creating color pairs
const makePairs = (colors) => {
  const pairs = []
  colors.forEach((color) => {
    pairs.push(color, color);
  });
  return pairs;
}

// FUNCTION 3 - shuffling color array
function shuffleColors(colors) {
  for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
  }
  return colors;
}

const startTime = () => {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      messageEl.textContent = "Time's up! You Lose!";
      console.log("Time's up! You Lose!");

      cardEls.forEach((card) => {
        card.isFacedown = true;
        card.style.backgroundColor = "";
      });
    }
  }, 1000);
};

// FUNCTION 4 - clicking cards
const flipCard = (card) => {
  if (card.isFacedown && playerPicks.length < 2 && timeLeft > 0) {
    card.isFacedown = false; // change to face-up
    playerPicks.push(card);
    card.style.backgroundColor = card.color; // change background color
    card.classList.add("flipped")
    console.log("Card flipped to face up");
  } 

  if (!timerStart) {
    timerStart = true;
    startTime();
  }
  
  // when player clicks two cards itsAMatch() will run
  if (playerPicks.length === 2) {
    itsAMatch()
  }
}

// FUNCTION 5 - compare cards match
const itsAMatch = () => {
  const [card1, card2] = playerPicks;

  // same color cards match
  if (card1.color === card2.color) {
    messageEl.textContent = "It's a Match!";
    console.log("It's a Match!");
    matchedCards++

    // the board is all matching cards
    if (matchedCards === colors.length) {
      messageEl.textContent = "You Win!";
      console.log("You Win!");
      stopCards();
    }
  } else {
    // different color cards match
    messageEl.textContent = "Not a Match";
    console.log("Not a Match")

  setTimeout(() => {
    card1.isFacedown = true; 
    card2.isFacedown = true;
    card1.style.backgroundColor = "";
    card2.style.backgroundColor = "";
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }, 400);
}

  playerPicks = [];
};

/*------Event Listeners------*/
const startCards = () => {cardEls.forEach((card) => {
  card.addEventListener("click", function () {
    flipCard(card);
    });
  });
};

const stopCards = () => {cardEls.forEach((card) => {
  card.removeEventListener("click", function () {
    flipCard(card);
    });
  });
};

init();

playBtn.addEventListener("click", init)