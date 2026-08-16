import CachedValueString from './CachedValueString.js';
import Color from '../Color.js';

export default class BoxesText {
    constructor() {
        this.boxesCachedString = new CachedValueString();
        this.boxesCachedString.createString = (length) => 'Boxes: ' + length + '/20';
        this.alpha = 0;
        this.alphaChange = -5;
        this.boxColor = new Color(100, 100, 100, 100);
    }

    show() {
        this.alphaChange = 6;
    }

    hide() {
        this.alphaChange = -6;
    }

    update() {
        this.alpha = Math.max(this.alpha, 0);
        this.boxColor.a = Math.min(this.alpha, 255);
        this.alpha += this.alphaChange * deltaTime;
        if (this.alpha >= 1700) this.hide();
    }

    render(colors) {
        if (this.alpha <= 0) return;
        textoutScaled(canvas, font2, this.boxesCachedString.getString(game.boxes.boxes.length), 10, 60, 19, colors.fill.makecol(), this.boxColor.makecol(), 0);
    }
}
