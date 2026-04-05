import ship from './ship.js'

export default class Gameboard {
    constructor() {
        this._grid = [];
        for (let i = 0; i < 10; i++) {
            this._grid.push(Array(10).fill(null));
        }
        this._missedAttacks = [];
        this._ships = [];
    }

    placeAvailability(length, coordinate, direction='Horizontal') {
        if (direction == 'Horizontal') {
            for (let i = 0; i < length; i++) {
                if (this._grid[coordinate[0]][coordinate[1] + i] != undefined || coordinate[1] + i >= this.grid.length || coordinate[1] + i < 0) {
                    return false;
                }
            }
            return true;
        } else {
            for (let i = 0; i < length; i++) {
                if (this._grid[coordinate[0] + i][coordinate[1]] != undefined || coordinate[0] + i >= this.grid.length || coordinate[0] + i < 0) {
                    return false;
                }
            }
            return true;
        }
    }

    place(ship, coordinate, direction='Horizontal') {
        if (this.placeAvailability(ship.length, coordinate, direction)) {
            if (direction == 'Horizontal') {
                for (let i = 0; i < ship.length; i++) {
                    this._grid[coordinate[0]][coordinate[1] + i] = ship.id;
                }
            }
            else {
                for (let i = 0; i < ship.length; i++) {
                    this._grid[coordinate[0] + i][coordinate[1]] = ship.id;
                }
            }
            this._ships.push(ship);
        } else {
            throw new Error('Cannot place ships here');
        }
    }

    receiveAttack(coordinate) {
        // Something exists on grid (ship / hit / miss)
        if (this.grid[coordinate[0]][coordinate[1]] != null) {
            // Hit or miss - has been clicked already
            if (this.grid[coordinate[0]][coordinate[1]] == 'hit' || this.grid[coordinate[0]][coordinate[1]] == 'miss') {
                return false;
            } else {
                // Ship has not been hit already
                const shipId = this.grid[coordinate[0]][coordinate[1]];
                const attackedShip = this._ships.find(ship => ship.id == shipId);
                attackedShip.hit();
                this._grid[coordinate[0]][coordinate[1]] = 'hit';
            }
        // Empty grid
        } else {
            this._missedAttacks.push(coordinate);
            this._grid[coordinate[0]][coordinate[1]] = 'miss';
        }
        // Report if all ships have been sunk
        if (this.checkAllShips()) {
            return true;
        };
    }

    checkAllShips() {
        for (let ship of this._ships) {
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }

    get grid() {
        return this._grid;
    }

    get missedAttacks() {
        return this._missedAttacks;
    }

    get ships() {
        return this._ships;
    }
}