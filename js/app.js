const cardEls = document.querySelectorAll(".cards");
const timerEl = document.querySelector("h2");
const messageEl = document.querySelector("h3");
const playBtn = document.getElementById("play-again");

let colors = ["#051923", "#003554", "#006494", "#0582ca", "#00a6fb"];
let playerPicks = [];
let matchedCards = 0;
let timer;
let timeLeft = 15;

function init() {
  playerPicks = [];
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

const makePairs = (colors) => {
  const pairs = []

  colors.forEach((color) => {
    pairs.push(color, color);
  });
  return pairs;
}

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
      stopCards();
    
      cardEls.forEach((card) => {
        card.isFacedown = true;
        card.style.backgroundColor = "";
      });
    }
  }, 1000);
};

const flipCard = (card) => {
  if (card.isFacedown && playerPicks.length < 2 && timeLeft > 0) {
    card.isFacedown = false;
    playerPicks.push(card);
    card.style.backgroundColor = card.color;
    card.classList.add("flipped")
  } 

  if (!timerStart) {
    timerStart = true;
    startTime();
  }
  
  if (playerPicks.length === 2) {
    itsAMatch()
  }
}

const itsAMatch = () => {
  const [card1, card2] = playerPicks;

  if (card1.color === card2.color) {
    messageEl.textContent = "It's a Match!";
    matchedCards++

    if (matchedCards === colors.length) {
      clearInterval(timer)
      messageEl.textContent = "You Win!";
      confetti.start(2000)
      stopCards();
    }
  } else {
    messageEl.textContent = "Not a Match";

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