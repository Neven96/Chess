import { myHeaders } from "./helpers/header.js";

// Stuff
const typeObjects = {
    players: 1,
    started: false,
    finish: false,

    /**
     * @param {number} players
     */
    set setPlayers(players) {
        this.players = players;
    },

    get getPlayers() {
        return this.players;
    },

    /**
     * @param {boolean} started
     */
    set setStarted(started) {
        this.started = started;
    },

    get getStarted() {
        return this.started;
    },

    /**
     * @param {boolean} finish
     */
    set setFinish(finish) {
        this.finish = finish;
    },

    get getFinish() {
        return this.finish;
    }
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

    get getBoard() {
        return this.board;
    },

    /**
     * @param {HTMLElement | null} board
     */
    set setBoard(board) {
        this.board = board;
    },

    get getContent() {
        return this.content;
    },

    /**
     * @param {any} content
     */
    set setContent(content) {
        this.content = content;
    },

    get getBoardArray() {
        return this.boardArray;
    },

    /**
     * @param {number[][]} pieceArray
     */
    set setPieceArray(pieceArray) {
        this.pieceArray = pieceArray;
    },

    get getPieceArray() {
        return this.pieceArray;
    },

    /**
     * @param {any[][]} pieceNameArray
     */
    set setPieceNameArray(pieceNameArray) {
        this.pieceNameArray = pieceNameArray;
    },

    get getPieceNameArray() {
        return this.pieceNameArray;
    },

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
    set setSelected(selected) {
        this.selected = selected;
    },

    get getSelected() {
        return this.selected;
    },

    /**
     * @param {any} prevSelected
     */
    set setPrevSelected(prevSelected) {
        this.prevSelected = prevSelected;
    },

    get getPrevSelected() {
        return this.prevSelected;
    },

    /**
     * @param {null} rookSelected
     */
    set setRookSelected(rookSelected) {
        this.rookSelected = rookSelected;
    },

    get getRookSelected() {
        return this.rookSelected;
    },

    /**
     * @param {string} pieceSymbol
     */
    set setPieceSymbol(pieceSymbol) {
        this.pieceSymbol = pieceSymbol;
    },

    get getPieceSymbol() {
        return this.pieceSymbol;
    },

    /**
     * @param {string} prevPieceSymbol
     */
    set setPrevPieceSymbol(prevPieceSymbol) {
        this.prevPieceSymbol = prevPieceSymbol;
    },

    get getPrevPieceSymbol() {
        return this.prevPieceSymbol;
    },

    /**
     * @param {number} x_selected
     */
    set setX_selected(x_selected) {
        this.x_selected = x_selected;
    },

    get getX_selected() {
        return this.x_selected;
    },

    /**
     * @param {number} y_selected
     */
    set setY_selected(y_selected) {
        this.y_selected = y_selected;
    },

    get getY_selected() {
        return this.y_selected;
    },

    /**
     * @param {number} x_previous
     */
    set setX_previous(x_previous) {
        this.x_previous = x_previous;
    },

    get getX_previous() {
        return this.x_previous;
    },

    /**
     * @param {number} y_previous
     */
    set setY_previous(y_previous) {
        this.y_previous = y_previous;
    },

    get getY_previous() {
        return this.y_previous;
    },

    /**
     * @param {number} rook_x
     */
    set setRook_x(rook_x) {
        this.rook_x = rook_x;
    },

    get getRook_x() {
        return this.rook_x;
    },

    /**
     * @param {number} rook_y
     */
    set setRook_y(rook_y) {
        this.rook_y = rook_y;
    },

    get getRook_y() {
        return this.rook_y;
    },
}

// Various list of stuff
const listObject = {
    pieceList: {},
    pawnList: {},
    rookList: {},
    knightList: {},
    bishopList: {},
    queenList: {},
    kingList: {},

    /**
     * @param {{}} pieceList
     */
    set setPieceList(pieceList) {
        this.pieceList = pieceList;
    },

    get getPieceList() {
        return this.pieceList;
    },

    /**
     * @param {{}} pawnList
     */
    set setPawnList(pawnList) {
        this.pawnList = pawnList;
    },

    get getPawnList() {
        return this.pawnList;
    },

    /**
     * @param {{}} rookList
     */
    set setRookList(rookList) {
        this.rookList = rookList;
    },

    get getRookList() {
        return this.rookList;
    },

    /**
     * @param {{}} knightList
     */
    set setKnightList(knightList) {
        this.knightList = knightList;
    },

    get getKnightList() {
        return this.knightList;
    },

    /**
     * @param {{}} bishopList
     */
    set setBishopList(bishopList) {
        this.bishopList = bishopList;
    },

    get getBishopList() {
        return this.bishopList;
    },

    /**
     * @param {{}} queenList
     */
    set setQueenList(queenList) {
        this.queenList = queenList;
    },

    get getQueenList() {
        return this.queenList;
    },

    /**
     * @param {{}} kingList
     */
    set setKingList(kingList) {
        this.kingList = kingList;
    },

    get getKingList() {
        return this.kingList;
    },

    // List Manipulation
    // PieceList
    addToPieceList(newObject) {
        this.pieceList[newObject.name] = newObject;
    },

    removeFromPieceList(removeObject) {
        delete this.pieceList[removeObject.name];
    },

    // PawnList
    addToPawnList(newObject) {
        this.pawnList[newObject.name] = newObject;
    },

    removeFromPawnList(removeObject) {
        delete this.pawnList[removeObject.name];
    },

    // RookList
    addToRookList(newObject) {
        this.rookList[newObject.name] = newObject;
    },

    removeFromRookList(removeObject) {
        delete this.rookList[removeObject.name];
    },

    // KnightList
    addToKnightList(newObject) {
        this.knightList[newObject.name] = newObject;
    },

    removeFromKnightList(removeObject) {
        delete this.knightList[removeObject.name];
    },

    // BishopList
    addToBishopList(newObject) {
        this.bishopList[newObject.name] = newObject;
    },

    removeFromBishopList(removeObject) {
        delete this.bishopList[removeObject.name];
    },

    // QueenList
    addToQueenList(newObject) {
        this.queenList[newObject.name] = newObject;
    },

    removeFromQueenList(removeObject) {
        delete this.queenList[removeObject.name];
    },

    // KingList
    addToKingList(newObject) {
        this.kingList[newObject.name] = newObject;
    },

    removeFromKingList(removeObject) {
        delete this.kingList[removeObject.name];
    },
}

export { typeObjects, boardObject, pieceObject, listObject };