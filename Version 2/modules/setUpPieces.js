import { myHeaders } from "./helpers/header.js";
import { listObject, boardObject } from "./objects.js";
import { Pawn, Rook, Knight, Bishop, Queen, King } from "./classes.js";
import { paintPiece } from "./paintPiece.js";

// Creates the piece objects and adds them to the correct position
// Row and col are all kinds of messed up, the problem is that 2d arrays and the canvas uses different for each
function setUpPieces(col, row, piece, pawnPiecesList, pieceSymbol = "") {
    switch (piece) {
        case 1:
            pieceSymbol = "\u{2659}";
            // White pawn
            // Takes the name from the object list key in startGame module and saves the object in the list
            // Then adds that object to piece and pawn lists
            pawnPiecesList[piece][row][Object.keys(pawnPiecesList[piece][row])[0]] = new Pawn(Object.keys(pawnPiecesList[piece][row])[0], piece, "white", "pawn", pieceSymbol, [row, col]);
            listObject.addToPieceList(pawnPiecesList[piece][row][Object.keys(pawnPiecesList[piece][row])[0]]);
            listObject.addToPawnList(pawnPiecesList[piece][row][Object.keys(pawnPiecesList[piece][row])[0]]);
            pawnPiecesList[piece][row][Object.keys(pawnPiecesList[piece][row])[0]].updatePreviousPosition(false, false);
            boardObject.addToNameArrayPosition([col, row], pawnPiecesList[piece][row][Object.keys(pawnPiecesList[piece][row])[0]].name);
            break;
        case 2:
            pieceSymbol = "\u{2656}";
            // White rook
            switch (row) {
                case 0:
                    let whiteRookA = new Rook("whiteRookA", piece, "white", "rook", pieceSymbol, [row, col]);
                    listObject.addToPieceList(whiteRookA);
                    listObject.addToRookList(whiteRookA);
                    whiteRookA.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "whiteRookA");
                    break;
                case 7:
                    let whiteRookH = new Rook("whiteRookH", piece, "white", "rook", pieceSymbol, [row, col]);
                    listObject.addToPieceList(whiteRookH);
                    listObject.addToRookList(whiteRookH);
                    whiteRookH.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "whiteRookH");
                    break;
            }
            break;
        case 3:
            pieceSymbol = "\u{2658}";
            // White knight
            switch (row) {
                case 1:
                    let whiteKnightB = new Knight("whiteKnightB", piece, "white", "knight", pieceSymbol, [row, col]);
                    listObject.addToPieceList(whiteKnightB);
                    listObject.addToKnightList(whiteKnightB);
                    whiteKnightB.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "whiteKnightB");
                    break;
                case 6:
                    let whiteKnightG = new Knight("whiteKnightG", piece, "white", "knight", pieceSymbol, [row, col]);
                    listObject.addToPieceList(whiteKnightG);
                    listObject.addToKnightList(whiteKnightG);
                    whiteKnightG.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "whiteKnightG");
                    break;
            }
            break;
        case 4:
            pieceSymbol = "\u{2657}";
            // White bishop
            switch (row) {
                case 2:
                    let whiteBishopC = new Bishop("whiteBishopC", piece, "white", "bishop", pieceSymbol, [row, col]);
                    listObject.addToPieceList(whiteBishopC);
                    listObject.addToBishopList(whiteBishopC);
                    whiteBishopC.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "whiteBishopC");
                    break;
                case 5:
                    let whiteBishopF = new Bishop("whiteBishopF", piece, "white", "bishop", pieceSymbol, [row, col]);
                    listObject.addToPieceList(whiteBishopF);
                    listObject.addToBishopList(whiteBishopF);
                    whiteBishopF.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "whiteBishopF");
                    break;
            }
            break;
        case 5:
            pieceSymbol = "\u{2655}";
            // White queen
            let whiteQueen = new Queen("whiteQueen", piece, "white", "queen", pieceSymbol, [row, col]);
            listObject.addToPieceList(whiteQueen);
            listObject.addToQueenList(whiteQueen);
            whiteQueen.updatePreviousPosition(false, false);
            boardObject.addToNameArrayPosition([col, row], "whiteQueen");
            break;
        case 6:
            pieceSymbol = "\u{2654}";
            // White king
            let whiteKing = new King("whiteKing", piece, "white", "king", pieceSymbol, [row, col]);
            listObject.addToPieceList(whiteKing);
            listObject.addToKingList(whiteKing);
            whiteKing.updatePreviousPosition(false, false);
            boardObject.addToNameArrayPosition([col, row], "whiteKing");
            break;

        // BLACK PIECES
        case -1:
            pieceSymbol = "\u{265F}";
            // Black pawn
            // The same as white pawn
            pawnPiecesList[piece][row][Object.keys(pawnPiecesList[piece][row])[0]] = new Pawn(Object.keys(pawnPiecesList[piece][row])[0], piece, "black", "pawn", pieceSymbol, [row, col]);
            listObject.addToPieceList(pawnPiecesList[piece][row][Object.keys(pawnPiecesList[piece][row])[0]]);
            listObject.addToPawnList(pawnPiecesList[piece][row][Object.keys(pawnPiecesList[piece][row])[0]]);
            pawnPiecesList[piece][row][Object.keys(pawnPiecesList[piece][row])[0]].updatePreviousPosition(false, false);
            boardObject.addToNameArrayPosition([col, row], pawnPiecesList[piece][row][Object.keys(pawnPiecesList[piece][row])[0]].name);
            break;
        case -2:
            pieceSymbol = "\u{265C}";
            // Black rook
            switch (row) {
                case 0:
                    let blackRookA = new Rook("blackRookA", piece, "black", "rook", pieceSymbol, [row, col]);
                    listObject.addToPieceList(blackRookA);
                    listObject.addToRookList(blackRookA);
                    blackRookA.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "blackRookA");
                    break;
                case 7:
                    let blackRookH = new Rook("blackRookH", piece, "black", "rook", pieceSymbol, [row, col]);
                    listObject.addToPieceList(blackRookH);
                    listObject.addToRookList(blackRookH);
                    blackRookH.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "blackRookH");
                    break;
            }
            break;
        case -3:
            pieceSymbol = "\u{265E}";
            // Black knight
            switch (row) {
                case 1:
                    let blackKnightB = new Knight("blackKnightB", piece, "black", "knight", pieceSymbol, [row, col]);
                    listObject.addToPieceList(blackKnightB);
                    listObject.addToKnightList(blackKnightB);
                    blackKnightB.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "blackKnightB");
                    break;
                case 6:
                    let blackKnightG = new Knight("blackKnightG", piece, "black", "knight", pieceSymbol, [row, col]);
                    listObject.addToPieceList(blackKnightG);
                    listObject.addToKnightList(blackKnightG);
                    blackKnightG.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "blackKnightG");
                    break;
            }
            break;
        case -4:
            pieceSymbol = "\u{265D}";
            // Black bishop
            switch (row) {
                case 2:
                    let blackBishopC = new Bishop("blackBishopC", piece, "black", "bishop", pieceSymbol, [row, col]);
                    listObject.addToPieceList(blackBishopC);
                    listObject.addToBishopList(blackBishopC);
                    blackBishopC.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "blackBishopC");
                    break;
                case 5:
                    let blackBishopF = new Bishop("blackBishopF", piece, "black", "bishop", pieceSymbol, [row, col]);
                    listObject.addToPieceList(blackBishopF);
                    listObject.addToBishopList(blackBishopF);
                    blackBishopF.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "blackBishopF");
                    break;
            }
            break;
        case -5:
            pieceSymbol = "\u{265B}";
            // Black queen
            let blackQueen = new Queen("blackQueen", piece, "black", "queen", pieceSymbol, [row, col]);
            listObject.addToPieceList(blackQueen);
            listObject.addToQueenList(blackQueen);
            blackQueen.updatePreviousPosition(false, false);
            boardObject.addToNameArrayPosition([col, row], "blackQueen");
            break;
        case -6:
            pieceSymbol = "\u{265A}";
            // Black king
            let blackKing = new King("blackKing", piece, "black", "king", pieceSymbol, [row, col]);
            listObject.addToPieceList(blackKing);
            listObject.addToKingList(blackKing);
            blackKing.updatePreviousPosition(false, false);
            boardObject.addToNameArrayPosition([col, row], "blackKing");
            break;
        default:
            // Blank space
            pieceSymbol = "";
            break;
    }

    paintPiece(col, row, piece, pieceSymbol);

    return pawnPiecesList;
}

export { setUpPieces };