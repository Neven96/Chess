import { myHeaders } from "./header.js";
import { arrayAddition, arraySubtraction } from "./helpers/arrayManipulation.js";
import { boardObject, listObject } from "./objects.js";

// Movement in a straight line, up, down, left, right
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

// Movement in a diagonal line, up-left, up-right, down-left, down-right
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

function rokadeMove(piece) {
    let newPosition = [];

    if (!piece.getMoved) {
        
    }
}

// Movement for pawns
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
                piece.updateAvailableMoves(newPosition);
            }
        }   
    } 
}

// Movements for rook, using lineMovement
function rookMovement() {
    let newPosition = [];

    for (let piece in listObject.getRookList) {
        newPosition = [];
        piece = listObject.getRookList[piece];

        if (piece.getPiece === "rook") {
            newPosition = lineMovement(piece, newPosition);
            piece.updateAvailableMoves(newPosition);
        }
    }
}

// Movement for knights, using own movement
function knightMovement() {
    let newPosition = [];

    for (let piece in listObject.getKnightList) {
        newPosition = [];
        piece = listObject.getKnightList[piece];

        if (piece.getPiece === "knight") {
            // One up, two left
            let boardPosition = arraySubtraction(piece.getPiecePosition, [2, 1]);
            let checkBoard = boardObject.pieceArrayPosition(boardPosition);
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

            // Two up, one left
            boardPosition = arraySubtraction(piece.getPiecePosition, [1, 2]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
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

            // Two up, one right
            boardPosition = arraySubtraction(piece.getPiecePosition, [-1, 2]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
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

            // One up, two right
            boardPosition = arraySubtraction(piece.getPiecePosition, [-2, 1]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
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

            // One down, two left
            boardPosition = arrayAddition(piece.getPiecePosition, [-2, 1]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
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

            // Two down, one left
            boardPosition = arrayAddition(piece.getPiecePosition, [-1, 2]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
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

            // Two down, one right
            boardPosition = arrayAddition(piece.getPiecePosition, [1, 2]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
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

            // One down, two right
            boardPosition = arrayAddition(piece.getPiecePosition, [2, 1]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
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
            piece.updateAvailableMoves(newPosition);
        }
    }
    
}

// Movement for bishops, using diagonalMovement
function bishopMovement() {
    let newPosition = [];

    for (let piece in listObject.getBishopList) {
        newPosition = [];
        piece = listObject.getBishopList[piece];

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
    let newPosition = [];

    for (let piece in listObject.getQueenList) {
        newPosition = [];
        piece = listObject.getQueenList[piece];

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
    let newPosition = [];

    for (let piece in listObject.getKingList) {
        newPosition = [];
        piece = listObject.getPieceList[piece];
        if (piece.getPiece === "king") {
            // Line Movement
            // Y-axis
            // Up
            let boardPosition = arraySubtraction(piece.getPiecePosition, [0, 1]);
            let checkBoard = boardObject.pieceArrayPosition(boardPosition);
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
            // Down
            boardPosition = arrayAddition(piece.getPiecePosition, [0, 1]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition)
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
            // X-axis
            // Left
            boardPosition = arraySubtraction(piece.getPiecePosition, [1, 0]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
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
            // Right
            boardPosition = arrayAddition(piece.getPiecePosition, [1, 0]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
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
            // Diagonal movement
            // Up-left
            boardPosition = arraySubtraction(piece.getPiecePosition, [1, 1]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
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
            // Up-right
            boardPosition = arraySubtraction(piece.getPiecePosition, [-1, 1]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
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
            // Down-left
            boardPosition = arraySubtraction(piece.getPiecePosition, [-1, 1]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
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
            // Down-right
            boardPosition = arraySubtraction(piece.getPiecePosition, [1, 1]);
            checkBoard = boardObject.pieceArrayPosition(boardPosition);
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
            piece.updateAvailableMoves(newPosition);
        }
    }
}

export { pawnMovement, rookMovement, knightMovement, bishopMovement, queenMovement, kingMovement };