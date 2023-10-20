import { myHeaders } from "./helpers/header.js";
import { listObject, boardObject } from "./objects.js";
import { Pawn, Rook, Knight, Bishop, Queen, King } from "./classes.js";
import { paintPiece } from "./paintPiece.js";

// Creates the piece objects and adds them to the correct position
// Row and col are all kinds of messed up, the problem is that 2d arrays and the canvas uses different for each
function setUpPieces(col, row, pieceNumber, allPiecesList, pieceSymbol = "") {
    let pieceName, pieceColor, objectPiece;
    if (pieceNumber !== 0) {
        objectPiece = allPiecesList[pieceNumber][row][Object.keys(allPiecesList[pieceNumber][row])[0]];
        pieceName = Object.keys(allPiecesList[pieceNumber][row])[0];
        pieceColor = Object.keys(allPiecesList[pieceNumber][row])[1];
        pieceSymbol = allPiecesList[pieceNumber][row][pieceColor];
    }
    switch (pieceNumber) {
        // FOR ALL PIECES:
        // Takes the name from the object list key in startGame module and saves the object in the list
        // Then adds that object to general piece and own piece lists
        // PAWNS
        case -1:
            // Black pawn
            // FALL THROUGH
        case 1:
            // White pawn
            objectPiece = new Pawn(pieceName, pieceNumber, pieceColor, "pawn", pieceSymbol, [row, col]);
            helperSetUp("pawn", objectPiece);
            break;

        // ROOKS
        case -2:
            // Black rook
            // FALL THROUGH
        case 2:
            // White rook
            objectPiece = new Rook(pieceName, pieceNumber, pieceColor, "rook", pieceSymbol, [row, col]);
            helperSetUp("rook", objectPiece);
            break;

        // KNIGHTS
        case -3:
            // Black knight
            // FALL THROUGH
        case 3:
            // White knight
            objectPiece = new Knight(pieceName, pieceNumber, pieceColor, "knight", pieceSymbol, [row, col]);
            helperSetUp("knight", objectPiece);
            break;

        // BISHOPS
        case -4:
            // Black bishop
            // FALL THROUGH
        case 4:
            // White bishop
            objectPiece = new Bishop(pieceName, pieceNumber, pieceColor, "bishop", pieceSymbol, [row, col]);
            helperSetUp("bishop", objectPiece);
            break;

        // QUEENS
        case -5:
            // Black queen
            // FALL THROUGH
        case 5:
            // White queen
            objectPiece = new Queen(pieceName, pieceNumber, pieceColor, "queen", pieceSymbol, [row, col]);
            helperSetUp("queen", objectPiece);
            break;

        // KINGS
        case -6:
            // Black king
            // FALL THROUGH
        case 6:
            // White king
            objectPiece = new King(pieceName, pieceNumber, pieceColor, "king", pieceSymbol, [row, col]);
            helperSetUp("king", objectPiece);
            break;

        // EMPTY SPACE
        default:
            pieceSymbol = "";
            break;
    }

    paintPiece(col, row, pieceNumber, pieceSymbol);

    // Function for adding the pieces to their respective lists, and setting their start positions
    function helperSetUp(pieceType, objectPiece) {
        listObject.addToList(pieceType, objectPiece);
        listObject.addToList("piece", objectPiece);

        if (pieceType === "pawn") {
            objectPiece.updatePreviousPosition(false, false, false);
        } else {
            objectPiece.updatePreviousPosition(false, false);
        }

        boardObject.addToNameArrayPosition([col, row], pieceName);
    }
}

export { setUpPieces };