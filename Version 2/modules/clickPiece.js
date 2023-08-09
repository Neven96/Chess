import { myHeaders } from "./header.js";
import { boardObject, listObject, pieceObject, typeObjects } from "./objects.js";
import { pawnMovement, rookMovement, knightMovement, bishopMovement, queenMovement, kingMovement } from "./movement.js";
import { paintPiece } from "./paintPiece.js";
import { paintTile } from "./paintTile.js";
import { selectPiece } from "./selectPiece.js";
import { endTurn } from "./endTurn.js";
import { pauseObject } from "./pauseGame.js";


function clickPiece(event) {
    if (typeObjects.getStarted && !pauseObject.getPause) {
        const rect = boardObject.getBoard.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        let x_true = Math.floor(x / (boardObject.getBoard.height / 8));
        let y_true = Math.floor(y / (boardObject.getBoard.width / 8));
        // console.log("x: " + x_true + ", y: " + y_true);

        pieceObject.setX_selected = x_true;
        pieceObject.setY_selected = y_true;

        if (pieceObject.getSelected !== null) {
            // Checks if the clicked tile is a valid move for that piece
            if (pieceObject.getSelected.getValidMove([x_true, y_true])) {
                if ((pieceObject.getSelected.getColor === "white" && boardObject.pieceArrayPosition([x_true, y_true]) <= -1) || (pieceObject.getSelected.getColor === "black" && boardObject.pieceArrayPosition([x_true, y_true]) >= 1)) {
                    for (let name in listObject.getPieceList) {
                        if (listObject.getPieceList[name].getNameFromPosition([x_true, y_true])) {
                            let takenPiece = listObject.getPieceList[name];
                            takenPiece.setTaken = true;
                            takenPiece.setPiecePosition = [99, 99];
                            takenPiece.removeAvailableMoves();
                            document.getElementById(pieceObject.getSelected.getColor+"Taken").textContent += takenPiece.getPieceSymbol;
                            break;
                        }
                    }
                }

                // Moves the piece and then updates the board
                pieceObject.getSelected.movePiece([x_true, y_true]);

                boardObject.movePiece([pieceObject.getY_previous, pieceObject.getX_previous], 
                                      [pieceObject.getY_selected, pieceObject.getX_selected], 
                                      pieceObject.getSelected.getNumber);

                // Draws the new piece on its new position
                paintTile(pieceObject.getY_selected, pieceObject.getX_selected)
                paintPiece(pieceObject.getY_selected,
                           pieceObject.getX_selected,
                           pieceObject.getSelected.getNumber,
                           pieceObject.getPieceSymbol);

                // Makes the previous position of the piece blank
                paintTile(pieceObject.getY_previous, pieceObject.getX_previous);

                // Resets the selected piece
                pieceObject.setSelected = pieceObject.setPrevSelected = null;
                pieceObject.setX_selected = pieceObject.setY_selected = pieceObject.setX_previous = pieceObject.setY_previous = 0;
                pieceObject.setPieceSymbol = pieceObject.setPrevPieceSymbol = "";

                // Updates the previous positions of all pieces
                for (let name in listObject.getPieceList) {
                    listObject.getPieceList[name].updatePreviousPosition();
                }

                // Updates the moves of all pieces
                pawnMovement();
                rookMovement();
                knightMovement();
                bishopMovement();
                queenMovement();
                kingMovement();
                // console.log(boardObject.getPieceArray);
                endTurn();
                return;
            }
        } 
        if (boardObject.pieceArrayPosition([x_true, y_true]) !== 0) {
            selectPiece()
        }
    }
}

export { clickPiece };