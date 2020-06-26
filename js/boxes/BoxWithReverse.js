import Color from '../Color.js';

export default class BoxWithReverse {
    constructor() {
        this.probability = 0.015;
        this.text = '↑↓';
        this.fontSize = 30 * px;
        this.colors = {};
        this.colors.base = new Color(60, 40, 25);
        this.colors.target = new Color(200, 0, 230);
        this.bouncesToGetBonus = 2;
    }
    bonus() {
        game.boxes.boxes.forEach((box) => {
            box.velocity.x *= -1;
            box.velocity.y *= -1;
            box.playerCollisionCooldown = 0;
        });
    }
    animation(box) {
        box.position.y += Math.sin(0.5 * box.wiggle) * px;
        box.width.current = 23 * px;
        box.height.current = 23 * px;
    }
}
