let move = new Audio("Media/Turn.mp3"); // Audio for each move
let success = new Audio("Media/Success.mp3"); // Audio for game over
let draw = new Audio("Media/Draw.mp3"); // Audio for a draw match

let turn = "X";
let boxes = document.getElementsByClassName("box");
let winIndices = ""; // For highliting the winning pattern
let totalMoves = 0; // To check for a draw
let lastMove = ""; // For undoing the last move
let gameOver = false;

let patterns = [
    "012", "345", "678", // rows
    "036", "147", "258", // columns
    "048", "246" // diagonals
];

// Function to change turn
const changeTurn = ()=>{
    return turn === "X" ? "O": "X"
}

// Function to check for a win
const checkWin = ()=>{
    let moves = "";
    for(let i = 0; i < boxes.length; i++) {
        if(boxes[i].querySelector(".box-text").innerText === turn) moves = moves.concat(i);
    }

    for(let i = 0; i < patterns.length; i++) {
        if(contains(moves, patterns[i])) {
            winIndices = winIndices.concat(patterns[i]);
            return true;
        }
    }

    // Condition to check for a draw
    if(totalMoves === 9) {
        draw.play();
        document.getElementsByClassName("info")[0].style.display = "none";
        document.getElementsByClassName("draw")[0].style.display = "inline";
        document.getElementById("minion").src = "Media/shock.gif";
        document.getElementById("minion-mobile").src = "Media/shock.gif";
        document.getElementById("restart").classList.add("zoom-in");
        gameOver = true;
    }

    else return false;
}

function contains(moves, pattern) {
    for(let i = 0; i < pattern.length; i++) {
        if(!moves.includes(pattern[i])) return false;
    }
    return true;
}

// Game logic
Array.from(boxes).forEach(element => {
    let boxText = element.querySelector('.box-text');
    element.addEventListener('click', ()=>{
        lastMove = element.id;
        if(boxText.innerText === '' && !gameOver) {
            boxText.innerText = turn;        
            move.play(); // To play audio
            totalMoves++;
            
            //Check if there's a winning move
            if(checkWin()) {
                highlightWin();
                success.play();
                document.getElementsByClassName("img-box")[0].style.display = "flex";
                document.getElementById("minion").src = "Media/Wohoo.gif";
                document.getElementById("minion-mobile").src = "Media/Wohoo.gif";
                document.getElementById("restart").classList.add("zoom-in");
                document.getElementsByClassName("info")[0].innerText = turn + " wins!";
                gameOver = true;
            }

            else {
                turn = changeTurn();    
                document.getElementsByClassName("info")[0].innerHTML = "Turn for " + turn + "!"; 
            }
        }
    })
})

// Restart button functionality
document.getElementById("restart").addEventListener('click', ()=> {
    location.reload();
})

// Undo button functionality
document.getElementById("undo").addEventListener('click', ()=> {
    if(!gameOver) {
    totalMoves--;
    element = document.getElementById(lastMove);
    element.querySelector(".box-text").innerText = "";
    turn = changeTurn();
    document.getElementsByClassName("info")[0].innerHTML = "Turn for " + turn + "!"; }
})

// Highlight the winning moves
function highlightWin() {
    for(let i = 0; i < winIndices.length; i++) {
        boxes[parseInt(winIndices[i])].style.backgroundColor = "#f5bc3b";
    }
}