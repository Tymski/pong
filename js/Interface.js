
export default class Interface {
    render() {
        this.colors = {};
        this.colors.fill = makecol(190, 240, 180);
        this.colors.outline = makecol(50, 50, 50);
        this.renderScore();
        this.renderTimer();
    }

    renderScore() {
        var scoreText;
        var points = game.points;

        if (points <= 500) scoreText = 'Score: ';
        else if (points < 1000) scoreText = 'Nice score: ';
        else if (points < 5000) scoreText = 'Amazing score: ';
        else if (points <= 9000) scoreText = 'Mad score: ';
        else scoreText = "It's over 9000";

        if (points <= 9000) textout(canvas, font2, scoreText + points, 10, 30, 24, this.colors.fill, this.colors.outline, 1);
        else textout(canvas, font2, "It's over 9000!", 10, 30, 24, this.colors.fill, this.colors.outline, 1);
    }

    renderTimer() {
        textout(canvas, font2, Math.floor(game.frames / 3600.0) + ':' + (Math.floor(game.frames / 60.0) % 60).toString().padStart(2, '0'), 550, 30, 24, this.colors.fill, this.colors.outline, 1);
    }
}
