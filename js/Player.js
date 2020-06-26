import Vector from './Vector.js';
import Rectangle from './Rectangle.js';

export default class Player extends Rectangle {
    constructor() {
        super();
        this.position = new Vector(SCREEN_W / 2, SCREEN_H - 50 * px);
        this.speed = {};
        this.speed.base = 8 * px;
        this.speed.current = this.speed.base;
        this.speed.deceleration = 0.005 * px;
        this.speed.max = 20 * px;
        this.width = {};
        this.width.base = 100 * px;
        this.width.current = this.width.base;
        this.height.base = 20 * px;
        this.height.current = 20 * px;
        this.colors = {};
        this.colors.base = makecol(0, 0, 0);
        this.colors.extension = makecol(20, 20, 20);
        this.input = {};
        this.input.right = () => key[KEY_RIGHT] || key[KEY_D];
        this.input.left = () => key[KEY_LEFT] || key[KEY_A];
        this.input.mouseTarget = 350 * px;
        this.input.keyboardControl = true;
    }

    render() {
        // Render player pad extension
        rectfill(canvas, this.position.x - this.width.current / 2, this.position.y - this.height.current / 2, this.width.current, this.height.current, this.colors.extension);
        // Render player pad
        rectfill(canvas, this.position.x - this.width.base / 2, this.position.y - this.height.current / 2, this.width.base, this.height.current, this.colors.base);

        if (this.input.keyboardControl == false) {
            // Render mouse target dot on this pad
            rectfill(canvas, this.position.x - 5 * px, this.position.y - 5 * px, 10 * px, 10 * px, makecol(50, 50, 50));
            // Render mouse target dot
            rectfill(canvas, this.input.mouseTarget - 5 * px, this.position.y - 5 * px, 10 * px, 10 * px, makecol(150, 150, 150));
        }
    }

    update() {
        // Shrink (remove the expand buff)
        this.width.current -= 0.035 * px + (this.width.current - this.width.base) * 0.0001;
        this.width.current = Math.max(this.width.current, this.width.base);

        // Slow down (remove the speed buff)
        this.speed.current = Math.max(this.speed.current - this.speed.deceleration, this.speed.base);
        // Max speed
        this.speed.current = Math.min(this.speed.current, this.speed.max);

        if (this.input.right() || this.input.left()) this.input.keyboardControl = true;
        if (mouse_b & 1) {
            this.input.mouseTarget = mouse_x;
            this.input.keyboardControl = false;
        }

        // Apply player movement
        if ((this.input.right() && this.input.keyboardControl) || (this.input.mouseTarget - this.position.x >= this.speed.current && this.input.keyboardControl == false)) this.position.x += this.speed.current;
        else if ((this.input.left() && this.input.keyboardControl) || (this.input.mouseTarget - this.position.x <= -this.speed.current && this.input.keyboardControl == false)) this.position.x -= this.speed.current;
        else if (this.input.keyboardControl == false) this.position.x = this.input.mouseTarget;

        // Clamp player position
        this.position.x = Math.min(this.position.x, SCREEN_W + this.width.current / 2 - this.width.base);
        this.position.x = Math.max(this.position.x, 0 - this.width.current / 2 + this.width.base);
    }
}
