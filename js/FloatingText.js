import Vector from './Vector.js';
import Color from './Color.js';

export default class FloatingText {
    constructor(textValue = '+10') {
        this.value = textValue;
        this.position = new Vector();
        this.velocity = new Vector();
        this.active = false;
        this.colors = {};
        this.colors.fill = new Color(50, 50, 223);
        this.colors.outline = new Color(90, 50, 123);
        this.fontSize = 17;
        this.strokeWidth = 1;
        this.animationFrames = 0;
        this.alpha = 230;
    }

    setValues(box) {
        this.active = true;
        this.position.set(box.position);
        this.velocity.set(box.velocity.normal());
        this.velocity.divide(0.5);
        this.velocity.y *= -1;
        this.velocity.y -= 1;
        this.animationFrames = 90;
        this.fontSize = 17;
        this.alpha = 230;
    }

    update() {
        if (!this.active) return;
        this.animationFrames--;
        this.position.add(this.velocity);
        this.fontSize += 0.1;
        this.alpha = Math.max(0, this.alpha - 3);
        this.velocity.y -= 0.02;
        this.colors.fill.a = this.alpha;
        this.colors.outline.a = this.alpha;
    }

    render() {
        if (!this.active) return;
        if (this.animationFrames < 0) return;
        textout(canvas, font2, this.value, this.position.x, this.position.y, this.fontSize, this.colors.fill.makecol(), this.colors.outline.makecol(), this.strokeWidth);
    }
}
