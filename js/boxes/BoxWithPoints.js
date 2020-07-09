import Color from '../Color.js';

export default class BoxWithPoints {
    constructor() {
        this.probability = 1; // Default Box
        this.text = '+15';
        this.fontSize = 17;
        this.colors = {};
        this.colors.base = new Color(200, 200, 200);
        this.colors.target = new Color(85, 60, 75);
        this.bouncesToGetBonus = 3;
    }
    bonus() {
        game.points += 15;
    }
    animation(box) {
        box.position.x += Math.sin(0.5 * box.wiggle);
        box.width.current = 22;
        box.height.current = 22;
    }
}
