import { myHeaders } from "./helpers/header.js";

// Flags for game state
// TimeType: 1 is for counting up from 0, 2 is for counting down from specified time
// 2 does not work right now
const typeObjects = {
    players: 1,
    timeType: 1,
    started: false,
    finish: false,

    /**
     * @param {number} players
     */
    set setPlayers(players) {this.players = players;},

    get getPlayers() {return this.players;},

    /**
     * @param {number} timeType
     */
    set setTimeType(timeType) {this.timeType = timeType;},

    get getTimeType() {return this.timeType;},

    /**
     * @param {boolean} started
     */
    set setStarted(started) {this.started = started;},

    get getStarted() {return this.started;},

    /**
     * @param {boolean} finish
     */
    set setFinish(finish) {this.finish = finish;},

    get getFinish() {return this.finish;}
}

// The board and layout
const boardObject = {
    board: "",
    content: "",
    boardArray: [[1, 0, 1, 0, 1, 0, 1, 0],
                 [0, 1, 0, 1, 0, 1, 0, 1],
                 [1, 0, 1, 0, 1, 0, 1, 0],
                 [0, 1, 0, 1, 0, 1, 0, 1],
                 [1, 0, 1, 0, 1, 0, 1, 0],
                 [0, 1, 0, 1, 0, 1, 0, 1],
                 [1, 0, 1, 0, 1, 0, 1, 0],
                 [0, 1, 0, 1, 0, 1, 0, 1]],
    pieceArray: [[-2, -3, -4, -5, -6, -4, -3, -2],
                 [-1, -1, -1, -1, -1, -1, -1, -1],
                 [ 0,  0,  0,  0,  0,  0,  0,  0],
                 [ 0,  0,  0,  0,  0,  0,  0,  0],
                 [ 0,  0,  0,  0,  0,  0,  0,  0],
                 [ 0,  0,  0,  0,  0,  0,  0,  0],
                 [ 1,  1,  1,  1,  1,  1,  1,  1],
                 [ 2,  3,  4,  5,  6,  4,  3,  2]],
    pieceNameArray : [[0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0]],
    pieceTypes: {"pawn": [-1, 1], "rook": [-2, 2], "knight": [-3, 3], "bishop": [-4, 4], "queen": [-5, 5], "king": [-6, 6]},

    /**
     * @param {HTMLElement | null} board
     */
    set setBoard(board) {this.board = board;},

    get getBoard() {return this.board;},

    /**
     * @param {any} content
     */
    set setContent(content) {this.content = content;},

    get getContent() {return this.content;},

    /**
     * @param {number[][]} boardArray
     */
    set setBoardArray(boardArray) {this.boardArray = boardArray;},

    get getBoardArray() {return this.boardArray;},

    /**
     * @param {number[][]} pieceArray
     */
    set setPieceArray(pieceArray) {this.pieceArray = pieceArray;},

    get getPieceArray() {return this.pieceArray;},

    /**
     * @param {any[][]} pieceNameArray
     */
    set setPieceNameArray(pieceNameArray) {this.pieceNameArray = pieceNameArray;},

    get getPieceNameArray() {return this.pieceNameArray;},

    addToNameArrayPosition(newPos, pieceName) {
        this.pieceNameArray[newPos[0]][newPos[1]] = pieceName;
    },

    getNameFromNameArray(position) {
        return this.pieceNameArray[position[1]][position[0]]
    },

    // Position is an array of length 2
    pieceArrayPosition(position) {
        if (position[0] < 0 || position[0] > 7 || position[1] < 0 || position[1] > 7) {
            return 99;
        }
        return this.pieceArray[position[1]][position[0]];
    },

    // Updates the position of the piece on the board
    movePiece(oldPos, newPos, piece, prevTaken = false) {
        if (!piece.getTaken) {
            if (prevTaken) {
                this.pieceArray[newPos[0]][newPos[1]] = piece.getNumber;

                this.pieceNameArray[newPos[0]][newPos[1]] = piece.getName;
            } else if (!prevTaken) {
                if (this.pieceArray[oldPos[0]][oldPos[1]] === piece.getNumber) {
                    this.pieceArray[oldPos[0]][oldPos[1]] = 0;
                }
                this.pieceArray[newPos[0]][newPos[1]] = piece.getNumber;

                if (this.pieceNameArray[oldPos[0]][oldPos[1]] === piece.getName) {
                    this.pieceNameArray[oldPos[0]][oldPos[1]] = 0;
                }
                this.pieceNameArray[newPos[0]][newPos[1]] = piece.getName;
            }
        }
    },

    resetPieces() {
        this.pieceArray = [[-2, -3, -4, -5, -6, -4, -3, -2],
                           [-1, -1, -1, -1, -1, -1, -1, -1],
                           [ 0,  0,  0,  0,  0,  0,  0,  0],
                           [ 0,  0,  0,  0,  0,  0,  0,  0],
                           [ 0,  0,  0,  0,  0,  0,  0,  0],
                           [ 0,  0,  0,  0,  0,  0,  0,  0],
                           [ 1,  1,  1,  1,  1,  1,  1,  1],
                           [ 2,  3,  4,  5,  6,  4,  3,  2]];
        this.pieceNameArray = [[0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0]];
    }
}

