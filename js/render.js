px = 1; // Scale of a "pixel"

// Original dimentions
const WIDTH = 640;
const HEIGHT = 480;

function fitGameInBody() {
    let widthScale = body.clientWidth / WIDTH;
    let heightScale = body.clientHeight / HEIGHT;
    newScale = Math.min(widthScale, heightScale);
    scale(newScale);
}

function scale(newScale) {
    px = 1 * newScale;
    game_canvas.width = WIDTH * newScale;
    game_canvas.height = HEIGHT * newScale;
    if (typeof canvas == 'undefined') return;
    canvas.w = game_canvas.width;
    canvas.h = game_canvas.height;
}

fitGameInBody();
window.addEventListener('resize', fitGameInBody);
