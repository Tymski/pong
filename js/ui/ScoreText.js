import CachedValueString from './CachedValueString.js';

export default class ScoreText {
    constructor() {
        this.scoreString = new CachedValueString();
        this.scoreString.createString = this.createString;
    }

    createString(points) {
        if (points <= 500) return 'Score: ' + points;
        if (points < 1000) return 'Nice score: ' + points;
        if (points < 5000) return 'Amazing score: ' + points;
        if (points <= 9000) return 'Mad score: ' + points;
        return "It's over 9000";
    }

    render(colors) {
        textoutScaled(canvas, font2, this.scoreString.getString(game.points), 10, 30, 24, colors.fill.makecol(), colors.outline.makecol(), 1);
    }
}
