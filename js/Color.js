export default class Color {
    constructor(r = 0, g = 0, b = 0, a = 255) {
        this.setRGB(r, g, b, a);
    }

    setRGB(r, g, b, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    add(color) {
        this.r += color.r;
        this.g += color.g;
        this.b += color.b;
    }

    setAlpha(a){
        this.a = a;
    }

    makecol() {
        return makecol(this.r, this.g, this.b, this.a);
    }
}
