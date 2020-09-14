import { Member } from "./member.js";
import { Card } from "./card.js";
import { Player } from "./player.js";

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

function showBuyButtons () {
  messageElement.textContent = buyMessage;
  buttonBuyElement.style.display = 'block';
  buttonRollDiceElement.style.display = 'none';
}

function hideBuyButtons () {
  messageElement.innerText = playTimeMessage;
  buttonBuyElement.style.display = 'none';
  buttonRollDiceElement.style.display = 'block';
}

export class Board {
  constructor() {
    this.cards = [
      new Card('KingsLanding', 0, 0, 500),
      // Starks
      new Member('Ned',  1, 500, 1000),
      new Member('Sansa',  2, 300, 800),
      new Member('Robb',  3, 200, 400),
      new Member('Arya',  4, 800, 1200),

      new Card('NerraBattle', 5, 500, 0),

      // Baratheon
      new Member('Stannis', 6, 300, 800),
      new Member('Renly', 7, 200, 500),
      new Member('Robert', 8, 300, 600),
      
      new Card('Dragons Battle', 9, 0, 700),

      // Lannister
      new Member('Tyrion',  10, 600, 1300),
      new Member('Cersei ',  11, 900, 1800),
      new Member('Jaime',  12, 650, 1300),
      new Member('Lancel',  13, 200, 500),

      new Card('Walkers Battle', 14, 700, 0),

      // Targaryen
      new Member('Viserys', 15, 250, 400),
      new Member('Rhaegar ', 16, 400, 800),
      new Member('Daenerys', 17, 1000, 2000)
    ];
    const localPlayers = localStorage.getItem('players');
    const playersData = JSON.parse(localPlayers);

    this.players = playersData.map((player, index) => new Player(player.name, player.color, index));
    this.currentPlayer = this.players[0];
    this.turn = 0;
  }

  init = () => {
    document.getElementById('dice-btn').onclick = this.handleDiceClick;
    document.getElementById('buy-btn').onclick = this.handleBuyClick;
    document.getElementById('cancel-btn').onclick = this.commonOnClick;

    this.updateCurrentPlayer();

    this.cards.forEach(card => {
      card.drawCard();
    });
    this.players.forEach(player => {
      player.init();
    })
  }


  updateCurrentPlayer = () => {
    this.currentPlayer = this.players[this.turn % this.players.length];
    if (this.currentPlayer.getIsOver()) {
      this.nextTurn();
    } else {
      playerElement.style.color = this.currentPlayer.color;
      playerElement.textContent = this.currentPlayer.name;
    }
    
  }

  nextTurn = () => {
    this.turn++;
    this.updateCurrentPlayer();
    const inGamePlayers = this.players.filter(player => !player.getIsOver());
    if (this.currentPlayer.getIsOver()) {
      this.nextTurn();
    } else if (inGamePlayers.length === 1) {
      document.getElementById('winner-player-name').innerText = inGamePlayers[0].name;
      document.getElementById('winner-player-name').style.color = inGamePlayers[0].color;
      gameInProgressElement.style.display = 'none';
      ironThroneElement.style.display = 'block';
    }
  }

  handleDiceClick = () => {
    let dice = 1 + Math.floor(6 * Math.random());
		console.log('Valeur du dice est : ' + dice);
    this.currentPlayer.move((this.currentPlayer.position + dice) % this.cards.length);

    let card = this.cards[this.currentPlayer.position];
    if (card.owner === false && this.currentPlayer.life > card.life) {
      showBuyButtons();
    } else {
      if (!this.currentPlayer.cards.find((ownedCard) => ownedCard.position === card.position) && card.owner || (card.owner === undefined && card.damage > 0)) {
        this.currentPlayer.damage(card);
      } else if (card.owner === undefined && card.life > 0) {
        this.currentPlayer.heal(card);
      }
      this.nextTurn();
    }
  }

  handleCommonClick = () => {
    hideBuyButtons();
    this.nextTurn();
  }

  handleBuyClick = () => {
    this.currentPlayer.buy(this.cards[this.currentPlayer.position]);
    this.handleCommonClick();
  }
}