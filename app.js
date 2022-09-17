// Make 3x3 grid.
// Take turns.
// Make a computer vs player and player vs player mode.
//"X" and "O" variables
// Add form to input player names and have it state who's turn it is
// Win condition align three in a row, column, or diagonally.
// Tie if board is filled up and win condition is not met.
// Game is finshed and make reset button.







// ********************************************************** Global Variables***************************************** 
const state = {};
state.box = document.querySelectorAll(".box");
state.gameStatus = document.querySelector("#gameStatus");
state.reset = document.querySelector("#reset");
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
state.board = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
state.currentPlayer = "X";
state.player1 = "X";
state.player2 = "O";
state.form = document.querySelector(".nameForm");
state.player1Name= "Player 1";
state.player2Name= "Player 2";
state.active = false;


//*******************************************************************Functions******************************************
//function to get the names of the players from the submission form
//in a player vs player, if you leave one of the forms for player 1 or 2 empty, the default name will be either player 1 or player 2
function getPlayerNames () {    
    state.form.addEventListener("submit", function (e) {
    e.preventDefault() // This prevents the window from reloading
    
    let formdata = new FormData(this);
    state.player1Name = formdata.get("player1Name");
    state.player2Name = formdata.get("player2Name");
    if (state.player1Name == ""){
        state.player1Name = "Player 1";
        state.gameStatus.textContent = `It is ${state.player1Name}'s turn`;
    }
    else {state.player1Name == formdata.get("player1Name")
        state.gameStatus.textContent = `It is ${state.player1Name}'s turn`;
    }
   
    if (state.player2Name == ""){
        state.player2Name = "Player 2";
        state.gameStatus.textContent = `It is ${state.player1Name}'s turn`;
    }
    else {state.player2Name == formdata.get("player1Name")
        state.gameStatus.textContent = `It is ${state.player1Name}'s turn`;
        } 
    }
    )
};
initializeGame();
//need function to initialize game
//for each box, add event listener that listens for a click and invokes the funcion "boxClicked"
//update status of game in game status box whose turn is it or if they won.
//also need to make the game state active.
function initializeGame(){
    state.active = true;
    getPlayerNames();
    if (state.player2Name == "Player 2") {
        computerMove();
    }
    state.box.forEach(box => box.addEventListener("click", boxClicked));
    state.reset.addEventListener("click", restartGame);

}



//obtain index number of each box with getAttribute, using "this" will refer to the individual box that was clicked on.
//if the board at "boxIndex" (this specific box) is not empty or the game is not active, return/do nothing.
//else, run the updateBox function.
//check winner after each box is clicked.
function boxClicked() {
    const boxIndex = this.getAttribute("boxIndex");
    if (state.board[boxIndex] != '' || !state.active) {
        // console.log("if statement");
        return; 
        ;
    }
    else {updateBox(this, boxIndex)
        //  console.log("else statement")};
    checkWinner();
;
}



//take the board at a certain box = to "X" for now I set it to X. Get game working first then add player names after.
function updateBox (box, index) {
    box.textContent += state.currentPlayer; 
    state.board[index] = state.currentPlayer;
}
}



//Take current player, if current player is equal to "X", re-assign current player to "O", otherwise "X"
function changePlayer() {
    state.currentPlayer = (state.currentPlayer == state.player1) ? state.player2 : state.player1;
    if (state.currentPlayer == state.player1){
        state.gameStatus.textContent = `It is ${state.player1Name}'s turn`;
        return;
    }
    else {state.gameStatus.textContent = `It is ${state.player2Name}'s turn`
        return;
    }
  
} 



//loop through win conditions, store each win condition into variables and loop through them to check for win conditions.
//if there is no spaces left on board need to make a tie. if no one has won and there is still empty boxes, continue game.
function checkWinner() {
 let gameWon = false; 
    for (let i = 0; i<winningCombos.length; i++) {
        const condition = winningCombos[i];
        const boxA= state.board[condition[0]];
        const boxB= state.board[condition[1]];
        const boxC= state.board[condition[2]];
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
        if(state.currentPlayer == state.player1)
        {state.gameStatus.textContent = `${state.player1Name} has won the game! Reset to play again`;
        }
        else(state.gameStatus.textContent = `${state.player2Name} has won the game! Reset to play again`)

        state.active=false
    }
//if there are no empty spaces on the board, it is a tie and make the game inactive.    
    else if (!state.board.includes('')) {
        state.gameStatus.textContent = `It's a tie! Please reset the game and try again.`;
        state.active = false;
    }
//if there are empty spaces and the winning conditions have not been met, change player and continue.
    else {
        changePlayer();
    }
}

//
function computerMove() {
    let state.board=[
        '', '', '',
        '', '', '',
        '', '', ''
        ];
    let random;
    cells.forEach(function(cell){
      if (cell.textContent == '') {
        emptyCells.push(cell);
      }
    });
    
    // computer marks a random EMPTY cell
    random = Math.ceil(Math.random() * emptyCells.length) - 1;
    emptyCells[random].textContent = mark;
    checkRow();
    switchMark();
  }
  



//Function for resetting game without refreshing browser.
function restartGame() {
    state.currentPlayer = "X";
    state.board = [
        '', '', '',
        '', '', '',
        '', '', ''
        ];
    state.gameStatus.textContent = `Game has been reset it is ${state.player1Name}'s turn`;
    state.box.forEach(box => box.textContent='');
    state.active = true;
}