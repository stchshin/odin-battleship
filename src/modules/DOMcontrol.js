import Player from "./player.js";

export function createGameboard(player, parentContainer) {
    // Create new gameboard
    let gameboardDiv = document.createElement("div");
    gameboardDiv.setAttribute('data-gbplayer', player);
    gameboardDiv.classList.add("gameboard");
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let grid = document.createElement("div");
            grid.classList.add('grid');
            grid.setAttribute('data-x', i);
            grid.setAttribute('data-y', j);
            gameboardDiv.append(grid);
        }
    }
    parentContainer.append(gameboardDiv);
    return gameboardDiv;
}

export function clickGameboard(attacker, defender, gameState) {
    document.querySelector(`[data-gbplayer="${defender.type}"]`).addEventListener('click', function(event) {
        if (gameState.turn == attacker.type) {
            let target = event.target.closest('.grid');
            if (target) {
                let x = target.getAttribute('data-x');
                let y = target.getAttribute('data-y');
            
                let result = defender.gameboard.receiveAttack([x, y]);
                // Grid has been clicked already
                if (result == false) {
                    return;
                }

                // Update game UI
                let status;
                if (defender.gameboard.grid[x][y] == 'hit') {
                    status = true;
                } else {
                    status = false;
                }
                updateGameboard(defender, [x, y], status, gameState);
                // Game over (win!)
                if (result === true) {
                    let winner;
                    if (gameState.turn == 'Human') {
                        winner = 'Player';
                    } else {
                        winner = 'Computer';
                    }
                    document.querySelector('#result').textContent = `(*^ω^*) ${winner} wins!(*^▽^*)`;

                    // New game
                    let startAgain = document.createElement("p");
                    startAgain.textContent = '→ New Game☽˚｡⋆'
                    document.querySelector('#result').append(startAgain);
                    startAgain.addEventListener('click', function() {
                        location.reload();
                    })

                    gameState.gameOver = true;
                    return;
                }
                // Change turns
                if (gameState.turn == 'Human') {
                    gameState.turn = 'Computer';
                    document.querySelector('#turn').textContent = gameState.turn;
                    setTimeout(() => computerClick(gameState), 600);
                } else {
                    gameState.turn = 'Human';
                    document.querySelector('#turn').textContent = gameState.turn;
                }
            
            }
        }
    })
}

function updateGameboard(defender, coordinate, status, gameState) {
    // Find player's gameboard and the grid to change
    if (gameState.gameOver == false) {
        let gameboard = document.querySelector(`[data-gbplayer=${defender.type}]`);
        let grid = gameboard.querySelector(`[data-x="${coordinate[0]}"][data-y="${coordinate[1]}"]`);
        if (status == true) {
            grid.style.backgroundColor = '#d6feff';
        } else {
            grid.style.backgroundColor = '#ffe8f5';
        }
    }
}

function computerClick(gameState) {
    // Computer clicks randomly
    if (gameState.turn == 'Computer') {
        let index = Math.floor(Math.random() * gameState.availableGrids.length);
        let coordinate = gameState.availableGrids[index];
        gameState.availableGrids.splice(index, 1);
        let grid = document.querySelector(`[data-gbplayer="Human"]`).querySelector(`[data-x="${coordinate[0]}"][data-y="${coordinate[1]}"]`);
        grid.click();
    }
}