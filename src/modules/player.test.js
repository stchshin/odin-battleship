import Player from './player.js'

test('Creates player', () => {
  expect(new Player('Test', 'Human')).toBeInstanceOf(Player);
});
