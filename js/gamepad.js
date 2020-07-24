// Support for one connected gamepad

getGamepads = navigator.getGamepads || navigator.webkitGetGamepads;

function getGamepadX() {
    if (!getGamepads) return 0;
    const gamepad = getGamepads.call(navigator)[0];
    if (!gamepad) return 0;

    let value = gamepad.axes[0];

    // Some controllers return near zero values instead of zero (mine returns -0.003921568393707275)
    // Zero them out to avoid drifting
    if (value > 0 && value < 0.01) value = 0;
    if (value < 0 && value > -0.01) value = 0;

    return value;
}
