const localPlayers = localStorage.getItem('players');
const playersData = JSON.parse(localPlayers);

// constants
const buyMessage = 'Would you buy the member ?';
const playTimeMessage = 'Its time to play';

// Elements
const gameInProgressElement = document.getElementById('game-in-progress');
const ironThroneElement = document.getElementById('iron-throne');
const playerElement = document.getElementById('player-play');
const messageElement = document.getElementById('message-play');
const buttonBuyElement = document.getElementById('button-action-buy');
const buttonRollDiceElement = document.getElementById('button-action-play');

// init
ironThroneElement.style.display = 'none';
buttonBuyElement.style.display = 'none';
buttonRollDiceElement.style.display = 'block';
messageElement.innerText = playTimeMessage;

// BOARD ARRAY

let board = [];

// MEMBERS CREATION

class Events {
	constructor(name, position, damage, gain) {
		this.name = name;
		this.position = position;
		this.damage = damage;
		this.gain = gain;
		this.special = true;
	}

	drawCard() {
		document.querySelector(`#card-${this.position} .numGainEvent`).innerHTML = ' + ' + this.gain;
		// document.querySelector(`#card-${this.position} .numDamageEvent`).innerHTML = ' + ' + this.damage;
	}
}

class Members {
	constructor(name, family, position, damage, cost) {
		this.name = name;
		this.family = family;
		this.position = position;
		this.damage = damage;
		this.cost = cost;
		this.member = 0;
		this.owner = undefined;
	}

	setOwner(owner) {
		this.owner = owner;

		document.querySelector(`#card-${this.position} .sub-player-name`).innerText = owner ? owner.name : 'Nobody';
		document.querySelector(`#card-${this.position} .sub-player-name`).style.color = owner ? owner.color : 'inherit';
	}

	drawCard() {
		document.querySelector(`#card-${this.position} .numDamage`).innerHTML = this.damage;
		document.querySelector(`#card-${this.position} .numCost`).innerHTML = this.cost;
	}

	healOwner(playerIndex) {
		this.owner.life += this.damage;

		document.getElementsByClassName('life-player')[playerIndex].innerHTML = this.owner.life;

		console.log(`${this.owner.name} gain ${this.damage} hp`);
	}
}

// MEMBERS/EVENTS POSITIONS

// Stark

let kinglanding = new Events('KingsLanding', 0, 0, 500);
board.push(kinglanding);

let ned = new Members('Ned', 'Stark', 1, 500, 1000);
board.push(ned);

let sansa = new Members('Sansa', 'Stark', 2, 300, 800);
board.push(sansa);

let robb = new Members('Robb', 'Stark', 3, 200, 400);
board.push(robb);

let arya = new Members('Arya', 'Stark', 4, 800, 1200);
board.push(arya);

// EVENT
let nerraBattle = new Events('NerraBattle', 5, 500, 0);
board.push(nerraBattle);

// Baratheon

let stannis = new Members('Stannis', 'Baratheon', 6, 300, 800);
board.push(stannis);

let rendy = new Members('Rendy', 'Baratheon', 7, 200, 500);
board.push(rendy);

let robert = new Members('Robert', 'Baratheon', 8, 300, 600);
board.push(robert);

// EVENT

let dragonsBattle = new Events('Dragons Battle', 9, 0, 700);
board.push(dragonsBattle);

// Lannister

let tyrion = new Members('Tyrion', 'Lannister', 10, 600, 1300);
board.push(tyrion);

let cersei = new Members('Cersei ', 'Lannister', 11, 900, 1800);
board.push(cersei);

let jaime = new Members('Jaime', 'Lannister', 12, 650, 1300);
board.push(jaime);

let lancel = new Members('Lancel', 'Lannister', 13, 200, 500);
board.push(lancel);

// EVENT

let walkersBattle = new Events('Walkers Battle', 14, 700, 0);
board.push(walkersBattle);

// Targaryen

let viserys = new Members('Viserys', 'Targaryen', 15, 250, 400);
board.push(viserys);

let rhaegar = new Members('Rhaegar ', 'Targaryen', 16, 400, 800);
board.push(rhaegar);

let daenerys = new Members('Daenerys', 'Targaryen', 17, 1000, 2000);
board.push(daenerys);

// INITIALISATION DES PARAMETRES

board.forEach(function(element) {
	element.drawCard();
});

// playersData.forEach(function(element) {
// 	console.log(element)
// 	element.init();

// });

console.log(board);
console.log(playersData);

// PLAYERS

class Player {
	constructor(name, color) {
		this.name = name;
		this.color = color;
		this.position = 0; // doit etre la position de l'id="card-0"
		this.life = 2000;
		this.cards = [];
	}

	isDead() {
		return this.life <= 0;
	}

	diceMove(playerIndex) {
		let dice = 1 + Math.floor(6 * Math.random());
		console.log('Valeur du dice est : ' + dice);
		let oldPosition = this.position;

		this.position = (this.position + dice) % board.length;
		console.log('La position de ' + this.name + ' est : ' + this.position);
		// console.log(document.querySelector('#card-1 .player1-color'));
		// console.log(player);

		// console.log("ALERTE")
		// console.log(player)

		document.querySelector(`#card-${oldPosition} .player${playerIndex + 1}-color`).style.visibility = 'hidden';
		document.querySelector(`#card-${this.position} .player${playerIndex + 1}-color`).style.visibility = 'visible';
		// currentCard.querySelector('.player1-color').style.visibility = 'visible';

		// ajouter les conditions d'achat ici
	}

