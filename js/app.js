// List that holds all of cards
const icons = ['anchor', 'anchor', 'bicycle', 'bicycle', 'bolt', 'bolt', 'bomb', 'bomb', 'cube', 'cube', 'diamond', 'diamond', 'leaf', 'leaf', 'paper-plane-o', 'paper-plane-o'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const deck = document.querySelector('.deck');
const container = document.querySelector('.container');
const footer = document.querySelector('.footer');
const finalScoreSection = document.querySelector('.final-score-section');
const restart = document.querySelector('.restart');
const restartEnd = document.querySelector('.restart-end');
const movesDisplay = document.querySelector('.moves');
const movesEnd = document.querySelector('.moves-end');
const star = document.querySelector('.stars');
const starEnd = document.querySelector('.stars-end');
const time = document.querySelector('.time');
const timeEnd = document.querySelector('.time-end');
let checkArrey = [];
let clicks = 0;
let moves = 0;
let match = 0;
let seconds = 0;
let starNum;
let timer;
let min;
let sec;

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
};

createCard();

// Shuffle icons and create deck with cards
function createCard() {
	const cards = shuffle(icons);
	for (var i = 0; i < cards.length; i++) {
		const li = `<li class = "card"><i class = "fa fa-${cards[i]}"></i></li>`;
		deck.insertAdjacentHTML('beforeend', li);
	}
	liCards = document.querySelectorAll('.card');
	clickCard();
	reset();
	clock();
	stars();
}

function clickCard() {
	for (let i = 0; i < liCards.length; i++) {
		liCards[i].addEventListener('click', function (event) {
			event.preventDefault();
			let checkCard = event.target;
			if (checkCard.nodeName === 'LI' && checkCard.className !== 'card open show') {
				if (clicks < 2) {
					checkCard.setAttribute('class', 'card open show');
					checkArrey.push(liCards[i].firstChild.className);
					clicks += 1;
				}
				setTimeout(function () {
					comparison();
				}, 1000);
			}
		});
	}
}

function comparison() {
	end();
	if (checkArrey.length == 2) {
		moves += 1;
		movesDisplay.textContent = moves + ' moves';
		stars();
		if (checkArrey[0] !== checkArrey[1]) {
			open = document.querySelectorAll('.open');
			for (let i = 0; i < open.length; i++) {
				setTimeout(function () {
					open[i].setAttribute('class', 'card');
				}, 200);
			}
			checkArrey = [];
			clicks = 0;
			console.log('no');
		} else {
			open = document.querySelectorAll('.open');
			for (let i = 0; i < open.length; i++) {
				setTimeout(function () {
					open[i].setAttribute('class', 'card match');
				}, 200);
			}
			checkArrey = [];
			clicks = 0;
			console.log('yes');
			match += 1;
		}
	}
}

/*
 *
 * Change star rating depending on the amount of moves
 *
 */


function stars() {
	const starar = star.getElementsByTagName('i');
	for (i = 0; i < starar.length; i++) {
		if (moves > 10 && moves <= 15) {
			starar[2].className = 'fa fa-star-o';
			starNum = 2;
		} else if (moves > 15 && moves <= 20) {
			starar[1].className = 'fa fa-star-o';
			starNum = 1;
		} else if (moves > 20) {
			starar[0].className = 'fa fa-star-o';
			starNum = 0;
		} else {
			starar[0].className = 'fa fa-star';
			starar[1].className = 'fa fa-star';
			starar[2].className = 'fa fa-star';
			starNum = 3;
		}
	}
}

/*
 *
 * The end of the game when all the cards are guessed
 *
 */

function end() {
	if (match === 8) {
		container.style.display = 'none';
		footer.style.display = 'none';
		finalScoreSection.removeAttribute('style');
		movesEnd.textContent = `You have made ${moves} moves`;
		timeEnd.textContent = `in ${min}:${sec}`;

		// shows stars depending on the number of moves
		for (var i = 0; i < starNum; i++) {
		const li = `<li><i class="fa fa-star"></i></li>`;
		starEnd.insertAdjacentHTML('beforeend', li);
		}

		restartEnd.addEventListener('click', function (evt) {
			console.log('test');
			event.preventDefault();
			container.removeAttribute('style');
			footer.removeAttribute('style');
			finalScoreSection.style.display = 'none';
			deck.innerHTML = "";
			checkArrey = [];
			clicks = 0;
			match = 0;
			moves = 0;
			seconds = 0;
			movesDisplay.textContent = `${moves} moves`;
			couterStop();
			createCard();
			console.log('test2');
		})
	}
}

/*
 *
 * Restart
 *
 */


function reset () {
	restart.addEventListener('click', function (res) {
		event.preventDefault();
		container.removeAttribute('style');
		finalScoreSection.style.display = 'none';
		deck.innerHTML = "";
		checkArrey = [];
		clicks = 0;
		match = 0;
		moves = 0;
		seconds = 0;
		movesDisplay.textContent = `${moves} moves`;
		couterStop();
		createCard();
	})
}

/*
 *
 * Timer
 *
 */

function clock() {
	timer = setInterval(counter, 1000);
}

function counter() {
	seconds++;
	displayTime();
}

function displayTime() {
	time.textContent = showTime();
}

function showTime() {
	min = Math.floor(seconds / 60);
	sec = seconds % 60;
	return min + ":" + ((sec < 10) ? "0" + sec : sec);
}

function couterStop() {
	clearInterval(timer);
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
