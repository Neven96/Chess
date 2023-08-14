import { myHeaders } from "./helpers/header.js";
import { arrayAddition, arraySubtraction } from "./helpers/arrayManipulation.js";
import { boardObject, listObject } from "./objects.js";

// Supporting movement functions

// Movement in a straight line, up, down, left, right
function lineMovement(piece, newPosition) {

    // Y-axis
    // Up
    newPosition = helperMovement(piece, newPosition, 0, 1);

    // Down
    newPosition = helperMovement(piece, newPosition, 0, -1);

    // X-axis
    // Left
    newPosition = helperMovement(piece, newPosition, 1, 0);

    // Right
    newPosition = helperMovement(piece, newPosition, -1, 0);
    
    return newPosition;
}

// Movement in a diagonal line, up-left, up-right, down-left, down-right
function diagonalMovement(piece, newPosition) {

    // Up-left
    newPosition = helperMovement(piece, newPosition, 1, 1);
    
    // Up-right
    newPosition = helperMovement(piece, newPosition, 1, -1);

    // Down-left
    newPosition = helperMovement(piece, newPosition, -1, 1);

    // Down-right
    newPosition = helperMovement(piece, newPosition, -1, -1);

    return newPosition;
}

// Helper-function for line and diagonal movement
function helperMovement(piece, newPosition, x, y) {
    let moves = 1;
    let movement = arraySubtraction(piece.getPiecePosition, [moves * x, moves * y]);
    // Runs until it meets the edge of the board, or it meets another piece
    while (boardObject.pieceArrayPosition(movement) !== 99) {
        // Hitting a white piece
        if (boardObject.pieceArrayPosition(movement) >= 1) {
            if (piece.getColor === "white") {
                break;
            } else if (piece.getColor === "black") {
                newPosition.push(movement);
                break;
            }
        // Hitting a black piece
        } else if (boardObject.pieceArrayPosition(movement) <= -1) {
            if (piece.getColor === "white") {
                newPosition.push(movement);
                break;
            } else if (piece.getColor === "black") {
                break;
            }
        }

        newPosition.push(movement);

        moves++;
        movement = arraySubtraction(piece.getPiecePosition, [moves * x, moves * y]);
    }
    
    return newPosition;
}

// Helper-function for knight and king
function helperMovement2(piece, boardPosition, checkBoard, newPosition) {
    if (checkBoard !== 99) {
        if (checkBoard === 0) {
            newPosition.push(boardPosition);
        }
        if (piece.getColor === "white") {
            if (checkBoard <= -1) {
                newPosition.push(boardPosition);
            }
        } else if (piece.getColor === "black") {
            if (checkBoard >= 1) {
                newPosition.push(boardPosition);
            }
        }
    }

    return newPosition;
}

