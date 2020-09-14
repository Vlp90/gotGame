export let players = [];

export let test = 'test';

window.addEventListener('load', () => {
	const addPlayerBtn = document.getElementById('addPlayer');
	const removePlayerBtn = document.getElementById('removePlayer');
	const blockPlayerContainer = document.getElementById('player-select order order3');
	const startGame = document.getElementById('start');
	const playerNameInputs = document.getElementsByClassName('name-input');
	const playerColorInputs = document.getElementsByClassName('color-input');

	let playerNumber = 0;
	// ADD PLAYER CONTAINER
	function addPlayerContainer() {
		playerNumber++;

		let insertContainer = document.querySelector('.main-select.order');
		insertContainer.insertAdjacentHTML(
			'afterend',
			'<div class = "player-select order order3"><input class="name-input" type="text" placeholder="Enter Playername"><div class="order2"><label>Pick your color</label><input class="color-input" type="color"></div></div>'
		);
	}

	addPlayerBtn.onclick = addPlayerContainer;

	// REMOVE PLAYER CONTAINER
	function removePlayerContainer() {
		playerNumber--;

		let removeContainer = document.querySelector('.player-select.order.order3');
		removeContainer.remove();
	}
	removePlayerBtn.onclick = removePlayerContainer;

	// START BUTTON
	document.getElementById('startGame').onclick = function() {
		if (playerNumber < 2) {
			alert('There are no enough players, please add at least 2 players');
		} else {
			for (let i = 0; i < playerNameInputs.length; i++) {
				//console.log(playerNameInputs[i].value)
				let playerName = playerNameInputs[i].value;
				let playerColor = playerColorInputs[i].value;
				//players.push(playerName)
				players.push({ name: playerName, color: playerColor });
			}
			console.log(players);
			localStorage.setItem('players', JSON.stringify(players));
			location.href = './board/board.html';
		}
	};

	
});

const audio = new Audio('./musique/theme.mp3');
	audio.play();

	