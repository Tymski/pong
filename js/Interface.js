import Color from './Color.js';

export default class Interface {
    constructor() {
        this.colors = {};
        this.colors.fill = new Color(190, 240, 180);
        this.colors.outline = new Color(50, 50, 50);
        this.colors.box = new Color(100, 100, 100, 100);
        this.alpha = 0;
        this.boxAlphaChange = -5;
        this.scoreText = "";
        this.previousPoints = -1;
    }

    showBoxCounter() {
        this.boxAlphaChange = 6;
    }

    hideBoxCounter() {
        this.boxAlphaChange = -6;
    }

    render() {
        this.renderScore();
        this.renderTimer();
        this.renderBoxesCounter();
    }

    renderScore() {
        var points = game.points;

        if (this.previousPoints != points) {
            if (points <= 500) this.scoreText = 'Score: ' + points;
            else if (points < 1000) this.scoreText = 'Nice score: ' + points;
            else if (points < 5000) this.scoreText = 'Amazing score: ' + points;
            else if (points <= 9000) this.scoreText = 'Mad score: ' + points;
            else this.scoreText = "It's over 9000";
            this.previousPoints = points;
        }

        textoutScaled(canvas, font2, this.scoreText, 10, 30, 24, this.colors.fill.makecol(), this.colors.outline.makecol(), 1);
    }

    renderTimer() {
        var timerString = Math.floor(game.time / 3600.0) + ':' + (Math.floor(game.time / 60.0) % 60).toString().padStart(2, '0');
        textoutScaled(canvas, font2, timerString, SCREEN_W - 10 - timerString.length * 15, 30, 24, this.colors.fill.makecol(), this.colors.outline.makecol(), 1);
    }

    renderBoxesCounter() {
        var boxesText = 'Boxes: ' + game.boxes.boxes.length + '/' + 20;
        if (this.alpha > 0) textoutScaled(canvas, font2, boxesText, 10, 60, 19, this.colors.fill.makecol(), this.colors.box.makecol(), 0);
    }

    update() {
        this.alpha = Math.max(this.alpha, 0);
        this.colors.box.a = Math.min(this.alpha, 255);
        this.alpha += this.boxAlphaChange * deltaTime;
        if (this.alpha >= 1700) this.hideBoxCounter();
    }
}