// NEED FIX
function rokadeMove(piece, newPosition) {
    if (!piece.getMoved) {
        if (piece.getColor === "white") {
            if (piece.getPiece === "rook") {
                for (let otherPiece in listObject.getKingList) {
                    otherPiece = listObject.getKingList[otherPiece];
                    if (otherPiece.getColor === "white") {
                        if (!otherPiece.getMoved) {
                            if (piece.getPiecePosition === [0, 7]) {
                                for (let i = 1; i < 4; i++) {
                                    if (boardObject.pieceArrayPosition([i, 7]) > 0) {
                                        return;
                                    }
                                }
                                newPosition.push([3, 7])
                            } else if (piece.getPiecePosition === [7, 7]) {
                                for (let i = 5; i < 7; i++) {
                                    if (boardObject.pieceArrayPosition([i, 7]) > 0) {
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (piece.getPiece === "king") {
                for (let otherPiece in listObject.getRookList) {
                    otherPiece = listObject.getRookList[otherPiece];
                    if (otherPiece.getColor === "white") {
                        if (!otherPiece.getMoved) {

                        }
                    }
                }
            }
        } else if (piece.getColor === "black") {
            if (piece.getPiece === "rook") {
                for (let otherPiece in listObject.getKingList) {
                    otherPiece = listObject.getKingList[otherPiece];
                    if (otherPiece.getColor === "black") {
                        if (!otherPiece.getMoved) {

                        }
                    }
                }
            }
            if (piece.getPiece === "king") {
                for (let otherPiece in listObject.getRookList) {
                    otherPiece = listObject.getRookList[otherPiece];
                    if (otherPiece.getColor === "black") {
                        if (!otherPiece.getMoved) {

                        }
                    }
                }
            }
        }
    }
}

// Movement for the pieces

// Movement for pawns
function pawnMovement() {
    let newPosition = [];

    for (let piece in listObject.getPawnList) {
        newPosition = [];
        piece = listObject.getPawnList[piece];

        // Removes all moves before creating new
        piece.removeAvailableMoves();

        if (!piece.getTaken) {
            if (piece.getPiece === "pawn") {
                if (piece.getColor === "white") {
                    // Move 1
                    // This will give the x and y coordinate for the new movement, not the position in the pieceArray
                    if (boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [0, 1])) === 0 &&
                        boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [0, 1])) !== 99) {
                        newPosition.push(arraySubtraction(piece.getPiecePosition, [0, 1]));
                    }
                    // Move 2
                    if (!piece.getMoved) {
                        if (boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [0, 2])) === 0 &&
                            boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [0, 2])) !== 99) {
                            newPosition.push(arraySubtraction(piece.getPiecePosition, [0, 2]));
                        }
                    }
                    // Attack
                    if (boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [1, 1])) <= -1 &&
                        boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [1, 1])) !== 99) {
                        newPosition.push(arraySubtraction(piece.getPiecePosition, [1, 1]));
                    }
                    if (boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [-1, 1])) <= -1 &&
                        boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [-1, 1])) !== 99) {
                        newPosition.push(arraySubtraction(piece.getPiecePosition, [-1, 1]));
                    }

                } else if (piece.getColor === "black") {
                    // Move 1
                    if (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [0, 1])) === 0 &&
                        boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [0, 1])) !== 99) {
                        newPosition.push(arrayAddition(piece.getPiecePosition, [0, 1]));
                    }
                    // Move 2
                    if (!piece.getMoved) {
                        if (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [0, 2])) === 0 &&
                            boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [0, 2])) !== 99) {
                            newPosition.push(arrayAddition(piece.getPiecePosition, [0, 2]));
                        }
                    }
                    // Attack
                    if (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [1, 1])) >= 1 &&
                        boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [1, 1])) !== 99) {
                        newPosition.push(arrayAddition(piece.getPiecePosition, [1, 1]));
                    }
                    if (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [-1, 1])) >= 1 &&
                        boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [-1, 1])) !== 99) {
                        newPosition.push(arrayAddition(piece.getPiecePosition, [-1, 1]));
                    }
                }

                piece.updateAvailableMoves(newPosition);
            }
        }   
    } 
}

// Movements for rook, using lineMovement
function rookMovement() {
    let newPosition;

    for (let piece in listObject.getRookList) {
        newPosition = [];
        piece = listObject.getRookList[piece];

        // Removes all moves before creating new
        piece.removeAvailableMoves();

        if (piece.getPiece === "rook") {
            newPosition = lineMovement(piece, newPosition);
            piece.updateAvailableMoves(newPosition);
        }
    }
}

