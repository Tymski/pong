import Vector from './Vector.js';
import Color from './Color.js';

export default class Rectangle {
    constructor() {
        this.position = new Vector();
        this.width = {};
        this.width.base = 0;
        this.width.current = 0;
        this.height = {};
        this.height.base = 0;
        this.height.current = 0;
        this.colors = {};
        this.colors.base = new Color();
        this.colors.current = new Color();
    }

    render() {
        rectfill(
            canvas,
            this.position.x - this.width.current / 2,
            this.position.y - this.height.current / 2, 
            this.width.current, 
            this.height.current, 
            this.colors.current
        );
    }

    isColliding(other) {        
        return (
            Math.abs(this.position.x - other.position.x) < this.width.current / 2 + other.width.current / 2 &&
            Math.abs(this.position.y - other.position.y) < this.height.current / 2 + other.height.current / 2
        );
    }

    static render(rectangle, color){
        
        color = color || rectangle.colors.current.makecol();
        rectfill(
            canvas,
            rectangle.position.x - rectangle.width.current / 2,
            rectangle.position.y - rectangle.height.current / 2, 
            rectangle.width.current, 
            rectangle.height.current, 
            color
        );
    }
}
