const player1 = player("Player #1");
const player2 = player("Player #2");

const ticTacToeBoard = (function() {
    let board = [...Array(3)].map( _ => Array(3).fill(0));
    let turn = "Player1";
    const switchTurn = () => turn = turn === "Player1" ? "Player2" : "Player1";
    const getTurn = () => turn;
    const fillX = (x, y) => board[x][y] = 1;
    const fillO = (x,y) => board[x][y] = -1;
    const displayBoard = () => console.log(board);
    const tileAlreadyFilled = (x,y) => board[x][y] === 0 ? false : true;
    const refreshBoard = () => board = [...Array(3)].map( _ => Array(3).fill(0));
    const checkIfGameOver = () => function() {
        let sum = 0;
        for(let i = 0 ; i < 3 ; i++){
            for(let j = 0 ; j < 3 ; j++){
                sum += Number(board[i][j]);
            }
            if(Number(sum) === 3) {
                return player1;
            } else if(Number(sum) === -3) {
                return player2;
            }
            sum = 0;
        }
        sum = 0;
        for(let i = 0 ; i < 3 ; i++){
            for(let j = 0 ; j < 3 ; j++){
                sum += Number(board[j][i]);
            }
            if(Number(sum) === 3) {
                return player1;
            } else if(Number(sum) === -3) {
                return player2;
            }
            sum = 0;
        }

        let diag1 = board[0][0] + board[1][1] + board[2][2];
        if(Number(diag1) === 3) {
            return player1;
        } else if(Number(diag1) === -3) {
            return player2;
        }

        let diag2 = board[2][0] + board[1][1] + board[0][2];
        if(Number(diag2) === 3) {
            return player1;
        } else if(Number(diag2) === -3) {
            return player2;
        }

        return "NONE";
    }();
    return {fillX, fillO, displayBoard, switchTurn, getTurn, checkIfGameOver, tileAlreadyFilled, refreshBoard};
})();

function player(name){
    let currScore = 0;
    const getScore = () => currScore;
    const increaseScore = () => currScore++;
    const updateName = (updatedName) => name = updatedName;
    const getName = () => name;
    const resetScore = () => currScore = 0;
    return {increaseScore, getScore, updateName, getName, resetScore};
}

function takeTurns(x, y, event) {
    if(ticTacToeBoard.tileAlreadyFilled(x,y)) return;
    if(ticTacToeBoard.getTurn() === "Player1"){
        ticTacToeBoard.fillX(x,y);
        event.innerText = "X";
    } else {
        ticTacToeBoard.fillO(x,y);
        event.innerText = "O";
    }
    event.style.color = "white";
    event.style.fontSize = "3em";
    ticTacToeBoard.switchTurn();
    let winner = ticTacToeBoard.checkIfGameOver();
    if(winner !== "NONE"){
        console.log(winner.getName());
        const marqueeContainer = document.createElement("div");
        const marqueeText = document.createElement("h1");
        let winText = "";
        for(let i = 0 ; i < 20 ; i++){
            winText += `${winner.getName()} WINS!! `;
        }
        marqueeText.innerText = winText;

        marqueeContainer.style.width = "100%";
        marqueeContainer.style.overflow = "hidden";
        marqueeContainer.style.whiteSpace = "nowrap";
        marqueeContainer.style.position = "absolute";
        marqueeContainer.style.top = "50%";
        marqueeContainer.style.backgroundColor = "white";
        marqueeContainer.style.border = "5px black solid";
        marqueeText.style.animation = "marquee-animation 10s linear infinite";
        
        marqueeContainer.appendChild(marqueeText);
        document.body.appendChild(marqueeContainer);
        setTimeout(()=> {
            document.body.removeChild(marqueeContainer);
            clearBoard();
        }, 6000);
        winner.increaseScore();
        document.getElementById('player-1-score').innerText = player1.getScore();
        document.getElementById('player-2-score').innerText = player2.getScore();
    }
}

function clearBoard(){
    for(let i = 1 ; i <= 9 ; i++){
        const button = document.querySelector(`body > main > div > div.game-area > div > div:nth-child(${i}) > button`);
        button.innerText = "";
    }
    ticTacToeBoard.refreshBoard();
}

function handle00(event) {
    takeTurns(0,0, event);
}
function handle01(event) {
    takeTurns(0,1, event);
}
function handle02(event) {
    takeTurns(0,2, event);
}
function handle10(event) {
    takeTurns(1,0, event);
}
function handle11(event) {
    takeTurns(1,1, event);
}
function handle12(event) {
    takeTurns(1,2, event);
}
function handle20(event) {
    takeTurns(2,0, event);
}
function handle21(event) {
    takeTurns(2,1, event);
}
function handle22(event) {
    takeTurns(2,2, event);
}

document.getElementById("Player-1-name").addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        player1.updateName(event.target.value);
        document.getElementById("player-1-display").innerText = player1.getName();
        event.target.value = "";
    }
});

document.getElementById("Player-2-name").addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        player2.updateName(event.target.value);
        document.getElementById("player-2-display").innerText = player2.getName();
        event.target.value = "";
    }
});

function handleGameReset(event){
    clearBoard();
    player1.resetScore();
    player2.resetScore();
    player1.updateName("Player #1");
    player2.updateName("Player #2");
    document.getElementById('player-1-score').innerText = player1.getScore();
    document.getElementById('player-2-score').innerText = player2.getScore();
    document.getElementById("player-1-display").innerText = player1.getName();
    document.getElementById("player-2-display").innerText = player2.getName();
}