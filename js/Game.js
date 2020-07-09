import Player from './Player.js';
import Interface from './Interface.js';
import Boxes from './boxes/Boxes.js';
import MirrorPad from './MirrorPad.js';
import Pause from './Pause.js';

class Game {
    constructor() {
        allegro_init_all('game_canvas', 640 * px, 480 * px);
        window.font2 = load_font('Bullpen3D.ttf');
        this.points = 0;
        this.frames = 0;
        this.player = new Player();
        this.interface = new Interface();
        this.clearAlpha = 255;
        this.fallingBoxFillAlpha = 255;
        this.boxes = new Boxes();
    }

    start() {
        this.frames = 0;
        this.boxes.spawn();
        this.mirrorPad = new MirrorPad();
        this.pause = new Pause();
        window.setInterval(() => {
            _fillstyle(canvas, makecol(255, 255, 255, this.clearAlpha));
            canvas.context.fillRect(0, 0, canvas.w, canvas.h);
            this.update();
            this.render();
        }, BPS_TO_TIMER(60));
        document.getElementById('game_loading').remove();
    }

    update() {
        this.pause.update();
        if (this.pause.paused) return;
        this.player.update();
        this.mirrorPad.update();
        this.boxes.update();
        this.frames++;
        this.clearAlpha = Math.min(this.clearAlpha + 0.5, 255);
        this.clearAlpha = Math.max(this.clearAlpha, 0);
        this.fallingBoxFillAlpha = Math.min(this.fallingBoxFillAlpha + 0.17, 255);
        this.interface.update();
    }

    render() {
        this.boxes.render();
        this.mirrorPad.render();
        this.player.render();
        this.interface.render();
        this.pause.render();
    }
}

window.game = new Game();
game.start();
