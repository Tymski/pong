



var points = 0;

var font2;

var boxes = [];
var boxes_count = 10;
var texts = [];


var particles = [];
var particles_max = 100;
var actual_number_small = 0;

var frames = 0;

function render() {
    for (var i = 0; i < boxes_count; i++) {
        if (texts[i] > 0) {
            texts[i].render();
        }
        boxes[i].render();
    }
    player.render();
    interface.render();
}


function update() {
    frames++;

    player.update();
}

function main() {
  
    return 0;
}
END_OF_MAIN();
