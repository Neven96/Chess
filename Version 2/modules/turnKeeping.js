import { myHeaders } from "./helpers/header.js";
import { mod } from "./helpers/modulo.js";

// Controls the turns and how it is shown
// The internal turn and external turn will be different, because chess turns have both white and black in one turn, then next turn
const turnObject = {
    internalTurn: 0,
    externalTurn: 0,
    turnColor: "WHITE",
    previousTurns: {},

    /**
     * @param {number} internalTurn
     */
    set setInternalTurn(internalTurn) {
        this.internalTurn = internalTurn;
    },

    get getInternalTurn() {
        return this.internalTurn;
    },

    /**
     * @param {number} externalTurn
     */
    set setExternalTurn(externalTurn) {
        this.externalTurn = externalTurn;
    },

    get getExternalTurn() {
        return this.externalTurn;
    },

    /**
     * @param {string} turnColor
     */
    set setTurnColor(turnColor) {
        this.turnColor = turnColor;
    },

    get getTurnColor() {
        return this.turnColor;
    },

    /**
     * @param {{}} previousTurns
     */
    set setPreviousTurns(previousTurns) {
        this.previousTurns = previousTurns;
    },

    get getPreviousTurns() {
        return this.previousTurns;
    },

    makePreviousTurns(turn) {
        this.previousTurns[turn] = [];
    },

    addToPreviousTurns(turn, outString) {
        if (this.turnColor === "WHITE" && this.previousTurns[turn].length !== 0) {
            this.previousTurns[turn] = [];
            this.previousTurns[turn].push(outString);
            return;
        }
        if (this.turnColor === "BLACK" && this.previousTurns[turn].length === 2) {
            this.previousTurns[turn][1] = outString;
            return
        }
        this.previousTurns[turn].push(outString);
    },

    // Increases the turn count
    incrementTurn() {
        this.internalTurn++;
        // Since chess is one turn for white and black, the turn shown have to only increase after both have gone
        if (mod(this.internalTurn, 2) === 1) {
            this.externalTurn++;
            this.turnColor = "WHITE"
        } else {
            this.turnColor = "BLACK";
        }
    },

    decrementTurn() {
        this.internalTurn--;
        if (mod(this.internalTurn, 2) === 0) {
            this.externalTurn--;
            this.turnColor = "BLACK"
        } else {
            this.turnColor = "WHITE";
        }
    }
}

export { turnObject }