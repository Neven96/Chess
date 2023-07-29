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

export { typeObjects, turnObject };