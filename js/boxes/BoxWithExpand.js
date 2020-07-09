import Color from '../Color.js';

export default class BoxWithExpand {
    constructor() {
        this.probability = 0.18;
        this.text = '↔';
        this.fontSize = 30;
        this.colors = {};
        this.colors.base = new Color(180, 180, 90);
        this.colors.target = new Color(90, 90, 38);
        this.bouncesToGetBonus = 6;
    }
    bonus() {
        game.player.width.current += 50;
    }
    animation(box) {
        box.width.current = box.width.base + 10 * Math.abs(Math.sin(0.1 * box.wiggle));
    }
}
