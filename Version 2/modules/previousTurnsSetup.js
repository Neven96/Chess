import { myHeaders } from "./helpers/header.js";
import { pieceObject } from "./objects.js";
import { turnObject } from "./turnKeeping.js";

function previousTurnsSetup(castling = "", promotion = "", attack = false, attackPawn = false) { 
    let movedPiece = "";
    let letter = "a";
    let number = 1;
    let outString = "";

    if (document.getElementById("tableRowTurn" + turnObject.getExternalTurn) === null) {
        let tableRow = document.createElement("tr");
        tableRow.id = "tableRowTurn" + turnObject.getExternalTurn;
        let tableCellTurnNumber = document.createElement("td");
        tableCellTurnNumber.id = "tableCellTurn" + turnObject.getExternalTurn;
        let tableCellTurnNumberSpan = document.createElement("span");
        tableCellTurnNumberSpan.id = "tableCellTurn" + turnObject.getExternalTurn + "span";
        tableCellTurnNumberSpan.textContent = turnObject.getExternalTurn;

        tableCellTurnNumber.appendChild(tableCellTurnNumberSpan)
        tableRow.appendChild(tableCellTurnNumber);
        document.getElementById("previousTurnsTableBody").appendChild(tableRow);
    }

    // TODO: Fix undoing turn
    if (document.getElementById("tableRowTurn" + turnObject.getExternalTurn) !== null) {
        let tableCellTurnColor = document.createElement("td");
        tableCellTurnColor.id = "tableCellTurn" + turnObject.getExternalTurn + turnObject.getTurnColor;
        let tableCellTurnColorSpan = document.createElement("span");
        tableCellTurnColorSpan.id = "tableCellTurn" + turnObject.getExternalTurn + turnObject.getTurnColor + "span";

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

        tableCellTurnColorSpan.textContent = outString;

        tableCellTurnColor.appendChild(tableCellTurnColorSpan);
        document.getElementById("tableRowTurn" + turnObject.getExternalTurn).appendChild(tableCellTurnColor);
    }
}

export { previousTurnsSetup };