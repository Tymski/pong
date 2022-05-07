import BoxWithPoints from './BoxWithPoints.js';
import BoxWithExpand from './BoxWithExpand.js';
import BoxWithEye from './BoxWithEye.js';
import BoxWithSpeed from './BoxWithSpeed.js';
import BoxWithBox from './BoxWithBox.js';
import BoxWithReverse from './BoxWithReverse.js';
import BoxWithSlow from './BoxWithSlow.js';
import BoxWithMirrorPad from './BoxWithMirrorPad.js';
import Box from './Box.js';

export default class Boxes {
    constructor() {
        this.boxTypes = [];
        this.boxTypes.push(new BoxWithExpand());
        this.boxTypes.push(new BoxWithSpeed());
        this.boxTypes.push(new BoxWithEye());
        this.boxTypes.push(new BoxWithReverse());
        this.boxTypes.push(new BoxWithSlow());
        this.boxTypes.push(new BoxWithBox());
        this.boxTypes.push(new BoxWithMirrorPad());
        this.defaultBoxType = new BoxWithPoints();
        this.r = 0;
    }

    spawn() {
        this.boxes = this.addObjects([], Box, 10);
    }

    spawnOneBox() {
        this.boxes.push(new Box());
    }

    nextBoxType() {
        this.r = Math.random();
        for (let i = 0; i < this.boxTypes.length; i++) {
            const boxType = this.boxTypes[i];
            if (this.checkProbability(boxType)) return boxType;
        }
        return this.defaultBoxType;
    }

    checkProbability(boxType) {
        if (this.r < boxType.probability) {
            return true;
        } else {
            this.r -= boxType.probability;
        }
        return false;
    }

    addObjects(array, Type, count) {
        for (let i = 0; i < count; i++) {
            array.push(new Type());
        }
        return array;
    }

    update() {
        this.boxes.forEach((box) => box.update());
    }

    render() {
        this.boxes.forEach((box) => box.render());
    }
}