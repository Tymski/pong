import Color from '../Color.js';

export default class BoxWithBox {
    constructor() {
        this.probability = 0.1;
        this.text = '⬜';
        this.fontSize = 20;
        this.colors = {};
        this.colors.base = new Color(100, 200, 115);
        this.colors.target = new Color(60, 50, 40);
        this.bouncesToGetBonus = 7;
        this.boxesToSpawn = 10; // Max 10 additional boxes
        this.spawnedSoFar = 0;
        this.probabilityDecrement = this.probability / this.boxesToSpawn;
    }
    bonus() {
        if (this.spawnedSoFar < this.boxesToSpawn) {
            game.boxes.spawnOneBox();
            game.interface.showBoxCounter();
        }
        this.spawnedSoFar++;
        this.probability -= this.probabilityDecrement;
        if (this.spawnedSoFar >= this.boxesToSpawn) this.probability = 0;
    }
    animation(box) {
        box.position.y += Math.sin(0.5 * box.wiggle);
        box.height.current = box.width.base + 10 * Math.abs(Math.sin(0.1 * box.wiggle));
    }
}
