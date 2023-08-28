import { myHeaders } from "./helpers/header.js";
import { boardObject } from "./objects.js";

// Paints one tile on the board, used when moving and selecting
// The col and row is used both ways, with either first, so I'm not sure what is what any more...
// The "col" is the second coordinate and the "row" is the first coordinate in the PiecePosition and AvailableMoves for a piece
// This corresponds the Y and X position of a piece
// This also corresponds to the array and position in the array for a 2D array
function paintTile(col, row, color = null) {
    if (!color) {
        if (boardObject.getBoardArray[col][row] === 1) {
            boardObject.getContent.fillStyle = "#FFFFFF";
        } else if (boardObject.getBoardArray[col][row] === 0) {
            boardObject.getContent.fillStyle = "#000000";
        }
    } else {
        boardObject.getContent.fillStyle = color;
    }
    boardObject.getContent.fillRect(row * (boardObject.getBoard.width / 8),
                                    col * (boardObject.getBoard.height / 8),
                                    boardObject.getBoard.width / 8,
                                    boardObject.getBoard.height / 8);
}

export { paintTile };