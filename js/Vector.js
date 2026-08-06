export default class Vector {
    constructor(x = 0, y = 0) {
        this.setXY(x, y);
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    set({ x, y }) {
        this.x = x;
        this.y = y;
        return this;
    }

    add({ x, y }) {
        this.x += x;
        this.y += y;
        return this;
    }

    add(x, y){
        this.x += x;
        this.y += y;
        return this;
    }

    divide(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    normalize() {
        return this.divide(this.magnitude());
    }

    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}
