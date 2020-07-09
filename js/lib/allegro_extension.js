function rectfillScaled(bitmap, x1, y1, w, h, colour) {
    rectfill(bitmap, x1 * px, y1 * px, w * px, h * px, colour);
}

function rectScaled(bitmap, x1, y1, w, h, colour, width) {
    rect(bitmap, x1 * px, y1 * px, w * px, h * px, colour, width * px);
}

function textoutScaled(bitmap, font, text, x, y, size, colour, outline, width) {
    textout(bitmap, font, text, x * px, y * px, size * px, colour, outline, width * px);
}

function textout_centreScaled(bitmap, font, text, x, y, size, colour, outline, width) {
    textout_centre(bitmap, font, text, x * px, y * px, size * px, colour, outline, width * px);
}

function install_pointer() {
    game_canvas.addEventListener('pointerdown', pointerDown);
    game_canvas.addEventListener('pointermove', pointerMove);
    game_canvas.addEventListener('pointerup', pointerUp);

    pointerIsDown = false;

    function pointerDown(event) {
        pointerIsDown = true;
        mouse_b = 1; // TODO: to be compatible with allegro use bit mask instead
        mouse_x = event.offsetX;
        mouse_y = event.offsetY;
    }

    function pointerMove(event) {
        if (!pointerIsDown) return;
        mouse_b = 1;
        mouse_x = event.offsetX;
        mouse_y = event.offsetY;
    }

    function pointerUp() {
        pointerIsDown = false;
        mouse_b = 0;
    }
}
install_pointer();

function uninstall_pointer() {
    game_canvas.removeEventListener('pointerdown', pointerDown);
    game_canvas.removeEventListener('pointermove', pointerMove);
    game_canvas.removeEventListener('pointerup', pointerUp);
}
