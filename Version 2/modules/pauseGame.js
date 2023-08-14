import { myHeaders } from "./helpers/header.js";
import { playGameObject } from "./playGame.js";


// Stores the value of pause in an object for easier access and storage
const pauseObject = {
    pause: true,

    get getPause() {
        return this.pause;
    },

    /**
     * @param {boolean} pause
     */
    set setPause(pause) {
        this.pause = pause;
    },

    //Pauses/unpauses the game
    pauseGame() {
        if (!this.pause) {

            this.pause = true;

            document.getElementById("pauseKnappSpan").textContent = "Play";

        } else if (this.pause) {
            
            this.pause = false;

            document.getElementById("pauseKnappSpan").textContent = "Pause";

            playGameObject.tickGame();
        }
    }
};

export { pauseObject };