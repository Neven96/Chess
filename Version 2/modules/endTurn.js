import { myHeaders } from "./header.js";
import { turnObject } from "./turnKeeping.js";

function endTurn() {
    turnObject.incrementTurn();
    document.getElementById("playerTurn").textContent = turnObject.getExternalTurn;
    document.getElementById("playerTurnColor").textContent = turnObject.getTurnColor;
    if (turnObject.getInternalTurn > 1) {
        document.getElementById("undoKnapp").disabled = false;
    }
}

function undoTurn() {
    turnObject.decrementTurn();
    document.getElementById("playerTurn").textContent = turnObject.getExternalTurn;
    document.getElementById("playerTurnColor").textContent = turnObject.getTurnColor;
    if (turnObject.getInternalTurn <= 1) {
        document.getElementById("undoKnapp").disabled = true;
    }
}   

export { endTurn, undoTurn };