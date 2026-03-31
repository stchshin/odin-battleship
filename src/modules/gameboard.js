import ship from './ship.js'

export default class Gameboard {
    constructor(n=10) {
        this._grid = [];
        for (let i = 0; i < n; i++) {
            this._grid.push(Array(n).fill(null));
        }
        this._missedAttacks = [];
        this._ships = [];
    }

    placeAvailability(length, coordinate, direction='horizontal') {
        if (direction == 'horizontal') {
            for (let i = 0; i < length; i++) {
                if (this._grid[coordinate[0]][coordinate[1] + i] != undefined || coordinate[1] + i > this.grid.length || coordinate[1] + i < 0) {
                    return false;
                }
            }
            return true;
        } else {
            for (let i = 0; i < length; i++) {
                if (this._grid[coordinate[0] + i][coordinate[1]] != undefined || coordinate[0] + i > this.grid.length || coordinate[0] + i < 0) {
                    return false;
                }
            }
            return true;
        }
    }

    place(ship, coordinate, direction='horizontal') {
        if (this.placeAvailability(ship.length, coordinate, direction)) {
            if (direction == 'horizontal') {
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
        if (this.grid[coordinate[0]][coordinate[1]]) {
            if (this.grid[coordinate[0]][coordinate[1]] != 'hit') {
                const shipId = this.grid[coordinate[0]][coordinate[1]];
                const attackedShip = this._ships.find(ship => ship.id == shipId);
                attackedShip.hit();
                this._grid[coordinate[0]][coordinate[1]] = 'hit';
            }
            else {
                throw new Error('This grid has been attacked already')
            }
        } else {
            this._missedAttacks.push(coordinate);
        }
        // Report if all ships have been sunk
        this.checkAllShips();
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
}