import { myHeaders } from "./header.js";
import { turnObject } from "./objects.js";

// The class for all pieces
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
    }

    get getName() {
        return this.name;
    }

    get getNumber() {
        return this.number;
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
     * @param {any} piecePosition
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
    getNameFromPosition(piecePosition) {
        if (this.piecePosition.toString() === piecePosition.toString()) {
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

    updatePreviousPostions() {
        this.previousPositions[turnObject.getTurn] = this.piecePosition;
    }

    // FIX ME
    movePiece(newPos) {
        this.updatePreviousPostions();
        this.piecePosition = newPos;
        if (!this.moved) {
            this.moved = true;
        }
    }
}

class Pawn extends Piece {
    constructor(name, number, color, piece, position, piecePosition) {
        super(name, number, color, piece, position, piecePosition);
    }

    changePiece(newNumber) {
        this.number = newNumber;
        switch (this.number) {
            case -2:
            case 2:
                this.piece = "rook";
                break;
            case -3:
            case 3:
                this.piece = "knight";
                break;
            case -4:
            case 4:
                this.piece = "bishop";
                break;
            case -5:
            case 5:
                this.piece = "queen";
                break;
            default:
                this.piece = "pawn";
        }
    }
}

class Rook extends Piece {
    constructor(name, number, color, piece, position, piecePosition) {
        super(name, number, color, piece, position, piecePosition);
    }

    setMoves() {

    }
}

class Knight extends Piece {
    constructor(name, number, color, piece, position, piecePosition) {
        super(name, number, color, piece, position, piecePosition);
    }

    setMoves() {

    }
}

class Bishop extends Piece {
    constructor(name, number, color, piece, position, piecePosition) {
        super(name, number, color, piece, position, piecePosition);
    }

    setMoves() {

    }
}

class Queen extends Piece {
    constructor(name, number, color, piece, position, piecePosition) {
        super(name, number, color, piece, position, piecePosition);
    }

    setMoves() {

    }
}

class King extends Piece {
    constructor(name, number, color, piece, position, piecePosition) {
        super(name, number, color, piece, position, piecePosition);
    }

    setMoves() {

    }
}

export { Piece, Pawn, Rook, Knight, Bishop, Queen, King };