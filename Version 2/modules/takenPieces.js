import { myHeaders } from "./helpers/header.js";
import { listObject, pieceObject } from "./objects.js";
import { turnObject } from "./turnKeeping.js";

function takenPieces(takenPiece = null) {
    if (takenPiece) {
        document.getElementById(pieceObject.getSelected.getColor + "Taken").textContent += takenPiece.getPieceSymbol;
    } else {
        document.getElementById("whiteTaken").textContent = "";
        document.getElementById("blackTaken").textContent = "";
        
        for (const name in listObject.getPieceList) {
            let turnColor;
            let piece = listObject.getPieceList[name];

            switch (piece.getColor) {
                case "white":
                    turnColor = "black";
                    break;
                case "black":
                    turnColor = "white"
                    break;
            }
            if (piece.getTaken) {
                document.getElementById(turnColor + "Taken").textContent += piece.getPieceSymbol;
            }
        }
    }
    
}

export { takenPieces };