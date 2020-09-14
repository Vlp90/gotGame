

export class Card {
  constructor(name, position, damage, life) {
		this.name = name;
		this.position = position;
		this.damage = damage;
    this.life = life;
    this.element = document.getElementById(`card-${this.position}`);
    console.log(`card-${this.position}`);
  }
  
  drawCard() {
    if (this.damage > 0) {
			this.element.querySelector(".value-card-damage").innerHTML = this.damage;
		}
		
		if (this.life > 0) {
			this.element.querySelector(".value-card-life").innerHTML = this.life;
		}
  }
}