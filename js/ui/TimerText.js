import CachedValueString from './CachedValueString.js';

export default class TimerText {
    constructor() {
        this.timerCachedString = new CachedValueString();
        this.timerCachedString.createString = this.createString;
    }

    getTimeInSeconds() {
        return Math.floor(game.time / 60.0);
    }

    createString(timeInSeconds) {
        var m = Math.floor(timeInSeconds / 60.0);
        var s = (timeInSeconds % 60).toString().padStart(2, '0');
        return m + ':' + s;
    }

    render(colors) {
        var str = this.timerCachedString.getString(this.getTimeInSeconds());
        textoutScaled(canvas, font2, str, SCREEN_W - 10 - str.length * 15, 30, 24, colors.fill.makecol(), colors.outline.makecol(), 1);
    }
}
