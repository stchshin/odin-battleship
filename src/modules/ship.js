export default class Ship {
    constructor(length) {
        this._id = crypto.randomUUID();
        this._length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        this.hits++;
        if (this.length == this.hits) {
            this.sunk = true;
        }
    }

    isSunk() {
        return this.sunk;
    }

    get id() {
        return this._id;
    }

    get length() {
        return this._length;
    }
}