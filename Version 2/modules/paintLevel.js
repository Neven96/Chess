import { myHeaders } from "./helpers/header.js";
import { boardObject } from "./objects.js";

// Paints the board, in black and white
function paintLevel() {
    let boardRowLength = boardObject.getBoardArray.length;
    for (var i = 0; i < boardRowLength; i++) {
        let boardColLength = boardObject.getBoardArray[i].length;
        for (var j = 0; j < boardColLength; j++) {
            if (boardObject.getBoardArray[i][j] === 1) {
                boardObject.getContent.fillStyle = "#FFFFFF";
            } else if (boardObject.getBoardArray[i][j] === 0) {
                boardObject.getContent.fillStyle = "#000000";
            }
            boardObject.getContent.fillRect(i * (boardObject.getBoard.width / 8),
                j * (boardObject.getBoard.height / 8),
                boardObject.getBoard.width / 8,
                boardObject.getBoard.height / 8);
        }
    }
}

export { paintLevel };