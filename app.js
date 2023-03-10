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
state.computer = "O";
state.form = document.querySelector(".nameForm");
state.player1Name= "Player 1";
state.player2Name= "Player 2";
state.active = false;


initializeGame();

function initializeGame(){
    state.active = true;
    getPlayerNames();
    state.box.forEach(box => box.addEventListener("click", boxClicked));
    state.reset.addEventListener("click", restartGame);
}


function getPlayerNames () {    
    state.form.addEventListener("submit", function (e) {
      e.preventDefault()
  
      let formdata = new FormData(this);
      state.player1Name = formdata.get("player1Name");
      state.player2Name = formdata.get("player2Name");
      if (state.player1Name == "") {
        state.player1Name = "Player 1";
        state.gameStatus.textContent = `It is ${state.player1Name}'s turn`;
      } else {
        state.gameStatus.textContent = `It is ${state.player1Name}'s turn`;
      }
  
      if (state.player2Name == "") {
        state.player2Name = "Player 2";
      }
    });
  }



  function boxClicked() {
    const boxIndex = this.getAttribute("boxIndex");
    if (state.board[boxIndex] != '' || !state.active) {
        return;   
    } else {
        updateBox(this, boxIndex);
        checkWinner();
        if (state.player2Name.toLowerCase() === "computer") {
            computerMove();
        }
    }
}


function updateBox (box, index) {
    box.textContent += state.currentPlayer; 
    state.board[index] = state.currentPlayer;
}

 


//Take current player, if current player is equal to "X", re-assign current player to "O", otherwise "X"
function changePlayer() {
    state.currentPlayer = (state.currentPlayer == state.player1) ? state.player2 : state.player1;
    if (state.currentPlayer == state.player1) {
        state.gameStatus.textContent = `It is ${state.player1Name}'s turn`;
    } else {
        state.gameStatus.textContent = `It is ${state.player2Name}'s turn`;
    }
}


  function computerMove() {
    let emptyBoxes = [];
    for (let i = 0; i < state.board.length; i++) {
      if (state.board[i] == '') {
        emptyBoxes.push(i);
      }
    }
    if (emptyBoxes.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
      const randomBox = state.box[emptyBoxes[randomIndex]];
      updateBox(randomBox, emptyBoxes[randomIndex]);
    }
    checkWinner();
  }


function checkWinner() {
 let gameWon = false; 
    for (let i = 0; i<winningCombos.length; i++) {
        const condition = winningCombos[i];
        const boxA= state.board[condition[0]];
        const boxB= state.board[condition[1]];
        const boxC= state.board[condition[2]];
        if(boxA == '' || boxB == '' || boxC == ''){
            continue;
        }
        if(boxA == boxB && boxB == boxC){
            gameWon = true;
            break;
        }
    }
    if (gameWon) {
        if(state.currentPlayer == state.player1){
            state.gameStatus.textContent = `${state.player1Name} has won the game! Hit the reset button to play again!`;
        }
        else{
            state.gameStatus.textContent = `${state.player2Name} has won the game! Hit the reset button to play again!`;
        }

        state.active=false
    }  
    else if (!state.board.includes('')) {
        state.gameStatus.textContent = `It's a tie! Please reset the game and try again.`;
        state.active = false;
    }
    else {
        changePlayer();
    }
    }

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