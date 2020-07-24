import Vector from './Vector.js';
import Rectangle from './Rectangle.js';

export default class Player extends Rectangle {
    constructor() {
        super();
        this.position = new Vector(SCREEN_W / 2, SCREEN_H - 50);
        this.speed = {};
        this.speed.base = 8;
        this.speed.current = this.speed.base;
        this.speed.deceleration = 0.005;
        this.speed.max = 20;
        this.width = {};
        this.width.base = 100;
        this.width.current = this.width.base;
        this.height.base = 20;
        this.height.current = 20;
        this.colors = {};
        this.colors.base = makecol(0, 0, 0);
        this.colors.extension = makecol(20, 20, 20);
        this.input = {};
        this.input.keyboardRight = () => key[KEY_RIGHT] || key[KEY_D];
        this.input.keyboardLeft = () => key[KEY_LEFT] || key[KEY_A];
        this.input.mousePressed = () => mouse_b & 1;
        this.input.mouseTarget = 350;
        this.input.mouseControl = true;
    }

    resize() {}

    render() {
        // Render player pad extension
        rectfillScaled(canvas, this.position.x - this.width.current / 2, this.position.y - this.height.current / 2, this.width.current, this.height.current, this.colors.extension);
        // Render player pad
        rectfillScaled(canvas, this.position.x - this.width.base / 2, this.position.y - this.height.current / 2, this.width.base, this.height.current, this.colors.base);

        if (this.input.mouseControl) {
            // Render mouse target dot on this pad
            rectfillScaled(canvas, this.position.x - 5, this.position.y - 5, 10, 10, makecol(50, 50, 50));
            // Render mouse target dot
            rectfillScaled(canvas, this.input.mouseTarget - 5, this.position.y - 5, 10, 10, makecol(150, 150, 150));
        }
    }

    update() {
        // Shrink (remove the expand buff)
        this.width.current -= 0.035 + (this.width.current - this.width.base) * 0.0001;
        this.width.current = Math.max(this.width.current, this.width.base);

        // Slow down (remove the speed buff)
        this.speed.current = Math.max(this.speed.current - this.speed.deceleration, this.speed.base);
        // Max speed
        this.speed.current = Math.min(this.speed.current, this.speed.max);

        this.handleInput();

        // Clamp player position
        this.position.x = Math.min(this.position.x, SCREEN_W + this.width.current / 2 - this.width.base);
        this.position.x = Math.max(this.position.x, 0 - this.width.current / 2 + this.width.base);
    }

    handleInput() {
        let gamepadX = getGamepadX();
        let horizontal = gamepadX;
        if (this.input.keyboardRight()) horizontal = 1;
        if (this.input.keyboardLeft()) horizontal = -1;
        if (this.input.mousePressed() || this.input.mouseControl) {
            horizontal = this.input.mouseTarget - this.position.x;
            if (this.speed.current != 0) horizontal /= this.speed.current;
            horizontal = Math.max(horizontal, -1);
            horizontal = Math.min(horizontal, 1);
        }

        if (this.input.keyboardRight() || this.input.keyboardLeft() || getGamepadX() != 0) this.input.mouseControl = false;
        if (this.input.mousePressed()) {
            this.input.mouseControl = true;
            this.input.mouseTarget = mouse_x / px;
        }

        this.position.x += this.speed.current * horizontal;
    }
}
