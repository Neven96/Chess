import { myHeaders } from "./header.js";
import { mod } from "./helpers/modulo.js";
import { boardObject, listObject, pieceObject, typeObjects } from "./objects.js";
import { paintPiece } from "./paintPiece.js";
import { paintTile } from "./paintTile.js";
import { turnObject } from "./turnKeeping.js";

function selectPiece() {
    if (typeObjects.getStarted) {
        // If you click another piece if you have one selected
        if (pieceObject.getSelected !== null) {
            // Disables clicking the other player's piece when you have your own selected
            // White turn
            if (mod(turnObject.getInternalTurn, 2) === 1 && boardObject.pieceArrayPosition([pieceObject.getX_selected, pieceObject.getY_selected]) <= -1) {
                return;
            }
            // Black turn
            if (mod(turnObject.getInternalTurn, 2) === 0 && boardObject.pieceArrayPosition([pieceObject.getX_selected, pieceObject.getY_selected]) >= 1) {
                return;
            }
            // If you click another piece, redraws the previous one and its tile
            paintTile(pieceObject.getY_previous, pieceObject.getX_previous);
            paintPiece(pieceObject.getY_previous,
                       pieceObject.getX_previous,
                       pieceObject.getPrevSelected.getNumber,
                       pieceObject.getPrevPieceSymbol);
            // Same, but if you click the same piece, also disables selection
            if (pieceObject.getX_previous === pieceObject.getX_selected && pieceObject.getY_previous === pieceObject.getY_selected) {
                paintTile(pieceObject.getY_selected, pieceObject.getX_selected);
                paintPiece(pieceObject.getY_previous,
                           pieceObject.getX_previous,
                           pieceObject.getPrevSelected.getNumber,
                           pieceObject.getPrevPieceSymbol);
                pieceObject.setSelected = pieceObject.setPrevSelected = null;
                pieceObject.setX_selected = pieceObject.setY_selected = pieceObject.setX_previous = pieceObject.setY_previous = 0;
                pieceObject.setPieceSymbol = pieceObject.setPrevPieceSymbol = "";
                return;
            }
        }
        boardObject.getContent.fillStyle = "#0000FF";
        // White turn
        if (mod(turnObject.getInternalTurn, 2) === 1) {
            // Gets all the pieces
            for (let name in listObject.getPieceList) {
                if (listObject.getPieceList[name].getColor == "white") {
                    // Returns the name of the piece from its position
                    if (listObject.getPieceList[name].getNameFromPosition([pieceObject.getX_selected, pieceObject.getY_selected])) {
                        pieceObject.setSelected = listObject.getPieceList[name];
                        pieceObject.setPieceSymbol = pieceObject.getSelected.getPieceSymbol;
                        boardObject.getContent.fillRect(pieceObject.getX_selected * (boardObject.getBoard.width / 8),
                            pieceObject.getY_selected * (boardObject.getBoard.height / 8),
                            boardObject.getBoard.width / 8,
                            boardObject.getBoard.height / 8);
                        
                        break;
                    }
                }
            }
            // Black turn
        } else if (mod(turnObject.getInternalTurn, 2) === 0) {
            for (let name in listObject.getPieceList) {
                if (listObject.getPieceList[name].getColor == "black") {
                    if (listObject.getPieceList[name].getNameFromPosition([pieceObject.getX_selected, pieceObject.getY_selected])) {
                        pieceObject.setSelected = listObject.getPieceList[name];
                        pieceObject.setPieceSymbol = pieceObject.getSelected.getPieceSymbol;
                        boardObject.getContent.fillRect(pieceObject.getX_selected * (boardObject.getBoard.width / 8),
                            pieceObject.getY_selected * (boardObject.getBoard.height / 8),
                            boardObject.getBoard.width / 8,
                            boardObject.getBoard.height / 8);
                        break;
                    }
                }
            }
        }

        console.log(pieceObject.getSelected);
        pieceObject.setX_previous = pieceObject.getX_selected;
        pieceObject.setY_previous = pieceObject.getY_selected;
        pieceObject.setPrevSelected = pieceObject.getSelected;
        pieceObject.setPrevPieceSymbol = pieceObject.getPieceSymbol;
        paintPiece(pieceObject.getY_selected,
                   pieceObject.getX_selected,
                   boardObject.getPieceArray[pieceObject.getY_selected][pieceObject.getX_selected],
                   pieceObject.getPieceSymbol)
    }
}

export { selectPiece };