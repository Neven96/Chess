import { myHeaders } from "./helpers/header.js";
import { listObject, boardObject } from "./objects.js";
import { Pawn, Rook, Knight, Bishop, Queen, King } from "./classes.js";
import { paintPiece } from "./paintPiece.js";

// Creates the piece objects and adds them to the correct position
// Row and col are all kinds of messed up, the problem is that 2d arrays and the canvas uses different for each
function setUpPieces(col, row, piece, allPiecesList, pieceSymbol = "") {
    switch (piece) {
        // FOR ALL PIECES:
        // Takes the name from the object list key in startGame module and saves the object in the list
        // Then adds that object to general piece and own piece lists
        // PAWNS
        case -1:
            // Black pawn
            // FALL THROUGH
        case 1:
            pieceSymbol = allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[1]];
            // White pawn
            allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]] = new Pawn(Object.keys(allPiecesList[piece][row])[0], piece, Object.keys(allPiecesList[piece][row])[1], "pawn", pieceSymbol, [row, col]);

            helperSetUp("pawn", allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]]);
            break;
        // ROOKS
        case -2:
            // Black rook
            // FALL THROUGH
        case 2:
            pieceSymbol = allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[1]];
            // White rook
            allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]] = new Rook(Object.keys(allPiecesList[piece][row])[0], piece, Object.keys(allPiecesList[piece][row])[1], "rook", pieceSymbol, [row, col]);

            helperSetUp("rook", allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]]);
            break;
        case -3:
            // Black knight
            // FALL THROUGH
        case 3:
            pieceSymbol = allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[1]];
            // White knight
            allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]] = new Knight(Object.keys(allPiecesList[piece][row])[0], piece, Object.keys(allPiecesList[piece][row])[1], "knight", pieceSymbol, [row, col]);

            helperSetUp("knight", allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]]);
            break;
        case -4:
            // Black bishop
            // FALL THROUGH
        case 4:
            pieceSymbol = allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[1]];
            // White bishop
            allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]] = new Bishop(Object.keys(allPiecesList[piece][row])[0], piece, Object.keys(allPiecesList[piece][row])[1], "bishop", pieceSymbol, [row, col]);

            helperSetUp("bishop", allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]]);
            break;
        case -5:
            // Black queen
            // FALL THROUGH
        case 5:
            pieceSymbol = allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[1]];
            // White queen
            allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]] = new Queen(Object.keys(allPiecesList[piece][row])[0], piece, Object.keys(allPiecesList[piece][row])[1], "queen", pieceSymbol, [row, col]);

            helperSetUp("queen", allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]]);
            break;
        case -6:
            // Black king
            // FALL THROUGH
        case 6:
            pieceSymbol = allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[1]];
            // White king
            allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]] = new King(Object.keys(allPiecesList[piece][row])[0], piece, Object.keys(allPiecesList[piece][row])[1], "king", pieceSymbol, [row, col]);

            helperSetUp("king", allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]]);
            break;
        default:
            // Blank space
            pieceSymbol = "";
            break;
    }

    function helperSetUp(pieceName, pieceObject) {
        listObject.addToList(pieceName, pieceObject);
        listObject.addToList("piece", pieceObject);

        if (pieceName === "pawn") {
            pieceObject.updatePreviousPosition(false, false, false);
        } else {
            pieceObject.updatePreviousPosition(false, false);
        }
        
        boardObject.addToNameArrayPosition([col, row], pieceObject.name);
    }

    paintPiece(col, row, piece, pieceSymbol);
}

export { setUpPieces };