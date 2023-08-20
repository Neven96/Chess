import { myHeaders } from "./helpers/header.js";
import { boardObject, listObject, pieceObject, typeObjects } from "./objects.js";
import { updateMovement } from "./movement.js";
import { paintPiece } from "./paintPiece.js";
import { paintTile } from "./paintTile.js";
import { selectPiece } from "./selectPiece.js";
import { previousTurnsSetup } from "./previousTurnsSetup.js";
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
        let castling = "";
        let promotion = "";
        let attack = false;
        let attackPawn = false;
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
                            attack = true;
                            if (pieceObject.getSelected.getPiece === "pawn") {
                                attackPawn = true;
                            }
                            break;
                        }
                    }
                }

                for (let moves in pieceObject.getSelected.getAvailableMoves) {
                    paintTile(pieceObject.getSelected.getAvailableMoves[moves][1],
                              pieceObject.getSelected.getAvailableMoves[moves][0]);
                }

                if (pieceObject.getSelected.getPiece === "pawn") {
                    if (y_true === 0 || y_true === 7) {
                        // Sets up the buttons for promoting the pawn, and then waits until a choice is made
                        pawnChange();
 
                        let promise = new Promise((resolve) => { 
                            _promote = resolve 
                        });
                        await promise.then((result) => { 
                            promotion = result[0];
                            pieceObject.getSelected.changePiece(result[0], result[1]);
                        });

                        document.getElementById("rookButton").style.display = "none";
                        document.getElementById("knightButton").style.display = "none";
                        document.getElementById("bishopButton").style.display = "none";
                        document.getElementById("queenButton").style.display = "none";
                        document.getElementById("rookButton").disabled = true;
                        document.getElementById("knightButton").disabled = true;
                        document.getElementById("bishopButton").disabled = true;
                        document.getElementById("queenButton").disabled = true;

                        document.getElementById("lightBox").style.display = "none";
                    }
                }

                // For castling
                if (pieceObject.getSelected.getPiece === "king") {
                    console.log(pieceObject.getSelected);
                    let rookSelected = "";
                    if (pieceObject.getSelected.getColor === "white") {
                        // Castling with A-rook
                        if (x_true === 2) {
                            // Finds the correct rook from the position
                            rookSelected = boardObject.getNameFromNameArray([0, 7]);
                            pieceObject.setRookSelected = listObject.getRookList[rookSelected];
                            pieceObject.setRook_x = 3;
                            pieceObject.setRook_y = 7;
                            
                            moveRook();

                            castling = "long";
                        // Castling with H-rook
                        } else if (x_true === 6) {
                            // Finds the correct rook from the position
                            rookSelected = boardObject.getNameFromNameArray([7, 7]);
                            pieceObject.setRookSelected = listObject.getRookList[rookSelected];
                            pieceObject.setRook_x = 5;
                            pieceObject.setRook_y = 7;

                            moveRook();

                            castling = "short";
                        }
                    } else if (pieceObject.getSelected.getColor === "black") {
                        // Castling with A-rook
                        if (x_true === 2) {
                            // Finds the correct rook from the position
                            rookSelected = boardObject.getNameFromNameArray([0, 0]);
                            pieceObject.setRookSelected = listObject.getRookList[rookSelected];
                            pieceObject.setRook_x = 3;
                            pieceObject.setRook_y = 0;

                            moveRook();

                            castling = "long";
                        // Castling with H-rook
                        } else if (x_true === 6) {
                            // Finds the correct rook from the position
                            rookSelected = boardObject.getNameFromNameArray([7, 0]);
                            pieceObject.setRookSelected = listObject.getRookList[rookSelected];
                            pieceObject.setRook_x = 5;
                            pieceObject.setRook_y = 0;

                            moveRook();

                            castling = "short";
                        }
                    }
                }
                
                pieceObject.getSelected.movePiece([pieceObject.getX_selected, pieceObject.getY_selected]);

                boardObject.movePiece([pieceObject.getY_previous, pieceObject.getX_previous], 
                                      [pieceObject.getY_selected, pieceObject.getX_selected], 
                                      pieceObject.getSelected);

                // Draws the new piece on its new position
                paintTile(pieceObject.getY_selected, pieceObject.getX_selected)
                paintPiece(pieceObject.getY_selected, pieceObject.getX_selected,
                           pieceObject.getSelected.getNumber, pieceObject.getSelected.getPieceSymbol);

                // Makes the previous position of the piece blank
                paintTile(pieceObject.getY_previous, pieceObject.getX_previous);


                // Updates the previous positions of all pieces
                for (let name in listObject.getPieceList) {
                    listObject.getPieceList[name].updatePreviousPosition(listObject.getPieceList[name].getMoved, listObject.getPieceList[name].getTaken);
                }

                // Updates the previous turns list
                previousTurnsSetup(castling, promotion, attack, attackPawn);

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

// For moving the rook after the king in castling
function moveRook() {
    let x_previous = pieceObject.getRookSelected.getPiecePosition[0];
    let y_previous = pieceObject.getRookSelected.getPiecePosition[1];

    pieceObject.getRookSelected.movePiece([pieceObject.getRook_x, pieceObject.getRook_y]);

    boardObject.movePiece([y_previous, x_previous], 
                          [pieceObject.getRook_y, pieceObject.getRook_x], 
                          pieceObject.getRookSelected);

    // Draws the new piece on its new position
    paintTile(pieceObject.getRook_y, pieceObject.getRook_x)
    paintPiece(pieceObject.getRook_y, pieceObject.getRook_x,
               pieceObject.getRookSelected.getNumber, pieceObject.getRookSelected.getPieceSymbol);

    // Makes the previous position of the piece blank
    paintTile(y_previous, x_previous);


    pieceObject.setRookSelected = null;
    pieceObject.setRook_x = 0;
    pieceObject.setRook_y = 0;
}

// Function for showing the pawn change menu
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

    document.getElementById("lightBox").style.display = "initial";

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

    function handleClick(pieceNumber) {
        _promote([buttonList[pieceNumber]["value"], buttonList[pieceNumber]["piece"]]);

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