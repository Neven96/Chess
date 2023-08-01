import { myHeaders } from "./header.js";

const typeObjects = {
    players: 1,
    started: true,
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

    pieceArrayPosition(position) {
        if (position[0] < 0 || position[0] > 7 || position[1] < 0 || position[1] > 7) {
            return 99;
        }
        return this.pieceArray[position[1]][position[0]];
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
    }
}

const turnObject = {
    turn: 1,

    /**
     * @param {number} turn
     */
    set setTurn(turn) {
        this.turn = turn;
    },

    get getTurn() {
        return this.turn;
    }
}

const pieceObject = {
    selected: null,
    prevSelected: null,
    pieceSymbol: "",
    prevPieceSymbol: "",
    x_selected: 0,
    y_selected: 0,
    x_previous: 0,
    y_previous: 0,


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
}

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

    addToPieceList(newObject) {
        this.pieceList[newObject.name] = newObject;
    },

    addToPawnList(newObject) {
        this.pawnList[newObject.name] = newObject;
    },

    addToRookList(newObject) {
        this.rookList[newObject.name] = newObject;
    },

    addToKnightList(newObject) {
        this.knightList[newObject.name] = newObject;
    },

    addToBishopList(newObject) {
        this.bishopList[newObject.name] = newObject;
    },

    addToQueenList(newObject) {
        this.queenList[newObject.name] = newObject;
    },

    addToKingList(newObject) {
        this.kingList[newObject.name] = newObject;
    },
}

export { typeObjects, boardObject, turnObject, pieceObject, listObject };