// The selected piece
const pieceObject = {
    selected: null,
    prevSelected: null,
    rookSelected: null,
    pieceSymbol: "",
    prevPieceSymbol: "",
    x_selected: 0,
    y_selected: 0,
    x_previous: 0,
    y_previous: 0,
    rook_x: 0,
    rook_y: 0,

    /**
     * @param {any} selected
     */
    set setSelected(selected) {this.selected = selected;},

    get getSelected() {return this.selected;},

    /**
     * @param {any} prevSelected
     */
    set setPrevSelected(prevSelected) {this.prevSelected = prevSelected;},

    get getPrevSelected() {return this.prevSelected;},

    /**
     * @param {null} rookSelected
     */
    set setRookSelected(rookSelected) {this.rookSelected = rookSelected;},

    get getRookSelected() {return this.rookSelected;},

    /**
     * @param {string} pieceSymbol
     */
    set setPieceSymbol(pieceSymbol) {this.pieceSymbol = pieceSymbol;},

    get getPieceSymbol() {return this.pieceSymbol;},

    /**
     * @param {string} prevPieceSymbol
     */
    set setPrevPieceSymbol(prevPieceSymbol) {this.prevPieceSymbol = prevPieceSymbol;},

    get getPrevPieceSymbol() {return this.prevPieceSymbol;},

    /**
     * @param {number} x_selected
     */
    set setX_selected(x_selected) {this.x_selected = x_selected;},

    get getX_selected() {return this.x_selected;},

    /**
     * @param {number} y_selected
     */
    set setY_selected(y_selected) {this.y_selected = y_selected;},

    get getY_selected() {return this.y_selected;},

    /**
     * @param {number} x_previous
     */
    set setX_previous(x_previous) {this.x_previous = x_previous;},

    get getX_previous() {return this.x_previous;},

    /**
     * @param {number} y_previous
     */
    set setY_previous(y_previous) {this.y_previous = y_previous;},

    get getY_previous() {return this.y_previous;},

    /**
     * @param {number} rook_x
     */
    set setRook_x(rook_x) {this.rook_x = rook_x;},

    get getRook_x() {return this.rook_x;},

    /**
     * @param {number} rook_y
     */
    set setRook_y(rook_y) {this.rook_y = rook_y;},

    get getRook_y() {return this.rook_y;},
}

