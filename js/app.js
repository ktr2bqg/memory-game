/*------Constants------*/
const cardEls = document.querySelectorAll(".cards");
console.log(cardEls)

const timerEl = document.querySelector("h2")
console.log(timerEl)

const messageEl = document.querySelector("h3");
console.log(messageEl)

const playBtn = document.getElementById("play-again");
console.log(playBtn)
/*------Variables------*/
let cards = [];
console.log(cards)

let matchingCards = 0;
console.log(matchingCards)

let playerPicks = [];
console.log(playerPicks)

let winner;
console.log(winner)
/*------Functions------*/
// init()

const init = () => {
    winner = false;
    matchingCards = 0;
    playerPicks = [];
}
console.log(init)

const render = () => {}

const pairingColors = () => {}

const compareCards = () => {}

const shuffleCards = () => {}

/*------Event Listeners------*/

