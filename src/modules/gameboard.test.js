import Gameboard from './gameboard.js'
import Ship from './ship.js'

test('Creates gameboard', () => {
  expect(new Gameboard()).toBeInstanceOf(Gameboard);
});

test('Places ship', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(4);
    gameboard.place(ship, [1, 1]);
    expect(gameboard.placeAvailability(ship.length, [1, 1])).toBe(false);
})

test('Catches unavailable grids', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(5);
    expect(() => {
        gameboard.place(ship, [1, 8])
    }).toThrow('Cannot place ships here');
})

test('Attacks grids', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(5);
    gameboard.place(ship, [0, 0]);
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.grid[0][0]).toBe('hit');
})

test('Misses attacks', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(5);
    gameboard.place(ship, [0, 0]);
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([5, 2]);
    expect(gameboard.missedAttacks.length).toBe(1);
})

test('Catches previously attacked grids', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(5);
    gameboard.place(ship, [0, 0]);
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.receiveAttack([0, 0])).toBe(false);
})

test('Reports whether all ships have been sunk', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(5);
    gameboard.place(ship, [0, 0]);
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);
    gameboard.receiveAttack([0, 2]);
    gameboard.receiveAttack([0, 3]);
    gameboard.receiveAttack([0, 4]);
    expect(gameboard.checkAllShips()).toBe(true);
})