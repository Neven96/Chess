import { myHeaders } from "./modules/header.js";
import { mod } from "./modules/modulo.js";
import { typeObjects, turnObject } from "./modules/objects.js";
import { pauseObject } from "./modules/pauseGame.js";
import { tickGame } from "./modules/playGame.js";
import { timeObject } from "./modules/timeKeeping.js";

let pieceArray;
let changedArray;
let levelArray;
let movedSpaces;
let pieceClass;
let pawnClass;
let rookClass;
let knightClass;
let bishopClass;
let queenClass;
let kingClass;

let antallSpillere;
let width;
let height;
let selected;

let x_true;
let y_true;
let previous_x;
let previous_y;

let moved = false;
let rokade = false;
let attack = false;
let setup = false;
let upgrade = false;

let whitePawnA; let whitePawnB; let whitePawnC; let whitePawnD; let whitePawnE; let whitePawnF; let whitePawnG; let whitePawnH;
let whiteRookA; let whiteRookH; let whiteKnightB; let whiteKnightG; let whiteBishopC; let whiteBishopF;
let whiteQueen; let whiteKing;

let blackPawnA; let blackPawnB; let blackPawnC; let blackPawnD; let blackPawnE; let blackPawnF; let blackPawnG; let blackPawnH;
let blackRookA; let blackRookH; let blackKnightB; let blackKnightG; let blackBishopC; let blackBishopF;
let blackQueen; let blackKing;

let board = document.getElementById("board");
let innhold = board.getContext("2d");

document.getElementById("startEnKnapp").onclick = function () { startSpill(1) };
document.getElementById("startToKnapp").onclick = function () { startSpill(2) };
document.getElementById("pauseKnapp").onclick = function () { pauseObject.pauseGame() };

timeObject.setUpTime();

function startSpill(spillere) {
    pieceArray = [];
    changedArray = [];
    levelArray = [];
    pieceClass = {};
    pawnClass = {};
    rookClass = {};
    knightClass = {};
    bishopClass = {};
    queenClass = {};
    kingClass = {};

    antallSpillere = spillere;
    selected = undefined;
    pauseObject.setPause = false;
    setup = false;

    width = board.width;
    height = board.height;

    document.getElementById("playerTurn").textContent = turnObject.getTurn;

    tickGame();

    paintLevel();
    for (var i = 0; i < pieceArray.length; i++) {
        for (var j = 0; j < pieceArray[i].length; j++) {
            paintPieces(j, i, pieceArray[i][j])
        }
    }

    typeObjects.setStarted = true;
    setup = true;
    console.log(pieceClass);
    console.log(pieceArray);
    document.getElementById("pauseKnapp").style.display = "initial";
    document.getElementById("undoKnapp").style.display = "initial";
    document.getElementById("turnTimerDiv").style.display = "initial";
}

board.addEventListener('click', function (event) {
    if (typeObjects.getStarted && !pauseObject.getPause) {
        const rect = board.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        x_true = Math.floor(x / (width / 8));
        y_true = Math.floor(y / (height / 8));
        if (selected != undefined) {
            if (mod(turnObject.getTurn, 2) == 1) {
                if (pieceArray[x_true][y_true] == 0 || pieceArray[x_true][y_true] >= 7) {
                    selected.movePieceOld([selected.getPosition()["position"][0], selected.getPosition()["position"][1]], false);
                    return;
                }
            } else if (mod(turnObject.getTurn, 2) == 0) {
                if (pieceArray[x_true][y_true] == 0 || pieceArray[x_true][y_true] <= 6) {
                    selected.movePieceOld([selected.getPosition()["position"][0], selected.getPosition()["position"][1]], false);
                    return;
                }
            }
        }
        if (pieceArray[x_true][y_true] > 0) {
            selectPiece()
        }
    }
});

