import { myHeaders } from "./modules/header.js";
import { mod } from "./modules/helpers/modulo.js";
import { typeObjects, boardObject, pieceObject, turnObject } from "./modules/objects.js";
import { pauseObject } from "./modules/pauseGame.js";
import { playGameObject } from "./modules/playGame.js";
import { timeObject } from "./modules/timeKeeping.js";
import { Pawn, Rook, Knight, Bishop, Queen, King } from "./modules/classes.js";

let movedSpaces;
let pieceClass;
let pawnClass;
let rookClass;
let knightClass;
let bishopClass;
let queenClass;
let kingClass;

let width;
let height;

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

const board = boardObject.setBoard = document.getElementById("board");
boardObject.setContent = board.getContext("2d");

document.getElementById("startEnKnapp").onclick = function () { startSpill(1) };
document.getElementById("startToKnapp").onclick = function () { startSpill(2) };
document.getElementById("pauseKnapp").onclick = function () { pauseObject.pauseGame() };

timeObject.setUpTime();

function startSpill(spillere) {
    boardObject.resetPieces();
    pieceClass = {};
    pawnClass = {};
    rookClass = {};
    knightClass = {};
    bishopClass = {};
    queenClass = {};
    kingClass = {};

    typeObjects.setPlayers = spillere;
    pieceObject.setSelected = null;
    pauseObject.setPause = true;
    setup = false;

    width = boardObject.getBoard.width;
    height = boardObject.getBoard.height;

    document.getElementById("playerTurn").textContent = turnObject.getTurn;

    clearTimeout(playGameObject.getTime);

    timeObject.setUpTime();

    paintLevel();
    let pieceArrayLength = boardObject.getPieceArray.length;
    for (var i = 0; i < pieceArrayLength; i++) {
        let pieceArrayILength = boardObject.getPieceArray[i].length;
        for (var j = 0; j < pieceArrayILength; j++) {
            paintPieces(i, j, boardObject.getPieceArray[i][j]);
        }
    }

    pauseObject.pauseGame();

    typeObjects.setStarted = true;
    setup = true;
    console.log(pieceClass);
    document.getElementById("pauseKnapp").style.display = "initial";
    document.getElementById("undoKnapp").style.display = "initial";
    document.getElementById("turnTimerDiv").style.display = "initial";
}

board.addEventListener('click', clickPiece);

function clickPiece(event) {
    if (typeObjects.getStarted && !pauseObject.getPause) {
        const rect = boardObject.getBoard.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        let x_true = Math.floor(x / (height / 8));
        let y_true = Math.floor(y / (width / 8));
        // console.log("x: " + x_true + ", y: " + y_true);

        pieceObject.setX_selected = x_true;
        pieceObject.setY_selected = y_true;

        if (pieceObject.getSelected !== null) {
            // TO REMOVE
            if (mod(turnObject.getTurn, 2) === 1) {
                if (boardObject.getPieceArray[y_true][x_true] === 0 || boardObject.getPieceArray[y_true][x_true] >= 7) {
                    pieceObject.getSelected.movePieceOld([pieceObject.getSelected.getPiecePosition[0], pieceObject.getSelected.getPiecePosition[1]], false);
                    return;
                }
            } else if (mod(turnObject.getTurn, 2) === 0) {
                if (boardObject.getPieceArray[y_true][x_true] === 0 || boardObject.getPieceArray[y_true][x_true] <= 6) {
                    pieceObject.getSelected.movePieceOld([pieceObject.getSelected.getPiecePosition[0], pieceObject.getSelected.getPiecePosition[1]], false);
                    return;
                }
            }
            // TO FIX
            // if (pieceObject.getSelected.getValidMove(x_true, y_true)) {

            // }
        }
        if (boardObject.getPieceArray[y_true][x_true] > 0) {
            selectPiece()
        }
    }
}

