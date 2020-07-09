import Color from '../Color.js';

export default class BoxWithEye {
    constructor() {
        this.probability = 0.07;
        this.text = '👁';
        this.fontSize = 26;
        this.colors = {};
        this.colors.base = new Color(160, 200, 180);
        this.colors.target = new Color(50, 110, 60);
        this.bouncesToGetBonus = 5;
    }
    bonus() {
        game.fallingBoxFillAlpha = 0;
    }
    animation(box) {
        box.width.current = box.width.base + 4 * Math.abs(Math.sin(0.08 * box.wiggle));
        box.height.current = box.height.base + 4 * Math.abs(Math.sin(0.08 * box.wiggle));
    }
}
