import Color from './Color.js';
export default class Interface {
    constructor() {
        this.colors = {};
        this.colors.fill = new Color(190, 240, 180);
        this.colors.outline = new Color(50, 50, 50);
        this.colors.box = new Color(100, 100, 100, 100);
        this.alpha = 0;
        this.boxAlphaChange = -5;
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
        var scoreText;
        var points = game.points;

        if (points <= 500) scoreText = 'Score: ';
        else if (points < 1000) scoreText = 'Nice score: ';
        else if (points < 5000) scoreText = 'Amazing score: ';
        else if (points <= 9000) scoreText = 'Mad score: ';
        else scoreText = "It's over 9000";

        if (points <= 9000) textoutScaled(canvas, font2, scoreText + points, 10, 30, 24, this.colors.fill.makecol(), this.colors.outline.makecol(), 1);
        else textoutScaled(canvas, font2, "It's over 9000!", 10, 30, 24, this.colors.fill.makecol(), this.colors.outline.makecol(), 1);
    }

    renderTimer() {
        var timerString = Math.floor(game.frames / 3600.0) + ':' + (Math.floor(game.frames / 60.0) % 60).toString().padStart(2, '0');
        textoutScaled(canvas, font2, timerString, SCREEN_W - 10 - timerString.length * 15, 30, 24, this.colors.fill.makecol(), this.colors.outline.makecol(), 1);
    }

    renderBoxesCounter() {
        var boxesText = 'Boxes: ' + game.boxes.boxes.length + '/' + 20;
        if (this.alpha > 0) textoutScaled(canvas, font2, boxesText, 10, 60, 19, this.colors.fill.makecol(), this.colors.box.makecol(), 0);
    }

    update() {
        this.alpha = Math.max(this.alpha, 0);
        this.colors.box.a = Math.min(this.alpha, 255);
        this.alpha += this.boxAlphaChange;
        if (this.alpha >= 1700) this.hideBoxCounter();
    }
}
