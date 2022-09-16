// Make 3x3 grid.
// Take turns.
// Make a computer vs player and player vs player mode.
//"X" and "O" variables
// Add form to input player names and have it state who's turn it is
// Win condition align three in a row, column, or diagonally.
// Tie if board is filled up and win condition is not met.
// Game is finshed and make reset button.







// ********************************************************** Global Variables***************************************** 
const box = document.querySelectorAll(".box");
const gameStatus = document.querySelector("#gameStatus");
const reset = document.querySelector("#reset");
const winningCombos = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8], 
    [3, 4, 5],
    [6, 7, 8],
    ];
let board = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
let currentPlayer = "X";
let active = false;
// const playerTurnElem = document.querySelector ("#playerTurn");
// ^ this is for adding player turn later


//*******************************************************************Functions******************************************

initializeGame();
//need function to initialize game
//for each box, add event listener that listens for a click and invokes the funcion "boxClicked"
//update status of game in game status box whose turn is it or if they won.
//also need to make the game state active.
function initializeGame(){
    active = true;
    box.forEach(box => box.addEventListener("click", boxClicked));
    reset.addEventListener("click", resetGame);
    gameStatus.textContent = `It is ${currentPlayer}'s turn`;
}


//obtain index number of each box with getAttribute, using "this" will refer to the individual box that was clicked on.
//if the board at "boxIndex" (this specific box) is not empty or the game is not active, return/do nothing.
//else, run the updateBox function.
//check winner after each box is clicked.
function boxClicked() {
    const boxIndex = this.getAttribute("boxIndex");
    if (board[boxIndex] != '' || !active) {
        console.log("if statement");
        return; 
        ;
    }
    else {updateBox(this, boxIndex)
         console.log("else statement")};
    checkWinner();
    console.log("clicked");
}

//take the board at a certain box = to "X" for now I set it to X. Get game working first then add player names after.
function updateBox (box, index) {
    box.textContent += currentPlayer 
    board[index] = currentPlayer;
    console.log(currentPlayer);
}

//Take current player, if current player is equal to "X", re-assign current player to "O", otherwise "X"
function changePlayer() {
    currentPlayer = (currentPlayer =="X") ? "O" : "X";
    gameStatus.textContent = `It is ${currentPlayer}'s turn`
} 

//loop through win conditions, store each win condition into variables and loop through them to check for win conditions.
//if there is no spaces left on board need to make a tie. if no one has won and there is still empty boxes, continue game.
function checkWinner() {
 let gameWon = false; 
    for (let i = 0; i<winningCombos.length; i++) {
        const condition = winningCombos[i];
        const boxA= board[condition[0]];
        const boxB= board[condition[1]];
        const boxC= board[condition[2]];
//if boxA, boxB, or boxC has an empty space, continue game.
        if(boxA == '' || boxB == '' || boxC == ''){
            continue;
        }
//make sure theyre all same characters and see who won.
        if(boxA == boxB && boxB == boxC){
            gameWon = true;
            break;
        }
    }

//if the game has been won, display who won the game. 
    if (gameWon) {
        gameStatus.textContent = `${currentPlayer} has won the game!`
        active=false
    }
//if there are no empty spaces on the board, it is a tie and make the game inactive.    
    else if (!board.includes('')) {
        gameStatus.textContent = `It's a tie! Please reset the game and try again.`;
        running = false
    }
//if there are empty spaces and the winning conditions have not been met, change player and continue.
    else {
        changePlayer();
    }
}
function resetGame() {
    currentPlayer = "X";
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
        ];
    gameStatus.textContent = `Game has been reset it is ${currentPlayer}'s turn`;
    box.forEach(box => box.textContent='');
    active = true;
}
