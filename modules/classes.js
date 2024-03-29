import { myHeaders } from "./helpers/header.js";
import { listObject } from "./objects.js";
import { turnObject } from "./turnKeeping.js";
import { arrayCompare } from "./helpers/arrayManipulation.js";

// The class for all pieces
/**
* @param {string} name 
* "The name of the piece when it is created, can and will never be changed"
* @param {number} number 
* "The number of the piece, 1=pawn, 2=rook, 3=knight, 4=bishop, 5=queen, 6=queen. Negative numbers for black pieces"
* @param {string} color 
* "The color of the piece in a string, either 'black' or 'white'"
* @param {string} piece 
* "The type of piece in a string, either 'pawn', 'rook', 'knight', 'bishop', 'queen', or 'king'"
* @param {string} pieceSymbol
* "The UTF-8 symbol for the respective piece"
* @param {number[]} piecePosition
* "An array of length 2 of the current position of the piece"
*/
class Piece {
    constructor(name, number, color, piece, pieceSymbol, piecePosition) {
        this.name = name;
        this.number = number;
        this.color = color;
        this.piece = piece;
        this.pieceSymbol = pieceSymbol;
        this.piecePosition = piecePosition;
        this.moved = false;
        this.taken = false;
        this.availableMoves = [];
        this.previousPositions = {};
        this.getValidMove.bind(this);
    }

    get getName() {
        return this.name;
    }

    /**
     * @param {number} number
     */
    set setNumber(number) {
        this.number = number;
    }

    get getNumber() {
        return this.number;
    }

    /**
     * @param {any} color
     */
    set setColor(color) {
        this.color = color;
    }

    get getColor() {
        return this.color;
    }

    /**
     * @param {any} piece
     */
    set setPiece(piece) {
        this.piece = piece;
    }

    get getPiece() {
        return this.piece;
    }

    /**
     * @param {any} pieceSymbol
     */
    set setPieceSymbol(pieceSymbol) {
        this.pieceSymbol = pieceSymbol;
    }

    get getPieceSymbol() {
        return this.pieceSymbol;
    }

    /**
     * @param {any[]} piecePosition
     */
    set setPiecePosition(piecePosition) {
        this.piecePosition = piecePosition;
    }

    get getPiecePosition() {
        return this.piecePosition;
    }

    /**
     * @param {boolean} moved
     */
    set setMoved(moved) {
        this.moved = moved;
    }

    get getMoved() {
        return this.moved;
    }

    /**
     * @param {boolean} taken
     */
    set setTaken(taken) {
        this.taken = taken;
    }

    get getTaken() {
        return this.taken;
    }

    /**
     * @param {any[]} availableMoves
     */
    set setAvailableMoves(availableMoves) {
        this.availableMoves = availableMoves;
    }

    get getAvailableMoves() {
        return this.availableMoves;
    }

    get getPreviousPositions() {
        return this.previousPositions;
    }

    // If the position of the piece equals the position given, it returns the piece
    getNameFromPosition(newPosition) {
        if (arrayCompare(this.piecePosition, newPosition)) {
            return this.name;
        } else {
            return false;
        }
    }

    // Updates the moves for the piece, as long as it's in game
    updateAvailableMoves(newAvailablePositions) {
        if (!this.taken) {
            this.availableMoves = newAvailablePositions;
        }
    }

    pushAvailableMove(newAvailableMove) {
        if (!this.taken) {
            this.availableMoves.push(newAvailableMove);
        }
    }

    removeAvailableMoves() {
        this.availableMoves = [];
    }

    // Updates the previous positions of the piece and if it has been moved and/or taken
    updatePreviousPosition(moved = this.moved, taken = this.taken) {
        this.previousPositions[turnObject.getInternalTurn] = [this.piecePosition, moved, taken];
    }

    // Checks if newPosition array is in the availableMoves 2d array
    getValidMove(newPosition) {
        if (this.availableMoves.length === 0) {
            return false;
        }
        for (let array in this.availableMoves) {
            if (arrayCompare(this.availableMoves[array], newPosition)) {
                return true;
            }
        }
        return false;
    }

    // Moves the piece and updates the board
    movePiece(newPosition) {
        this.updatePreviousPosition(true);
        this.piecePosition = newPosition;
        if (!this.moved) {
            this.moved = true;
        }
    }
}

class Pawn extends Piece {
    constructor(name, number, color, piece, position, piecePosition) {
        super(name, number, color, piece, position, piecePosition);
        this.promoted = false;
    }

    /**
     * @param {boolean} promoted
     */
    set setPromoted(promoted) {
        this.promoted = promoted
    }

    get getPromoted() {
        return this.promoted;
    }

    // Same as above class, but also checks for promotion
    updatePreviousPosition(moved = this.moved, taken = this.taken, promoted = this.promoted) {
        this.previousPositions[turnObject.getInternalTurn] = [this.piecePosition, moved, taken, promoted];
    }

    // For promoting the pawn to an officer piece
    async changePiece(newNumber, newPieceSymbol) {
        this.number = newNumber;
        this.pieceSymbol = newPieceSymbol;
        this.promoted = true;

        switch (this.number) {
            case -2:
            case 2:
                this.piece = "rook";
                listObject.addToList("rook", this);
                break;
            case -3:
            case 3:
                this.piece = "knight";
                listObject.addToList("knight", this);
                break;
            case -4:
            case 4:
                this.piece = "bishop";
                listObject.addToList("bishop", this);
                break;
            case -5:
            case 5:
                this.piece = "queen";
                listObject.addToList("queen", this);
                break;
            default:
                this.piece = "pawn";
        }
    }
}

// Non of these classes are really useful, but it is nice to seperate the pieces atleast
class Rook extends Piece {
    constructor(name, number, color, piece, position, piecePosition) {
        super(name, number, color, piece, position, piecePosition);
    }

}

class Knight extends Piece {
    constructor(name, number, color, piece, position, piecePosition) {
        super(name, number, color, piece, position, piecePosition);
    }

}

class Bishop extends Piece {
    constructor(name, number, color, piece, position, piecePosition) {
        super(name, number, color, piece, position, piecePosition);
    }

}

class Queen extends Piece {
    constructor(name, number, color, piece, position, piecePosition) {
        super(name, number, color, piece, position, piecePosition);
    }

}

class King extends Piece {
    constructor(name, number, color, piece, position, piecePosition) {
        super(name, number, color, piece, position, piecePosition);
    }

}

export { Piece, Pawn, Rook, Knight, Bishop, Queen, King };