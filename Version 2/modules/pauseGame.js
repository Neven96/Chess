import { myHeaders } from "./header.js";
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

            // board.removeEventListener("click")

        } else if (this.pause) {
            
            this.pause = false;

            // board.addEventListener("click")

            playGameObject.tickGame();
        }
    }
};

export { pauseObject };