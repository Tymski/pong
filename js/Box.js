import Rectangle from './Rectangle.js';
import Vector from './Vector.js';
import FloatingText from './FloatingText.js';

export default class Box extends Rectangle {
    constructor(width, height) {
        super(width, height);
        this.defaultSize = 20;
        this.floatingText = new FloatingText();
        this.setValues(width, height);
    }

    setValues(width = this.defaultSize, height = this.defaultSize) {
        this.position.x = (rand() % (SCREEN_W - 20)) + 10;
        this.position.y = (rand() % 2000) - 2010;
        this.active = true;
        this.velocity = new Vector(0, 0);
        this.width.base = width;
        this.width.current = this.width.base;
        this.height.base = height;
        this.height.current = height;
        this.useGravity = false;
        this.collision = 0;
        this.points = 0;
        this.col_r = 200;
        this.col_g = 200;
        this.col_b = 200;
        this.col_rk = 100;
        this.col_gk = 50;
        this.col_bk = 70;
        this.col_r0 = 200;
        this.col_g0 = 200;
        this.col_b0 = 200;
        this.hits = 0;
        this.explode = 5;
        this.bouncesUntilDestoryed = 5;
        this.bounce = 0;
        this.type = 0;
        this.wiggle = 0;
        this.playerCollisionCooldown = 0;
    }

    render() {
        if (this.active) {
            rectfill(canvas, this.position.x - this.width.current / 2, this.position.y - this.height.current / 2, this.width.current, this.height.current, makecol(this.col_r, this.col_g, this.col_b)); // makecol(100,50,70)
        }

        if (!this.useGravity) {
            // Render fill
            rectfill(canvas, this.position.x - this.width.current / 2, this.position.y - this.height.current / 2, this.width.current, this.height.current, makecol(132, 232, 167));
            // Render border
            rect(canvas, this.position.x - this.width.current / 2, this.position.y - this.height.current / 2, this.width.current, this.height.current, makecol(34, 177, 76), 3);
        }

        this.floatingText.render();
    }

    velocityAfterPadBounce() {
        var velocity = (this.position.x - game.player.position.x) / 22;
        if (velocity > 5) velocity = 5;
        if (velocity < -5) velocity = -5;
        return velocity;
    }

    update() {
        if (!this.useGravity && this.active) {
            this.position.y += 3;
        } else {
            this.position.y += this.velocity.y;
            this.velocity.y += 0.1;
            this.position.x += this.velocity.x;
        }

        this.collision--;
        
        this.bounce--;
        if ((this.position.x >= SCREEN_W - this.width.current / 2 || this.position.x < this.width.current / 2) && this.bounce < 0) {
            this.velocity.x *= -1;
            this.bounce = 4;
            this.position.x = Math.min(this.position.x, SCREEN_W - this.width.current / 2);
            this.position.x = Math.max(this.position.x, this.width.current / 2);
        }

        if (this.position.y >= SCREEN_H + this.height.current / 2) {
            if (this.useGravity && this.active) {
                game.points -= 1;
            }

            this.setValues();
            this.type = rand() % 5;
            if (this.type >= 2) this.type = 0;

            if (this.type == 1) {
                this.col_r0 = 102;
                this.col_g0 = 203;
                this.col_b0 = 115;
                this.col_r = 102;
                this.col_g = 203;
                this.col_b = 115;
                this.col_rk = 50;
                this.col_gk = 30;
                this.col_bk = 20;
            }
        }

        this.floatingText.update();

        if (!this.active) return;

        this.wiggle++;
        if (this.type == 0 && this.hits >= this.explode) {
            this.position.x += Math.sin(0.5 * this.wiggle);
            this.width.current = 22;
            this.height.current = 22;
        }
        if (this.type == 1 && this.hits >= this.explode) {
            this.width.current = this.width.base + 10 * Math.abs(Math.sin(0.1 * this.wiggle));
        }
        if (this.isColliding(game.player)) {
            this.onCollisionWithPlayer();
        }
        
    }

    onCollisionWithPlayer() {
        this.useGravity = true;
        if (this.collision < 0) {
            game.points += this.points;
            this.points++;
            this.collision = 20;
            this.velocity.x *= 0.85;
            this.velocity.x += this.velocityAfterPadBounce();
            this.hits += 1;
            
            //Color_increment
            var k = this.explode - this.hits;
            if (k > 0) {
                this.col_r += (this.col_rk - this.col_r0) / this.explode;
                this.col_g += (this.col_gk - this.col_g0) / this.explode;
                this.col_b += (this.col_bk - this.col_b0) / this.explode;
            }
            if (this.hits > this.explode) {
                if (this.type == 1) {
                    game.player.width.current += 50;
                    this.active = false;
                }
                if (this.type == 0) {
                    this.floatingText.setValues(this);
                    this.active = false;
                    game.points += 10;
                }
            }
        }
        this.velocity.y = -7.78 - 0.4 * frand() * frand();
    }
}
