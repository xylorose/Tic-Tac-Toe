/* 
We store our game status element here to allow us to more easily use it later on
*/
const statusDisplay = document.querySelector('.game--status');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["","","","","","","","",""];
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

/**
 we set the intial message to let the players know whose turn it is
 */
statusDisplay.innerHTML = currentPlayerTurn();
function handleCellPlayed(clickedCell, clickedCellIndex){
/*update internal game state to reflect the player's move */
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
function handlePlayerChange(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handleResultValidation(){
    let roundWon = false;
    for (let i=0; i<= 7; i++){
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if(a === '' || b === '' || c === ''){
            continue;
        }
        if(a === b && b === c){
            roundWon = true;
            break
        }
    }
if(roundWon){
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
}
    let roundDraw = !gameState.includes("");
    if(roundDraw){
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}
function handleCellClick(clickedCellEvent) {
/*here we will save the clicked html element in a variable for easier further use*/
    const clickedCell = clickedCellEvent.target;

/* here we will grab the data-cell-index attribute*/
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );
/*we need to check whether the call has already been played, or if the game is paused */

    if(gameState[clickedCellIndex] !== "" || !gameActive){
        return;
    }
/*if everthing if in order we will proceed with game flow */
    handleCellPlayed(clickedCell,clickedCellIndex);
    handleResultValidation();
}


function handleRestartGame(){
    gameActive = true;
    currentPlayer = "X";
    gameState = ["","","","","","","","",""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");

}
/*
 and finally we add our event listeners to the actual game cells, as well
 as our restart button
 */
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click',handleRestartGame);