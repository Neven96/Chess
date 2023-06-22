function mod(n, m) {
  return ((n % m) + m) % m;
}

document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded() {

  let pieceArray;
  let levelArray;
  let movedSpaces;
  let pieceClass;
  let pawnClass;
  let rookClass;
  let knightClass;
  let bishopClass;
  let queenClass;
  let kingClass;

  let antallSpillere;
  let width;
  let height;
  let selected;
  let turn;

  let whiteHours;
  let whiteMinutes;
  let whiteSeconds;
  let blackHours;
  let blackMinutes;
  let blackSeconds;
  let timeInterval;

  let pause = false;
  let started = false;
  let moved = false;
  let rokade = false;
  let attack = false;
  let setup = false;
  let upgrade = false;

  let whitePawnA; let whitePawnB; let whitePawnC; let whitePawnD; let whitePawnE; let whitePawnF; let whitePawnG; let whitePawnH;
  let whiteRookA; let whiteRookH; let whiteKnightB; let whiteKnightG; let whiteBishopC; let whiteBishopF;
  let whiteQueen; let whiteKing;

  let blackPawnA; let blackPawnB; let blackPawnC; let blackPawnD; let blackPawnE; let blackPawnF; let blackPawnG; let blackPawnH;
  let blackRookA; let blackRookH; let blackKnightB; let blackKnightG; let blackBishopC; let blackBishopF;
  let blackQueen; let blackKing;

  let bane = document.getElementById("bane");
  let innhold = bane.getContext("2d");

  document.getElementById("startEnKnapp").onclick = function() { startSpill(1) };
  document.getElementById("startToKnapp").onclick = function() { startSpill(2) };
  document.getElementById("pauseKnapp").onclick = function() { pauseGame() };

  function startSpill(spillere) {
    clearInterval(timeInterval);

    pieceArray = [];
    changedArray = [];
    levelArray = [];
    pieceClass = {};
    pawnClass = {};
    rookClass = {};
    knightClass = {};
    bishopClass = {};
    queenClass = {};
    kingClass = {};

    antallSpillere = spillere;
    selected = undefined;
    pause = false;
    setup = false;

    width = bane.width;
    height = bane.height;

    turn = 1;
    document.getElementById("playerTurn").textContent = turn;

    whiteHours = 0;
    whiteMinutes = 0;
    whiteSeconds = 0;
    blackHours = 0;
    blackMinutes = 0;
    blackSeconds = 0;
    document.getElementById("whiteTime").textContent = "0"+whiteHours+":0"+whiteMinutes+":0"+whiteSeconds;
    document.getElementById("blackTime").textContent = "0"+blackHours+":0"+blackMinutes+":0"+blackSeconds;
    timeKeeping();

    paintLevel();
    for (var i = 0; i < pieceArray.length; i++) {
      for (var j = 0; j < pieceArray[i].length; j++) {
        paintPieces(i, j, pieceArray[i][j])
      }
    }

    started = true;
    setup = true;
    console.log(pieceClass);
    console.log(pieceArray);
    document.getElementById("pauseKnapp").style.display = "initial";
    document.getElementById("undoKnapp").style.display = "initial";
    document.getElementById("turnTimerDiv").style.display = "initial";
  }

  function pauseGame() {
    if (!pause) {

      pause = true;

      document.getElementById("pauseKnapp").textContent = "Play";
    } else if (pause) {

      pause = false;

      document.getElementById("pauseKnapp").textContent = "Pause";
    }
  }

  bane.addEventListener('click', function(event) {
    if (started && !pause) {
      const rect = bane.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      x_true = Math.floor(x / (width/8));
      y_true = Math.floor(y / (height/8));
      if (selected != undefined) {
        if (mod(turn,2) == 1) {
          if (pieceArray[x_true][y_true] == 0 || pieceArray[x_true][y_true] >= 7) {
            selected.movePieceOld(selected.getPosition()["position"][0],selected.getPosition()["position"][1], x_true, y_true);
            return;
          }
        } else if (mod(turn,2) == 0) {
          if (pieceArray[x_true][y_true] == 0 || pieceArray[x_true][y_true] <= 6) {
            selected.movePieceOld(selected.getPosition()["position"][0],selected.getPosition()["position"][1], x_true, y_true);
            return;
          }
        }
      }
      if (pieceArray[x_true][y_true] > 0) {
        selectPiece()
      }
    }
  });

  function selectPiece() {
    if (started) {
      if (selected != undefined) {
        paintTile(previous_x, previous_y);
        if (selected.getPosition()["position"][0] == x_true && selected.getPosition()["position"][1] == y_true) {
          paintTile(x_true, y_true);
          selected = undefined;
          return;
        }
      }
      innhold.fillStyle = "#0000FF";
      if (mod(turn, 2) == 1) {
        for (var name in pieceClass) {
          if (pieceClass[name].getColor()["color"] == "white") {
            if (pieceClass[name].getNameFromPosition([x_true, y_true])) {
              selected = pieceClass[name];
              innhold.fillRect(x_true*(width/8),y_true*(height/8),height/8,width/8);
              console.log(selected);
            }
          }
        }
      } else if (mod(turn, 2) == 0) {
        for (var name in pieceClass) {
          if (pieceClass[name].getColor()["color"] == "black") {
            if (pieceClass[name].getNameFromPosition([x_true, y_true])) {
              selected = pieceClass[name];
              innhold.fillRect(x_true*(width/8),y_true*(height/8),height/8,width/8);
              console.log(selected);
            }
          }
        }
      } else {
        return;
      }
      previous_x = x_true;
      previous_y = y_true;
      paintPieces(x_true,y_true,pieceArray[x_true][y_true])
    }
  }

  function timeKeeping() {
    timeInterval = setInterval(function() {
      whiteSeconds = parseInt(whiteSeconds);
      whiteMinutes = parseInt(whiteMinutes);
      whiteHours = parseInt(whiteHours);
      blackSeconds = parseInt(blackSeconds);
      blackMinutes = parseInt(blackMinutes);
      blackHours = parseInt(blackHours);
      if (mod(turn,2) == 1) {
        whiteSeconds++;
        if (whiteSeconds == 60) {
          whiteMinutes++;
          whiteSeconds = 0;
        }
        if (whiteMinutes == 60) {
          whiteHours++;
          whiteMinutes = 0;
        }
        if (whiteSeconds < 10) {
          whiteSeconds = "0"+whiteSeconds;
        }
        if (whiteMinutes < 10) {
          whiteMinutes = "0"+whiteMinutes;
        }
        if (whiteHours < 10) {
          whiteHours = "0"+whiteHours;
        }
        document.getElementById("whiteTime").textContent = whiteHours+":"+whiteMinutes+":"+whiteSeconds;
      } else if (mod(turn,2) == 0) {
        blackSeconds++;
        if (blackSeconds == 60) {
          blackMinutes++;
          blackSeconds = 0;
        }
        if (blackMinutes == 60) {
          blackHours++;
          blackSeconds = 0;
        }
        if (blackSeconds < 10) {
          blackSeconds = "0"+blackSeconds;
        }
        if (blackMinutes < 10) {
          blackMinutes = "0"+blackMinutes;
        }
        if (blackHours < 10) {
          blackHours = "0"+blackHours;
        }
        document.getElementById("blackTime").textContent = blackHours+":"+blackMinutes+":"+blackSeconds;
      }
    }, 1000);
  }

  function endTurn() {
    turn++;
    document.getElementById("playerTurn").textContent = turn;
  }

  document.getElementById("undoKnapp").onclick = function() { if (turn > 1) {undoMove();}}

  function undoMove() {
    turn--;
    document.getElementById("playerTurn").textContent = turn;
    for (var name in pieceClass) {
      if (turn in pieceClass[name].getPreviousPositions()) {
        previousPosition = pieceClass[name].getPreviousPositions()[turn];

        pieceArray[previousPosition[0]][previousPosition[1]] = pieceArray[previousPosition[2]][previousPosition[3]];
        pieceArray[previousPosition[2]][previousPosition[3]] = 0;
        pieceClass[name].movePieceOld([previousPosition[0], previousPosition[1]], turn, true);

        paintTile(previousPosition[2], previousPosition[3]);
        paintTile(previousPosition[0], previousPosition[1]);
        paintPieces(previousPosition[0], previousPosition[1], pieceArray[previousPosition[0], previousPosition[1]]);
      }
    }
  }

  function paintTile(column, row) {
    if (levelArray[column][row] == 1) {
      innhold.fillStyle = "#FFFFFF";
    } else if (levelArray[column][row] == 0) {
      innhold.fillStyle = "#000000";
    }
    innhold.fillRect(column*(width/8),row*(height/8),height/8,width/8);
    paintPieces(column, row, pieceArray[column][row]);
  }

  function paintLevel() {
    for (var i = 0; i < 8; i++) {
      levelArray[i] = [];
      for (var j = 0; j < 8; j++) {
        if (mod(i,2) == 0) {
          if (mod(j,2) == 0) {
            innhold.fillStyle = "#FFFFFF";
            levelArray[i][j] = 1;
          } else if (mod(j,2) == 1) {
            innhold.fillStyle = "#000000";
            levelArray[i][j] = 0;
          }
        } else if (mod(i,2) == 1) {
          if (mod(j,2) == 0) {
            innhold.fillStyle = "#000000";
            levelArray[i][j] = 0;
          } else if (mod(j,2) == 1) {
            innhold.fillStyle = "#FFFFFF";
            levelArray[i][j] = 1;
          }
        }
        innhold.fillRect(i*(width/8),j*(height/8),height/8,width/8);
      }
    }


    // FIX THIS
    pieceArray.push([8,7,0,0,0,0,1,2]);
    pieceArray.push([9,7,0,0,0,0,1,3]);
    pieceArray.push([10,7,0,0,0,0,1,4]);
    pieceArray.push([11,7,0,0,0,0,1,5]);
    pieceArray.push([12,7,0,0,0,0,1,6]);
    pieceArray.push([10,7,0,0,0,0,1,4]);
    pieceArray.push([9,7,0,0,0,0,1,3]);
    pieceArray.push([8,7,0,0,0,0,1,2]);
  }

  function paintPieces(column, row, piece) {
    innhold.font = "60px 'DejaVu Sans'"
    if (piece >= 1 && piece <= 6) {
      innhold.strokeStyle = "#778899"
      innhold.fillStyle = "#FFFFFF"
    } else if (piece >= 7 && piece <= 12) {
      innhold.strokeStyle = "#778899"
      innhold.fillStyle = "#000000"
    }
    switch (piece) {
      case 1:
        piece = "\u{2659}"
        // White pawn
        if (!setup) {
          switch (column) {
            case 0:
              whitePawnA = new Pawn("whitePawnA", 1, "white", "pawn", [column, row]);
              pieceClass["whitePawnA"] = whitePawnA;
              pawnClass["whitePawnA"] = whitePawnA;
              whitePawnA.updateMoves(column, row-1);
              whitePawnA.updateMoves(column, row-2);
              break;
            case 1:
              whitePawnB = new Pawn("whitePawnB", 1, "white", "pawn", [column, row]);
              pieceClass["whitePawnB"] = whitePawnB;
              pawnClass["whitePawnB"] = whitePawnB;
              whitePawnB.updateMoves(column, row-1);
              whitePawnB.updateMoves(column, row-2);
              break;
            case 2:
              whitePawnC = new Pawn("whitePawnC", 1, "white", "pawn", [column, row]);
              pieceClass["whitePawnC"] = whitePawnC;
              pawnClass["whitePawnC"] = whitePawnC;
              whitePawnC.updateMoves(column, row-1);
              whitePawnC.updateMoves(column, row-2);
              break;
            case 3:
              whitePawnD = new Pawn("whitePawnD", 1, "white", "pawn", [column, row]);
              pieceClass["whitePawnD"] = whitePawnD;
              pawnClass["whitePawnD"] = whitePawnD;
              whitePawnD.updateMoves(column, row-1);
              whitePawnD.updateMoves(column, row-2);
              break;
            case 4:
              whitePawnE = new Pawn("whitePawnE", 1, "white", "pawn", [column, row]);
              pieceClass["whitePawnE"] = whitePawnE;
              pawnClass["whitePawnE"] = whitePawnE;
              whitePawnE.updateMoves(column, row-1);
              whitePawnE.updateMoves(column, row-2);
              break;
            case 5:
              whitePawnF = new Pawn("whitePawnF", 1, "white", "pawn", [column, row]);
              pieceClass["whitePawnF"] = whitePawnF;
              pawnClass["whitePawnF"] = whitePawnF;
              whitePawnF.updateMoves(column, row-1);
              whitePawnF.updateMoves(column, row-2);
              break;
            case 6:
              whitePawnG = new Pawn("whitePawnG", 1, "white", "pawn", [column, row]);
              pieceClass["whitePawnG"] = whitePawnG;
              pawnClass["whitePawnG"] = whitePawnG;
              whitePawnG.updateMoves(column, row-1);
              whitePawnG.updateMoves(column, row-2);
              break;
            case 7:
              whitePawnH = new Pawn("whitePawnH", 1, "white", "pawn", [column, row]);
              pieceClass["whitePawnH"] = whitePawnH;
              pawnClass["whitePawnH"] = whitePawnH;
              whitePawnH.updateMoves(column, row-1);
              whitePawnH.updateMoves(column, row-2);
          }
        }
        break;
      case 2:
        piece = "\u{2656}";
        // White rook
        if (!setup) {
          switch (column) {
            case 0:
              whiteRookA = new Rook("whiteRookA", 2, "white", "rook", [column, row]);
              pieceClass["whiteRookA"] = whiteRookA;
              rookClass["whiteRookA"] = whiteRookA;
              break;
            case 7:
              whiteRookH = new Rook("whiteRookH", 2, "white", "rook", [column, row]);
              pieceClass["whiteRookH"] = whiteRookH;
              rookClass["whiteRookH"] = whiteRookH;
          }
        }
        break;
      case 3:
        piece = "\u{2658}";
        // White knight
        if (!setup) {
          switch (column) {
            case 1:
              whiteKnightB = new Knight("whiteKnightB", 3, "white", "knight", [column, row]);
              pieceClass["whiteKnightB"] = whiteKnightB;
              knightClass["whiteKnightB"] = whiteKnightB;
              whiteKnightB.updateMoves(column-1, row-2);
              whiteKnightB.updateMoves(column+1, row-2);
              break;
            case 6:
              whiteKnightG = new Knight("whiteKnightG", 3, "white", "knight", [column, row]);
              pieceClass["whiteKnightG"] = whiteKnightG;
              knightClass["whiteKnightG"] = whiteKnightG;
              whiteKnightG.updateMoves(column-1, row-2);
              whiteKnightG.updateMoves(column+1, row-2);
          }
        }
        break;
      case 4:
        piece = "\u{2657}";
        // White bishop
        if (!setup) {
          switch (column) {
            case 2:
              whiteBishopC = new Bishop("whiteBishopC", 4, "white", "bishop", [column, row]);
              pieceClass["whiteBishopC"] = whiteBishopC;
              break;
            case 5:
              whiteBishopF = new Bishop("whiteBishopF", 4, "white", "bishop", [column, row]);
              pieceClass["whiteBishopF"] = whiteBishopF;
          }
        }
        break;
      case 5:
        piece = "\u{2655}";
        // White queen
        if (!setup) {
          whiteQueen = new Queen("whiteQueen", 5, "white", "queen", [column, row]);
          pieceClass["whiteQueen"] = whiteQueen;
        }
        break;
      case 6:
        piece = "\u{2654}";
        // White king
        if (!setup) {
          whiteKing = new King("whiteKing", 6, "white", "king", [column, row]);
          pieceClass["whiteKing"] = whiteKing;
        }
        break;
      case 7:
        piece = "\u{265F}";
        // Black pawn
        if (!setup) {
          switch (column) {
            case 0:
              blackPawnA = new Pawn("blackPawnA", 7, "black", "pawn", [column, row]);
              pieceClass["blackPawnA"] = blackPawnA;
              pawnClass["blackPawnA"] = blackPawnA;
              blackPawnA.updateMoves(column, row+1);
              blackPawnA.updateMoves(column, row+2);
              break;
            case 1:
              blackPawnB = new Pawn("blackPawnB", 7, "black", "pawn", [column, row]);
              pieceClass["blackPawnB"] = blackPawnB;
              pawnClass["blackPawnB"] = blackPawnB;
              blackPawnB.updateMoves(column, row+1);
              blackPawnB.updateMoves(column, row+2);
              break;
            case 2:
              blackPawnC = new Pawn("blackPawnC", 7, "black", "pawn", [column, row]);
              pieceClass["blackPawnC"] = blackPawnC;
              pawnClass["blackPawnC"] = blackPawnC;
              blackPawnC.updateMoves(column, row+1);
              blackPawnC.updateMoves(column, row+2);
              break;
            case 3:
              blackPawnD = new Pawn("blackPawnD", 7, "black", "pawn", [column, row]);
              pieceClass["blackPawnD"] = blackPawnD;
              pawnClass["blackPawnD"] = blackPawnD;
              blackPawnD.updateMoves(column, row+1);
              blackPawnD.updateMoves(column, row+2);
              break;
            case 4:
              blackPawnE = new Pawn("blackPawnE", 7, "black", "pawn", [column, row]);
              pieceClass["blackPawnE"] = blackPawnE;
              pawnClass["blackPawnE"] = blackPawnE;
              blackPawnE.updateMoves(column, row+1);
              blackPawnE.updateMoves(column, row+2);
              break;
            case 5:
              blackPawnF = new Pawn("blackPawnF", 7, "black", "pawn", [column, row]);
              pieceClass["blackPawnF"] = blackPawnF;
              pawnClass["blackPawnF"] = blackPawnF;
              blackPawnF.updateMoves(column, row+1);
              blackPawnF.updateMoves(column, row+2);
              break;
            case 6:
              blackPawnG = new Pawn("blackPawnG", 7, "black", "pawn", [column, row]);
              pieceClass["blackPawnG"] = blackPawnG;
              pawnClass["blackPawnG"] = blackPawnG;
              blackPawnG.updateMoves(column, row+1);
              blackPawnG.updateMoves(column, row+2);
              break;
            case 7:
              blackPawnH = new Pawn("blackPawnH", 7, "black", "pawn", [column, row]);
              pieceClass["blackPawnH"] = blackPawnH;
              pawnClass["blackPawnH"] = blackPawnH;
              blackPawnH.updateMoves(column, row+1);
              blackPawnH.updateMoves(column, row+2);
          }
        }
        break;
      case 8:
        piece = "\u{265C}";
        // Black rook
        if (!setup) {
          switch (column) {
            case 0:
              blackRookA = new Rook("blackRookA", 8, "black", "rook", [column, row]);
              pieceClass["blackRookA"] = blackRookA;
              break;
            case 7:
              blackRookH = new Rook("blackRookH", 8, "black", "rook", [column, row]);
              pieceClass["blackRookH"] = blackRookH;
          }
        }
        break;
      case 9:
        piece = "\u{265E}";
        // Black knight
        if (!setup) {
          switch (column) {
            case 1:
              blackKnightB = new Knight("blackKnightB", 9, "black", "knight", [column, row]);
              pieceClass["blackKnightB"] = blackKnightB;
              blackKnightB.updateMoves(column-1, row+2);
              blackKnightB.updateMoves(column+1, row+2);
              break;
            case 6:
              blackKnightG = new Knight("blackKnightG", 9, "black", "knight", [column, row]);
              pieceClass["blackKnightG"] = blackKnightG;
              blackKnightG.updateMoves(column-1, row+2);
              blackKnightG.updateMoves(column+1, row+2);
          }
        }
        break;
      case 10:
        piece = "\u{265D}";
        // Black bishop
        if (!setup) {
          switch (column) {
            case 2:
              blackBishopC = new Bishop("blackBishopC", 10, "black", "bishop", [column, row]);
              pieceClass["blackBishopC"] = blackBishopC;
              break;
            case 5:
              blackBishopF = new Bishop("blackBishopF", 10, "black", "bishop", [column, row]);
              pieceClass["blackBishopF"] = blackBishopF;
          }
        }
        break;
      case 11:
        piece = "\u{265B}";
        // Black queen
        if (!setup) {
          blackQueen = new Queen("blackQueen", 11, "black", "queen", [column, row]);
          pieceClass["blackQueen"] = blackQueen;
        }
        break;
      case 12:
        piece = "\u{265A}";
        // Black king
        if (!setup) {
          blackKing = new King("blackKing", 12, "black", "king", [column, row]);
          pieceClass["blackKing"] = blackKing;
        }
        break;
      default:
        piece = "";
        // Blank space
    }
    innhold.lineWidth = 4;
    innhold.strokeText(piece, column*(width/8)+(3*(width/128)), row*(height/8)+(6*(height/64)));
    innhold.lineWidth = 1;
    innhold.fillText(piece, column*(width/8)+(3*(width/128)), row*(height/8)+(6*(height/64)));
  }

  class Piece {
    constructor(name, number, color, piece, position) {
      this.name = name;
      this.number = number;
      this.color = color;
      this.piece = piece;
      this.position = position;
      this.taken = false;
      this.moved = false;
      this.undo = false;
      this.turn;
      this.availableMoves = [];
      this.previousPositions = {};
      this.tempPosition = [];
    }

    getColor() {
      return {color:this.color};
    }

    getPiece() {
      return {piece:this.piece};
    }

    getAvailableMoves() {
      return {moves:this.availableMoves};
    }

    getPosition() {
      return {position:this.position};
    }

    getPreviousPositions() {
      return this.previousPositions;
    }

    getMoved() {
      return {moved:this.moved};
    }

    getTaken() {
      return {taken:this.taken};
    }

    getNameFromPosition(position) {
      if (this.position.toString() === position.toString()) {
        return {name:this.name};
      } else {
        return false;
      }
    }

    updateMoves(x, y) {
      this.availableMoves.push([x, y])
    }

    movePiece() {

    }

    undoMove(turn) {
      this.turn = turn;
    }

    movePieceOld(newPosition, turn, undo) {
      this.turn = turn;
      this.undo = undo;
      if (!undo) {
        this.tempPosition = [];
        this.tempPosition = this.position.concat(newPosition)
        this.previousPositions[this.turn] = this.tempPosition;
        this.position = newPosition;
        if (!this.moved) {
          this.moved = true;
        }
      } else if (undo) {
        this.position = [this.previousPositions[this.turn][0],this.previousPositions[this.turn][1]];
        delete this.previousPositions[this.turn];
        if (Object.keys(this.previousPositions).length == 0) {
          this.moved = false;
        }
      }
    }

    takePiece() {
      this.taken = true;
      this.availableMoves = [];
    }
  }

  class Pawn extends Piece {
    constructor(name, number, color, piece, position) {
      super(name, number, color, piece, position);
    }

    changePiece(newNumber) {
      this.number = newNumber;
      switch (this.number) {
        case 2:
        case 8:
          this.piece = "rook";
          break;
        case 3:
        case 9:
          this.piece = "knight";
          break;
        case 4:
        case 10:
          this.piece = "bishop";
          break;
        case 5:
        case 11:
          this.piece = "queen";
          break;
        default:
          this.piece = "pawn";
      }
    }
  }

  class BlackPawn extends Pawn {
    constructor(name, number, color, piece, position) {
      super(name, number, color, piece, position);
    }

    setMoves() {
      if (this.getMoved()["moved"] == true) {
        
      }
      else if (this.getMoved()["moved"] == false) {

      }
    }
  }

  class WhitePawn extends Pawn {
    constructor(name, number, color, piece, position) {
      super(name, number, color, piece, position);
    }

    setMoves() {
      if (this.getMoved()["moved"] == true) {

      }
      else if (this.getMoved()["moved"] == false) {

      }
    }
  }

  class Rook extends Piece {
    constructor(name, number, color, piece, position) {
      super(name, number, color, piece, position);
    }

    setMoves() {

    }
  }

  class Knight extends Piece {
    constructor(name, number, color, piece, position) {
      super(name, number, color, piece, position);
    }

    setMoves() {

    }
  }

  class Bishop extends Piece {
    constructor(name, number, color, piece, position) {
      super(name, number, color, piece, position);
    }

    setMoves() {

    }
  }

  class Queen extends Piece {
    constructor(name, number, color, piece, position) {
      super(name, number, color, piece, position);
    }

    setMoves() {

    }
  }

  class King extends Piece {
    constructor(name, number, color, piece, position) {
      super(name, number, color, piece, position);
    }

    setMoves() {

    }
  }
}
