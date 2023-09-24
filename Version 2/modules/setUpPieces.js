import { myHeaders } from "./helpers/header.js";
import { listObject, boardObject } from "./objects.js";
import { Pawn, Rook, Knight, Bishop, Queen, King } from "./classes.js";
import { paintPiece } from "./paintPiece.js";

// Creates the piece objects and adds them to the correct position
// Row and col are all kinds of messed up, the problem is that 2d arrays and the canvas uses different for each
function setUpPieces(col, row, piece, allPiecesList, pieceSymbol = "") {
    switch (piece) {
        case 1:
            pieceSymbol = "\u{2659}";
            // White pawn
            // FOR ALL PIECES:
            // Takes the name from the object list key in startGame module and saves the object in the list
            // Then adds that object to general piece and own piece lists
            allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]] = new Pawn(Object.keys(allPiecesList[piece][row])[0], piece, "white", "pawn", pieceSymbol, [row, col]);
            
            listObject.addToList("pawn", allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]]);
            break;
        case 2:
            pieceSymbol = "\u{2656}";
            // White rook
            allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]] = new Rook(Object.keys(allPiecesList[piece][row])[0], piece, "white", "rook", pieceSymbol, [row, col]);

            listObject.addToList("rook", allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]]);
            break;
        case 3:
            pieceSymbol = "\u{2658}";
            // White knight
            allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]] = new Knight(Object.keys(allPiecesList[piece][row])[0], piece, "white", "knight", pieceSymbol, [row, col]);

            listObject.addToList("knight", allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]]);
            break;
        case 4:
            pieceSymbol = "\u{2657}";
            // White bishop
            allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]] = new Bishop(Object.keys(allPiecesList[piece][row])[0], piece, "white", "bishop", pieceSymbol, [row, col]);

            listObject.addToList("bishop", allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]]);
            break;
        case 5:
            pieceSymbol = "\u{2655}";
            // White queen
            let whiteQueen = new Queen("whiteQueen", piece, "white", "queen", pieceSymbol, [row, col]);
            listObject.addToList("piece", whiteQueen);
            listObject.addToList("queen", whiteQueen);
            whiteQueen.updatePreviousPosition(false, false);
            boardObject.addToNameArrayPosition([col, row], "whiteQueen");
            break;
        case 6:
            pieceSymbol = "\u{2654}";
            // White king
            let whiteKing = new King("whiteKing", piece, "white", "king", pieceSymbol, [row, col]);
            listObject.addToList("piece", whiteKing);
            listObject.addToList("king", whiteKing);
            whiteKing.updatePreviousPosition(false, false);
            boardObject.addToNameArrayPosition([col, row], "whiteKing");
            break;

        // BLACK PIECES
        case -1:
            pieceSymbol = "\u{265F}";
            // Black pawn
            // The same as white pawn
            allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]] = new Pawn(Object.keys(allPiecesList[piece][row])[0], piece, "black", "pawn", pieceSymbol, [row, col]);
            
            listObject.addToList("pawn", allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]]);
            break;
        case -2:
            pieceSymbol = "\u{265C}";
            // Black rook
            allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]] = new Rook(Object.keys(allPiecesList[piece][row])[0], piece, "black", "rook", pieceSymbol, [row, col]);

            listObject.addToList("rook", allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]]);
            break;
        case -3:
            pieceSymbol = "\u{265E}";
            // Black knight
            allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]] = new Knight(Object.keys(allPiecesList[piece][row])[0], piece, "black", "knight", pieceSymbol, [row, col]);

            listObject.addToList("knight", allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]]);
            break;
        case -4:
            pieceSymbol = "\u{265D}";
            // Black bishop
            allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]] = new Bishop(Object.keys(allPiecesList[piece][row])[0], piece, "black", "bishop", pieceSymbol, [row, col]);

            listObject.addToList("bishop", allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]]);
            break;
        case -5:
            pieceSymbol = "\u{265B}";
            // Black queen
            let blackQueen = new Queen("blackQueen", piece, "black", "queen", pieceSymbol, [row, col]);
            listObject.addToList("piece", blackQueen);
            listObject.addToList("queen", blackQueen);
            blackQueen.updatePreviousPosition(false, false);
            boardObject.addToNameArrayPosition([col, row], "blackQueen");
            break;
        case -6:
            pieceSymbol = "\u{265A}";
            // Black king
            let blackKing = new King("blackKing", piece, "black", "king", pieceSymbol, [row, col]);
            listObject.addToList("piece", blackKing);
            listObject.addToList("king", blackKing);
            blackKing.updatePreviousPosition(false, false);
            boardObject.addToNameArrayPosition([col, row], "blackKing");
            break;
        default:
            // Blank space
            pieceSymbol = "";
            break;
    }

    if (piece <= 4 && piece >= -4 && piece !== 0) {
        listObject.addToList("piece", allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]]);

        allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]].updatePreviousPosition(false, false, false);
        boardObject.addToNameArrayPosition([col, row], allPiecesList[piece][row][Object.keys(allPiecesList[piece][row])[0]].name);
    }

    paintPiece(col, row, piece, pieceSymbol);

    return allPiecesList;
}

export { setUpPieces };