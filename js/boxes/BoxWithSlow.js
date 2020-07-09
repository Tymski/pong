import Color from '../Color.js';

export default class BoxWithSlow {
    constructor() {
        this.probability = 0.05;
        this.text = '❄';
        this.fontSize = 30;
        this.colors = {};
        this.colors.base = new Color(100, 150, 150);
        this.colors.target = new Color(45, 95, 150);
        this.bouncesToGetBonus = 2;
    }
    bonus() {
        game.boxes.boxes.forEach((box) => {
            if (box.velocity.y > 0) {
                box.velocity.y *= 0.2;
            }
            box.velocity.x *= 0.1;
        });
    }
    animation(box) {
        box.width.current = 24;
        box.height.current = 24;
        box.velocity.x *= 0.99;
        if (box.velocity.y > 0) box.velocity.y *= 0.99;
        box.position.x += Math.sin(0.1 * box.wiggle);
    }
}
