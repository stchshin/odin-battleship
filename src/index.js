import "./styles.css";
import { createGameboard, clickGameboard, updateGameboard } from "./modules/DOMcontrol.js";
import Player from "./modules/player.js";
import Ship from "./modules/ship.js";

function newGame() {
    // Start a new game with player & computer
    let boardsContainer = document.createElement("div");
    boardsContainer.classList.add("boardsContainer");
    let player = new Player('Human');
    let computer = new Player('Computer');

    let playerBoardContainer = document.createElement("div");
    let computerBoardContainer = document.createElement("div");
    createGameboard(player.type, playerBoardContainer);
    createGameboard(computer.type, computerBoardContainer);

    let playerName = document.createElement("div");
    playerName.classList.add('name');
    playerName.textContent = '-ˋˏ༻Player༺ˎˊ-';
    playerName.style.color = '#4479ab';
    let computerName = document.createElement("div");
    computerName.classList.add('name');
    computerName.textContent = '✶.•*Computer*•.✦';
    computerName.style.color = '#bd609f';
    
    playerBoardContainer.append(playerName);
    computerBoardContainer.append(computerName);
    boardsContainer.append(playerBoardContainer, computerBoardContainer);
    document.querySelector('#container').append(boardsContainer);

    let gameState = {'turn': 'Human'};
    clickGameboard(player, gameState);
    clickGameboard(computer, gameState);

    // Temporary code
    let ship1 = new Ship(5);
    let ship2 = new Ship(4)
    let ship3 = new Ship(3);
    let ship4 = new Ship(3);
    let ship5 = new Ship(2);
    player.gameboard.place(ship1, [1, 1]);
    player.gameboard.place(ship2, [3, 4]);
    player.gameboard.place(ship3, [7, 3]);
    player.gameboard.place(ship4, [8, 3]);
    player.gameboard.place(ship5, [5, 3]);
    // updateGameboard(player.type, [0, 1], false);
}

document.addEventListener('DOMContentLoaded', function() {
    newGame();
})