	damage(card, playerIndex) {
		this.life -= card.damage;
		if (card.owner) {
			card.healOwner(playerIndex);
		}
		console.log(this.name + ' a pris ' + card.damage + ' de degat et sa vie est à : ' + this.life);

		// Game Over
		if (this.life <= 0) {
			let gameOverStatus = document.getElementsByClassName('GameOver')[playerIndex];
			gameOverStatus.innerHTML = 'Game Over ';
			console.log(`Game over for ${this.name}.`);
		} else {
			let scorePlayer = document.getElementsByClassName('life-player')[playerIndex];
			scorePlayer.innerHTML = this.life;
		}
	}

	heal(card, playerIndex) {
		if (this.life > 0) {
			this.life += card.gain;
			document.getElementsByClassName('life-player')[playerIndex].innerHTML = this.life;
			console.log(`${this.name} gain ${card.gain} hp`);
		}
	}

	buyCard(card, playerIndex) {
		messageElement.textContent = buyMessage;
		buttonBuyElement.style.display = 'block';
		buttonRollDiceElement.style.display = 'none';

		function commonOnClick() {
			buttonBuyElement.style.display = 'none';
			buttonRollDiceElement.style.display = 'block';
			messageElement.innerText = playTimeMessage;

			let currentPlayer = players[turn % players.length];
			// remplacer element du DOM par currentPlayer.name

			playerElement.style.color = currentPlayer.color;
			playerElement.innerText = currentPlayer.name;
		}

		document.getElementById('buy-btn').onclick = () => {
			this.cards.push(card);
			this.life -= card.cost;
			this.own += 1;
			card.setOwner(this);

			document.getElementsByClassName('life-player')[turn % players.length].innerHTML = this.life;
			document.getElementsByClassName('cardOwned-player')[turn % players.length].innerHTML = this.cards.length;

			commonOnClick();
		};

		document.getElementById('cancel-btn').onclick = commonOnClick;
	}

	// Method displayInfo
	displayInfo() {
		console.log('---------------------------------------');
	}

	delete(playerIndex) {
		this.cards.forEach((card) => {
			card.setOwner(undefined);
		});
		document.querySelector(`#card-${this.position} .player${turn % players.length + 1}-color`).style.visibility =
			'hidden';

		const nextPlayers = [];
		players.forEach((player, index) => {
			if (index !== turn % players.length) {
				nextPlayers.push(player);
			}
		});
		players = nextPlayers;
	}
}

// INIT POSITION JOUEUR
// function positionPlayers(player) {
// 	console.log(player)
// 	document.querySelector(`#card-${this.position} .player${player}-color`).style.visibility = 'visible';
// };

let players = [];
playersData.forEach((player, index) => {
	const currentPlayer = new Player(player.name, player.color);
	players.push(currentPlayer);

	document.querySelector(`#card-0 .player${index + 1}-color`).style.visibility = 'visible';
	document.getElementsByClassName('life-player')[index].innerHTML = currentPlayer.life;

	// COULEURS SCORE
	document.querySelectorAll(`.colorPick${index + 1}`).forEach((color) => {
		color.style.fill = player.color;
		color.style.color = player.color;
	});

	document.querySelectorAll(`.player${index + 1}-color`).forEach((circle) => {
		circle.style.backgroundColor = player.color;
	});

	document.querySelectorAll(`.play${index + 1}`).forEach((players) => {
		players.style.color = player.color;
		players.innerHTML = player.name;
	});
});

// PLAY TURN
// NAME DONT CHANGE
document.getElementById(`player-play`).style.color = players[0].color;
document.getElementById(`player-play`).textContent = players[0].name;

// PRINT SCORE

// PRINT CARDS VALUES

// DOM ACHAT

// function buyMember() {

// 	let removeDice = document.querySelector('.player-select.order.order3');
// 	removeContainer.remove();
// }
// removePlayerBtn.onclick = removePlayerContainer;

// let turnName = document.getElementById('player-play');
// turnName.innerHTML = players[0].name;

// PRINT COLOR

// boucle array player query select
let player1Color = document.getElementsByClassName('player1-color');
//console.log(player1Color)

// document.getElementsByClassName("player2-color").style.backgroundColor = "yellow" ;//players[1].color;

// EVENT ON CLICK TO MAKE MOUVEMENT EXECUTE

// window.addEventListener('load', () => {

// }

let turn = 0;

function play() {
	console.log(turn % players.length);
	const playerIndex = turn % players.length;
	let currentPlayer = players[playerIndex];
	// remplacer element du DOM par currentPlayer.name

	playerElement.style.color = currentPlayer.color;
	playerElement.textContent = currentPlayer.name;

	currentPlayer.diceMove(playerIndex);
	let card = board[currentPlayer.position];

	if (!card.owner && !card.special && currentPlayer.life > card.cost) {
		currentPlayer.buyCard(card, playerIndex);
	} else {
		console.log('achat impossible !');
		console.log((turn + 1) % players.length);
		const nextPlayer = players[(turn + 1) % players.length];
		playerElement.style.color = nextPlayer.color;
		playerElement.textContent = nextPlayer.name;
	}

	// check achat
	if (
		(!currentPlayer.cards.find((ownedCard) => ownedCard.position === card.position) && card.owner) ||
		card.special
	) {
		currentPlayer.damage(card, playerIndex);
		if (card.gain) {
			currentPlayer.heal(card, playerIndex);
		}
	}

	currentPlayer.displayInfo();

	if (currentPlayer.isDead()) {
		currentPlayer.delete(playerIndex);
	}

	if (players.length === 1) {
		document.getElementById('winner-player-name').innerText = players[0].name;
		gameInProgressElement.style.display = 'none';
		ironThroneElement.style.display = 'block';
	} else {
		turn++;
	}
}

function setUpRollDice() {
	document.getElementById('dice-btn').onclick = play;
}

setUpRollDice();

// MUSIQUE
// const audio = new Audio('../musique/theme.mp3');
// 	audio.play();
