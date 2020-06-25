export default class Vector {
    constructor(x = 0, y = 0) {
        this.setXY(x, y);
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
    }

    set({ x, y }) {
        this.x = x;
        this.y = y;
    }

    add({ x, y }) {
        this.x += x;
        this.y += y;
    }

    divide(scalar) {
        return new Vector(this.x / scalar, this.y / scalar);
    }

    normal() {
        return this.divide(this.magnitude());
    }

    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}
