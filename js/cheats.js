function spawn(numberOfBoxes = 10) {
    let b = game.boxes;
    for (let i = 0; i < numberOfBoxes; i++) {
        b.spawnOneBox();
    }
}

function elongate(width = 1000) {
    game.player.width.current = width;
}

function points(p = 1000) {
    game.points += p;
}

function timePlus(seconds = 250) {
    game.frames += 60 + seconds * 60;
}

function trail() {
    game.clearAlpha = 0;
}

function theOne() {
    spawn(10);
    elongate(200);
    points(500);
    trail();
    timePlus(200);
}
