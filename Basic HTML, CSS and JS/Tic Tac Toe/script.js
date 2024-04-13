console.log("Welcome to Tic Tac Toe");

let move = new Audio("Media/Turn.mp3"); // Audio for each move
let success = new Audio("Media/Success.mp3"); //Audio for game over

let turn = "X";
let boxes = document.getElementsByClassName("box");
let patterns = ["012", "345", "678", "036", "147", "258", "048", "246"];
let winIndices = "";

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
        if(moves.includes(patterns[i])) {
            winIndices = winIndices.concat(patterns[i]);
            return true;
        }
    }
    return false;
}

// Game logic
Array.from(boxes).forEach(element => {
    let boxText = element.querySelector('.box-text');
    element.addEventListener('click', ()=>{
        if(boxText.innerText === '') {
            boxText.innerText = turn;        
            move.play(); // To play audio
            if(checkWin()) {
                highlightWin();
                success.play();
                document.getElementsByClassName("img-box")[0].style.display = "flex";
            }
            turn = changeTurn();    
            document.getElementsByClassName("info")[0].innerHTML = "Turn for " + turn;
        }
    })
})

document.getElementById("restart").addEventListener('click', ()=> {
    location.reload();
})

function highlightWin() {
    for(let i = 0; i < winIndices.length; i++) {
        boxes[parseInt(winIndices[i])].style.backgroundColor = "yellow";
    }
}