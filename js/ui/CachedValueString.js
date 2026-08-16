export default class CachedValueString {
    constructor() {
        this.cachedValue = undefined;
        this.cachedString = "";
    }

    getString(currentValue) {
        if (currentValue !== this.cachedValue) {
            this.cachedValue = currentValue;
            this.cachedString = this.createString(currentValue);
        }
        return this.cachedString;
    }

    createString(currentValue){}
}