function selectPiece() {
    if (typeObjects.getStarted) {
        if (selected != undefined) {
            paintTile(previous_x, previous_y);
            if (selected.getPosition()["position"][0] == x_true && selected.getPosition()["position"][1] == y_true) {
                paintTile(x_true, y_true);
                selected = undefined;
                return;
            }
        }
        innhold.fillStyle = "#0000FF";
        if (mod(turnObject.getTurn, 2) == 1) {
            for (var name in pieceClass) {
                if (pieceClass[name].getColor()["color"] == "white") {
                    if (pieceClass[name].getNameFromPosition([x_true, y_true])) {
                        selected = pieceClass[name];
                        innhold.fillRect(x_true * (width / 8), y_true * (height / 8), height / 8, width / 8);
                        console.log(selected);
                    }
                }
            }
        } else if (mod(turnObject.getTurn, 2) == 0) {
            for (var name in pieceClass) {
                if (pieceClass[name].getColor()["color"] == "black") {
                    if (pieceClass[name].getNameFromPosition([x_true, y_true])) {
                        selected = pieceClass[name];
                        innhold.fillRect(x_true * (width / 8), y_true * (height / 8), height / 8, width / 8);
                        console.log(selected);
                    }
                }
            }
        } else {
            return;
        }
        previous_x = x_true;
        previous_y = y_true;
        paintPieces(x_true, y_true, pieceArray[x_true][y_true])
    }
}

function endTurn() {
    turnObject.getTurn++;
    document.getElementById("playerTurn").textContent = turnObject.getTurn;
}

document.getElementById("undoKnapp").onclick = function () { if (turnObject.getTurn > 1) { undoMove(); } }

function undoMove() {
    turnObject.getTurn--;
    document.getElementById("playerTurn").textContent = turnObject.getTurn;
    for (var name in pieceClass) {
        if (turnObject.getTurn in pieceClass[name].getPreviousPositions()) {
            previousPosition = pieceClass[name].getPreviousPositions()[turnObject.getTurn];

            pieceArray[previousPosition[0]][previousPosition[1]] = pieceArray[previousPosition[2]][previousPosition[3]];
            pieceArray[previousPosition[2]][previousPosition[3]] = 0;
            pieceClass[name].movePieceOld([previousPosition[0], previousPosition[1]], true);

            paintTile(previousPosition[2], previousPosition[3]);
            paintTile(previousPosition[0], previousPosition[1]);
            paintPieces(previousPosition[0], previousPosition[1], pieceArray[previousPosition[0], previousPosition[1]]);
        }
    }
}

function paintTile(row, col) {
    if (levelArray[row][col] == 1) {
        innhold.fillStyle = "#FFFFFF";
    } else if (levelArray[row][col] == 0) {
        innhold.fillStyle = "#000000";
    }
    innhold.fillRect(row * (width / 8), col * (height / 8), height / 8, width / 8);
    paintPieces(row, col, pieceArray[row][col]);
}

function paintLevel() {
    for (var i = 0; i < 8; i++) {
        levelArray[i] = [];
        for (var j = 0; j < 8; j++) {
            if (mod(i, 2) == 0) {
                if (mod(j, 2) == 0) {
                    innhold.fillStyle = "#FFFFFF";
                    levelArray[i][j] = 1;
                } else if (mod(j, 2) == 1) {
                    innhold.fillStyle = "#000000";
                    levelArray[i][j] = 0;
                }
            } else if (mod(i, 2) == 1) {
                if (mod(j, 2) == 0) {
                    innhold.fillStyle = "#000000";
                    levelArray[i][j] = 0;
                } else if (mod(j, 2) == 1) {
                    innhold.fillStyle = "#FFFFFF";
                    levelArray[i][j] = 1;
                }
            }
            innhold.fillRect(i * (width / 8), j * (height / 8), height / 8, width / 8);
        }
    }

    pieceArray.push([8, 9, 10, 11, 12, 10, 9, 8]);
    pieceArray.push([7, 7, 7, 7, 7, 7, 7, 7]);
    pieceArray.push([0, 0, 0, 0, 0, 0, 0, 0]);
    pieceArray.push([0, 0, 0, 0, 0, 0, 0, 0]);
    pieceArray.push([0, 0, 0, 0, 0, 0, 0, 0]);
    pieceArray.push([0, 0, 0, 0, 0, 0, 0, 0]);
    pieceArray.push([1, 1, 1, 1, 1, 1, 1, 1]);
    pieceArray.push([2, 3, 4, 5, 6, 4, 3, 2]);
}

