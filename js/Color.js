export default class Color {
    constructor(r = 0, g = 0, b = 0, a = 255) {
        this.setRGB(r, g, b, a);
    }

    setRGB(r, g, b, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        return this;
    }

    set(color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.a = color.a;
        return this;
    }

    add(color) {
        this.r += color.r;
        this.g += color.g;
        this.b += color.b;
        return this;
    }

    subtract(color) {
        this.r -= color.r;
        this.g -= color.g;
        this.b -= color.b;
        return this;
    }

    multiply(scalar) {
        this.r *= scalar;
        this.g *= scalar;
        this.b *= scalar;
        return this;
    }

    divide(scalar) {
        this.r /= scalar;
        this.g /= scalar;
        this.b /= scalar;
        return this;
    }

    setAlpha(a) {
        this.a = a;
    }

    makecol() {
        return makecol(this.r, this.g, this.b, this.a);
    }

    copy() {
        return new Color(this.r, this.g, this.b, this.a);
    }

    invert() {
        this.r = 255 - this.r;
        this.g = 255 - this.g;
        this.b = 255 - this.b;
    }
}