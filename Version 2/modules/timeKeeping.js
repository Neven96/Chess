import { myHeaders } from "./header.js";
import { turnObject } from "./objects.js";
import { mod } from "./modulo.js";

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

    updateTime() {
        if (mod(turnObject.getTurn, 2) == 1) {
            this.whiteSeconds++;
            if (this.whiteSeconds === 60) {
                this.whiteMinutes++;
                this.whiteSeconds = 0;
            }
            if (this.whiteMinutes === 60) {
                this.whiteHours++;
                this.whiteMinutes = 0;
            }
            if (this.whiteSeconds < 10) {
                this.whiteSeconds = "0" + this.whiteSeconds;
            }
            if (this.whiteMinutes < 10) {
                this.whiteMinutes = "0" + this.whiteMinutes;
            }
            if (this.whiteHours < 10) {
                this.whiteHours = "0" + this.whiteHours;
            }
            document.getElementById("whiteTime").textContent = this.whiteHours + ":" + this.whiteMinutes + ":" + this.whiteSeconds;
        } else if (mod(turnObject.getTurn, 2) == 0) {
            this.blackSeconds++;
            if (this.blackSeconds === 60) {
                this.blackMinutes++;
                this.blackSeconds = 0;
            }
            if (this.blackMinutes === 60) {
                this.blackHours++;
                this.blackSeconds = 0;
            }
            if (this.blackSeconds < 10) {
                this.blackSeconds = "0" + this.blackSeconds;
            }
            if (this.blackMinutes < 10) {
                this.blackMinutes = "0" + this.blackMinutes;
            }
            if (this.blackHours < 10) {
                this.blackHours = "0" + this.blackHours;
            }
            document.getElementById("blackTime").textContent = this.blackHours + ":" + this.blackMinutes + ":" + this.blackSeconds;
        }
    }
}

export { timeObject };