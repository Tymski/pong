import Player from './Player.js';
import Box from './Box.js';
import Interface from './Interface.js';
import Vector from './Vector.js';

class Game {
    constructor() {
        allegro_init_all('game_canvas', 640, 480);
        window.font2 = load_font('Bullpen3D.ttf');
        this.points = 0;
        this.frames = 0;
        this.player = new Player();
        this.interface = new Interface();
        this.boxes = this.addObjects([], Box, 10);
        this.player.width.current = 999;
    }

    addObjects(array, Type, count) {
        for (let i = 0; i < count; i++) {
            array.push(new Type());
        }
        return array;
    }

    start() {
        window.setInterval(() => {
            clear_to_color(canvas, makecol(255, 255, 255));
            // _fillstyle(canvas,makecol(255,255,255,125));
            // canvas.context.fillRect(0,0,canvas.w,canvas.h);
            this.update();
            this.render();
        }, BPS_TO_TIMER(60));
    }

    update() {
        this.boxes.forEach(box => box.update());
        this.player.update();
        this.frames++;
    }
    
    render() {
        this.boxes.forEach(box => box.render());
        this.player.render();
        this.interface.render();
    }
}

window.game = new Game();
game.start();

window.Vector = Vector;