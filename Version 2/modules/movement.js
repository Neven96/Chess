import { myHeaders } from "./helpers/header.js";
import { arrayAddition, arraySubtraction } from "./helpers/arrayManipulation.js";
import { boardObject, listObject } from "./objects.js";

// SUPPORTING MOVEMENT FUNCTIONS
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
// Uses only arraySubtraction, so if you want to go down or right use negative x and y respectively
function helperMovement(piece, newPosition, x, y) {
    let moves = 1;
    let movement = arraySubtraction(piece.getPiecePosition, [moves * x, moves * y]);
    // Runs until it meets the edge of the board, or until it hits a piece
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
function helperMovement2(piece, newPosition, x, y) {
    let boardPosition = arraySubtraction(piece.getPiecePosition, [x, y]);
    let checkBoard = boardObject.pieceArrayPosition(boardPosition);

    if (checkBoard !== 99) {
        if (checkBoard === 0) {
            newPosition.push(boardPosition);
        }
        if (piece.getColor === "white" && checkBoard <= -1) {
            newPosition.push(boardPosition);

        } else if (piece.getColor === "black" && checkBoard >= 1) {
            newPosition.push(boardPosition);
        }
    }
    return newPosition;
}

// MOVEMENT FOR THE PIECES

// Movement for pawns
// TODO: En passant, if I can be bothered
function pawnMovement() {
    let newPosition;

    for (let piece in listObject.getPawnList) {
        piece = listObject.getPieceList[piece];

        // Removes all moves before creating new
        piece.removeAvailableMoves();

        newPosition = piece.getAvailableMoves;

        if (!piece.getTaken && piece.getPiece === "pawn") {
            if (piece.getColor === "white") {
                // Move 1
                // This will give the x and y coordinate for the new movement, not the position in the pieceArray
                newPosition = pawnMove(piece, newPosition, 0, -1)
                // Move 2
                // Needs to check if the space in front is available too, since pawns can't jump
                if (!piece.getMoved && boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [0, -1])) === 0) {
                    newPosition = pawnMove(piece, newPosition, 0, -2);
                }
                // Attack
                newPosition = pawnAttack(piece, newPosition, -1, -1);
                newPosition = pawnAttack(piece, newPosition, 1, -1);
            } else if (piece.getColor === "black") {
                // Move 1
                newPosition = pawnMove(piece, newPosition, 0, 1)
                // Move 2
                if (!piece.getMoved && boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [0, 1])) === 0) {
                    newPosition = pawnMove(piece, newPosition, 0, 2);
                }
                // Attack
                newPosition = pawnAttack(piece, newPosition, 1, 1);
                newPosition = pawnAttack(piece, newPosition, -1, 1);
            }
            piece.updateAvailableMoves(newPosition);
        }   
    }
    // Helper functions for moving pawns
    function pawnMove(piece, newPosition, x, y) {
        if (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [x, y])) === 0 &&
            boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [x, y])) !== 99) {
            newPosition.push(arrayAddition(piece.getPiecePosition, [x, y]));
        } 
        return newPosition;
    }

    // Helper function for attacking with pawns
    function pawnAttack(piece, newPosition, x, y) {
        if (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [x, y])) !== 99) {
            if (piece.getColor === "black" && boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [x, y])) >= 1) {
                newPosition.push(arrayAddition(piece.getPiecePosition, [x, y]));
            } 
            if (piece.getColor === "white" && boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [x, y])) <= -1) {
                newPosition.push(arrayAddition(piece.getPiecePosition, [x, y]));
            }
        }
        return newPosition;
    }
}

// Movements for rook, using lineMovement
function rookMovement() {
    let newPosition;

    for (let piece in listObject.getRookList) {
        piece = listObject.getPieceList[piece];

        // Removes all moves before creating new
        piece.removeAvailableMoves();

        newPosition = piece.getAvailableMoves;
        if (!piece.getTaken && piece.getPiece === "rook") {
            newPosition = lineMovement(piece, newPosition);
            piece.updateAvailableMoves(newPosition);
        }
    }
}

// Movement for knights, using own movement
function knightMovement() {
    let newPosition;

    for (let piece in listObject.getKnightList) {
        piece = listObject.getPieceList[piece];

        // Removes all moves before creating new
        piece.removeAvailableMoves();

        newPosition = piece.getAvailableMoves;
        if (!piece.getTaken && piece.getPiece === "knight") {
            // One up, two left
            newPosition = helperMovement2(piece, newPosition, 2, 1);

            // Two up, one left
            newPosition = helperMovement2(piece, newPosition, 1, 2);

            // Two up, one right
            newPosition = helperMovement2(piece, newPosition, -1, 2);

            // One up, two right
            newPosition = helperMovement2(piece, newPosition, -2, 1);

            // One down, two left
            newPosition = helperMovement2(piece, newPosition, 2, -1);

            // Two down, one left
            newPosition = helperMovement2(piece, newPosition, 1, -2);

            // Two down, one right
            newPosition = helperMovement2(piece, newPosition, -1, -2);

            // One down, two right
            newPosition = helperMovement2(piece, newPosition, -2, -1);

            piece.updateAvailableMoves(newPosition);
        }
    }
}

