import { myHeaders } from "./header.js";
import { boardObject, listObject, pieceObject, typeObjects } from "./objects.js";
import { paintLevel } from "./paintLevel.js";
import { pauseObject } from "./pauseGame.js";
import { playGameObject } from "./playGame.js";
import { timeObject } from "./timeKeeping.js";
import { setUpPieces } from "./setUpPieces.js";
import { pawnMovement, rookMovement, knightMovement, bishopMovement, queenMovement, kingMovement } from "./movement.js";
import { turnObject } from "./turnKeeping.js";


function startGame(players) {
    boardObject.resetPieces();
    listObject.setPieceList = {};
    listObject.setPawnList = {};
    listObject.setRookList = {};
    listObject.setKnightList = {};
    listObject.setBishopList = {};
    listObject.setQueenList = {};
    listObject.setKingList = {};

    typeObjects.setPlayers = players;
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

export { startGame };