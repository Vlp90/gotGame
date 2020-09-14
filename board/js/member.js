import { Card } from "./card.js";

export class Member extends Card {
	constructor(name, position, damage, cost) {
    super(name, position, damage, cost);
		this.owner = false;
	}

	setOwner(owner) {
    this.owner = owner;
    
    const ownerName = this.element.querySelector(".sub-player-name");

		ownerName.innerText = owner ? owner.name : 'Nobody';
		ownerName.style.color = owner ? owner.color : 'inherit';
	}

	healOwner() {
		this.owner.life += this.damage;

		console.log(this.owner.element);
		this.owner.element.querySelector('.life-player').innerText = this.owner.life;

		console.log(`${this.owner.name} gain ${this.damage} hp`);
	}
}