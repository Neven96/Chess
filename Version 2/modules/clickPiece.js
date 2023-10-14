import { myHeaders } from "./helpers/header.js";
import { boardObject, listObject, pieceObject, typeObjects } from "./objects.js";
import { updateMovement } from "./movement2.js";
import { paintPiece, paintValidPieces } from "./paintPiece.js";
import { paintTile } from "./paintTile.js";
import { selectPiece } from "./selectPiece.js";
import { previousTurnsSetup } from "./previousTurnsSetup.js";
import { endTurn } from "./endTurn.js";
import { pauseObject } from "./pauseGame.js";
import { takenPieces } from "./takenPieces.js";
import { drawCheckedKing, kingCheckChecker } from "./kingCheckChecker.js";

let _promote;

// When clicking on the board, either to select, deselect or attack pieces
// Just general selection and movement of pieces, should probably be split into another function
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
        let whiteCheck = false;
        let blackCheck = false;

        pieceObject.setX_selected = x_true;
        pieceObject.setY_selected = y_true;

        // If there is a selected piece
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
                            attack = true;
                            if (pieceObject.getSelected.getPiece === "pawn") {
                                attackPawn = true;
                            }

                            takenPieces(takenPiece);
                            break;
                        }
                    }
                }

                // Repaints the board tiles and the pieces lit up as valid moves, after movement
                for (let moves in pieceObject.getSelected.getAvailableMoves) {
                    paintTile(pieceObject.getSelected.getAvailableMoves[moves][1],
                              pieceObject.getSelected.getAvailableMoves[moves][0]);

                    paintValidPieces(moves);
                }

                // For promoting
                if (pieceObject.getSelected.getPiece === "pawn" && (y_true === 0 || y_true === 7)) {
                    // Sets up the buttons for promoting the pawn, and then waits until a choice is made
                    pawnChange();
                    
                    // Returns a promise for stopping the board when the pawn change menu appears
                    let promise = new Promise((resolve) => { 
                        _promote = resolve 
                    });
                    await promise.then((result) => { 
                        promotion = result[0];
                        pieceObject.getSelected.changePiece(result[0], result[1]);
                    });

                    // Removes the promotion buttons and disables them
                    for (let i = 0; i < document.getElementsByClassName("changePieceButton").length; i++) {
                        document.getElementsByClassName("changePieceButton")[i].style.display = "none";
                        document.getElementsByClassName("changePieceButton")[i].disabled = true;
                    }

                    document.getElementById("lightBox").style.display = "none";
                }

                // For castling
                // Need to check for movedd piece because I'm stupid and did castling in two different ways...
                if (pieceObject.getSelected.getPiece === "king" && !pieceObject.getSelected.getMoved) {
                    if (pieceObject.getSelected.getColor === "white") {
                        // Castling with A-rook
                        if (x_true === 2) {
                            castling = moveRook(0, 3, 7, "long");
                        // Castling with H-rook
                        } else if (x_true === 6) {
                            castling = moveRook(7, 5, 7, "short");
                        }
                    } else if (pieceObject.getSelected.getColor === "black") {
                        // Castling with A-rook
                        if (x_true === 2) {
                            castling = moveRook(0, 3, 0, "long");
                        // Castling with H-rook
                        } else if (x_true === 6) {
                            castling = moveRook(7, 5, 0, "short");
                        }
                    }
                }
                
                // Moves the piece in the piece
                pieceObject.getSelected.movePiece([pieceObject.getX_selected, pieceObject.getY_selected]);

                // Moves the piece in the board
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

                // Updates the previous positions of pawns, but also includes promotion
                for (let name in listObject.getPawnList) {
                    listObject.getPawnList[name].updatePreviousPosition(listObject.getPawnList[name].getMoved, listObject.getPawnList[name].getTaken, listObject.getPawnList[name].getPromoted);
                }

                // Updates the moves of all pieces
                updateMovement();

                // Gets if the king is check for the previous turns setup
                let checkChecker = kingCheckChecker();

                if (checkChecker) {
                    if (checkChecker["white_checked"][1]) {
                        whiteCheck = true;
                    }
                    if (checkChecker["black_checked"][1]) {
                        blackCheck = true;
                    }
                }
                
                // Updates the previous turns list
                previousTurnsSetup(castling, promotion, attack, attackPawn, whiteCheck, blackCheck);

                // Checks if the kings are in check, and if they are, marks their tile in red
                drawCheckedKing();

                // Resets the selected piece
                pieceObject.setSelected = pieceObject.setPrevSelected = null;
                pieceObject.setX_selected = pieceObject.setY_selected = pieceObject.setX_previous = pieceObject.setY_previous = 0;
                pieceObject.setPieceSymbol = pieceObject.setPrevPieceSymbol = "";

                endTurn();
                return;
            }
        } 
        // When clicking on a piece, either when previously selected or when it is not a valid attack move
        if (boardObject.pieceArrayPosition([x_true, y_true]) !== 0) {
            selectPiece()
        }
    }
}

// For moving the rook after the king in castling
function moveRook(prev_x, new_x, y, castling) {
    // Finds the correct rook from the position
    let rookSelected = boardObject.getNameFromNameArray([prev_x, y]);
    pieceObject.setRookSelected = listObject.getRookList[rookSelected];
    pieceObject.setRook_x = new_x;
    pieceObject.setRook_y = y;

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

    return castling;
}

// Function for showing the pawn change menu
async function pawnChange() {
    let buttonPieceValueList = {"rook": [], "knight": [], "bishop": [], "queen": []}

    // Gives the pawn the correct new piece and color
    if (pieceObject.getSelected.getColor === "white") {
        buttonPieceValueList["rook"] = ["\u{2656}", 2];
        buttonPieceValueList["knight"] = ["\u{2658}", 3];
        buttonPieceValueList["bishop"] = ["\u{2657}", 4];
        buttonPieceValueList["queen"] = ["\u{2655}", 5];
    } else if (pieceObject.getSelected.getColor === "black") {
        buttonPieceValueList["rook"] = ["\u{265C}", -2];
        buttonPieceValueList["knight"] = ["\u{265E}", -3];
        buttonPieceValueList["bishop"] = ["\u{265D}", -4];
        buttonPieceValueList["queen"] = ["\u{265B}", -5];
    }

    document.getElementById("lightBox").style.display = "initial";

    // Giving the buttons the values, and making them visible and clickable
    for (let piece in buttonPieceValueList) {
        document.getElementById(piece+"ButtonSpan").textContent = buttonPieceValueList[piece][0];
        document.getElementById(piece+"ButtonSpan").value = piece;
        document.getElementById(piece+"Button").style.display = "initial";
        document.getElementById(piece+"Button").value = piece;
        document.getElementById(piece+"Button").disabled = false;
    }

    // To send the values
    function clicked(event) {
        handleClick(event.target.value);
    }

    // Removes the events for the promotion buttons and sends the values to the await/promise
    function handleClick(piece) {
        _promote([buttonPieceValueList[piece][1], buttonPieceValueList[piece][0]]);

        for (let i = 0; i < document.getElementsByClassName("changePieceButton").length; i++) {
            document.getElementsByClassName("changePieceButton")[i].removeEventListener("click", clicked);
        }
    }

    // Adds the events for the promotion buttons
    for (let i = 0; i < document.getElementsByClassName("changePieceButton").length; i++) {
        document.getElementsByClassName("changePieceButton")[i].addEventListener("click", clicked);
    }
}

export { clickPiece };