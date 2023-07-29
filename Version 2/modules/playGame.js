import { myHeaders } from "./header.js";
import { pauseObject } from "./pauseGame.js";
import { typeObjects } from "./objects.js";
import { timeObject } from "./timeKeeping.js";

function tickGame() {
    if (typeObjects.getStarted && !pauseObject.getPause) {
        setTimeout(timeObject.updateTime, 1000);
    }

    // board.addEventListener("click")
}