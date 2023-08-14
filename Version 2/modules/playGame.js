import { myHeaders } from "./helpers/header.js";
import { pauseObject } from "./pauseGame.js";
import { typeObjects } from "./objects.js";
import { timeObject } from "./timeKeeping.js";

const playGameObject = {
    time: null,

    get getTime() {
        return this.time
    },

    tickGame() {
        if (typeObjects.getStarted && !pauseObject.getPause) {
            this.time = setTimeout(this.playGame, 1000);
        }
    },

    playGame() {
        if (!pauseObject.getPause) {
            timeObject.updateTime();
        }
    }
}



export { playGameObject };