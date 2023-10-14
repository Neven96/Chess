import { myHeaders } from "./helpers/header.js";
import { arrayAddition, arrayCompare, arraySubtraction } from "./helpers/arrayManipulation.js";
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
function updateMovement() {
    for (let piece in listObject.getPieceList) {
        piece = listObject.getPieceList[piece];

        if (!piece.getTaken) {
            // Removes all moves before creating new
            piece.removeAvailableMoves();

            let newPosition = piece.getAvailableMoves;

            if (piece.getPiece === "pawn") {
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
            }
            else if (piece.getPiece === "rook") {
                newPosition = lineMovement(piece, newPosition);
            }
            else if (piece.getPiece === "knight") {
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
            }
            else if (piece.getPiece === "bishop") {
                newPosition = diagonalMovement(piece, newPosition);
            }
            else if (piece.getPiece === "queen") {
                newPosition = lineMovement(piece, newPosition);
                newPosition = diagonalMovement(piece, newPosition);
            }
            else if (piece.getPiece === "king") {
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

                // Castling
                // Move to either C-square of G-square, 2 moves
                // Rook moves to other side of king, either D-square or F-square, either 3 or 2 moves respectively
                if (!piece.getMoved) {
                    if (piece.getColor === "white") {
                        for (let rookPiece in listObject.getRookList) {
                            rookPiece = listObject.getRookList[rookPiece];
                            let rookNewPosition = rookPiece.getAvailableMoves;

                            if (!rookPiece.getMoved && rookPiece.getColor === "white") {
                                if (arrayCompare(rookPiece.getPiecePosition, [0, 7])) {
                                    // king: 2, rook: -3
                                    if (boardObject.pieceArrayPosition([1, 7]) === 0 && boardObject.pieceArrayPosition([2, 7]) === 0 && boardObject.pieceArrayPosition([3, 7]) === 0) {
                                        newPosition = kingCastlingHelper(piece, newPosition, rookPiece, rookNewPosition, 2, -3);
                                    }
                                } else if (arrayCompare(rookPiece.getPiecePosition, [7, 7])) {
                                    // King: -2, rook: 2
                                    if (boardObject.pieceArrayPosition([6, 7]) === 0 && boardObject.pieceArrayPosition([5, 7]) === 0) {
                                        newPosition = kingCastlingHelper(piece, newPosition, rookPiece, rookNewPosition, -2, 2);
                                    }
                                }
                            }
                        }
                    } else if (piece.getColor === "black") {
                        for (let rookPiece in listObject.getRookList) {
                            rookPiece = listObject.getRookList[rookPiece];
                            // let rookBoardPosition, rookCheckBoard;
                            let rookNewPosition = rookPiece.getAvailableMoves;

                            if (!rookPiece.getMoved && rookPiece.getColor === "black") {
                                if (arrayCompare(rookPiece.getPiecePosition, [0, 0])) {
                                    // king: 2, rook: -3
                                    if (boardObject.pieceArrayPosition([1, 0]) === 0 && boardObject.pieceArrayPosition([2, 0]) === 0 && boardObject.pieceArrayPosition([3, 0]) === 0) {
                                        newPosition = kingCastlingHelper(piece, newPosition, rookPiece, rookNewPosition, 2, -3);
                                    }
                                } else if (arrayCompare(rookPiece.getPiecePosition, [7, 0])) {
                                    // King: -2, rook: 2
                                    if (boardObject.pieceArrayPosition([6, 0]) === 0 && boardObject.pieceArrayPosition([5, 0]) === 0) {
                                        newPosition = kingCastlingHelper(piece, newPosition, rookPiece, rookNewPosition, -2, 2);
                                    }
                                }
                            }
                        }
                    }
                }
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

    // Helper function for the king castling process
    function kingCastlingHelper(piece, newPosition, rookPiece, rookNewPosition, kingMove, rookMove) {
        // Position for the king
        newPosition = helperMovement2(piece, newPosition, kingMove, 0);

        // Position for the rook
        rookNewPosition = helperMovement2(rookPiece, rookNewPosition, rookMove, 0);

        rookPiece.updateAvailableMoves(rookNewPosition);

        return newPosition;
    }
}

export { updateMovement };