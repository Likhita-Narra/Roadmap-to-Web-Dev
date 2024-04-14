let move = new Audio("Media/Turn.mp3"); // Audio for each move
let success = new Audio("Media/Success.mp3"); // Audio for game over
let draw = new Audio("Media/Draw.mp3"); // Audio for a draw match

let turn = "X";
let boxes = document.getElementsByClassName("box");
let winIndices = "";
let totalMoves = 0;

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

    if(totalMoves === 9) {
        draw.play();
        document.getElementsByClassName("info")[0].style.display = "none";
        document.getElementsByClassName("draw")[0].style.display = "inline";
        document.getElementById("minion").src = "Media/shock.gif";
        document.getElementById("restart").classList.add("zoom-in");
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
        if(boxText.innerText === '') {
            boxText.innerText = turn;        
            move.play(); // To play audio
            totalMoves++;
            if(checkWin()) {
                highlightWin();
                success.play();
                document.getElementsByClassName("img-box")[0].style.display = "flex";
                document.getElementById("minion").src = "Media/Wohoo.gif";
                document.getElementById("restart").classList.add("zoom-in");
            }
            turn = changeTurn();    
            document.getElementsByClassName("info")[0].innerHTML = "Turn for " + turn + "!";
        }
    })
})

// Restart button functionality
document.getElementById("restart").addEventListener('click', ()=> {
    location.reload();
})

document.getElementById("undo").addEventListener('click', ()=> {
    location.reload();
})

// Highlight the winning moves
function highlightWin() {
    for(let i = 0; i < winIndices.length; i++) {
        boxes[parseInt(winIndices[i])].style.backgroundColor = "#f5bc3b";
    }
}