function selectPiece() {
    if (typeObjects.getStarted) {
        let pieceSymbol = "";
        if (pieceObject.getSelected !== null) {
            paintTile(pieceObject.getY_previous, pieceObject.getX_previous);
            if (pieceObject.getX_previous === pieceObject.getX_selected && pieceObject.getY_previous === pieceObject.getY_selected) {
                paintTile(pieceObject.getY_selected, pieceObject.getX_selected);
                pieceObject.setSelected = null;
                pieceObject.setPrevSelected = null;
                pieceObject.setX_selected = 0;
                pieceObject.setY_selected = 0;
                pieceObject.setX_previous = 0;
                pieceObject.setY_previous = 0;
                pieceObject.setPrevSelected = "";
                pieceObject.setPrevPieceSymbol = "";
                return;
            }
        }
        boardObject.getContent.fillStyle = "#0000FF";
        if (mod(turnObject.getTurn, 2) === 1) {
            for (let name in pieceClass) {
                if (pieceClass[name].getColor == "white") {
                    if (pieceClass[name].getNameFromPosition([pieceObject.getX_selected, pieceObject.getY_selected])) {
                        pieceObject.setSelected = pieceClass[name];
                        pieceObject.setPieceSymbol = pieceObject.getSelected.getPieceSymbol;
                        boardObject.getContent.fillRect(pieceObject.getX_selected * (width / 8), pieceObject.getY_selected * (height / 8), width / 8, height / 8);
                        console.log(pieceObject.getSelected);
                    }
                }
            }
        } else if (mod(turnObject.getTurn, 2) === 0) {
            for (let name in pieceClass) {
                if (pieceClass[name].getColor == "black") {
                    if (pieceClass[name].getNameFromPosition([pieceObject.getY_selected, pieceObject.getX_selected])) {
                        pieceObject.setSelected = pieceClass[name];
                        pieceObject.setPieceSymbol = pieceObject.getSelected.getPieceSymbol;
                        boardObject.getContent.fillRect(pieceObject.getX_selected * (width / 8), pieceObject.getY_selected * (height / 8), width / 8, height / 8);
                        console.log(pieceObject.getSelected);
                    }
                }
            }
        }
        pieceObject.setX_previous = pieceObject.getX_selected;
        pieceObject.setY_previous = pieceObject.getY_selected;
        pieceObject.setPrevSelected = pieceObject.getSelected;
        pieceObject.setPrevPieceSymbol = pieceObject.getPieceSymbol;
        paintPieces(pieceObject.getY_selected, pieceObject.getX_selected, boardObject.getPieceArray[pieceObject.getY_selected][pieceObject.getX_selected], pieceObject.getPieceSymbol)
    }
}

function endTurn() {
    turnObject.getTurn++;
    document.getElementById("playerTurn").textContent = turnObject.getTurn;
}

document.getElementById("undoKnapp").onclick = function () { 
    if (turnObject.getTurn > 1) { 
        undoMove(); 
    } 
}

function undoMove() {
}

function paintTile(col, row) {
    if (boardObject.getBoardArray[col][row] === 1) {
        boardObject.getContent.fillStyle = "#FFFFFF";
    } else if (boardObject.getBoardArray[col][row] === 0) {
        boardObject.getContent.fillStyle = "#000000";
    }
    boardObject.getContent.fillRect(row * (width / 8), col * (height / 8), width / 8, height / 8);
    paintPieces(pieceObject.getY_previous, pieceObject.getX_previous, boardObject.getPieceArray[pieceObject.getY_previous][pieceObject.getX_previous], pieceObject.getPrevPieceSymbol)
}

function paintLevel() {
    let boardRowLength = boardObject.getBoardArray.length;
    for (var i = 0; i < boardRowLength; i++) {
        let boardColLength = boardObject.getBoardArray[i].length;
        for (var j = 0; j < boardColLength; j++) {
            if (boardObject.getBoardArray[i][j] === 1) {
                boardObject.getContent.fillStyle = "#FFFFFF";
            } else if (boardObject.getBoardArray[i][j] === 0) {
                boardObject.getContent.fillStyle = "#000000";
            }
            boardObject.getContent.fillRect(i * (width / 8), j * (height / 8), width / 8, height / 8);
        }
    }
}

