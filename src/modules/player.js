import Gameboard from "./gameboard";

export default class Player {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.gameboard = new Gameboard();
    }
}