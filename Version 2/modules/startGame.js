import { myHeaders } from "./helpers/header.js";
import { boardObject, listObject, pieceObject, typeObjects } from "./objects.js";
import { pauseObject } from "./pauseGame.js";
import { playGameObject } from "./playGame.js";
import { timeObject } from "./timeKeeping.js";
import { setUpPieces } from "./setUpPieces.js";
import { updateMovement } from "./movement.js";
import { turnObject } from "./turnKeeping.js";
import { previousTurnsSetup } from "./previousTurnsSetup.js";
import { paintTile } from "./paintTile.js";

// Starts the game and resets all the stuff to the correct position
function startGame(players) {
    boardObject.resetPieces();
    listObject.setPieceList = {};
    listObject.setPawnList = {};
    listObject.setRookList = {};
    listObject.setKnightList = {};
    listObject.setBishopList = {};
    listObject.setQueenList = {};
    listObject.setKingList = {};

    // Resets all values when clicking a new game
    typeObjects.setStarted = false;
    typeObjects.setPlayers = players;
    pieceObject.setSelected = pieceObject.setPrevSelected = null;
    pieceObject.rookSelected = null;
    pieceObject.setX_selected = pieceObject.setY_selected = pieceObject.setX_previous = pieceObject.setY_previous = 0;
    pieceObject.rook_x = pieceObject.rook_y = 0;
    pieceObject.setPieceSymbol = pieceObject.setPrevPieceSymbol = "";
    pauseObject.setPause = true;
    turnObject.setInternalTurn = 0;
    turnObject.setExternalTurn = 0;
    // Paints the board
    let boardRowLength = boardObject.getBoardArray.length;
    for (var i = 0; i < boardRowLength; i++) {
        let boardColLength = boardObject.getBoardArray[i].length;
        for (var j = 0; j < boardColLength; j++) {
            paintTile(j, i)
        }
    }
    
    // Resets the values of previous turns and taken pieces
    document.getElementById("previousTurnsTableBody").textContent = "";
    document.getElementById("whiteTaken").textContent = "";
    document.getElementById("blackTaken").textContent = "";

    let pawnPiecesList = { "1": { "0": { "whitePawnA": null }, "1": { "whitePawnB": null }, "2": { "whitePawnC": null }, "3": { "whitePawnD": null }, "4": { "whitePawnE": null }, "5": { "whitePawnF": null }, "6": { "whitePawnG": null }, "7": { "whitePawnH": null } },
                          "-1": { "0": { "blackPawnA": null }, "1": { "blackPawnB": null }, "2": { "blackPawnC": null }, "3": { "blackPawnD": null }, "4": { "blackPawnE": null }, "5": { "blackPawnF": null }, "6": { "blackPawnG": null }, "7": { "blackPawnH": null } } } 
    let pieceArrayLength = boardObject.getPieceArray.length;
    for (var i = 0; i < pieceArrayLength; i++) {
        let pieceArrayILength = boardObject.getPieceArray[i].length;
        for (var j = 0; j < pieceArrayILength; j++) {
            pawnPiecesList = setUpPieces(i, j, boardObject.getPieceArray[i][j], pawnPiecesList);
        }
    }

    clearTimeout(playGameObject.getTime);

    // Readies the time and turn for the players
    timeObject.setUpTime();

    turnObject.incrementTurn();

    document.getElementById("playerTurn").textContent = turnObject.getExternalTurn;
    document.getElementById("turnDivider").style.display = "initial";
    document.getElementById("playerTurnColor").textContent = turnObject.getTurnColor;

    // Shows the first turn number(1) in the previous turns list
    previousTurnsSetup();

    // Creates the first movement for the pieces
    updateMovement();

    typeObjects.setStarted = true;
    // Unpause the game to start the timer
    pauseObject.pauseGame();

    document.getElementById("pauseKnapp").style.display = "initial";
    document.getElementById("undoKnapp").style.display = "initial";
    document.getElementById("undoKnapp").disabled = true;
}

export { startGame };