function paintPieces(row, col, piece) {
    innhold.font = "60px 'DejaVu Sans'"
    if (piece >= 1 && piece <= 6) {
        innhold.strokeStyle = "#778899"
        innhold.fillStyle = "#FFFFFF"
    } else if (piece >= 7 && piece <= 12) {
        innhold.strokeStyle = "#778899"
        innhold.fillStyle = "#000000"
    }
    if (!setup) {
        switch (piece) {
            case 1:
                piece = "\u{2659}"
                // White pawn
                switch (row) {
                    case 0:
                        whitePawnA = new Pawn("whitePawnA", 1, "white", "pawn", [row, col]);
                        pieceClass["whitePawnA"] = whitePawnA;
                        pawnClass["whitePawnA"] = whitePawnA;
                        whitePawnA.updateMoves(row, col - 1);
                        whitePawnA.updateMoves(row, col - 2);
                        break;
                    case 1:
                        whitePawnB = new Pawn("whitePawnB", 1, "white", "pawn", [row, col]);
                        pieceClass["whitePawnB"] = whitePawnB;
                        pawnClass["whitePawnB"] = whitePawnB;
                        whitePawnB.updateMoves(row, col - 1);
                        whitePawnB.updateMoves(row, col - 2);
                        break;
                    case 2:
                        whitePawnC = new Pawn("whitePawnC", 1, "white", "pawn", [row, col]);
                        pieceClass["whitePawnC"] = whitePawnC;
                        pawnClass["whitePawnC"] = whitePawnC;
                        whitePawnC.updateMoves(row, col - 1);
                        whitePawnC.updateMoves(row, col - 2);
                        break;
                    case 3:
                        whitePawnD = new Pawn("whitePawnD", 1, "white", "pawn", [row, col]);
                        pieceClass["whitePawnD"] = whitePawnD;
                        pawnClass["whitePawnD"] = whitePawnD;
                        whitePawnD.updateMoves(row, col - 1);
                        whitePawnD.updateMoves(row, col - 2);
                        break;
                    case 4:
                        whitePawnE = new Pawn("whitePawnE", 1, "white", "pawn", [row, col]);
                        pieceClass["whitePawnE"] = whitePawnE;
                        pawnClass["whitePawnE"] = whitePawnE;
                        whitePawnE.updateMoves(row, col - 1);
                        whitePawnE.updateMoves(row, col - 2);
                        break;
                    case 5:
                        whitePawnF = new Pawn("whitePawnF", 1, "white", "pawn", [row, col]);
                        pieceClass["whitePawnF"] = whitePawnF;
                        pawnClass["whitePawnF"] = whitePawnF;
                        whitePawnF.updateMoves(row, col - 1);
                        whitePawnF.updateMoves(row, col - 2);
                        break;
                    case 6:
                        whitePawnG = new Pawn("whitePawnG", 1, "white", "pawn", [row, col]);
                        pieceClass["whitePawnG"] = whitePawnG;
                        pawnClass["whitePawnG"] = whitePawnG;
                        whitePawnG.updateMoves(row, col - 1);
                        whitePawnG.updateMoves(row, col - 2);
                        break;
                    case 7:
                        whitePawnH = new Pawn("whitePawnH", 1, "white", "pawn", [row, col]);
                        pieceClass["whitePawnH"] = whitePawnH;
                        pawnClass["whitePawnH"] = whitePawnH;
                        whitePawnH.updateMoves(row, col - 1);
                        whitePawnH.updateMoves(row, col - 2);
                }
                break;
            case 2:
                piece = "\u{2656}";
                // White rook
                switch (row) {
                    case 0:
                        whiteRookA = new Rook("whiteRookA", 2, "white", "rook", [row, col]);
                        pieceClass["whiteRookA"] = whiteRookA;
                        rookClass["whiteRookA"] = whiteRookA;
                        break;
                    case 7:
                        whiteRookH = new Rook("whiteRookH", 2, "white", "rook", [row, col]);
                        pieceClass["whiteRookH"] = whiteRookH;
                        rookClass["whiteRookH"] = whiteRookH;
                }
                break;
            case 3:
                piece = "\u{2658}";
                // White knight
                switch (row) {
                    case 1:
                        whiteKnightB = new Knight("whiteKnightB", 3, "white", "knight", [row, col]);
                        pieceClass["whiteKnightB"] = whiteKnightB;
                        knightClass["whiteKnightB"] = whiteKnightB;
                        whiteKnightB.updateMoves(row - 1, col - 2);
                        whiteKnightB.updateMoves(row + 1, col - 2);
                        break;
                    case 6:
                        whiteKnightG = new Knight("whiteKnightG", 3, "white", "knight", [row, col]);
                        pieceClass["whiteKnightG"] = whiteKnightG;
                        knightClass["whiteKnightG"] = whiteKnightG;
                        whiteKnightG.updateMoves(row - 1, col - 2);
                        whiteKnightG.updateMoves(row + 1, col - 2);
                }
                break;
            case 4:
                piece = "\u{2657}";
                // White bishop
                switch (row) {
                    case 2:
                        whiteBishopC = new Bishop("whiteBishopC", 4, "white", "bishop", [row, col]);
                        pieceClass["whiteBishopC"] = whiteBishopC;
                        break;
                    case 5:
                        whiteBishopF = new Bishop("whiteBishopF", 4, "white", "bishop", [row, col]);
                        pieceClass["whiteBishopF"] = whiteBishopF;
                }
                break;
            case 5:
                piece = "\u{2655}";
                // White queen
                whiteQueen = new Queen("whiteQueen", 5, "white", "queen", [row, col]);
                pieceClass["whiteQueen"] = whiteQueen;
                break;
            case 6:
                piece = "\u{2654}";
                // White king
                whiteKing = new King("whiteKing", 6, "white", "king", [row, col]);
                pieceClass["whiteKing"] = whiteKing;
                break;
            case 7:
                piece = "\u{265F}";
                // Black pawn
                switch (row) {
                    case 0:
                        blackPawnA = new Pawn("blackPawnA", 7, "black", "pawn", [row, col]);
                        pieceClass["blackPawnA"] = blackPawnA;
                        pawnClass["blackPawnA"] = blackPawnA;
                        blackPawnA.updateMoves(row, col + 1);
                        blackPawnA.updateMoves(row, col + 2);
                        break;
                    case 1:
                        blackPawnB = new Pawn("blackPawnB", 7, "black", "pawn", [row, col]);
                        pieceClass["blackPawnB"] = blackPawnB;
                        pawnClass["blackPawnB"] = blackPawnB;
                        blackPawnB.updateMoves(row, col + 1);
                        blackPawnB.updateMoves(row, col + 2);
                        break;
                    case 2:
                        blackPawnC = new Pawn("blackPawnC", 7, "black", "pawn", [row, col]);
                        pieceClass["blackPawnC"] = blackPawnC;
                        pawnClass["blackPawnC"] = blackPawnC;
                        blackPawnC.updateMoves(row, col + 1);
                        blackPawnC.updateMoves(row, col + 2);
                        break;
                    case 3:
                        blackPawnD = new Pawn("blackPawnD", 7, "black", "pawn", [row, col]);
                        pieceClass["blackPawnD"] = blackPawnD;
                        pawnClass["blackPawnD"] = blackPawnD;
                        blackPawnD.updateMoves(row, col + 1);
                        blackPawnD.updateMoves(row, col + 2);
                        break;
                    case 4:
                        blackPawnE = new Pawn("blackPawnE", 7, "black", "pawn", [row, col]);
                        pieceClass["blackPawnE"] = blackPawnE;
                        pawnClass["blackPawnE"] = blackPawnE;
                        blackPawnE.updateMoves(row, col + 1);
                        blackPawnE.updateMoves(row, col + 2);
                        break;
                    case 5:
                        blackPawnF = new Pawn("blackPawnF", 7, "black", "pawn", [row, col]);
                        pieceClass["blackPawnF"] = blackPawnF;
                        pawnClass["blackPawnF"] = blackPawnF;
                        blackPawnF.updateMoves(row, col + 1);
                        blackPawnF.updateMoves(row, col + 2);
                        break;
                    case 6:
                        blackPawnG = new Pawn("blackPawnG", 7, "black", "pawn", [row, col]);
                        pieceClass["blackPawnG"] = blackPawnG;
                        pawnClass["blackPawnG"] = blackPawnG;
                        blackPawnG.updateMoves(row, col + 1);
                        blackPawnG.updateMoves(row, col + 2);
                        break;
                    case 7:
                        blackPawnH = new Pawn("blackPawnH", 7, "black", "pawn", [row, col]);
                        pieceClass["blackPawnH"] = blackPawnH;
                        pawnClass["blackPawnH"] = blackPawnH;
                        blackPawnH.updateMoves(row, col + 1);
                        blackPawnH.updateMoves(row, col + 2);
                }
                break;
            case 8:
                piece = "\u{265C}";
                // Black rook
                switch (row) {
                    case 0:
                        blackRookA = new Rook("blackRookA", 8, "black", "rook", [row, col]);
                        pieceClass["blackRookA"] = blackRookA;
                        break;
                    case 7:
                        blackRookH = new Rook("blackRookH", 8, "black", "rook", [row, col]);
                        pieceClass["blackRookH"] = blackRookH;
                }
                break;
            case 9:
                piece = "\u{265E}";
                // Black knight
                switch (row) {
                    case 1:
                        blackKnightB = new Knight("blackKnightB", 9, "black", "knight", [row, col]);
                        pieceClass["blackKnightB"] = blackKnightB;
                        blackKnightB.updateMoves(row - 1, col + 2);
                        blackKnightB.updateMoves(row + 1, col + 2);
                        break;
                    case 6:
                        blackKnightG = new Knight("blackKnightG", 9, "black", "knight", [row, col]);
                        pieceClass["blackKnightG"] = blackKnightG;
                        blackKnightG.updateMoves(row - 1, col + 2);
                        blackKnightG.updateMoves(row + 1, col + 2);
                }
                break;
            case 10:
                piece = "\u{265D}";
                // Black bishop
                switch (row) {
                    case 2:
                        blackBishopC = new Bishop("blackBishopC", 10, "black", "bishop", [row, col]);
                        pieceClass["blackBishopC"] = blackBishopC;
                        break;
                    case 5:
                        blackBishopF = new Bishop("blackBishopF", 10, "black", "bishop", [row, col]);
                        pieceClass["blackBishopF"] = blackBishopF;
                }
                break;
            case 11:
                piece = "\u{265B}";
                // Black queen
                blackQueen = new Queen("blackQueen", 11, "black", "queen", [row, col]);
                pieceClass["blackQueen"] = blackQueen;
                break;
            case 12:
                piece = "\u{265A}";
                // Black king
                blackKing = new King("blackKing", 12, "black", "king", [row, col]);
                pieceClass["blackKing"] = blackKing;
                break;
            default:
                piece = "";
            // Blank space
        }
    }
    innhold.lineWidth = 4;
    innhold.strokeText(piece, row * (width / 8) + (3 * (width / 128)), col * (height / 8) + (6 * (height / 64)));
    innhold.lineWidth = 1;
    innhold.fillText(piece, row * (width / 8) + (3 * (width / 128)), col * (height / 8) + (6 * (height / 64)));
}

