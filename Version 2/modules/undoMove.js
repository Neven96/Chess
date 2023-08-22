import { myHeaders } from "./helpers/header.js";
import { boardObject, listObject } from "./objects.js";
import { paintPiece } from "./paintPiece.js";
import { paintTile } from "./paintTile.js";
import { turnObject } from "./turnKeeping.js";
import { pawnMovement, rookMovement, knightMovement, bishopMovement, queenMovement, kingMovement } from "./movement.js";
import { undoTurn } from "./endTurn.js";
import { takenPieces } from "./takenPieces.js";

function undoMove() {
    let piece;
    let currentPosition;
    let previousPositions;
    let prevPosition;
    let prevMoved, prevTaken, prevPrevTaken;
    let currentInternalTurn = turnObject.getInternalTurn;
    let currentExternalTurn = turnObject.getExternalTurn;

    for (let name in listObject.getPieceList) {
        // Gets the current position of the piece, and all the previous positions
        piece = listObject.getPieceList[name];
        currentPosition = piece.getPiecePosition;
        previousPositions = piece.getPreviousPositions;

        // TO DO: Fix promotion not being undoed
        // Gets the immediate previous position of the piece
        prevPosition = previousPositions[currentInternalTurn - 2][0];
        prevMoved = previousPositions[currentInternalTurn - 2][1];
        prevTaken = previousPositions[currentInternalTurn - 1][2];
        prevPrevTaken = previousPositions[currentInternalTurn - 2][2];

        if (piece.getMoved) {
            if (!prevMoved) {
                piece.setMoved = false;
            }
        }

        if (piece.getTaken) {
            if (!prevPrevTaken) {
                piece.setTaken = false;
            }
        }
        
        piece.setPiecePosition = prevPosition;

        // Cleans the tile before moving back
        if (currentPosition.toString() !== [99, 99].toString()) {
            if (boardObject.getPieceArray[currentPosition[1]][currentPosition[0]] === piece.getNumber) {
                paintTile(currentPosition[1], currentPosition[0]);
            }
            
        } else if (currentPosition.toString() === [99, 99].toString()) {
            if (prevPosition.toString() !== [99, 99].toString()) {
                paintTile(prevPosition[1], prevPosition[0]);
            }
        }

        boardObject.movePiece([currentPosition[1], currentPosition[0]],
                              [prevPosition[1], prevPosition[0]],
                              piece, prevTaken);

        paintPiece(prevPosition[1],
                   prevPosition[0],
                   piece.getNumber,
                   piece.getPieceSymbol)

    }

    // Updates the taken pieces
    takenPieces();

    // Updates the moves of all pieces
    pawnMovement();
    rookMovement();
    knightMovement();
    bishopMovement();
    queenMovement();
    kingMovement();
    undoTurn();

    document.getElementById("tableCellTurn" + turnObject.getExternalTurn + turnObject.getTurnColor + "span").textContent = "";

    if (currentExternalTurn > turnObject.getExternalTurn && document.getElementById("tableCellTurn" + currentExternalTurn + "span") !== null) {
        document.getElementById("tableCellTurn" + currentExternalTurn + "span").textContent = "";
    }
}

export { undoMove };