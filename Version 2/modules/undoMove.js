import { myHeaders } from "./helpers/header.js";
import { boardObject, listObject } from "./objects.js";
import { paintPiece } from "./paintPiece.js";
import { paintTile } from "./paintTile.js";
import { turnObject } from "./turnKeeping.js";
import { pawnMovement, rookMovement, knightMovement, bishopMovement, queenMovement, kingMovement } from "./movement.js";
import { undoTurn } from "./endTurn.js";

function undoMove() {
    let piece;
    let currentPosition;
    let previousPositions;
    let prevPosition;
    let prevMoved;
    let currentTurn = turnObject.getInternalTurn;

    for (let name in listObject.getPieceList) {
        // Gets the current position of the piece, and all the previous positions
        piece = listObject.getPieceList[name];
        currentPosition = piece.getPiecePosition;
        previousPositions = piece.getPreviousPositions;

        
        // Gets the immediate previous position of the piece
        prevPosition = previousPositions[currentTurn - 2][0]
        prevMoved = previousPositions[currentTurn - 2][1]

        if (piece.getMoved) {
            if (!prevMoved) {
                piece.setMoved = false;
            }
        }
        
        piece.setPiecePosition = prevPosition;

        boardObject.movePiece([currentPosition[1], currentPosition[0]],
                              [prevPosition[1], prevPosition[0]],
                              piece.getNumber,
                              piece.getName);

        paintTile(currentPosition[1], currentPosition[0]);
        paintPiece(prevPosition[1],
                   prevPosition[0],
                   piece.getNumber,
                   piece.getPieceSymbol)

        
    }
    // Updates the moves of all pieces
    pawnMovement();
    rookMovement();
    knightMovement();
    bishopMovement();
    queenMovement();
    kingMovement();
    undoTurn();
}

export { undoMove };