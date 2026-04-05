import "./styles.css";
import { createGameboard, clickGameboard } from "./modules/DOMcontrol.js";
import Player from "./modules/player.js";
import Ship from "./modules/ship.js";

function computerPlace(gameState) {
    let ship0 = new Ship(5);
    let ship1 = new Ship(4);
    let ship2 = new Ship(3);
    let ship3 = new Ship(3);
    let ship4 = new Ship(2);
    let ships = [ship0, ship1, ship2, ship3, ship4];

    for (let ship of ships) {
        while (true) {
            try {
                let x = Math.floor(Math.random(0, 1) * 10);
                let y = Math.floor(Math.random(0, 1) * 10);
                let randomNumber = Math.floor(Math.random(0, 1) * 2);
                let direction = randomNumber == 0 ? 'Horizontal' : 'Vertical';
                gameState.computer.gameboard.place(ship, [x, y], direction);
                break;
            } catch(error) {
            }
        }
    }
    console.log(gameState.computer.gameboard);
}

function placeShip(gameState, ships, button, resolve) {
    // Using closures
    return function actualPlacing(event) {
        let target = event.target.closest('.grid');
        try {
            // Place ship on actual object
            let ship = ships[button.dataset.index];
            let direction = document.querySelector('select').value;
            gameState.player.gameboard.place(ship, [Number(target.dataset.x), Number(target.dataset.y)], direction);
            button.style.backgroundColor = '#d6feff';

            // Remove event listener
            event.currentTarget.removeEventListener('click', actualPlacing);

            // Place ship on visual grid
            if (direction == 'Horizontal') {
                for (let i = 0; i < ship.length; i++) {
                    let grid = event.currentTarget.querySelector(`[data-x="${Number(target.dataset.x)}"][data-y="${Number(target.dataset.y) + i}"]`);
                    grid.style.backgroundColor = '#e1e1e1';
                }
            }
            else {
                for (let i = 0; i < ship.length; i++) {
                    let grid = event.currentTarget.querySelector(`[data-x="${Number(target.dataset.x) + i}"][data-y="${Number(target.dataset.y)}"]`);
                    grid.style.backgroundColor = '#e1e1e1';
                }
            }
        } catch (error) {
        }

        if (gameState.player.gameboard.ships.length == 5) {
            resolve();
        }
    }
}

function placeShips(choiceDiv, gameState) {
    return new Promise((resolve) => {
        let ship0 = new Ship(5);
        let ship1 = new Ship(4);
        let ship2 = new Ship(3);
        let ship3 = new Ship(3);
        let ship4 = new Ship(2);
        let ships = [ship0, ship1, ship2, ship3, ship4];

        // Show available ships
        for (let i = 0; i < ships.length; i++) {
            let ship = ships[i];
            let choiceButton = document.createElement("div");
            choiceButton.classList.add('choiceButton');
            choiceButton.setAttribute('data-index', i);
            choiceButton.textContent = `Ship: ${ship.length}`;
            choiceDiv.append(choiceButton);
        }

        document.querySelectorAll('.choiceButton').forEach(button => button.addEventListener('click', function() {
            button.style.borderColor = '#525252';
            button.style.borderStyle = 'solid';
            // Closure for removing event listeners later
            const placeShipOnBoard = placeShip(gameState, ships, button, resolve);
            document.querySelector(`[data-gbplayer="Human"]`).addEventListener('click', placeShipOnBoard);
        }, { once: true }))
    })
}

async function newGame() {
    // Start a new game with player & computer
    let boardsContainer = document.createElement("div");
    boardsContainer.classList.add("boardsContainer");

    // Player (human)
    let player = new Player('Human');
    let playerBoardContainer = document.createElement("div");
    createGameboard(player.type, playerBoardContainer);
    let playerName = document.createElement("div");
    playerName.classList.add('name');
    playerName.textContent = '-ˋˏ༻Player༺ˎˊ-';
    playerName.style.color = '#4479ab';
    playerBoardContainer.append(playerName);
    boardsContainer.append(playerBoardContainer);
    document.querySelector('#container').append(boardsContainer);

    // Initialise gameState
    let gameState = {'turn': 'Human', 'gameOver': false, 'player': player };

    // Player places ships
    let choiceDiv = document.createElement("div");
    choiceDiv.classList.add('choiceDiv');

    let typeButtons = document.createElement("select");
    let horizontal = document.createElement("option");
    horizontal.textContent = `Horizontal`;
    let vertical = document.createElement("option");
    vertical.textContent = `Vertical`;
    typeButtons.append(horizontal, vertical);

    choiceDiv.append(typeButtons);
    boardsContainer.append(choiceDiv);
    // Wait until player places all ships
    await placeShips(choiceDiv, gameState);

    // Computer
    let computer = new Player('Computer');
    let computerBoardContainer = document.createElement("div");
    createGameboard(computer.type, computerBoardContainer);    
    let computerName = document.createElement("div");
    computerName.classList.add('name');
    computerName.textContent = '✶.•*Computer*•.✦';
    computerName.style.color = '#bd609f';
    computerBoardContainer.append(computerName);
    
    boardsContainer.append(computerBoardContainer);
    boardsContainer.removeChild(choiceDiv);

    // Place ships on computer
    gameState['computer'] = computer;
    computerPlace(gameState);

    // Array of grids computer can choose from
    let gridsArray = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            gridsArray.push([i, j]);
        }
    }
    gameState['availableGrids'] = gridsArray;


    // Start game
    document.querySelector('#start').style.display = 'none';
    document.querySelector('#result').style.display = 'block';
    clickGameboard(player, computer, gameState);
    clickGameboard(computer, player, gameState);
}

document.addEventListener('DOMContentLoaded', function() {
    newGame();
})
