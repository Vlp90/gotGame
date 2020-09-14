
export class Player {
	constructor(name, color, index) {
    this.index = index,
		this.name = name;
		this.color = color;
		this.position = 0; // doit etre la position de l'id="card-0"
		this.life = 2000;
    this.cards = [];
    this.isOver = false;
    this.element = document.getElementById(`player${this.index}-container`);
  }

  getIsOver () {
    return this.isOver;
  }
  
  init() {
    console.log(`#card-0 .player${this.index}-color`);
    document.querySelector(`#card-0 .player${this.index}-color`).style.visibility = 'visible';
    this.element.querySelector('.life-player').innerHTML = this.life;

    console.log(document.querySelector(`#card-0 .player${this.index}-color`));
    
    // COULEURS SCORE
    document.querySelectorAll(`.colorPick${this.index}`).forEach(color => {
      color.style.fill = this.color;
      color.style.color = this.color;
    });
    
    document.querySelectorAll(`.player${this.index}-color`).forEach(circle => {
      circle.style.backgroundColor = this.color;
    });
    
    document.querySelectorAll(`.play${this.index}`).forEach(player => {
      player.style.color = this.color;
      player.innerHTML = this.name;
    });
  }

	move(nextPosition) {
		let oldPosition = this.position;
		this.position = nextPosition
		console.log('La position de ' + this.name + ' est : ' + this.position);

		document.querySelector(`#card-${oldPosition} .player${this.index}-color`).style.visibility = 'hidden';
		document.querySelector(`#card-${this.position} .player${this.index}-color`).style.visibility = 'visible';
	}

	damage(card) {
		this.life -= card.damage;
		if (card.owner) {
			card.healOwner(this.index);
		}
		console.log(this.name + ' a pris ' + card.damage + ' de degat et sa vie est à : ' + this.life);

		// Game Over
		if (this.life <= 0) {
      this.isOver = true;
      this.element.querySelector('.GameOver').innerText = 'Game Over ';
      document.querySelector(`#card-${this.position} .player${this.index}-color`).style.visibility = 'hidden';
      this.cards.forEach((card) => {
        card.setOwner(false);
      });
		} else {
			this.element.querySelector('.life-player').innerText = this.life;
		}
	}

	heal(card) {
		if (this.life > 0) {
			this.life += card.life;
			this.element.querySelector('.life-player').innerText = this.life;
			console.log(`${this.name} gain ${card.life} hp`);
		}
  }
  
  buy(card) {
    this.cards.push(card);
    this.life -= card.life;
    card.setOwner(this);

    this.element.querySelector('.life-player').innerText = this.life;
    this.element.querySelector('.cardOwned-player').innerText = this.cards.length;
  }

	// Method displayInfo
	displayInfo() {
		console.log('---------------------------------------');
	}
}