// Movement for knights, using own movement
function knightMovement() {
    let newPosition;
    let boardPosition;
    let checkBoard;

    for (let piece in listObject.getKnightList) {
        newPosition = [];
        piece = listObject.getKnightList[piece];

        // Removes all moves before creating new
        piece.removeAvailableMoves();

        if (piece.getPiece === "knight") {
            // One up, two left
            boardPosition = arraySubtraction(piece.getPiecePosition, [2, 1]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
            newPosition = helperMovement2(piece, boardPosition, checkBoard, newPosition);

            // Two up, one left
            boardPosition = arraySubtraction(piece.getPiecePosition, [1, 2]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
            newPosition = helperMovement2(piece, boardPosition, checkBoard, newPosition);

            // Two up, one right
            boardPosition = arraySubtraction(piece.getPiecePosition, [-1, 2]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
            newPosition = helperMovement2(piece, boardPosition, checkBoard, newPosition);

            // One up, two right
            boardPosition = arraySubtraction(piece.getPiecePosition, [-2, 1]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
            newPosition = helperMovement2(piece, boardPosition, checkBoard, newPosition);

            // One down, two left
            boardPosition = arrayAddition(piece.getPiecePosition, [-2, 1]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
            newPosition = helperMovement2(piece, boardPosition, checkBoard, newPosition);

            // Two down, one left
            boardPosition = arrayAddition(piece.getPiecePosition, [-1, 2]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
            newPosition = helperMovement2(piece, boardPosition, checkBoard, newPosition);

            // Two down, one right
            boardPosition = arrayAddition(piece.getPiecePosition, [1, 2]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
            newPosition = helperMovement2(piece, boardPosition, checkBoard, newPosition);

            // One down, two right
            boardPosition = arrayAddition(piece.getPiecePosition, [2, 1]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
            newPosition = helperMovement2(piece, boardPosition, checkBoard, newPosition);

            piece.updateAvailableMoves(newPosition);
        }
    }
    
}

// Movement for bishops, using diagonalMovement
function bishopMovement() {
    let newPosition;

    for (let piece in listObject.getBishopList) {
        newPosition = [];
        piece = listObject.getBishopList[piece];

        // Removes all moves before creating new
        piece.removeAvailableMoves();

        if (!piece.getTaken) {
            if (piece.getPiece === "bishop") {
                newPosition = diagonalMovement(piece, newPosition);
                piece.updateAvailableMoves(newPosition);
            }
        }    
    }
}

// Movement for queens, using both lineMovement and diagonalMovement
function queenMovement() {
    let newPosition;

    for (let piece in listObject.getQueenList) {
        newPosition = [];
        piece = listObject.getQueenList[piece];

        // Removes all moves before creating new
        piece.removeAvailableMoves();

        if (!piece.getTaken) {
            if (piece.getPiece === "queen") {
                newPosition = lineMovement(piece, newPosition);
                newPosition = diagonalMovement(piece, newPosition);
                piece.updateAvailableMoves(newPosition);
            }
        }  
    }
}

// Movement for kings, using own movement
function kingMovement() {
    let newPosition;
    let boardPosition;
    let checkBoard;

    for (let piece in listObject.getKingList) {
        newPosition = [];
        piece = listObject.getPieceList[piece];

        // Removes all moves before creating new
        piece.removeAvailableMoves();
        
        if (piece.getPiece === "king") {
            // Line Movement
            // Y-axis
            // Up
            boardPosition = arraySubtraction(piece.getPiecePosition, [0, 1]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
            newPosition = helperMovement2(piece, boardPosition, checkBoard, newPosition);

            // Down
            boardPosition = arrayAddition(piece.getPiecePosition, [0, 1]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition)
            newPosition = helperMovement2(piece, boardPosition, checkBoard, newPosition);

            // X-axis
            // Left
            boardPosition = arraySubtraction(piece.getPiecePosition, [1, 0]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
            newPosition = helperMovement2(piece, boardPosition, checkBoard, newPosition);

            // Right
            boardPosition = arrayAddition(piece.getPiecePosition, [1, 0]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
            newPosition = helperMovement2(piece, boardPosition, checkBoard, newPosition);

            // Diagonal movement
            // Up
            // Up-left
            boardPosition = arraySubtraction(piece.getPiecePosition, [1, 1]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
            newPosition = helperMovement2(piece, boardPosition, checkBoard, newPosition);

            // Up-right
            boardPosition = arraySubtraction(piece.getPiecePosition, [-1, 1]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
            newPosition = helperMovement2(piece, boardPosition, checkBoard, newPosition);

            // Down
            // Down-left
            boardPosition = arrayAddition(piece.getPiecePosition, [-1, 1]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
            newPosition = helperMovement2(piece, boardPosition, checkBoard, newPosition);

            // Down-right
            boardPosition = arrayAddition(piece.getPiecePosition, [1, 1]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
            newPosition = helperMovement2(piece, boardPosition, checkBoard, newPosition);
            piece.updateAvailableMoves(newPosition);
        }
    }
}

function updateMovement() {
    pawnMovement();
    rookMovement();
    knightMovement();
    bishopMovement();
    queenMovement();
    kingMovement();
}

export { pawnMovement, rookMovement, knightMovement, bishopMovement, queenMovement, kingMovement, updateMovement };