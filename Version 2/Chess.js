import { myHeaders } from "./modules/header.js";
import { boardObject } from "./modules/objects.js";
import { pauseObject } from "./modules/pauseGame.js";
import { timeObject } from "./modules/timeKeeping.js";
import { turnObject } from "./modules/turnKeeping.js";
import { paintLevel } from "./modules/paintLevel.js";
import { undoMove } from './modules/undoMove.js';
import { clickPiece } from "./modules/clickPiece.js";
import { startGame } from "./modules/startGame.js";

const board = boardObject.setBoard = document.getElementById("board");
boardObject.setContent = board.getContext("2d");

document.getElementById("startEnKnapp").onclick = function () { startGame(1) };
document.getElementById("startToKnapp").onclick = function () { startGame(2) };
document.getElementById("pauseKnapp").onclick = function () { pauseObject.pauseGame() };

timeObject.setUpTime();
paintLevel();

board.addEventListener('click', clickPiece);

document.getElementById("undoKnapp").onclick = function () { 
    if (turnObject.getInternalTurn > 1) { 
        undoMove(); 
    } 
}