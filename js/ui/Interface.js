import Color from '../Color.js';
import ScoreText from './ScoreText.js';
import TimerText from './TimerText.js';
import BoxesText from './BoxesText.js';

export default class Interface {
    constructor() {
        this.textColors = {};
        this.textColors.fill = new Color(190, 240, 180);
        this.textColors.outline = new Color(50, 50, 50);

        this.scoreText = new ScoreText();
        this.timerText = new TimerText();
        this.boxesText = new BoxesText();
    }

    showBoxCounter() {
        this.boxesText.show();
    }

    hideBoxCounter() {
        this.boxesText.hide();
    }

    render() {
        this.scoreText.render(this.textColors);
        this.timerText.render(this.textColors);
        this.boxesText.render(this.textColors);
    }

    update() {
        this.boxesText.update();
    }
}
