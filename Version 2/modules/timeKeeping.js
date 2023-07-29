import { myHeaders } from "./header.js";
import { turnObject } from "./objects.js";
import { mod } from "./modulo.js";
import { tickGame } from "./playGame.js";
import { zeroPad } from "./zeroPad.js";

const timeObject = {
    whiteHours: 0,
    whiteMinutes: 0,
    whiteSeconds: 0,
    blackHours: 0,
    blackMinutes: 0,
    blackSeconds: 0,

    get getWhiteHours() {
        return this.whiteHours;
    },

    get getWhiteMinutes() {
        return this.whiteMinutes;
    },

    /**
     * @param {number} whiteSeconds
     */
    set setWhiteSeconds(whiteSeconds) {
        this.whiteSeconds = whiteSeconds;
    },

    get getWhiteSeconds() {
        return this.whiteSeconds;
    },

    get getBlackHours() {
        return this.blackHours;
    },

    get getBlackMinutes() {
        return this.blackMinutes;
    },

    get getBlackSeconds() {
        return this.blackSeconds;
    },

    setUpTime() {
        document.getElementById("whiteTime").textContent = zeroPad(2, this.whiteHours) + ":" + zeroPad(2, this.whiteMinutes) + ":" + zeroPad(2, this.whiteSeconds);
        document.getElementById("blackTime").textContent = zeroPad(2, this.blackHours) + ":" + zeroPad(2, this.blackMinutes) + ":" + zeroPad(2, this.blackSeconds);
    },

    updateTime() {
        if (mod(turnObject.getTurn, 2) === 1) {
            this.whiteSeconds++;
            if (this.whiteSeconds === 60) {
                this.whiteMinutes++;
                this.whiteSeconds = 0;
            }
            if (this.whiteMinutes === 60) {
                this.whiteHours++;
                this.whiteMinutes = 0;
            }
            document.getElementById("whiteTime").textContent = zeroPad(2, this.whiteHours) + ":" + zeroPad(2, this.whiteMinutes) + ":" + zeroPad(2, this.whiteSeconds);
        } else if (mod(turnObject.getTurn, 2) === 0) {
            this.blackSeconds++;
            if (this.blackSeconds === 60) {
                this.blackMinutes++;
                this.blackSeconds = 0;
            }
            if (this.blackMinutes === 60) {
                this.blackHours++;
                this.blackSeconds = 0;
            }
            document.getElementById("blackTime").textContent = zeroPad(2, this.blackHours) + ":" + zeroPad(2, this.blackMinutes) + ":" + zeroPad(2, this.blackSeconds);
        }
        tickGame();
    }
}

export { timeObject };