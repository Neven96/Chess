import { myHeaders } from "./helpers/header.js";
import { boardObject, listObject, pieceObject } from "./objects.js";

// Paints the piece on the board
function paintPiece(col, row, pieceNumber, pieceSymbol = "") {
    boardObject.getContent.font = "60px Arial"

    // Gives the piece either black or white color
    if (pieceNumber >= 1) {
        boardObject.getContent.strokeStyle = "#778899";
        boardObject.getContent.fillStyle = "#FFFFFF";
    } else if (pieceNumber <= -1) {
        boardObject.getContent.strokeStyle = "#778899"
        boardObject.getContent.fillStyle = "#000000"
    }

    // Draws the outline and fills it
    boardObject.getContent.lineWidth = 4;
    boardObject.getContent.strokeText(pieceSymbol, 
                                      row * (boardObject.getBoard.width / 8) + (3 * (boardObject.getBoard.width / 128)), 
                                      col * (boardObject.getBoard.height / 8) + (6 * (boardObject.getBoard.height / 64)));
    boardObject.getContent.lineWidth = 1;
    boardObject.getContent.fillText(pieceSymbol, 
                                    row * (boardObject.getBoard.width / 8) + (3 * (boardObject.getBoard.width / 128)), 
                                    col * (boardObject.getBoard.height / 8) + (6 * (boardObject.getBoard.height / 64)));
}

// For drawing the piece if marked as valid move
function paintValidPieces(moves) {
    let validMoveNumber, validMoveSymbol;
    let validMovePiece = boardObject.getNameFromNameArray([pieceObject.getSelected.getAvailableMoves[moves][0],
    pieceObject.getSelected.getAvailableMoves[moves][1]]);

    if (validMovePiece === 0) {
        validMoveNumber = 0;
        validMoveSymbol = "";
    } else {
        validMoveNumber = listObject.getPieceList[validMovePiece].getNumber;
        validMoveSymbol = listObject.getPieceList[validMovePiece].getPieceSymbol;
    }
    
    paintPiece(pieceObject.getSelected.getAvailableMoves[moves][1],
               pieceObject.getSelected.getAvailableMoves[moves][0],
               validMoveNumber, validMoveSymbol);
}

export { paintPiece, paintValidPieces };