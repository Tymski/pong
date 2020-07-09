export default class Pause {
    constructor() {
        this.paused = true;
        this.textSize = 35 * px;
        this.frames = 0;
    }

    unpauseInput() {
        if (key[KEY_LEFT]) return true;
        if (key[KEY_RIGHT]) return true;
        if (key[KEY_A]) return true;
        if (key[KEY_D]) return true;
        if (key[KEY_SPACE]) return true;
        if (key[KEY_ENTER]) return true;
        if (key[KEY_ENTER_PAD]) return true;
        if (mouse_b & 1) return true;
        return false;
    }

    update() {
        this.frames++;
        if (key[KEY_P] || key[KEY_PAUSE]) {
            this.paused = true;
        }
        if (this.unpauseInput()) {
            this.paused = false;
        }
        this.textSize = (35 + 5 * Math.sin(this.frames / 10)) * px;
    }

    render() {
        if (!this.paused) return;
        textout_centre(canvas, font2, 'Paused', SCREEN_W / 2, SCREEN_H / 2, this.textSize, makecol(255, 0, 0, 150), makecol(0, 0, 0, 150), 1 * px);
    }
}