// The list of the pieces
const listObject = {
    pieceList: {},
    pawnList: {},
    rookList: {},
    knightList: {},
    bishopList: {},
    queenList: {},
    kingList: {},
    // A list of all the pieces to make the setUpPieces a much shorter and more compact module
    allPieceList: {
        "1": {
            "0": { "whitePawnA": null, "white": "\u{2659}" },
            "1": { "whitePawnB": null, "white": "\u{2659}" },
            "2": { "whitePawnC": null, "white": "\u{2659}" },
            "3": { "whitePawnD": null, "white": "\u{2659}" },
            "4": { "whitePawnE": null, "white": "\u{2659}" },
            "5": { "whitePawnF": null, "white": "\u{2659}" },
            "6": { "whitePawnG": null, "white": "\u{2659}" },
            "7": { "whitePawnH": null, "white": "\u{2659}" }
        },
        "-1": {
            "0": { "blackPawnA": null, "black": "\u{265F}" },
            "1": { "blackPawnB": null, "black": "\u{265F}" },
            "2": { "blackPawnC": null, "black": "\u{265F}" },
            "3": { "blackPawnD": null, "black": "\u{265F}" },
            "4": { "blackPawnE": null, "black": "\u{265F}" },
            "5": { "blackPawnF": null, "black": "\u{265F}" },
            "6": { "blackPawnG": null, "black": "\u{265F}" },
            "7": { "blackPawnH": null, "black": "\u{265F}" }
        },
        "2":  { "0": { "whiteRookA": null, "white": "\u{2656}" }, "7": { "whiteRookH": null, "white": "\u{2656}" } },
        "-2": { "0": { "blackRookA": null, "black": "\u{265C}" }, "7": { "blackRookH": null, "black": "\u{265C}" } },
        "3":  { "1": { "whiteKnightB": null, "white": "\u{2658}" }, "6": { "whiteKnightG": null, "white": "\u{2658}" } },
        "-3": { "1": { "blackKnightB": null, "black": "\u{265E}" }, "6": { "blackKnightG": null, "black": "\u{265E}" } },
        "4":  { "2": { "whiteBishopC": null, "white": "\u{2657}" }, "5": { "whiteBishopF": null, "white": "\u{2657}" } },
        "-4": { "2": { "blackBishopC": null, "black": "\u{265D}" }, "5": { "blackBishopF": null, "black": "\u{265D}" } },
        "5":  { "3": { "whiteQueen": null, "white": "\u{2655}" } },
        "-5": { "3": { "blackQueen": null, "black": "\u{265B}" } },
        "6":  { "4": { "whiteKing": null, "white": "\u{2654}" } },
        "-6": { "4": { "blackKing": null, "black": "\u{265A}" } }
    },

    /**
     * @param {{}} pieceList
     */
    set setPieceList(pieceList) {this.pieceList = pieceList;},

    get getPieceList() {return this.pieceList;},

    /**
     * @param {{}} pawnList
     */
    set setPawnList(pawnList) {this.pawnList = pawnList;},

    get getPawnList() {return this.pawnList;},

    /**
     * @param {{}} rookList
     */
    set setRookList(rookList) {this.rookList = rookList;},

    get getRookList() {return this.rookList;},

    /**
     * @param {{}} knightList
     */
    set setKnightList(knightList) {this.knightList = knightList;},

    get getKnightList() {return this.knightList;},

    /**
     * @param {{}} bishopList
     */
    set setBishopList(bishopList) {this.bishopList = bishopList;},

    get getBishopList() {return this.bishopList;},

    /**
     * @param {{}} queenList
     */
    set setQueenList(queenList) {this.queenList = queenList;},

    get getQueenList() {return this.queenList;},

    /**
     * @param {{}} kingList
     */
    set setKingList(kingList) {this.kingList = kingList;},

    get getKingList() {return this.kingList;},

    /**
     * @param {{}} allPieceList
     */
    set setAllPieceList(allPieceList) {this.allPieceList = allPieceList;},

    get getAllPieceList() {return this.allPieceList;},

    // List Manipulation
    addToList(listType, newObject) {
        switch (listType) {
            case "piece":
                this.pieceList[newObject.name] = newObject;
                break;
            case "pawn":
                this.pawnList[newObject.name] = newObject;
                break;
            case "rook":
                this.rookList[newObject.name] = newObject;
                break;
            case "knight":
                this.knightList[newObject.name] = newObject;
                break;
            case "bishop":
                this.bishopList[newObject.name] = newObject;
                break;
            case "queen":
                this.queenList[newObject.name] = newObject;
                break;
            case "king":
                this.kingList[newObject.name] = newObject;
                break;
        }
    },

    removeFromList(listType, removeObject) {
        switch (listType) {
            case "piece":
                delete this.pieceList[removeObject.name];
                break;
            case "pawn":
                delete this.pawnList[removeObject.name];
                break;
            case "rook":
                delete this.rookList[removeObject.name];
                break;
            case "knight":
                delete this.knightList[removeObject.name];
                break;
            case "bishop":
                delete this.bishopList[removeObject.name];
                break;
            case "queen":
                delete this.queenList[removeObject.name];
                break;
            case "king":
                delete this.kingList[removeObject.name];
                break;
        }
    },
}

export { typeObjects, boardObject, pieceObject, listObject };