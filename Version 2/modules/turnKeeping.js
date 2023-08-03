import { myHeaders } from "./header.js";
import { mod } from "./helpers/modulo.js";

const turnObject = {
    internalTurn: 1,
    externalTurn: 1,
    turnColor: "WHITE",

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

    incrementTurn() {
        this.internalTurn++;
        if (mod(this.internalTurn, 2) === 1) {
            this.externalTurn++;
            this.turnColor = "WHITE"
        } else {
            this.turnColor = "BLACK";
        }
    }
}

export { turnObject }