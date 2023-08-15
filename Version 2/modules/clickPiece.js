import { myHeaders } from "./helpers/header.js";
import { boardObject, listObject, pieceObject, typeObjects } from "./objects.js";
import { updateMovement } from "./movement.js";
import { paintPiece } from "./paintPiece.js";
import { paintTile } from "./paintTile.js";
import { selectPiece } from "./selectPiece.js";
import { endTurn } from "./endTurn.js";
import { pauseObject } from "./pauseGame.js";

let _promote;

async function clickPiece(event) {
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

                // For capturing a piece
                if ((pieceObject.getSelected.getColor === "white" && boardObject.pieceArrayPosition([x_true, y_true]) <= -1) || (pieceObject.getSelected.getColor === "black" && boardObject.pieceArrayPosition([x_true, y_true]) >= 1)) {
                    for (let name in listObject.getPieceList) {
                        if (listObject.getPieceList[name].getNameFromPosition([x_true, y_true])) {
                            // Gets the taken piece and sets it to taken, moves it away from the board, and adds the piece to the taken pieces
                            let takenPiece = listObject.getPieceList[name];
                            takenPiece.setTaken = true;
                            takenPiece.setPiecePosition = [99, 99];
                            takenPiece.removeAvailableMoves();
                            document.getElementById(pieceObject.getSelected.getColor+"Taken").textContent += takenPiece.getPieceSymbol;
                            break;
                        }
                    }
                }

                if (pieceObject.getSelected.getPiece === "pawn") {
                    if (y_true === 0 || y_true === 7) {
                        // Sets up the buttons for promoting the pawn, and then waits until a choice is made
                        pawnChange();
 
                        let promise = new Promise((resolve) => { 
                            _promote = resolve 
                        });
                        await promise.then((result) => { 
                            pieceObject.getSelected.changePiece(result[0], result[1]) 
                        });

                        console.log(listObject.getPawnList);
                        console.log(listObject.getQueenList);

                        document.getElementById("rookButton").style.display = "none";
                        document.getElementById("knightButton").style.display = "none";
                        document.getElementById("bishopButton").style.display = "none";
                        document.getElementById("queenButton").style.display = "none";
                        document.getElementById("rookButton").disabled = true;
                        document.getElementById("knightButton").disabled = true;
                        document.getElementById("bishopButton").disabled = true;
                        document.getElementById("queenButton").disabled = true;
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
                           pieceObject.getSelected.getPieceSymbol);

                // Makes the previous position of the piece blank
                paintTile(pieceObject.getY_previous, pieceObject.getX_previous);


                // Updates the previous positions of all pieces
                for (let name in listObject.getPieceList) {
                    listObject.getPieceList[name].updatePreviousPosition(listObject.getPieceList[name].getMoved);
                }

                // Resets the selected piece
                pieceObject.setSelected = pieceObject.setPrevSelected = null;
                pieceObject.setX_selected = pieceObject.setY_selected = pieceObject.setX_previous = pieceObject.setY_previous = 0;
                pieceObject.setPieceSymbol = pieceObject.setPrevPieceSymbol = "";

                

                // Updates the moves of all pieces
                updateMovement();
                
                endTurn();
                return;
            }
        } 
        if (boardObject.pieceArrayPosition([x_true, y_true]) !== 0) {
            selectPiece()
        }
    }
}

async function pawnChange() {
    let rookButtonPiece, knightButtonPiece, bishopButtonPiece, queenButtonPiece;
    let rookButtonValue, knightButtonValue, bishopButtonValue, queenButtonValue;

    // Gives the pawn the correct new piece and color
    if (pieceObject.getSelected.getColor === "white") {
        rookButtonPiece = "\u{2656}"
        knightButtonPiece = "\u{2658}"
        bishopButtonPiece = "\u{2657}"
        queenButtonPiece = "\u{2655}"
        rookButtonValue = 2;
        knightButtonValue = 3;
        bishopButtonValue = 4;
        queenButtonValue = 5;
    } else if (pieceObject.getSelected.getColor === "black") {
        rookButtonPiece = "\u{265C}"
        knightButtonPiece = "\u{265E}"
        bishopButtonPiece = "\u{265D}"
        queenButtonPiece = "\u{265B}"
        rookButtonValue = -2;
        knightButtonValue = -3;
        bishopButtonValue = -4;
        queenButtonValue = -5;
    }

    let buttonList = {
        "rook": { "piece": rookButtonPiece, "value": rookButtonValue }, 
        "knight": { "piece": knightButtonPiece, "value": knightButtonValue }, 
        "bishop": { "piece": bishopButtonPiece, "value": bishopButtonValue }, 
        "queen": { "piece": queenButtonPiece, "value": queenButtonValue }
    };

    // Giving the buttons the values, and making them visible and clickable
    for (let piece in buttonList) {
        document.getElementById(piece+"ButtonSpan").textContent = buttonList[piece]["piece"];
        document.getElementById(piece+"ButtonSpan").value = piece;
        document.getElementById(piece+"Button").style.display = "initial";
        document.getElementById(piece+"Button").value = piece;
        document.getElementById(piece+"Button").disabled = false;
    }

    // To send the values
    function clicked(event) {
        handleClick(event.target.value);
    }

    function handleClick(piece) {
        _promote([buttonList[piece]["value"], buttonList[piece]["piece"]]);

        document.getElementById("rookButton").removeEventListener("click", clicked);
        document.getElementById("knightButton").removeEventListener("click", clicked);
        document.getElementById("bishopButton").removeEventListener("click", clicked);
        document.getElementById("queenButton").removeEventListener("click", clicked);
    }

    document.getElementById("rookButton").addEventListener("click", clicked);
    document.getElementById("knightButton").addEventListener("click", clicked);
    document.getElementById("bishopButton").addEventListener("click", clicked);
    document.getElementById("queenButton").addEventListener("click", clicked);
}

export { clickPiece };