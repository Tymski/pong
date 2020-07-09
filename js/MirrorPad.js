import Rectangle from './Rectangle.js';

export default class MirrorPad extends Rectangle {
    constructor() {
        super();
        this.strokeWidth = 2;
        this.player = game.player;
        this.bouncesLeft = 0;
        this.fill = 0;
        this.alpha = 0;
    }

    canBounce() {
        return this.bouncesLeft > 0;
    }

    bounce() {
        this.bouncesLeft--;
        this.fill = Math.min(1, this.bouncesLeft * 0.05);
    }

    activate() {
        this.bouncesLeft += 20;
        this.fill = Math.min(1, this.bouncesLeft * 0.05);
    }

    update() {
        this.width.current = this.player.width.current - this.strokeWidth;
        this.width.base = this.player.width.base;
        this.height.current = this.player.height.current - this.strokeWidth;
        this.height.base = this.player.height.base;
        this.position.x = SCREEN_W - this.player.position.x;
        this.position.y = this.player.position.y + this.height.current + 3;
        if (this.bouncesLeft > 0) {
            this.alpha = Math.min(this.alpha + 8, 255);
        } else {
            this.alpha = Math.max(this.alpha - 8, 0);
        }
    }

    render() {
        var w = this.width.base * this.fill;
        rectScaled(canvas, this.position.x - this.width.current / 2, this.position.y - this.height.current / 2, this.width.current, this.height.current, makecol(50, 50, 50, this.alpha), this.strokeWidth);
        rectfillScaled(canvas, this.position.x - this.width.current / 2 + this.strokeWidth, this.position.y - this.height.current / 2 + this.strokeWidth, this.width.current - this.strokeWidth * 2, this.height.current - this.strokeWidth * 2, makecol(255, 255, 255, this.alpha));
        rectfillScaled(canvas, this.position.x - w / 2, this.position.y - this.height.current / 2, w, this.height.current / 4, makecol(0, 0, 0, this.alpha));
    }
}
