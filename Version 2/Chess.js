import { myHeaders } from "./modules/header.js";
import { mod } from "./modules/helpers/modulo.js";
import { typeObjects, boardObject, pieceObject, listObject } from "./modules/objects.js";
import { pauseObject } from "./modules/pauseGame.js";
import { playGameObject } from "./modules/playGame.js";
import { timeObject } from "./modules/timeKeeping.js";
import { turnObject } from "./modules/turnKeeping.js";
import { setUpPieces } from "./modules/setupPieces.js";
import { paintPiece } from "./modules/paintPiece.js";
import { pawnMovement, rookMovement, knightMovement, bishopMovement, queenMovement, kingMovement } from "./modules/movement.js";
import { paintLevel } from "./modules/paintLevel.js";
import { undoMove } from './modules/undoMove.js';

const board = boardObject.setBoard = document.getElementById("board");
boardObject.setContent = board.getContext("2d");

document.getElementById("startEnKnapp").onclick = function () { startSpill(1) };
document.getElementById("startToKnapp").onclick = function () { startSpill(2) };
document.getElementById("pauseKnapp").onclick = function () { pauseObject.pauseGame() };

timeObject.setUpTime();
paintLevel();

function startSpill(spillere) {
    boardObject.resetPieces();
    listObject.setPieceList = listObject.setPawnList = listObject.setRookList = 
    listObject.setKnightList = listObject.setBishopList = listObject.setQueenList = listObject.setKingList = {};

    typeObjects.setPlayers = spillere;
    pieceObject.setSelected = pieceObject.setPrevSelected = null;
    pieceObject.setX_selected = pieceObject.setY_selected = pieceObject.setX_previous = pieceObject.setY_previous = 0;
    pieceObject.setPieceSymbol = pieceObject.setPrevPieceSymbol = "";
    pauseObject.setPause = true;

    document.getElementById("playerTurn").textContent = turnObject.getInternalTurn;
    document.getElementById("turnDivider").style.display = "initial";
    document.getElementById("playerTurnColor").textContent = turnObject.getTurnColor;

    clearTimeout(playGameObject.getTime);

    timeObject.setUpTime();

    paintLevel();
    let pieceArrayLength = boardObject.getPieceArray.length;
    for (var i = 0; i < pieceArrayLength; i++) {
        let pieceArrayILength = boardObject.getPieceArray[i].length;
        for (var j = 0; j < pieceArrayILength; j++) {
            setUpPieces(i, j, boardObject.getPieceArray[i][j]);
        }
    }

    pawnMovement();
    rookMovement();
    knightMovement();
    bishopMovement();
    queenMovement();
    kingMovement();

    typeObjects.setStarted = true;
    // Unpause the game to start the timer
    pauseObject.pauseGame();

    console.log(listObject.getPieceList);
    document.getElementById("pauseKnapp").style.display = "initial";
    document.getElementById("undoKnapp").style.display = "initial";
}

board.addEventListener('click', clickPiece);

function clickPiece(event) {
    if (typeObjects.getStarted && !pauseObject.getPause) {
        const rect = boardObject.getBoard.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        let x_true = Math.floor(x / (boardObject.getBoard.height / 8));
        let y_true = Math.floor(y / (boardObject.getBoard.width / 8));
        // console.log("x: " + x_true + ", y: " + y_true);

        pieceObject.setX_selected = x_true;
        pieceObject.setY_selected = y_true;

        if (pieceObject.getSelected !== null) {
            // TO REMOVE
            if (mod(turnObject.getInternalTurn, 2) === 1) {
                if (boardObject.getPieceArray[y_true][x_true] === 0 || boardObject.getPieceArray[y_true][x_true] <= 0) {
                    pieceObject.getSelected.movePiece([pieceObject.getSelected.getPiecePosition[0], 
                                                       pieceObject.getSelected.getPiecePosition[1]]);
                    return;
                }
            } else if (mod(turnObject.getInternalTurn, 2) === 0) {
                if (boardObject.getPieceArray[y_true][x_true] === 0 || boardObject.getPieceArray[y_true][x_true] >= 0) {
                    pieceObject.getSelected.movePiece([pieceObject.getSelected.getPiecePosition[0], 
                                                       pieceObject.getSelected.getPiecePosition[1]]);
                    return;
                }
            }
            // TO FIX
            // if (pieceObject.getSelected.getValidMove([y_true, x_true])) {

            // }
        }
        if (boardObject.getPieceArray[y_true][x_true] !== 0) {
            selectPiece()
        }
    }
}

