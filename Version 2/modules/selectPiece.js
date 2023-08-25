import { myHeaders } from "./helpers/header.js";
import { mod } from "./helpers/modulo.js";
import { drawCheckedKing } from "./kingCheckChecker.js";
import { boardObject, listObject, pieceObject, typeObjects } from "./objects.js";
import { paintPiece } from "./paintPiece.js";
import { paintTile } from "./paintTile.js";
import { turnObject } from "./turnKeeping.js";

// Selects a piece if non is selected, or changes the selected piece to another
function selectPiece() {
    if (typeObjects.getStarted) {
        // Disables clicking the other player's piece when it's not their turn
        // White turn
        if (mod(turnObject.getInternalTurn, 2) === 1 && boardObject.pieceArrayPosition([pieceObject.getX_selected, pieceObject.getY_selected]) <= -1) {
            return;
        }
        // Black turn
        if (mod(turnObject.getInternalTurn, 2) === 0 && boardObject.pieceArrayPosition([pieceObject.getX_selected, pieceObject.getY_selected]) >= 1) {
            return;
        }
        // If you click the same or another piece if you have one selected
        if (pieceObject.getSelected !== null) {
            // If you click another piece, redraws the previous one and its tile
            paintTile(pieceObject.getY_previous, pieceObject.getX_previous);
            paintPiece(pieceObject.getY_previous, pieceObject.getX_previous,
                       pieceObject.getPrevSelected.getNumber, pieceObject.getPrevPieceSymbol);
            for (let moves in pieceObject.getSelected.getAvailableMoves) {
                paintTile(pieceObject.getSelected.getAvailableMoves[moves][1],
                          pieceObject.getSelected.getAvailableMoves[moves][0]);
                // For drawing the piece if an attack is a valid move
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

            drawCheckedKing();
            // Same as above, but if you click the same piece, it also disables selection
            if (pieceObject.getX_previous === pieceObject.getX_selected && pieceObject.getY_previous === pieceObject.getY_selected) {
                paintTile(pieceObject.getY_selected, pieceObject.getX_selected);
                paintPiece(pieceObject.getY_previous,
                           pieceObject.getX_previous,
                           pieceObject.getPrevSelected.getNumber,
                           pieceObject.getPrevPieceSymbol);
                pieceObject.setSelected = pieceObject.setPrevSelected = null;
                pieceObject.setX_selected = pieceObject.setY_selected = pieceObject.setX_previous = pieceObject.setY_previous = 0;
                pieceObject.setPieceSymbol = pieceObject.setPrevPieceSymbol = "";

                drawCheckedKing();
                return;
            }
        }
        
        // Gets the selected piece and marks its tile blue
        for (let name in listObject.getPieceList) {
            // Returns the name of the piece from its position
            if (listObject.getPieceList[name].getNameFromPosition([pieceObject.getX_selected, pieceObject.getY_selected])) {
                pieceObject.setSelected = listObject.getPieceList[name];
                pieceObject.setPieceSymbol = pieceObject.getSelected.getPieceSymbol;
                // Paints the selected tile blue
                paintTile(pieceObject.getY_selected, pieceObject.getX_selected, "#0000FF");
                break;
            }
        }

        // Marking all available move tiles in yellow
        for (let moves in pieceObject.getSelected.getAvailableMoves) {
            paintTile(pieceObject.getSelected.getAvailableMoves[moves][1], pieceObject.getSelected.getAvailableMoves[moves][0], "#FFFF00");
            
            // For drawing the pieces on the valid move tiles
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

        // Updates the values so that it works for next selection
        // console.log(pieceObject.getSelected);
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