// Movement for bishops, using diagonalMovement
function bishopMovement() {
    let newPosition;

    for (let piece in listObject.getBishopList) {
        piece = listObject.getPieceList[piece];

        // Removes all moves before creating new
        piece.removeAvailableMoves();

        newPosition = piece.getAvailableMoves;

        if (!piece.getTaken && piece.getPiece === "bishop") {
            newPosition = diagonalMovement(piece, newPosition);
            piece.updateAvailableMoves(newPosition);
        }    
    }
}

// Movement for queens, using both lineMovement and diagonalMovement
function queenMovement() {
    let newPosition;

    for (let piece in listObject.getQueenList) {
        piece = listObject.getPieceList[piece];

        // Removes all moves before creating new
        piece.removeAvailableMoves();

        newPosition = piece.getAvailableMoves;

        if (!piece.getTaken && piece.getPiece === "queen") {
            newPosition = lineMovement(piece, newPosition);
            newPosition = diagonalMovement(piece, newPosition);
            piece.updateAvailableMoves(newPosition);
        }  
    }
}

// Movement for kings, using own movement
function kingMovement() {
    let newPosition;

    for (let piece in listObject.getKingList) {
        piece = listObject.getPieceList[piece];

        // Removes all moves before creating new
        piece.removeAvailableMoves();

        newPosition = piece.getAvailableMoves;

        if (!piece.getTaken && piece.getPiece === "king") {
            // Line Movement
            // Y-axis
            // Up
            newPosition = helperMovement2(piece, newPosition, 0, 1);

            // Down
            newPosition = helperMovement2(piece, newPosition, 0, -1);

            // X-axis
            // Left
            newPosition = helperMovement2(piece, newPosition, 1, 0);

            // Right
            newPosition = helperMovement2(piece, newPosition, -1, 0);

            // Diagonal movement
            // Up
            // Up-left
            newPosition = helperMovement2(piece, newPosition, 1, 1);

            // Up-right
            newPosition = helperMovement2(piece, newPosition, -1, 1);

            // Down
            // Down-left
            newPosition = helperMovement2(piece, newPosition, 1, -1);

            // Down-right
            newPosition = helperMovement2(piece, newPosition, -1, -1);

            // Puts the new moves into the piece
            piece.updateAvailableMoves(newPosition);

            // Castling
            // Move to either C-square of G-square, 2 moves
            // Rook moves to other side of king, either D-square or F-square, either 3 or 2 moves respectively
            if (!piece.getMoved) {
                if (piece.getColor === "white") {
                    for (let rookPiece in listObject.getRookList) {
                        rookPiece = listObject.getRookList[rookPiece];
                        let rookNewPosition = rookPiece.getAvailableMoves;

                        if (!rookPiece.getMoved && rookPiece.getColor === "white") {
                            if (rookPiece.getPiecePosition.toString() === [0, 7].toString()) {
                                // king: 2, rook: -3
                                if (boardObject.pieceArrayPosition([1, 7]) === 0 && boardObject.pieceArrayPosition([2, 7]) === 0 && boardObject.pieceArrayPosition([3, 7]) === 0) {
                                    kingCastlingHelper(piece, newPosition, rookPiece, rookNewPosition, 2, -3);
                                }
                            } else if (rookPiece.getPiecePosition.toString() === [7, 7].toString()) {
                                // King: -2, rook: 2
                                if (boardObject.pieceArrayPosition([6, 7]) === 0 && boardObject.pieceArrayPosition([5, 7]) === 0) {
                                    kingCastlingHelper(piece, newPosition, rookPiece, rookNewPosition, -2, 2);
                                }
                            }
                            piece.updateAvailableMoves(newPosition);
                        }
                    }
                } else if (piece.getColor === "black") {
                    for (let rookPiece in listObject.getRookList) {
                        rookPiece = listObject.getRookList[rookPiece];
                        // let rookBoardPosition, rookCheckBoard;
                        let rookNewPosition = rookPiece.getAvailableMoves;

                        if (!rookPiece.getMoved && rookPiece.getColor === "black") {
                            if (rookPiece.getPiecePosition.toString() === [0, 0].toString()) {
                                // king: 2, rook: -3
                                if (boardObject.pieceArrayPosition([1, 0]) === 0 && boardObject.pieceArrayPosition([2, 0]) === 0 && boardObject.pieceArrayPosition([3, 0]) === 0) {
                                    kingCastlingHelper(piece, newPosition, rookPiece, rookNewPosition, 2, -3);
                                }
                            } else if (rookPiece.getPiecePosition.toString() === [7, 0].toString()) {
                                // King: -2, rook: 2
                                if (boardObject.pieceArrayPosition([6, 0]) === 0 && boardObject.pieceArrayPosition([5, 0]) === 0) {
                                    kingCastlingHelper(piece, newPosition, rookPiece, rookNewPosition, -2, 2);
                                }
                            }
                            piece.updateAvailableMoves(newPosition);
                        }
                    }
                }
            }
        }
    }

    // Helper function for the castling process
    function kingCastlingHelper(piece, newPosition, rookPiece, rookNewPosition, kingMove, rookMove) {
        // Position for the king
        newPosition = helperMovement2(piece, newPosition, kingMove, 0);

        // Position for the rook
        rookNewPosition = helperMovement2(rookPiece, rookNewPosition, rookMove, 0);

        rookPiece.updateAvailableMoves(rookNewPosition);

        return newPosition;
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

export { updateMovement };