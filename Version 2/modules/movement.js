import { myHeaders } from "./header.js";
import { arrayAddition } from "./helpers/arrayManipulation.js";
import { boardObject, pieceObject } from "./objects.js";
import { Pawn, Rook, Knight, Bishop, Queen, King } from ".classes.js";

function pawnMovement() {
    let selected = pieceObject.getSelected;
    let curPosition = selected.getPiecePosition;
    let newMoves = [];

    if (selected.getColor === "white") {
        // Move 1
        if (boardObject.pieceArrayPosition(arrayAddition(curPosition, [1, 0])) === 0) {
            
        }
        
    } else if (selected.getColor === "black") {
        
    }
}