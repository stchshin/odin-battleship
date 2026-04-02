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

export function clickGameboard(player, gameState) {
    document.querySelector(`[data-gbplayer="${player.type}"]`).addEventListener('click', function(event) {
        if (gameState.turn == player.type) {
            let target = event.target.closest('.grid');
            if (target) {
                let x = target.getAttribute('data-x');
                let y = target.getAttribute('data-y');
                try {
                    let result = player.gameboard.receiveAttack([x, y]);
                    let status;
                    if (player.gameboard.grid[x][y] == 'hit') {
                        status = true;
                    } else {
                        status = false;
                    }
                    updateGameboard(player, [x, y], status);
                    // Change turns
                    if (gameState.turn == 'Human') {
                        gameState.turn = 'Computer';
                    } else {
                        gameState.turn = 'Human';
                    }
                    // Game over (win!)
                    if (result === true) {
                        console.log('done');
                    }
                } catch (error) {
                    console.log('There was an error...');
                }
            }
        }
    })
}

export function updateGameboard(player, coordinate, status) {
    // Find player's gameboard and the grid to change
    let gameboard = document.querySelector(`[data-gbplayer=${player.type}]`);
    let grid = gameboard.querySelector(`[data-x="${coordinate[0]}"][data-y="${coordinate[1]}"]`);
    if (status == true) {
        grid.style.backgroundColor = '#d6feff';
    } else {
        grid.style.backgroundColor = '#ffe8f5';
    }
}