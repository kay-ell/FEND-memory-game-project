/*
 * Create a list that holds all of your cards
 */


const cardsArray = [
	'diamond',
	'paper-plane-o',
	'anchor',
	'bolt',
	'cube',
	'leaf',
	'bicycle',
	'bomb'
];

//duplicate the cards to create a set of each
let allCards = cardsArray.concat(cardsArray);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//shuffle the allCards array
const randomCards = shuffle(allCards);

const deck = document.querySelector('.deck');

//function to create game board
function gameBoard () {


	//loop through the randomCards array and create its own HTML
	const cardsList = randomCards.forEach(function (randomCard, i, all) {
		randomCard = document.createElement('li');
		randomCard.setAttribute('class', 'card');
		const icon = document.createElement('i');
		icon.setAttribute('class', 'fa fa-' + randomCards[i]);
		randomCard.appendChild(icon);
		deck.appendChild(randomCard);
	});

}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//add event listener to the deck instead of individual cards
//check if clicked target has a '.card' class

//empty array to store 2 cards at a time
let openedCards = [];
//empty array to push cards that have been matched
let matchedCards = [];

//set moves to 0
let moves = 0;
const counter = document.querySelector('.moves');

let time = 0;
let clock;
let timerOff = true;


deck.addEventListener('click', e => {
	const clicked = e.target;
	if(validClick(clicked)) {
		flip(clicked);
		addCard(clicked);
		if(timerOff) {
			timer();
			timerOff = false;
		}
		if (openedCards.length === 2) {
			openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className ? matched() : unmatched();
			countMoves();
		}
	} 
});


//function to check for valid click
function validClick(clicked) {
	return(
	clicked.classList.contains('card') &&
	!clicked.classList.contains('match') &&
	openedCards.length < 2 &&
	!openedCards.includes(clicked)
	);
}

//function to flip the card
function flip(clicked) {
	clicked.classList.toggle('open');
	clicked.classList.toggle('show');
}

//function to add the card to empty array
function addCard(clicked) {
	openedCards.push(clicked);
}

//function for when cards match
function matched() {
	openedCards[0].classList.toggle('match');
	openedCards[1].classList.toggle('match');
	disableClick(openedCards);
	matchedCards = matchedCards.concat(openedCards);
	openedCards = [];
	console.log(matchedCards);
}

//function for when cards don't match
function unmatched() {
	openedCards[0].classList.toggle('unmatch');
	openedCards[1].classList.toggle('unmatch');
	setTimeout(() => {
		openedCards[0].classList.remove('open', 'show', 'unmatch');
		openedCards[1].classList.remove('open', 'show', 'unmatch');
		openedCards = [];
	}, 1000);
}

//function to disable clicks on matched cards
function disableClick(openedCards) {
	openedCards[0].classList.add('disabled');
	openedCards[1].classList.add('disabled');
}

//function to count moves
function countMoves() {
	moves++;
	counter.innerHTML = moves;

	if(moves === 5) {
		changeStar(4);
	} else if(moves === 10) {
		changeStar(3);
	} else if(moves === 15) {
		changeStar(2);
	} else if(moves === 20) {
		changeStar(1);
	} else if (moves >= 25) {
		changeStar(0);
	}
}

//function to decrease star rating
function changeStar(index) {
	let stars = document.querySelectorAll('.stars li i');
		let star = stars[index];
		star.classList.add('fa-star-o');
		star.classList.remove('fa-star');
}



//function to count time
function timer() {
	clock = setInterval(() => {
		time++;
		displayTime();
	}, 1000);
}

//function to display time in correct format
function displayTime() {
	let secs = time % 60;
	let mins = Math.floor(time / 60);
	let hrs = Math.floor(time / 3600);
	time %= 3600;

	//select HTML elements
	const seconds = document.querySelector('.seconds');
	const minutes = document.querySelector('.minutes');
	const hours = document.querySelector('.hours');

	if (secs < 10) {secs = `0${secs}`;}
	if (mins < 10) {mins = `0${mins}`;}
	if (hrs < 10) {hrs = `0${hrs}`;}

	seconds.innerHTML = secs;
	minutes.innerHTML = mins;
	hours.innerHTML = hrs;
}


//function to stop the timer
function stopTimer() {
	clearInterval(clock);
}

window.onload=gameBoard();