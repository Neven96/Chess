import { myHeaders } from "./header.js";
import { boardObject, pieceObject } from "./objects.js";

function paintTile(col, row) {
    if (boardObject.getBoardArray[col][row] === 1) {
        boardObject.getContent.fillStyle = "#FFFFFF";
    } else if (boardObject.getBoardArray[col][row] === 0) {
        boardObject.getContent.fillStyle = "#000000";
    }
    boardObject.getContent.fillRect(row * (boardObject.getBoard.width / 8),
        col * (boardObject.getBoard.height / 8),
        boardObject.getBoard.width / 8,
        boardObject.getBoard.height / 8);
}

export { paintTile };