function selectPiece() {
    if (typeObjects.getStarted) {
        if (pieceObject.getSelected !== null) {
            paintTile(pieceObject.getY_previous, pieceObject.getX_previous);
            if (pieceObject.getX_previous === pieceObject.getX_selected && pieceObject.getY_previous === pieceObject.getY_selected) {
                paintTile(pieceObject.getY_selected, pieceObject.getX_selected);
                pieceObject.setSelected = pieceObject.setPrevSelected = null;
                pieceObject.setX_selected = pieceObject.setY_selected = pieceObject.setX_previous = pieceObject.setY_previous = 0;
                pieceObject.setPieceSymbol = pieceObject.setPrevPieceSymbol = "";
                endTurn();
                return;
            }
        }
        boardObject.getContent.fillStyle = "#0000FF";
        if (mod(turnObject.getInternalTurn, 2) === 1) {
            for (let name in listObject.getPieceList) {
                if (listObject.getPieceList[name].getColor == "white") {
                    if (listObject.getPieceList[name].getNameFromPosition([pieceObject.getX_selected, pieceObject.getY_selected])) {
                        pieceObject.setSelected = listObject.getPieceList[name];
                        pieceObject.setPieceSymbol = pieceObject.getSelected.getPieceSymbol;
                        boardObject.getContent.fillRect(pieceObject.getX_selected * (boardObject.getBoard.width / 8), 
                                                        pieceObject.getY_selected * (boardObject.getBoard.height / 8), 
                                                        boardObject.getBoard.width / 8, 
                                                        boardObject.getBoard.height / 8);
                        console.log(pieceObject.getSelected);
                        break;
                    }
                }
            }
        } else if (mod(turnObject.getInternalTurn, 2) === 0) {
            for (let name in listObject.getPieceList) {
                if (listObject.getPieceList[name].getColor == "black") {
                    if (listObject.getPieceList[name].getNameFromPosition([pieceObject.getX_selected, pieceObject.getY_selected])) {
                        pieceObject.setSelected = listObject.getPieceList[name];
                        pieceObject.setPieceSymbol = pieceObject.getSelected.getPieceSymbol;
                        boardObject.getContent.fillRect(pieceObject.getX_selected * (boardObject.getBoard.width / 8), 
                                                        pieceObject.getY_selected * (boardObject.getBoard.height / 8), 
                                                        boardObject.getBoard.width / 8, 
                                                        boardObject.getBoard.height / 8);
                        console.log(pieceObject.getSelected);
                        break;
                    }
                }
            }
        }
        pieceObject.setX_previous = pieceObject.getX_selected;
        pieceObject.setY_previous = pieceObject.getY_selected;
        pieceObject.setPrevSelected = pieceObject.getSelected;
        pieceObject.setPrevPieceSymbol = pieceObject.getPieceSymbol;
        paintPiece(pieceObject.getY_selected, 
                   pieceObject.getX_selected, 
                   boardObject.getPieceArray[pieceObject.getY_selected][pieceObject.getX_selected], 
                   pieceObject.getPieceSymbol)
    }
}

function endTurn() {
    turnObject.incrementTurn();
    document.getElementById("playerTurn").textContent = turnObject.getExternalTurn;
    document.getElementById("playerTurnColor").textContent = turnObject.getTurnColor;
}

document.getElementById("undoKnapp").onclick = function () { 
    if (turnObject.getInternalTurn > 1) { 
        undoMove(); 
    } 
}

function paintTile(col, row) {
    if (boardObject.getBoardArray[col][row] === 1) {
        boardObject.getContent.fillStyle = "#FFFFFF";
    } else if (boardObject.getBoardArray[col][row] === 0) {
        boardObject.getContent.fillStyle = "#000000";
    }
    boardObject.getContent.fillRect(row * (boardObject.getBoard.width / 8), 
                                    col * (boardObject.getBoard.height / 8), 
                                    boardObject.getBoard.width / 8, 
                                    boardObject.getBoard.height / 8);
    paintPiece(pieceObject.getY_previous, 
               pieceObject.getX_previous, 
               boardObject.getPieceArray[pieceObject.getY_previous][pieceObject.getX_previous], 
               pieceObject.getPrevPieceSymbol)
}