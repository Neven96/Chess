import { myHeaders } from "./helpers/header.js";
import { listObject, boardObject } from "./objects.js";
import { Pawn, Rook, Knight, Bishop, Queen, King } from "./classes.js";
import { paintPiece } from "./paintPiece.js";

// Creates the piece objects and adds them to the correct position
// Row and col are all kinds of messed up, I'm not sure which are correct and which aren't
function setUpPieces(col, row, piece, pieceSymbol = "") {
    switch (piece) {
        case 1:
            pieceSymbol = "\u{2659}"
            // White pawn
            switch (row) {
                case 0:
                    let whitePawnA = new Pawn("whitePawnA", piece, "white", "pawn", pieceSymbol, [row, col]);
                    listObject.addToPieceList(whitePawnA);
                    listObject.addToPawnList(whitePawnA);
                    whitePawnA.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "whitePawnA");
                    break;
                case 1:
                    let whitePawnB = new Pawn("whitePawnB", piece, "white", "pawn", pieceSymbol, [row, col]);
                    listObject.addToPieceList(whitePawnB);
                    listObject.addToPawnList(whitePawnB);
                    whitePawnB.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "whitePawnB");
                    break;
                case 2:
                    let whitePawnC = new Pawn("whitePawnC", piece, "white", "pawn", pieceSymbol, [row, col]);
                    listObject.addToPieceList(whitePawnC);
                    listObject.addToPawnList(whitePawnC);
                    whitePawnC.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "whitePawnC");
                    break;
                case 3:
                    let whitePawnD = new Pawn("whitePawnD", piece, "white", "pawn", pieceSymbol, [row, col]);
                    listObject.addToPieceList(whitePawnD);
                    listObject.addToPawnList(whitePawnD);
                    whitePawnD.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "whitePawnD");
                    break;
                case 4:
                    let whitePawnE = new Pawn("whitePawnE", piece, "white", "pawn", pieceSymbol, [row, col]);
                    listObject.addToPieceList(whitePawnE);
                    listObject.addToPawnList(whitePawnE);
                    whitePawnE.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "whitePawnE");
                    break;
                case 5:
                    let whitePawnF = new Pawn("whitePawnF", piece, "white", "pawn", pieceSymbol, [row, col]);
                    listObject.addToPieceList(whitePawnF);
                    listObject.addToPawnList(whitePawnF);
                    whitePawnF.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "whitePawnF");
                    break;
                case 6:
                    let whitePawnG = new Pawn("whitePawnG", piece, "white", "pawn", pieceSymbol, [row, col]);
                    listObject.addToPieceList(whitePawnG);
                    listObject.addToPawnList(whitePawnG);
                    whitePawnG.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "whitePawnG");
                    break;
                case 7:
                    let whitePawnH = new Pawn("whitePawnH", piece, "white", "pawn", pieceSymbol, [row, col]);
                    listObject.addToPieceList(whitePawnH);
                    listObject.addToPawnList(whitePawnH);
                    whitePawnH.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "whitePawnH");
                    break;
            }
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
        case -1:
            pieceSymbol = "\u{265F}";
            // Black pawn
            switch (row) {
                case 0:
                    let blackPawnA = new Pawn("blackPawnA", piece, "black", "pawn", pieceSymbol, [row, col]);
                    listObject.addToPieceList(blackPawnA);
                    listObject.addToPawnList(blackPawnA);
                    blackPawnA.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "blackPawnA");
                    break;
                case 1:
                    let blackPawnB = new Pawn("blackPawnB", piece, "black", "pawn", pieceSymbol, [row, col]);
                    listObject.addToPieceList(blackPawnB);
                    listObject.addToPawnList(blackPawnB);
                    blackPawnB.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "blackPawnB");
                    break;
                case 2:
                    let blackPawnC = new Pawn("blackPawnC", piece, "black", "pawn", pieceSymbol, [row, col]);
                    listObject.addToPieceList(blackPawnC);
                    listObject.addToPawnList(blackPawnC);
                    blackPawnC.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "blackPawnC");
                    break;
                case 3:
                    let blackPawnD = new Pawn("blackPawnD", piece, "black", "pawn", pieceSymbol, [row, col]);
                    listObject.addToPieceList(blackPawnD);
                    listObject.addToPawnList(blackPawnD);
                    blackPawnD.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "blackPawnD");
                    break;
                case 4:
                    let blackPawnE = new Pawn("blackPawnE", piece, "black", "pawn", pieceSymbol, [row, col]);
                    listObject.addToPieceList(blackPawnE);
                    listObject.addToPawnList(blackPawnE);
                    blackPawnE.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "blackPawnE");
                    break;
                case 5:
                    let blackPawnF = new Pawn("blackPawnF", piece, "black", "pawn", pieceSymbol, [row, col]);
                    listObject.addToPieceList(blackPawnF);
                    listObject.addToPawnList(blackPawnF);
                    blackPawnF.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "blackPawnF");
                    break;
                case 6:
                    let blackPawnG = new Pawn("blackPawnG", piece, "black", "pawn", pieceSymbol, [row, col]);
                    listObject.addToPieceList(blackPawnG);
                    listObject.addToPawnList(blackPawnG);
                    blackPawnG.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "blackPawnG");
                    break;
                case 7:
                    let blackPawnH = new Pawn("blackPawnH", piece, "black", "pawn", pieceSymbol, [row, col]);
                    listObject.addToPieceList(blackPawnH);
                    listObject.addToPawnList(blackPawnH);
                    blackPawnH.updatePreviousPosition(false, false);
                    boardObject.addToNameArrayPosition([col, row], "blackPawnH");
                    break;
            }
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
}

export { setUpPieces };