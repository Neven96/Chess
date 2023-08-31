import { myHeaders } from "./helpers/header.js";
import { mod } from "./helpers/modulo.js";
import { pieceObject, typeObjects } from "./objects.js";
import { turnObject } from "./turnKeeping.js";

// Function for showing the previous moves in the game
/**
* @param {string} [castling=""] "Is either 'short' or 'long' depending on the castling played"
* @param {number} [promotion=0] "Is the number for the piece the pawn promotes into"
* @param {boolean} [attack=false] "Is wheter a piece has attack that turn or not"
* @param {boolean} [attackPawn=false] "Is when a pawn has attacked, must be accompanied by the 'attack' variable"
* @param {boolean} [whiteCheck=false] "Is wheter or not the white king has been set in check this turn"
* @param {boolean} [blackCheck=false] "Is wheter or not the black king has been set in check this turn"
*/
function previousTurnsSetup(castling = "", promotion = 0, attack = false, attackPawn = false, whiteCheck = false, blackCheck = false) { 
    let movedPiece = "";
    let letter = "a";
    let number = 1;
    let outString = "";

    // Checks wheter the current turns table row exists, if it doesn't, creates a new one and adds the turn number cell
    if (document.getElementById("tableRowTurn" + turnObject.getExternalTurn) === null) {
        let tableRow = document.createElement("tr");
        tableRow.id = "tableRowTurn" + turnObject.getExternalTurn;
        let tableCellTurnNumber = document.createElement("td");
        tableCellTurnNumber.id = "tableCellTurn" + turnObject.getExternalTurn;
        let tableCellTurnNumberSpan = document.createElement("span");
        tableCellTurnNumberSpan.id = "tableCellTurn" + turnObject.getExternalTurn + "span";
        
        tableCellTurnNumber.appendChild(tableCellTurnNumberSpan)
        tableRow.appendChild(tableCellTurnNumber);
        document.getElementById("previousTurnsTableBody").appendChild(tableRow);

        document.getElementById("tableCellTurn" + turnObject.getExternalTurn + "span").textContent = turnObject.getExternalTurn;

        // For creating a list to store the previous turns
        turnObject.makePreviousTurns(turnObject.getExternalTurn);
    }

    // Creates the table cells for the move used by each player
    if (document.getElementById("tableRowTurn" + turnObject.getExternalTurn) !== null && typeObjects.getStarted) {
        // This one is for adding back the number if the turn was undoed
        document.getElementById("tableCellTurn" + turnObject.getExternalTurn + "span").textContent = turnObject.getExternalTurn;

        // This one is if the previous turns array for current turn is deleted
        if (!(turnObject.getExternalTurn in turnObject.getPreviousTurns)) {
            turnObject.makePreviousTurns(turnObject.getExternalTurn);
        }

        let tableCellTurnColor, tableCellTurnColorSpan;
        if (document.getElementById("tableCellTurn" + turnObject.getExternalTurn + turnObject.getTurnColor) === null) {
            

            tableCellTurnColor = document.createElement("td");
            tableCellTurnColor.id = "tableCellTurn" + turnObject.getExternalTurn + turnObject.getTurnColor;
            tableCellTurnColorSpan = document.createElement("span");
            tableCellTurnColorSpan.id = "tableCellTurn" + turnObject.getExternalTurn + turnObject.getTurnColor + "span";

            tableCellTurnColor.appendChild(tableCellTurnColorSpan);
            document.getElementById("tableRowTurn" + turnObject.getExternalTurn).appendChild(tableCellTurnColor);
        }

        // Gives the correct symbols, and positioning with letters and numbers
        switch (pieceObject.getSelected.getPiece) {
            case "pawn":
                movedPiece = "";
                break;
            
            case "rook":
                movedPiece = "R";
                break;

            case "knight":
                movedPiece = "N";
                break;

            case "bishop":
                movedPiece = "B";
                break;

            case "queen":
                movedPiece = "Q";
                break;

            case "king":
                movedPiece = "K";
                break;
        }

        switch (pieceObject.getX_selected) {
            case 0:
                letter = "a";
                break;

            case 1:
                letter = "b";
                break;

            case 2:
                letter = "c";
                break;

            case 3:
                letter = "d";
                break;

            case 4:
                letter = "e";
                break;

            case 5:
                letter = "f";
                break;

            case 6:
                letter = "g";
                break;

            case 7:
                letter = "h";
                break;
        }

        switch (pieceObject.getY_selected) {
            case 0:
                number = 8;
                break;

            case 1:
                number = 7;
                break;

            case 2:
                number = 6;
                break;

            case 3:
                number = 5;
                break;

            case 4:
                number = 4;
                break;

            case 5:
                number = 3;
                break;

            case 6:
                number = 2;
                break;

            case 7:
                number = 1;
                break;
        }

        switch (promotion) {
            case 2:
            case -2:
                promotion = "R";
                break;

            case 3:
            case -3:
                promotion = "N";
                break;

            case 4:
            case -4:
                promotion = "B";
                break;

            case 5:
            case -5:
                promotion = "Q";
                break;
        
            default:
                promotion = "";
                break;
        }

        if (attack) {
            if (attackPawn) {
                switch (pieceObject.getX_previous) {
                    case 0:
                        movedPiece = "a";
                        break;

                    case 1:
                        movedPiece = "b";
                        break;

                    case 2:
                        movedPiece = "c";
                        break;

                    case 3:
                        movedPiece = "d";
                        break;

                    case 4:
                        movedPiece = "e";
                        break;

                    case 5:
                        movedPiece = "f";
                        break;

                    case 6:
                        movedPiece = "g";
                        break;

                    case 7:
                        movedPiece = "h";
                        break;
                }
            }
            outString = movedPiece+"x"+letter+number;
        } 
        if (castling) {
            if (castling === "long") {
                outString = "O-O-O";
            } else if (castling === "short") {
                outString = "O-O";
            }
        } 
        if (promotion) {
            outString = letter+number+"="+promotion;
        }
        if (!attack && !castling && !promotion) {
            outString = movedPiece+letter+number;
        }
        if (mod(turnObject.getInternalTurn, 2) === 0 && whiteCheck) {
            outString += "+";
        }
        if (mod(turnObject.getInternalTurn, 2) === 1 && blackCheck) {
            outString += "+";
        }

        document.getElementById("tableCellTurn" + turnObject.getExternalTurn + turnObject.getTurnColor + "span").textContent = outString;

        turnObject.addToPreviousTurns(turnObject.getExternalTurn, outString);

        console.log(turnObject.getPreviousTurns);
    }
}

export { previousTurnsSetup };