
console.log("Welcome to my game");
let audioTurn = new Audio("turnsound.mp3");
let gameOverSound = new Audio("gameoversound.mp3");
let bgMusic = new Audio("backgroundmusic.mp3");
let turn = "X";

let isGameOver = false;
let totalMoves = 0;
const MAX_MOVES = 9;

// Function for turn options
let changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

// Function to check for a win
let checkWin = () => {
    let boxtexts = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let winner = null;

    wins.forEach(e => {
        if (
            boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
            boxtexts[e[1]].innerText === boxtexts[e[2]].innerText &&
            boxtexts[e[0]].innerText !== ""
        ) {
            winner = boxtexts[e[0]].innerText;
        }
    });

    if (winner) {
        document.querySelector(".turns").innerText = winner + " Won";
        isGameOver = true;
        gameOverSound.play();


        // Stop further processing for the next turns
        let boxes = document.getElementsByClassName("box");
        Array.from(boxes).forEach(element => {
            element.removeEventListener("click", handleClick);
        });
    } else if (totalMoves === MAX_MOVES) {
        // If no player has won and the total moves have reached the maximum,
        // it's a draw game.
        document.querySelector(".turns").innerText = "Game Draw";
        isGameOver = true;
    }
};

// Function to reset the game
let resetGame = () => {
    // Reset all boxes to empty
    let boxes = document.getElementsByClassName("box");
    Array.from(boxes).forEach(element => {
        element.querySelector(".boxtext").innerText = '';
    });

    // Reset turn to "X"
    turn = "X";
    document.querySelector(".turns").innerText = "Turn for " + turn;

    // Reset game state variables
    isGameOver = false;
    totalMoves = 0;

 

    // Reattach click event listeners to boxes
    Array.from(boxes).forEach(element => {
        element.addEventListener("click", handleClick);
    });
};

// Function to handle the click event on the boxes
let handleClick = function () {
    let boxestext = this.querySelector(".boxtext");
    if (!isGameOver && boxestext.innerText === '') {
        boxestext.innerText = turn;
        turn = changeTurn();
        audioTurn.play();
        totalMoves++;
        checkWin();

        if (isGameOver) {
            document.querySelector(".turns").innerText = "Game Over";
        } else {
            document.querySelector(".turns").innerText = "Turn for " + turn;
        }
    }
};

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Play the background music once the DOM is fully loaded, after user interaction
    document.addEventListener("click", () => {
        bgMusic.play().catch(error => {
            // If play() fails, it's likely due to autoplay restrictions.
            // In that case, we'll just ignore the error and play the music later.
            document.removeEventListener("click", playBackgroundMusic);
        });
    });

    // Get all elements with the class "box" and store them in the variable "boxes"
    let boxes = document.getElementsByClassName("box");

    // Convert the HTMLCollection returned by getElementsByClassName to an array using Array.from()
    Array.from(boxes).forEach(element => {
        // For each element in the array, find the element with class "boxtext" inside it
        let boxestext = element.querySelector(".boxtext");

        // Add a click event listener to each element (box)
        element.addEventListener("click", handleClick);
    });

    // Reset the game when the reset button is clicked
    let resetButton = document.getElementsByClassName("btn")[0];
    if (resetButton) {
        resetButton.addEventListener("click", resetGame);
    }
});
