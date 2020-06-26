import Rectangle from '../Rectangle.js';
import Vector from '../Vector.js';
import FloatingText from '../FloatingText.js';

export default class Box extends Rectangle {
    constructor(width, height) {
        super(width, height);
        this.defaultSize = 20 * px;
        this.floatingText = new FloatingText();
        this.type = game.boxes.nextBoxType();
        this.setValues(width, height);
        this.position.y = this.position.y * 0.8 - this.height.current;
    }

    setValues(width = this.defaultSize, height = this.defaultSize) {
        this.position.x = (rand() % (SCREEN_W - 20 * px)) + 10 * px;
        this.position.y = (rand() % 2000 * px) - 2010 * px;
        this.active = true;
        this.velocity = new Vector(0, 0);
        this.width.base = width;
        this.width.current = this.width.base;
        this.height.base = height;
        this.height.current = height;
        this.useGravity = false;
        this.gravity = 0.1 * px;
        this.playerCollisionCooldown = 0;
        this.hits = 0;
        this.explode = this.type.bouncesToGetBonus;
        this.bounce = 0;
        this.wiggle = 0;
        this.points = 0;
        this.colors.base = this.type.colors.base;
        this.colors.current = this.colors.base.copy();
        this.colors.target = this.type.colors.target;
        this.colors.step = this.colors.target.copy().substract(this.colors.base).divide(this.explode);  
    }

    render() {
        if (this.active) {
            rectfill(canvas, this.position.x - this.width.current / 2, this.position.y - this.height.current / 2, this.width.current, this.height.current, this.colors.current.makecol()); // makecol(100,50,70)
        }

        if (!this.useGravity) {
            // Render fill
            rectfill(canvas, this.position.x - this.width.current / 2, this.position.y - this.height.current / 2, this.width.current, this.height.current, makecol(132, 232, 167, game.fallingBoxFillAlpha));
            // Render border
            rect(canvas, this.position.x - this.width.current / 2, this.position.y - this.height.current / 2, this.width.current, this.height.current, makecol(34, 177, 76), 3 * px);
        }

        this.floatingText.render();
    }

    update() {
        if (!this.useGravity && this.active) {
            this.position.y += 3 * px;
        } else {
            this.position.y += this.velocity.y;
            this.velocity.y += this.gravity;
            this.position.x += this.velocity.x;
        }
        this.wallsCollision();
        this.fallingOffScreen();
        this.floatingText.update();
        this.handleCollisionWithPlayer();
        this.handleCollisionWithMirror();
        this.wiggleAnimation();
    }

    wiggleAnimation() {
        if (!this.active) return;
        this.wiggle++;
        if (this.hits >= this.explode) {
            this.type.animation(this);
        }
    }

    wallsCollision() {
        // left wall collision
        if (this.position.x < this.width.current / 2) {
            this.velocity.x = Math.abs(this.velocity.x);
            this.position.x = Math.max(this.position.x, this.width.current / 2);
        }
        // right wall collision
        if (this.position.x >= SCREEN_W - this.width.current / 2) {
            this.velocity.x = -Math.abs(this.velocity.x);
            this.position.x = Math.min(this.position.x, SCREEN_W - this.width.current / 2);
        }
    }

    fallingOffScreen() {
        if (!(this.position.y >= SCREEN_H + this.height.current / 2)) return;
        if (this.useGravity && this.active) {
            game.points -= 1;
        }
        this.type = game.boxes.nextBoxType();
        this.setValues();
    }

    velocityAfterPadBounce(positionX) {
        var velocity = (this.position.x - positionX) / 20;
        if (velocity > 6 * px) velocity = 6 * px;
        if (velocity < -6 * px) velocity = -6 * px;
        return velocity;
    }

    handleCollisionWithPlayer() {
        this.playerCollisionCooldown--;
        if (this.playerCollisionCooldown > 0) return;
        if (!this.isColliding(game.player)) return;
        if (!this.active) return;
        this.doBounce(game.player.position.x);
    }

    handleCollisionWithMirror() {
        if (this.playerCollisionCooldown > 0) return;
        if (!this.isColliding(game.mirrorPad)) return;
        if (!this.active) return;
        if (!game.mirrorPad.canBounce()) return;
        this.doBounce(game.mirrorPad.position.x);
        game.mirrorPad.bounce();
    }

    doBounce(position) {
        this.playerCollisionCooldown = 20;
        this.useGravity = true;
        game.points += this.points;
        this.points++;
        this.velocity.x *= 0.5;
        this.velocity.x += this.velocityAfterPadBounce(position);
        this.hits += 1;

        // Color Change
        if (this.hits < this.explode) {
            this.colors.current.add(this.colors.step);
        }
        if (this.hits > this.explode) {
            this.collect();
        }
        this.velocity.y = -7.78 * px - 0.4 * frand() * frand() * px;
    }

    collect() {
        // Collect the box
        this.floatingText.setValues(this);
        this.type.bonus();
        this.active = false;
    }
}
