import { myHeaders } from "./header.js";
import { turnObject } from "./turnKeeping.js";

function endTurn() {
    turnObject.incrementTurn();
    document.getElementById("playerTurn").textContent = turnObject.getExternalTurn;
    document.getElementById("playerTurnColor").textContent = turnObject.getTurnColor;
}

function undoTurn() {
    turnObject.decrementTurn();
    document.getElementById("playerTurn").textContent = turnObject.getExternalTurn;
    document.getElementById("playerTurnColor").textContent = turnObject.getTurnColor;
}   

export { endTurn, undoTurn };