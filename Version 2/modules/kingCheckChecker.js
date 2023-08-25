import { myHeaders } from "./helpers/header.js";
import { listObject } from "./objects.js";
import { paintPiece } from "./paintPiece.js";
import { paintTile } from "./paintTile.js";

// For checking if the king is in check
function kingCheckChecker() {
    let king, piece;
    let check_list = {"white_checked" : [null, false], "black_checked" : [null, false]};
    let white_king_name = null;
    let black_king_name = null;
    let white_checked = false;
    let black_checked = false;
    for (let name in listObject.getKingList) {
        king = listObject.getKingList[name];
        
        if (king.getColor === "white") {
            helper("black", "white");
            
        } else if (king.getColor === "black") {
            helper("white", "black");
        }
    }

    // Takes the colors of the king and the opposite color, (many alternatives...) and checks if any piece of opposite color has any
    // available moves that overlaps with the kings current position
    function helper(opposite_color, own_color) {
        outer_loop:
        for (let name in listObject.getPieceList) {
            piece = listObject.getPieceList[name];
            if (piece.getColor === opposite_color) {
                for (let array in piece.getAvailableMoves) {
                    if (king.getPiecePosition.toString() === piece.getAvailableMoves[array].toString()) {
                        check_list[own_color + "_checked"][1] = true;
                        check_list[own_color + "_checked"][0] = king.getName;
                        break outer_loop;
                    }
                }
            }
        }
    }
    return check_list;
}

// For checking if the king is in checkmate
function kingMateChecker() {
    let king_check = kingCheckChecker();

    for (let check in king_check) {
        if (king_check[check][1]) {
        }
    }
}

// Checks if the kings are in check, and if they are, marks their tile in red
function drawCheckedKing() {
    let king_check = kingCheckChecker();

    for (let check in king_check) {
        if (king_check[check][1]) {
            paintTile(listObject.getKingList[king_check[check][0]].getPiecePosition[1],
                      listObject.getKingList[king_check[check][0]].getPiecePosition[0],
                      "#FF0000");
            paintPiece(listObject.getKingList[king_check[check][0]].getPiecePosition[1],
                       listObject.getKingList[king_check[check][0]].getPiecePosition[0],
                       listObject.getKingList[king_check[check][0]].getNumber,
                       listObject.getKingList[king_check[check][0]].getPieceSymbol);
        };
    }
}

export { kingCheckChecker, kingMateChecker, drawCheckedKing };