function paintPieces(col, row, piece, pieceSymbol = "") {
    boardObject.getContent.font = "60px 'DejaVu Sans'"
    if (piece >= 1 && piece <= 6) {
        boardObject.getContent.strokeStyle = "#778899";
        boardObject.getContent.fillStyle = "#FFFFFF";
    } else if (piece <= -1  && piece >= -6) {
        boardObject.getContent.strokeStyle = "#778899"
        boardObject.getContent.fillStyle = "#000000"
    }
    if (!setup) {
        switch (piece) {
            case 1:
                pieceSymbol = "\u{2659}"
                // White pawn
                switch (row) {
                    case 0:
                        whitePawnA = new Pawn("whitePawnA", 1, "white", "pawn", pieceSymbol, [row, col]);
                        pieceClass["whitePawnA"] = whitePawnA;
                        pawnClass["whitePawnA"] = whitePawnA;
                        break;
                    case 1:
                        whitePawnB = new Pawn("whitePawnB", 1, "white", "pawn", pieceSymbol, [row, col]);
                        pieceClass["whitePawnB"] = whitePawnB;
                        pawnClass["whitePawnB"] = whitePawnB;
                        break;
                    case 2:
                        whitePawnC = new Pawn("whitePawnC", 1, "white", "pawn", pieceSymbol, [row, col]);
                        pieceClass["whitePawnC"] = whitePawnC;
                        pawnClass["whitePawnC"] = whitePawnC;
                        break;
                    case 3:
                        whitePawnD = new Pawn("whitePawnD", 1, "white", "pawn", pieceSymbol, [row, col]);
                        pieceClass["whitePawnD"] = whitePawnD;
                        pawnClass["whitePawnD"] = whitePawnD;
                        break;
                    case 4:
                        whitePawnE = new Pawn("whitePawnE", 1, "white", "pawn", pieceSymbol, [row, col]);
                        pieceClass["whitePawnE"] = whitePawnE;
                        pawnClass["whitePawnE"] = whitePawnE;
                        break;
                    case 5:
                        whitePawnF = new Pawn("whitePawnF", 1, "white", "pawn", pieceSymbol, [row, col]);
                        pieceClass["whitePawnF"] = whitePawnF;
                        pawnClass["whitePawnF"] = whitePawnF;
                        break;
                    case 6:
                        whitePawnG = new Pawn("whitePawnG", 1, "white", "pawn", pieceSymbol, [row, col]);
                        pieceClass["whitePawnG"] = whitePawnG;
                        pawnClass["whitePawnG"] = whitePawnG;
                        break;
                    case 7:
                        whitePawnH = new Pawn("whitePawnH", 1, "white", "pawn", pieceSymbol, [row, col]);
                        pieceClass["whitePawnH"] = whitePawnH;
                        pawnClass["whitePawnH"] = whitePawnH;
                }
                break;
            case 2:
                pieceSymbol = "\u{2656}";
                // White rook
                switch (row) {
                    case 0:
                        whiteRookA = new Rook("whiteRookA", 2, "white", "rook", pieceSymbol, [row, col]);
                        pieceClass["whiteRookA"] = whiteRookA;
                        rookClass["whiteRookA"] = whiteRookA;
                        break;
                    case 7:
                        whiteRookH = new Rook("whiteRookH", 2, "white", "rook", pieceSymbol, [row, col]);
                        pieceClass["whiteRookH"] = whiteRookH;
                        rookClass["whiteRookH"] = whiteRookH;
                }
                break;
            case 3:
                pieceSymbol = "\u{2658}";
                // White knight
                switch (row) {
                    case 1:
                        whiteKnightB = new Knight("whiteKnightB", 3, "white", "knight", pieceSymbol, [row, col]);
                        pieceClass["whiteKnightB"] = whiteKnightB;
                        knightClass["whiteKnightB"] = whiteKnightB;
                        break;
                    case 6:
                        whiteKnightG = new Knight("whiteKnightG", 3, "white", "knight", pieceSymbol, [row, col]);
                        pieceClass["whiteKnightG"] = whiteKnightG;
                        knightClass["whiteKnightG"] = whiteKnightG;
                }
                break;
            case 4:
                pieceSymbol = "\u{2657}";
                // White bishop
                switch (row) {
                    case 2:
                        whiteBishopC = new Bishop("whiteBishopC", 4, "white", "bishop", pieceSymbol, [row, col]);
                        pieceClass["whiteBishopC"] = whiteBishopC;
                        break;
                    case 5:
                        whiteBishopF = new Bishop("whiteBishopF", 4, "white", "bishop", pieceSymbol, [row, col]);
                        pieceClass["whiteBishopF"] = whiteBishopF;
                }
                break;
            case 5:
                pieceSymbol = "\u{2655}";
                // White queen
                whiteQueen = new Queen("whiteQueen", 5, "white", "queen", pieceSymbol, [row, col]);
                pieceClass["whiteQueen"] = whiteQueen;
                break;
            case 6:
                pieceSymbol = "\u{2654}";
                // White king
                whiteKing = new King("whiteKing", 6, "white", "king", pieceSymbol, [row, col]);
                pieceClass["whiteKing"] = whiteKing;
                break;
            case -1:
                pieceSymbol = "\u{265F}";
                // Black pawn
                switch (row) {
                    case 0:
                        blackPawnA = new Pawn("blackPawnA", 7, "black", "pawn", pieceSymbol, [row, col]);
                        pieceClass["blackPawnA"] = blackPawnA;
                        pawnClass["blackPawnA"] = blackPawnA;
                        break;
                    case 1:
                        blackPawnB = new Pawn("blackPawnB", 7, "black", "pawn", pieceSymbol, [row, col]);
                        pieceClass["blackPawnB"] = blackPawnB;
                        pawnClass["blackPawnB"] = blackPawnB;
                        break;
                    case 2:
                        blackPawnC = new Pawn("blackPawnC", 7, "black", "pawn", pieceSymbol, [row, col]);
                        pieceClass["blackPawnC"] = blackPawnC;
                        pawnClass["blackPawnC"] = blackPawnC;
                        break;
                    case 3:
                        blackPawnD = new Pawn("blackPawnD", 7, "black", "pawn", pieceSymbol, [row, col]);
                        pieceClass["blackPawnD"] = blackPawnD;
                        pawnClass["blackPawnD"] = blackPawnD;
                        break;
                    case 4:
                        blackPawnE = new Pawn("blackPawnE", 7, "black", "pawn", pieceSymbol, [row, col]);
                        pieceClass["blackPawnE"] = blackPawnE;
                        pawnClass["blackPawnE"] = blackPawnE;
                        break;
                    case 5:
                        blackPawnF = new Pawn("blackPawnF", 7, "black", "pawn", pieceSymbol, [row, col]);
                        pieceClass["blackPawnF"] = blackPawnF;
                        pawnClass["blackPawnF"] = blackPawnF;
                        break;
                    case 6:
                        blackPawnG = new Pawn("blackPawnG", 7, "black", "pawn", pieceSymbol, [row, col]);
                        pieceClass["blackPawnG"] = blackPawnG;
                        pawnClass["blackPawnG"] = blackPawnG;
                        break;
                    case 7:
                        blackPawnH = new Pawn("blackPawnH", 7, "black", "pawn", pieceSymbol, [row, col]);
                        pieceClass["blackPawnH"] = blackPawnH;
                        pawnClass["blackPawnH"] = blackPawnH;
                }
                break;
            case -2:
                pieceSymbol = "\u{265C}";
                // Black rook
                switch (row) {
                    case 0:
                        blackRookA = new Rook("blackRookA", 8, "black", "rook", pieceSymbol, [row, col]);
                        pieceClass["blackRookA"] = blackRookA;
                        break;
                    case 7:
                        blackRookH = new Rook("blackRookH", 8, "black", "rook", pieceSymbol, [row, col]);
                        pieceClass["blackRookH"] = blackRookH;
                }
                break;
            case -3:
                pieceSymbol = "\u{265E}";
                // Black knight
                switch (row) {
                    case 1:
                        blackKnightB = new Knight("blackKnightB", 9, "black", "knight", pieceSymbol, [row, col]);
                        pieceClass["blackKnightB"] = blackKnightB;
                        break;
                    case 6:
                        blackKnightG = new Knight("blackKnightG", 9, "black", "knight", pieceSymbol, [row, col]);
                        pieceClass["blackKnightG"] = blackKnightG;
                }
                break;
            case -4:
                pieceSymbol = "\u{265D}";
                // Black bishop
                switch (row) {
                    case 2:
                        blackBishopC = new Bishop("blackBishopC", 10, "black", "bishop", pieceSymbol, [row, col]);
                        pieceClass["blackBishopC"] = blackBishopC;
                        break;
                    case 5:
                        blackBishopF = new Bishop("blackBishopF", 10, "black", "bishop", pieceSymbol, [row, col]);
                        pieceClass["blackBishopF"] = blackBishopF;
                }
                break;
            case -5:
                pieceSymbol = "\u{265B}";
                // Black queen
                blackQueen = new Queen("blackQueen", 11, "black", "queen", pieceSymbol, [row, col]);
                pieceClass["blackQueen"] = blackQueen;
                break;
            case -6:
                pieceSymbol = "\u{265A}";
                // Black king
                blackKing = new King("blackKing", 12, "black", "king", pieceSymbol, [row, col]);
                pieceClass["blackKing"] = blackKing;
                break;
            default:
                pieceSymbol = "";
            // Blank space
        }
    }
    boardObject.getContent.lineWidth = 4;
    boardObject.getContent.strokeText(pieceSymbol, row * (width / 8) + (3 * (width / 128)), col * (height / 8) + (6 * (height / 64)));
    boardObject.getContent.lineWidth = 1;
    boardObject.getContent.fillText(pieceSymbol, row * (width / 8) + (3 * (width / 128)), col * (height / 8) + (6 * (height / 64)));
}