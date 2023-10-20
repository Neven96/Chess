import { myHeaders } from "./modules/helpers/header.js";
import { boardObject } from "./modules/objects.js";
import { pauseObject } from "./modules/pauseGame.js";
import { timeObject } from "./modules/timeKeeping.js";
import { turnObject } from "./modules/turnKeeping.js";
import { paintTile } from "./modules/paintTile.js";
import { undoMove } from './modules/undoMove.js';
import { clickPiece } from "./modules/clickPiece.js";
import { startGame } from "./modules/startGame.js";

const board = boardObject.setBoard = document.getElementById("board");
boardObject.setContent = board.getContext("2d");

timeObject.setUpTime();
// Paints the board
let boardRowLength = boardObject.getBoardArray.length;
for (var i = 0; i < boardRowLength; i++) {
    let boardColLength = boardObject.getBoardArray[i].length;
    for (var j = 0; j < boardColLength; j++) {
        paintTile(j, i)
    }
}

// Start a game against the computer, NOT WORKING
document.getElementById("startEnKnapp").onclick = function () { 
    startGame(1) 
};
// Start a game against another player, WORKING
document.getElementById("startToKnapp").onclick = function () { 
    startGame(2) 
};
document.getElementById("pauseKnapp").onclick = function () { 
    pauseObject.pauseGame() 
};

board.addEventListener('click', async (event) => {
    await clickPiece(event);
});

document.getElementById("undoKnapp").onclick = function () { 
    if (turnObject.getInternalTurn > 1) { 
        undoMove(); 
    } 
}