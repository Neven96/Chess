import { myHeaders } from "./header.js";
import { arrayAddition, arraySubtraction } from "./helpers/arrayManipulation.js";
import { boardObject, listObject } from "./objects.js";

function lineMovement(piece, newPosition) {
    let moves = 1;
    // Y-axis
    // Up
    while (boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [0, moves])) === 0 &&
           boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [0, moves])) !== 99) {
        
        if (piece.getColor === "white") {
            if (boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [0, moves])) <= -1) {
                newPosition.push(arraySubtraction(piece.getPiecePosition, [0, moves]));
                break;
            }
        } else if (piece.getColor === "black") {
            if (boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [0, moves])) >= 1) {
                newPosition.push(arraySubtraction(piece.getPiecePosition, [0, moves]));
                break;
            }
        }
        newPosition.push(arraySubtraction(piece.getPiecePosition, [0, moves]));

        moves++;
    }

    // Down
    moves = 1;
    while (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [0, moves])) === 0 &&
        boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [0, moves])) !== 99) {

        if (piece.getColor === "white") {
            if (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [0, moves])) <= -1) {
                newPosition.push(arrayAddition(piece.getPiecePosition, [0, moves]));
                break;
            }
        } else if (piece.getColor === "black") {
            if (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [0, moves])) >= 1) {
                newPosition.push(arrayAddition(piece.getPiecePosition, [0, moves]));
                break;
            }
        }
        newPosition.push(arrayAddition(piece.getPiecePosition, [0, moves]));

        moves++;
    }

    // X-axis
    // Left
    moves = 1;
    while (boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [moves, 0])) === 0 &&
        boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [moves, 0])) !== 99) {

        if (piece.getColor === "white") {
            if (boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [moves, 0])) <= -1) {
                newPosition.push(arraySubtraction(piece.getPiecePosition, [moves, 0]));
                break;
            }
        } else if (piece.getColor === "black") {
            if (boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [moves, 0])) >= 1) {
                newPosition.push(arraySubtraction(piece.getPiecePosition, [moves, 0]));
                break;
            }
        }
        newPosition.push(arraySubtraction(piece.getPiecePosition, [moves, 0]));

        moves++;
    }

    // Right
    moves = 1;
    while (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [moves, 0])) === 0 &&
        boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [moves, 0])) !== 99) {

        if (piece.getColor === "white") {
            if (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [moves, 0])) <= -1) {
                newPosition.push(arrayAddition(piece.getPiecePosition, [moves, 0]));
                break;
            }
        } else if (piece.getColor === "black") {
            if (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [moves, 0])) >= 1) {
                newPosition.push(arrayAddition(piece.getPiecePosition, [moves, 0]));
                break;
            }
        }
        newPosition.push(arrayAddition(piece.getPiecePosition, [moves, 0]));

        moves++;
    }
    

    return newPosition;
}

function diagonalMovement(piece, newPosition) {
    let moves = 1;

    // Up-left
    moves = 1;
    while (boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [moves, moves])) === 0 &&
        boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [moves, moves])) !== 99) {

        if (piece.getColor === "white") {
            if (boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [moves, moves])) <= -1) {
                newPosition.push(arraySubtraction(piece.getPiecePosition, [moves, moves]));
                break;
            }
        } else if (piece.getColor === "black") {
            if (boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [moves, moves])) >= 1) {
                newPosition.push(arraySubtraction(piece.getPiecePosition, [moves, moves]));
                break;
            }
        }
        newPosition.push(arraySubtraction(piece.getPiecePosition, [moves, moves]));

        moves++;
    }

    // Up-right
    moves = 1;
    while (boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [moves, -moves])) === 0 &&
        boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [moves, -moves])) !== 99) {

        if (piece.getColor === "white") {
            if (boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [moves, -moves])) <= -1) {
                newPosition.push(arraySubtraction(piece.getPiecePosition, [moves, -moves]));
                break;
            }
        } else if (piece.getColor === "black") {
            if (boardObject.pieceArrayPosition(arraySubtraction(piece.getPiecePosition, [moves, -moves])) >= 1) {
                newPosition.push(arraySubtraction(piece.getPiecePosition, [moves, -moves]));
                break;
            }
        }
        newPosition.push(arraySubtraction(piece.getPiecePosition, [moves, -moves]));

        moves++;
    }

    // Down-left
    moves = 1;
    while (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [moves, -moves])) === 0 &&
        boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [moves, -moves])) !== 99) {

        if (piece.getColor === "white") {
            if (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [moves, -moves])) <= -1) {
                newPosition.push(arrayAddition(piece.getPiecePosition, [moves, -moves]));
                break;
            }
        } else if (piece.getColor === "black") {
            if (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [moves, -moves])) >= 1) {
                newPosition.push(arrayAddition(piece.getPiecePosition, [moves, -moves]));
                break;
            }
        }
        newPosition.push(arrayAddition(piece.getPiecePosition, [moves, -moves]));

        moves++;
    }

    // Down-right
    moves = 1;
    while (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [moves, moves])) === 0 &&
        boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [moves, moves])) !== 99) {

        if (piece.getColor === "white") {
            if (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [moves, moves])) <= -1) {
                newPosition.push(arrayAddition(piece.getPiecePosition, [moves, moves]));
                break;
            }
        } else if (piece.getColor === "black") {
            if (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [moves, moves])) >= 1) {
                newPosition.push(arrayAddition(piece.getPiecePosition, [moves, moves]));
                break;
            }
        }
        newPosition.push(arrayAddition(piece.getPiecePosition, [moves, moves]));

        moves++;
    }

    return newPosition;
}

function pawnMovement() {
    let newPosition = [];

    for (let piece in listObject.getPawnList) {
        newPosition = [];
        piece = listObject.getPawnList[piece];
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
                    if (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [1, 1])) <= -1 &&
                        boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [1, 1])) !== 99) {
                        newPosition.push(arrayAddition(piece.getPiecePosition, [1, 1]));
                    }
                    if (boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [-1, 1])) <= -1 &&
                        boardObject.pieceArrayPosition(arrayAddition(piece.getPiecePosition, [-1, 1])) !== 99) {
                        newPosition.push(arrayAddition(piece.getPiecePosition, [-1, 1]));
                    }
                }
            }
        }
        piece.updateAvailableMoves(newPosition);
    } 
}

function rookMovement() {
    let newPosition = [];

    for (let piece in listObject.getPieceList) {
        newPosition = [];
        piece = listObject.getPieceList[piece];
        if (piece.getPiece === "rook") {
            newPosition = lineMovement(piece, newPosition);
            piece.updateAvailableMoves(newPosition);
        }
    }
}

function knightMovement() {
    
}

function bishopMovement() {
    let newPosition = [];

    for (let piece in listObject.getPieceList) {
        newPosition = [];
        piece = listObject.getPieceList[piece];
        if (piece.getPiece === "bishop") {
            newPosition = diagonalMovement(piece, newPosition);
            piece.updateAvailableMoves(newPosition);
        }
    }
}

function queenMovement() {
    let newPosition = [];

    for (let piece in listObject.getPieceList) {
        newPosition = [];
        piece = listObject.getPieceList[piece];
        if (piece.getPiece === "queen") {
            newPosition = lineMovement(piece, newPosition);
            newPosition = diagonalMovement(piece, newPosition);
            piece.updateAvailableMoves(newPosition);
        }
    }
}

function kingMovement() {
    
}

export { pawnMovement, rookMovement, knightMovement, bishopMovement, queenMovement, kingMovement };