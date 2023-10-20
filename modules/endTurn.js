import { myHeaders } from "./helpers/header.js";
import { turnObject } from "./turnKeeping.js";

// When the end turn is called, and calls for incrementing the turn counter
function endTurn() {
    turnObject.incrementTurn();
    document.getElementById("playerTurn").textContent = turnObject.getExternalTurn;
    document.getElementById("playerTurnColor").textContent = turnObject.getTurnColor;
    if (turnObject.getInternalTurn > 1) {
        document.getElementById("undoKnapp").disabled = false;
    }
}

// When undo is called, and calls for decrementing the turn counter
function undoTurn() {
    turnObject.decrementTurn();
    document.getElementById("playerTurn").textContent = turnObject.getExternalTurn;
    document.getElementById("playerTurnColor").textContent = turnObject.getTurnColor;
    if (turnObject.getInternalTurn <= 1) {
        document.getElementById("undoKnapp").disabled = true;
    }
}   

export { endTurn, undoTurn };