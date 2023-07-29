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

const pieceObject = {
    selected: undefined,
    prevSelected: undefined,
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
     * @param {any} pieceSymbol
     */
    set setPieceSymbol(pieceSymbol) {
        this.pieceSymbol = pieceSymbol;
    },

    get getPieceSymbol() {
        return this.pieceSymbol;
    },


    /**
     * @param {any} prevPieceSymbol
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

export { typeObjects, pieceObject, turnObject };