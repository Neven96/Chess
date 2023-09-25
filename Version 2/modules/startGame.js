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

    // A list of all the pieces to make the setUpPieces a much shorter and more compact module
    let allPiecesList = 
    { "1":  { "0": { "whitePawnA": null, "white": "\u{2659}" }, 
              "1": { "whitePawnB": null, "white": "\u{2659}" }, 
              "2": { "whitePawnC": null, "white": "\u{2659}" }, 
              "3": { "whitePawnD": null, "white": "\u{2659}" }, 
              "4": { "whitePawnE": null, "white": "\u{2659}" }, 
              "5": { "whitePawnF": null, "white": "\u{2659}" }, 
              "6": { "whitePawnG": null, "white": "\u{2659}" }, 
              "7": { "whitePawnH": null, "white": "\u{2659}" } 
            },
      "-1": { "0": { "blackPawnA": null, "black": "\u{265F}" }, 
              "1": { "blackPawnB": null, "black": "\u{265F}" }, 
              "2": { "blackPawnC": null, "black": "\u{265F}" }, 
              "3": { "blackPawnD": null, "black": "\u{265F}" }, 
              "4": { "blackPawnE": null, "black": "\u{265F}" }, 
              "5": { "blackPawnF": null, "black": "\u{265F}" }, 
              "6": { "blackPawnG": null, "black": "\u{265F}" }, 
              "7": { "blackPawnH": null, "black": "\u{265F}" } 
            },
      "2":  { "0": { "whiteRookA": null, "white": "\u{2656}" }, "7": { "whiteRookH": null, "white": "\u{2656}" } }, 
      "-2": { "0": { "blackRookA": null, "black": "\u{265C}" }, "7": { "blackRookH": null, "black": "\u{265C}" } }, 
      "3":  { "1": { "whiteKnightB": null, "white": "\u{2658}" }, "6": { "whiteKnightG": null, "white": "\u{2658}" } }, 
      "-3": { "1": { "blackKnightB": null, "black": "\u{265E}" }, "6": { "blackKnightG": null, "black": "\u{265E}" } }, 
      "4":  { "2": { "whiteBishopC": null, "white": "\u{2657}" }, "5": { "whiteBishopF": null, "white": "\u{2657}" } }, 
      "-4": { "2": { "blackBishopC": null, "black": "\u{265D}" }, "5": { "blackBishopF": null, "black": "\u{265D}" } },
      "5":  { "3": { "whiteQueen": null, "white": "\u{2655}" } },
      "-5": { "3": { "blackQueen": null, "black": "\u{265B}" } },
      "6":  { "4": { "whiteKing": null, "white": "\u{2654}" } },
      "-6": { "4": { "blackKing": null, "black": "\u{265A}" } }
    }; 
    let pieceArrayLength = boardObject.getPieceArray.length;
    for (var i = 0; i < pieceArrayLength; i++) {
        let pieceArrayILength = boardObject.getPieceArray[i].length;
        for (var j = 0; j < pieceArrayILength; j++) {
            allPiecesList = setUpPieces(i, j, boardObject.getPieceArray[i][j], allPiecesList);
        }
    }
    console.log(listObject.getPieceList);

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