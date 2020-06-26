import Vector from './Vector.js';
import Color from './Color.js';

export default class FloatingText {
    constructor() {
        this.value = '';
        this.position = new Vector();
        this.velocity = new Vector();
        this.active = false;
        this.colors = {};
        this.colors.fill = new Color(50, 50, 223);
        this.colors.outline = new Color(90, 50, 123);
        this.fontSize = 17 * px;
        this.strokeWidth = 1 * px;
        this.animationFrames = 0;
        this.alpha = 230;
    }

    setValues(box) {
        this.value = box.type.text;
        this.fontSize = box.type.fontSize;
        this.position.set(box.position);
        this.velocity.set(box.velocity.normal());
        this.velocity.y *= -1;
        this.velocity.y -= 1;
        this.animationFrames = 50;
        this.colors.fill.set(box.colors.target);
        this.colors.outline.set(box.colors.target);
        this.alpha = 230;
        this.colors.outline.set(box.colors.target);
        this.active = true;
    }

    update() {
        if (!this.active) return;
        if (this.animationFrames < 0) this.active = false;
        this.animationFrames--;
        this.position.add(this.velocity);
        this.fontSize += 0.1 * px;
        this.alpha = Math.max(0, this.alpha - 4);
        this.velocity.y -= 0.02 * px;
        this.colors.fill.a = this.alpha;
        this.colors.outline.a = this.alpha;
        this.wallsCollision();
    }

    render() {
        if (!this.active) return;
        if (this.animationFrames < 0) return;
        textout(canvas, font2, this.value, this.position.x, this.position.y, this.fontSize, this.colors.fill.makecol(), this.colors.outline.makecol(), this.strokeWidth);
    }

    wallsCollision() {
        // left wall collision
        if (this.position.x < 0) {
            this.position.x = Math.max(this.position.x, this.fontSize);
        }
        // right wall collision
        if (this.position.x >= SCREEN_W - this.fontSize * 1.7) {
            this.position.x = Math.min(this.position.x, SCREEN_W - this.fontSize * 1.7);
        }
    }
}
