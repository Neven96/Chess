import { myHeaders } from "./helpers/header.js";
import { mod } from "./helpers/modulo.js";
import { zeroPad } from "./helpers/zeroPad.js";
import { playGameObject } from "./playGame.js";
import { turnObject } from "./turnKeeping.js";

// Controls the time and how it is shown
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
        this.whiteHours = 0;
        this.whiteMinutes = 0;
        this.whiteSeconds = 0;
        this.blackHours = 0;
        this.blackMinutes = 0;
        this.blackSeconds = 0;

        document.getElementById("whiteTime").textContent = zeroPad(2, this.whiteHours) + ":" + zeroPad(2, this.whiteMinutes) + ":" + zeroPad(2, this.whiteSeconds);
        document.getElementById("blackTime").textContent = zeroPad(2, this.blackHours) + ":" + zeroPad(2, this.blackMinutes) + ":" + zeroPad(2, this.blackSeconds);
    },

    setUpOwnTime(whiteHours, whiteMinutes, whiteSeconds, blackHours, blackMinutes, blackSeconds) {
        this.whiteHours = whiteHours;
        this.whiteMinutes = whiteMinutes;
        this.whiteSeconds = whiteSeconds;
        this.blackHours = blackHours;
        this.blackMinutes = blackMinutes;
        this.blackSeconds = blackSeconds;
    },

    countUpTime() {
        // Counts up the seconds, minutes and hours of each player
        if (mod(turnObject.getInternalTurn, 2) === 1) {
            this.whiteSeconds++;
            if (this.whiteSeconds >= 60) {
                this.whiteMinutes++;
                this.whiteSeconds = 0;
            }
            if (this.whiteMinutes >= 60) {
                this.whiteHours++;
                this.whiteMinutes = 0;
            }
            document.getElementById("whiteTime").textContent = zeroPad(2, this.whiteHours) + ":" + zeroPad(2, this.whiteMinutes) + ":" + zeroPad(2, this.whiteSeconds);
        } else if (mod(turnObject.getInternalTurn, 2) === 0) {
            this.blackSeconds++;
            if (this.blackSeconds >= 60) {
                this.blackMinutes++;
                this.blackSeconds = 0;
            }
            if (this.blackMinutes >= 60) {
                this.blackHours++;
                this.blackMinutes = 0;
            }
            document.getElementById("blackTime").textContent = zeroPad(2, this.blackHours) + ":" + zeroPad(2, this.blackMinutes) + ":" + zeroPad(2, this.blackSeconds);
        }
        playGameObject.tickGame();
    },

    countDownTime() {
        // Counts down the seconds, minutes and hours of each player
        if (mod(turnObject.getInternalTurn, 2) === 1) {
            this.whiteSeconds--;
            if (this.whiteSeconds <= 0) {
                this.whiteMinutes--;
                this.whiteSeconds = 59;
            }
            if (this.whiteMinutes <= 0) {
                this.whiteHours--;
                this.whiteMinutes = 59;
            }
            document.getElementById("whiteTime").textContent = zeroPad(2, this.whiteHours) + ":" + zeroPad(2, this.whiteMinutes) + ":" + zeroPad(2, this.whiteSeconds);
        } else if (mod(turnObject.getInternalTurn, 2) === 0) {
            this.blackSeconds--;
            if (this.blackSeconds <= 0) {
                this.blackMinutes--;
                this.blackSeconds = 59;
            }
            if (this.blackMinutes <= 0) {
                this.blackHours--;
                this.blackMinutes = 59;
            }
            document.getElementById("blackTime").textContent = zeroPad(2, this.blackHours) + ":" + zeroPad(2, this.blackMinutes) + ":" + zeroPad(2, this.blackSeconds);
        }
        playGameObject.tickGame();
    }
}

export { timeObject };