import Color from '../Color.js';

export default class BoxWithSpeed {
    constructor() {
        this.probability = 0.09;
        this.text = '>>>';
        this.fontSize = 21;
        this.colors = {};
        this.colors.base = new Color(230, 100, 100);
        this.colors.target = new Color(220, 40, 40);
        this.bouncesToGetBonus = 5;
    }
    bonus() {
        game.player.speed.current = Math.min(game.player.speed.max, game.player.speed.current + 4);
        game.clearAlpha = Math.min(255 - (254 / game.player.speed.max) * game.player.speed.current, game.clearAlpha);
    }
    animation(box) {
        box.position.x += Math.sin(0.5 * box.wiggle);
        box.width.current = box.width.base + 6 * Math.abs(Math.sin(0.4 * box.wiggle));
        box.height.current = box.width.base + 6 * Math.abs(Math.sin(0.4 * box.wiggle + PI_2));
    }
}
