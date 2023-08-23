import { myHeaders } from "./helpers/header.js";
import { boardObject } from "./objects.js";

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

export { paintPiece };