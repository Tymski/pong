import Color from '../Color.js';

export default class BoxWithMirrorPad {
    constructor() {
        this.probability = 0.011;
        this.text = '_';
        this.fontSize = 60 * px;
        this.colors = {};
        this.colors.base = new Color(90, 80, 100);
        this.colors.target = new Color(10, 10, 10);
        this.bouncesToGetBonus = 7;
    }
    bonus() {
        game.mirrorPad.activate();
    }
    animation(box) {
        box.position.x += Math.sin(0.5 * box.wiggle) * px;
    }
}
