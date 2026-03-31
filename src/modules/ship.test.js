import Ship from './ship.js'

test('Creates ship', () => {
  expect(new Ship(5)).toBeInstanceOf(Ship);
});

test('Increases hit count', () => {
    const ship = new Ship(4);
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
})

test('Checks ship id', () => {
    const ship = new Ship(3);
    expect(ship.id).toBeTruthy();
})

test('Checks ship status', () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
})

test('Checks ship length', () => {
    const ship = new Ship(4);
    expect(ship.length).toBe(4);
})