class Piece {
    constructor(name, number, color, piece, position) {
        this.name = name;
        this.number = number;
        this.color = color;
        this.piece = piece;
        this.position = position;
        this.taken = false;
        this.moved = false;
        this.undo = false;
        this.turn;
        this.availableMoves = [];
        this.previousPositions = [];
        this.tempPosition = [];
    }

    getColor() {
        return { color: this.color };
    }

    getPiece() {
        return { piece: this.piece };
    }

    getAvailableMoves() {
        return { moves: this.availableMoves };
    }

    getPosition() {
        return { position: this.position };
    }

    getPreviousPositions() {
        return this.previousPositions;
    }

    getMoved() {
        return { moved: this.moved };
    }

    getTaken() {
        return { taken: this.taken };
    }

    getNameFromPosition(position) {
        if (this.position.toString() === position.toString()) {
            return { name: this.name };
        } else {
            return false;
        }
    }

    updateMoves(x, y) {
        this.availableMoves.push([x, y])
    }

    movePiece() {

    }

    movePieceOld(newPosition, undo) {
        this.turn = turnObject.getTurn;
        this.undo = undo;
        if (!this.undo) {
            this.tempPosition = [];
            this.tempPosition = this.position.concat(newPosition)
            this.previousPositions.push([this.turn, this.tempPosition]);
            this.position = newPosition;
            if (!this.moved) {
                this.moved = true;
            }
        } else if (this.undo) {
            this.position = [this.previousPositions[this.turn][0], this.previousPositions[this.turn][1]];
            delete this.previousPositions[this.turn];
            if (Object.keys(this.previousPositions).length == 0) {
                this.moved = false;
            }
        }
    }

