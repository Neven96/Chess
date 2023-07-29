import { myHeaders } from "./header.js";

// The class for all pieces
class Piece {
    constructor(name, number, color, piecePosition, position) {
        this.name = name;
        this.number = number;
        this.color = color;
        this.piece = piece;
        this.piecePosition = piecePosition;
        this.moved = false;
        this.taken = false;
        this.undo = false;
        this.availableMoves = [];
        this.previousPositions = [];
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
    getNameFromPosition(position) {
        if (this.position === position) {
            return this.name;
        } else {
            return false;
        }
    }

    // Updates the moves for the piece, as long as it's in game
    updateAvailableMoves([row, col]) {
        if (!this.taken) {
            this.availableMoves.push[row, col];
        }
    }

    updatePreviousPostions(turn) {

    }

    movePiece(newPos) {
        this.setPiecePosition(newPos);
        this.moved = true;
    }
}

export { Piece };