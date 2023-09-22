import { myHeaders } from "./helpers/header.js";
import { pauseObject } from "./pauseGame.js";
import { typeObjects } from "./objects.js";
import { timeObject } from "./timeKeeping.js";

// Stores the value of the game timer and tick
const playGameObject = {
    time: null,

    get getTime() {
        return this.time
    },

    // The function that waits 1 second to continue, before calling another function to tick the game
    tickGame() {
        if (typeObjects.getStarted && !pauseObject.getPause) {
            this.time = setTimeout(this.playGame, 1000);
        }
    },

    // Used to fix pauses not pausing the game until the next tick
    playGame() {
        if (!pauseObject.getPause) {
            if (typeObjects.getTimeType === 1) {
                timeObject.countUpTime();
            } else if (typeObjects.getTimeType === 2) {
                timeObject.countDownTime();
            }
        }
    }
}

export { playGameObject };