    takePiece() {
        this.taken = true;
        this.availableMoves = [];
    }
}

class Pawn extends Piece {
    constructor(name, number, color, piece, position) {
        super(name, number, color, piece, position);
    }

    changePiece(newNumber) {
        this.number = newNumber;
        switch (this.number) {
            case 2:
            case 8:
                this.piece = "rook";
                break;
            case 3:
            case 9:
                this.piece = "knight";
                break;
            case 4:
            case 10:
                this.piece = "bishop";
                break;
            case 5:
            case 11:
                this.piece = "queen";
                break;
            default:
                this.piece = "pawn";
        }
    }
}

class BlackPawn extends Pawn {
    constructor(name, number, color, piece, position) {
        super(name, number, color, piece, position);
    }

    setMoves() {
        if (this.getMoved()["moved"] == true) {

        }
        else if (this.getMoved()["moved"] == false) {

        }
    }
}

class WhitePawn extends Pawn {
    constructor(name, number, color, piece, position) {
        super(name, number, color, piece, position);
    }

    setMoves() {
        if (this.getMoved()["moved"] == true) {

        }
        else if (this.getMoved()["moved"] == false) {

        }
    }
}

class Rook extends Piece {
    constructor(name, number, color, piece, position) {
        super(name, number, color, piece, position);
    }

    setMoves() {

    }
}

class Knight extends Piece {
    constructor(name, number, color, piece, position) {
        super(name, number, color, piece, position);
    }

    setMoves() {

    }
}

class Bishop extends Piece {
    constructor(name, number, color, piece, position) {
        super(name, number, color, piece, position);
    }

    setMoves() {

    }
}

class Queen extends Piece {
    constructor(name, number, color, piece, position) {
        super(name, number, color, piece, position);
    }

    setMoves() {

    }
}

class King extends Piece {
    constructor(name, number, color, piece, position) {
        super(name, number, color, piece, position);
    }

    setMoves() {

    }
}