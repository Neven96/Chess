function mod(n, m) {
  return ((n % m) + m) % m;
}

document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded() {
  let pieceArray;
  let changedArray;
  let levelArray;
  let movedSpaces;
  let pieceClassArray;

  let antallSpillere;
  let width;
  let height;
  let piece;
  let selected;
  let turn;

  let x_true;
  let previous_x;
  let y_true;
  let previous_y;

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
  let attack = false;

  let white = "white";
  let black = "black";
  let pawn = "pawn";
  let rook = "rook";
  let knight = "knight";
  let bishop = "bishop";
  let queen = "queen";
  let king = "king";

  let whitePawnA; let whitePawnB; let whitePawnC; let whitePawnD; let whitePawnE; let whitePawnF; let whitePawnG; let whitePawnH;
  let whiteRookA; let whiteRookH; let whiteKnightB; let whiteKnightG; let whiteBishopC; let whiteBishopF;
  let whiteQueen; let whiteKing;

  let blackPawnA; let blackPawnB; let blackPawnC; let blackPawnD; let blackPawnE; let blackPawnF; let blackPawnG; let blackPawnH;
  let blackRookA; let blackRookH; let blackKnightB; let blackKnightG; let blackBishopC; let blackBishopF;
  let blackQueen; let blackKing;

  let bane = document.getElementById("bane");
  let innhold = bane.getContext("2d");

  document.getElementById("startEnKnapp").onclick = function() {startSpill(1)};
  document.getElementById("startToKnapp").onclick = function() {startSpill(2)};

  function startSpill(spillere) {
    pieceArray = [];
    changedArray = [];
    levelArray = [];
    pieceClassArray = {};

    antallSpillere = spillere;
    selected = undefined;
    clearInterval(timeInterval);

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
    // console.log(pieceArray);
    // console.log(levelArray);
    for (var i = 0; i < pieceArray.length; i++) {
      for (var j = 0; j < pieceArray[i].length; j++) {
        paintPieces(j, i, pieceArray[i][j])
      }
    }

    started = true;
    document.getElementById("pauseKnapp").style.display = "initial";
    document.getElementById("turnTimerDiv").style.display = "initial";
  }

  bane.addEventListener('click', function(e) {
    if (started) {
      const rect = bane.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      x_true = Math.floor(x / (width/8));
      y_true = Math.floor(y / (height/8));
      if (selected != undefined) {
        if (mod(turn,2) == 1) {
          if (pieceArray[y_true][x_true] == 0 || pieceArray[y_true][x_true] >= 7) {
            movePiece(selected[0],selected[1], y_true, x_true);
            return;
          }
        } else if (mod(turn,2) == 0) {
          if (pieceArray[y_true][x_true] == 0 || pieceArray[y_true][x_true] <= 6) {
            movePiece(selected[0],selected[1], y_true, x_true);
            return;
          }
        }
      }
      if (pieceArray[y_true][x_true] > 0) {
        selectPiece()
      }
    }
  });

  function selectPiece() {
    if (started) {
      if (selected != undefined) {
        paintTile(previous_x, previous_y);
        if (selected[0] == y_true && selected[1] == x_true) {
          paintTile(x_true, y_true);
          selected = undefined;
          return;
        }
      }
      innhold.fillStyle = "#0000FF";
      if (mod(turn, 2) == 1) {
        if (pieceArray[y_true][x_true] <= 6 && pieceArray[y_true][x_true] >= 1) {
          selected = [y_true, x_true, pieceArray[y_true][x_true]];
          innhold.fillRect(x_true*(width/8),y_true*(height/8),height/8,width/8);
          console.log(selected);
        }
      } else if (mod(turn, 2) == 0) {
        if (pieceArray[y_true][x_true] <= 12 && pieceArray[y_true][x_true] >= 7) {
          selected = [y_true, x_true, pieceArray[y_true][x_true]];
          innhold.fillRect(x_true*(width/8),y_true*(height/8),height/8,width/8);
          console.log(selected);
        }
      } else {
        return;
      }
      previous_x = x_true;
      previous_y = y_true;
      paintPieces(x_true,y_true,pieceArray[y_true][x_true])
    }
  }

  // X and Y have somehow switched from previous functions...
  function movePiece(x_from, y_from, x_to, y_to) {
    moved = false;
    if (pieceArray[x_to][y_to] > 0) {
      attack = true;
    } else if (pieceArray[x_to][y_to] == 0) {
      attack = false;
    }
    movedSpaces = [];
    distance = 0;
    switch (pieceArray[x_from][y_from]) {
      // -------------------------------------------------------//
      //                        WHITE                           //
      //                        PAWN                            //
      // -------------------------------------------------------//
      case 1:
        if (selected[0] == 6) {
          if (x_to == selected[0]-1 && y_to == selected[1] || x_to == selected[0]-2 && y_to == selected[1]) {
            for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
              movedSpaces.push([selected[0]-i, selected[1]])
            }
            for (var i = 0; i < movedSpaces.length; i++) {
              if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                moved = false;
                break;
              } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                moved = true;
              }
            }
          } else if (x_to == selected[0]-1 && y_to == selected[1]-1 && pieceArray[x_to][y_to] > 0 || x_to == selected[0]-1 && y_to == selected[1]+1 && pieceArray[x_to][y_to] > 0) {
            moved = true;
          }
        } else {
          if (x_to == selected[0]-1 && y_to == selected[1]) {
            if (attack) {
              moved = false;
            } else if (!attack) {
              moved = true;
            }
          } else if (x_to == selected[0]-1 && y_to == selected[1]-1 && pieceArray[x_to][y_to] > 0 || x_to == selected[0]-1 && y_to == selected[1]+1 && pieceArray[x_to][y_to] > 0) {
            moved = true;
          }
        }
        break;
      // -------------------------------------------------------//
      //                                                        //
      //                        ROOK                            //
      //                                                        //
      // -------------------------------------------------------//
      case 2:
        if (x_to == selected[0] && y_to < selected[1]) {
          for (var i = 1; i <= Math.abs(selected[1]-y_to); i++) {
            movedSpaces.push([selected[0], selected[1]-i])
          }
          if (movedSpaces.length-1 == 0) {
            moved = true;
          } else {
            for (var i = 0; i < movedSpaces.length-1; i++) {
              if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                moved = false;
                attack = false;
                break;
              } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                moved = true;
              }
            }
          }
        } else if (x_to == selected[0] && y_to > selected[1]) {
          for (var i = 1; i <= Math.abs(selected[1]-y_to); i++) {
            movedSpaces.push([selected[0], selected[1]+i])
          }
          if (movedSpaces.length-1 == 0) {
            moved = true;
          } else {
            for (var i = 0; i < movedSpaces.length-1; i++) {
              if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                moved = false;
                attack = false;
                break;
              } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                moved = true;
              }
            }
          }
        } else if (y_to == selected[1] && x_to < selected[0]) {
          for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
            movedSpaces.push([selected[0]-i, selected[1]])
          }
          if (movedSpaces.length-1 == 0) {
            moved = true;
          } else {
            for (var i = 0; i < movedSpaces.length-1; i++) {
              if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                moved = false;
                attack = false;
                break;
              } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                moved = true;
              }
            }
          }
        } else if (y_to == selected[1] && x_to > selected[0]) {
          for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
            movedSpaces.push([selected[0]+i, selected[1]])
          }
          if (movedSpaces.length-1 == 0) {
            moved = true;
          } else {
            for (var i = 0; i < movedSpaces.length-1; i++) {
              if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                moved = false;
                attack = false;
                break;
              } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                moved = true;
              }
            }
          }
        }
        if (attack) {
          moved = true;
        }
        break;
      // -------------------------------------------------------//
      //                                                        //
      //                        KNIGHT                          //
      //                                                        //
      // -------------------------------------------------------//
      case 3:
        if (x_to == selected[0]+2 && y_to == selected[1]-1 || x_to == selected[0]+2 && y_to == selected[1]+1) {
          moved = true;
        }
        else if (x_to == selected[0]-2 && y_to == selected[1]-1 || x_to == selected[0]-2 && y_to == selected[1]+1) {
          moved = true;
        }
        else if (y_to == selected[1]+2 && x_to == selected[0]-1 || y_to == selected[1]+2 && x_to == selected[0]+1) {
          moved = true;
        }
        else if (y_to == selected[1]-2 && x_to == selected[0]-1 || y_to == selected[1]-2 && x_to == selected[0]+1) {
          moved = true;
        }
        break;
      // -------------------------------------------------------//
      //                                                        //
      //                        BISHOP                          //
      //                                                        //
      // -------------------------------------------------------//
      case 4:
        if (Math.abs(selected[0]-x_to) == Math.abs(selected[1]-y_to)) {
          if (x_to < selected[0] && y_to < selected[1]) {
            for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
              movedSpaces.push([selected[0]-i, selected[1]-i]);
            }
            if (movedSpaces.length-1 == 0) {
              moved = true;
            } else {
              for (var i = 0; i < movedSpaces.length-1; i++) {
                if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                  moved = false;
                  attack = false;
                  break;
                } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                  moved = true;
                }
              }
            }
          } else if (x_to < selected[0] && y_to > selected[1]) {
            for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
              movedSpaces.push([selected[0]-i, selected[1]+i]);
            }
            if (movedSpaces.length-1 == 0) {
              moved = true;
            } else {
              for (var i = 0; i < movedSpaces.length-1; i++) {
                if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                  moved = false;
                  attack = false;
                  break;
                } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                  moved = true;
                }
              }
            }
          } else if (x_to > selected[0] && y_to < selected[1]) {
            for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
              movedSpaces.push([selected[0]+i, selected[1]-i]);
            }
            if (movedSpaces.length-1 == 0) {
              moved = true;
            } else {
              for (var i = 0; i < movedSpaces.length-1; i++) {
                if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                  moved = false;
                  attack = false;
                  break;
                } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                  moved = true;
                }
              }
            }
          } else if (x_to > selected[0] && y_to > selected[1]) {
            for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
              movedSpaces.push([selected[0]+i, selected[1]+i]);
            }
            if (movedSpaces.length-1 == 0) {
              moved = true;
            } else {
              for (var i = 0; i < movedSpaces.length-1; i++) {
                if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                  moved = false;
                  attack = false;
                  break;
                } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                  moved = true;
                }
              }
            }
          }
        } else {
          attack = false;
        }
        if (attack) {
          moved = true;
        }
        break;
      // -------------------------------------------------------//
      //                                                        //
      //                        QUEEN                           //
      //                                                        //
      // -------------------------------------------------------//
      case 5:
        //Straight
        if (x_to == selected[0] && y_to < selected[1]) {
          for (var i = 1; i <= Math.abs(selected[1]-y_to); i++) {
            movedSpaces.push([selected[0], selected[1]-i])
          }
          if (movedSpaces.length-1 == 0) {
            moved = true;
          } else {
            for (var i = 0; i < movedSpaces.length-1; i++) {
              if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                moved = false;
                attack = false;
                break;
              } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                moved = true;
              }
            }
          }
        } else if (x_to == selected[0] && y_to > selected[1]) {
          for (var i = 1; i <= Math.abs(selected[1]-y_to); i++) {
            movedSpaces.push([selected[0], selected[1]+i])
          }
          if (movedSpaces.length-1 == 0) {
            moved = true;
          } else {
            for (var i = 0; i < movedSpaces.length-1; i++) {
              if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                moved = false;
                attack = false;
                break;
              } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                moved = true;
              }
            }
          }
        } else if (y_to == selected[1] && x_to < selected[0]) {
          for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
            movedSpaces.push([selected[0]-i, selected[1]])
          }
          if (movedSpaces.length-1 == 0) {
            moved = true;
          } else {
            for (var i = 0; i < movedSpaces.length-1; i++) {
              if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                moved = false;
                attack = false;
                break;
              } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                moved = true;
              }
            }
          }
        } else if (y_to == selected[1] && x_to > selected[0]) {
          for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
            movedSpaces.push([selected[0]+i, selected[1]])
          }
          if (movedSpaces.length-1 == 0) {
            moved = true;
          } else {
            for (var i = 0; i < movedSpaces.length-1; i++) {
              if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                moved = false;
                attack = false;
                break;
              } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                moved = true;
              }
            }
          }
        }
        // Diagonal
        else if (Math.abs(selected[0]-x_to) == Math.abs(selected[1]-y_to)) {
          if (x_to < selected[0] && y_to < selected[1]) {
            for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
              movedSpaces.push([selected[0]-i, selected[1]-i]);
            }
            if (movedSpaces.length-1 == 0) {
              moved = true;
            } else {
              for (var i = 0; i < movedSpaces.length-1; i++) {
                if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                  moved = false;
                  attack = false;
                  break;
                } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                  moved = true;
                }
              }
            }
          } else if (x_to < selected[0] && y_to > selected[1]) {
            for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
              movedSpaces.push([selected[0]-i, selected[1]+i]);
            }
            if (movedSpaces.length-1 == 0) {
              moved = true;
            } else {
              for (var i = 0; i < movedSpaces.length-1; i++) {
                if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                  moved = false;
                  attack = false;
                  break;
                } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                  moved = true;
                }
              }
            }
          } else if (x_to > selected[0] && y_to < selected[1]) {
              for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
                movedSpaces.push([selected[0]+i, selected[1]-i]);
              }
              if (movedSpaces.length-1 == 0) {
                moved = true;
              } else {
                for (var i = 0; i < movedSpaces.length-1; i++) {
                  if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                    moved = false;
                    attack = false;
                    break;
                  } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                    moved = true;
                  }
                }
              }
            } else if (x_to > selected[0] && y_to > selected[1]) {
              for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
                movedSpaces.push([selected[0]+i, selected[1]+i]);
              }
              if (movedSpaces.length-1 == 0) {
                moved = true;
              } else {
                for (var i = 0; i < movedSpaces.length-1; i++) {
                  if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                    moved = false;
                    attack = false;
                    break;
                  } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                    moved = true;
                  }
                }
              }
            }
          }
          else {
            attack = false;
          }
          if (attack) {
            moved = true;
          }
        break;
      // -------------------------------------------------------//
      //                                                        //
      //                        KING                            //
      //                                                        //
      // -------------------------------------------------------//
      case 6:
        if (x_to == selected[0]-1 && y_to == selected[1] || x_to == selected[0]+1 && y_to == selected[1]) {
          moved = true;
        } else if (y_to == selected[1]-1 && x_to == selected[0] || y_to == selected[1]+1 && x_to == selected[0]) {
          moved = true;
        } else if (x_to == selected[0]-1 && y_to == selected[1]-1) {
          moved = true;
        } else if (x_to == selected[0]-1 && y_to == selected[1]+1) {
          moved = true;
        } else if (x_to == selected[0]+1 && y_to == selected[1]-1) {
          moved = true;
        } else if (x_to == selected[0]+1 && y_to == selected[1]+1) {
          moved = true;
        }
        break;
      // -------------------------------------------------------//
      //                        BLACK                           //
      //                        PAWN                            //
      // -------------------------------------------------------//
      case 7:
        if (selected[0] == 1) {
          if (x_to == selected[0]+1 && y_to == selected[1] || x_to == selected[0]+2 && y_to == selected[1]) {
            for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
              movedSpaces.push([selected[0]+i, selected[1]])
            }
            for (var i = 0; i < movedSpaces.length; i++) {
              if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                moved = false;
                break;
              } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                moved = true;
              }
            }
          } else if (x_to == selected[0]+1 && y_to == selected[1]-1 && pieceArray[x_to][y_to] > 0 || x_to == selected[0]+1 && y_to == selected[1]+1 && pieceArray[x_to][y_to] > 0) {
            moved = true;
          }
        } else {
          if (x_to == selected[0]+1 && y_to == selected[1]) {
            if (attack) {
              moved = false;
            } else if (!attack) {
              moved = true;
            }
          } else if (x_to == selected[0]+1 && y_to == selected[1]-1 && pieceArray[x_to][y_to] > 0 || x_to == selected[0]+1 && y_to == selected[1]+1 && pieceArray[x_to][y_to] > 0) {
            moved = true;
          }
        }
        break;
      // -------------------------------------------------------//
      //                        Black                           //
      //                        rook                            //
      // -------------------------------------------------------//
      case 8:
        if (x_to == selected[0] && y_to < selected[1]) {
          for (var i = 1; i <= Math.abs(selected[1]-y_to); i++) {
            movedSpaces.push([selected[0], selected[1]-i])
          }
          if (movedSpaces.length-1 == 0) {
            moved = true;
          } else {
            for (var i = 0; i < movedSpaces.length-1; i++) {
              if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                moved = false;
                attack = false;
                break;
              } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                moved = true;
              }
            }
          }
        } else if (x_to == selected[0] && y_to > selected[1]) {
          for (var i = 1; i <= Math.abs(selected[1]-y_to); i++) {
            movedSpaces.push([selected[0], selected[1]+i])
          }
          if (movedSpaces.length-1 == 0) {
            moved = true;
          } else {
            for (var i = 0; i < movedSpaces.length-1; i++) {
              if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                moved = false;
                attack = false;
                break;
              } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                moved = true;
              }
            }
          }
        } else if (y_to == selected[1] && x_to < selected[0]) {
          for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
            movedSpaces.push([selected[0]-i, selected[1]])
          }
          if (movedSpaces.length-1 == 0) {
            moved = true;
          } else {
            for (var i = 0; i < movedSpaces.length-1; i++) {
              if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                moved = false;
                attack = false;
                break;
              } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                moved = true;
              }
            }
          }
        } else if (y_to == selected[1] && x_to > selected[0]) {
          for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
            movedSpaces.push([selected[0]+i, selected[1]])
          }
          if (movedSpaces.length-1 == 0) {
            moved = true;
          } else {
            for (var i = 0; i < movedSpaces.length-1; i++) {
              if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                moved = false;
                attack = false;
                break;
              } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                moved = true;
              }
            }
          }
        }
        if (attack) {
          moved = true;
        }
        break;
      // -------------------------------------------------------//
      //                        Black                           //
      //                        knight                          //
      // -------------------------------------------------------//
      case 9:
        if (x_to == selected[0]+2 && y_to == selected[1]-1 || x_to == selected[0]+2 && y_to == selected[1]+1) {
          moved = true;
        }
        else if (x_to == selected[0]-2 && y_to == selected[1]-1 || x_to == selected[0]-2 && y_to == selected[1]+1) {
          moved = true;
        }
        else if (y_to == selected[1]+2 && x_to == selected[0]-1 || y_to == selected[1]+2 && x_to == selected[0]+1) {
          moved = true;
        }
        else if (y_to == selected[1]-2 && x_to == selected[0]-1 || y_to == selected[1]-2 && x_to == selected[0]+1) {
          moved = true;
        }
        break;
      // -------------------------------------------------------//
      //                        Black                           //
      //                        bishop                          //
      // -------------------------------------------------------//
      case 10:
        if (Math.abs(selected[0]-x_to) == Math.abs(selected[1]-y_to)) {
          if (x_to < selected[0] && y_to < selected[1]) {
            for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
              movedSpaces.push([selected[0]-i, selected[1]-i]);
            }
            if (movedSpaces.length-1 == 0) {
              moved = true;
            } else {
              for (var i = 0; i < movedSpaces.length-1; i++) {
                if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                  moved = false;
                  attack = false;
                  break;
                } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                  moved = true;
                }
              }
            }
          } else if (x_to < selected[0] && y_to > selected[1]) {
            for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
              movedSpaces.push([selected[0]-i, selected[1]+i]);
            }
            if (movedSpaces.length-1 == 0) {
              moved = true;
            } else {
              for (var i = 0; i < movedSpaces.length-1; i++) {
                if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                  moved = false;
                  attack = false;
                  break;
                } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                  moved = true;
                }
              }
            }
          } else if (x_to > selected[0] && y_to < selected[1]) {
            for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
              movedSpaces.push([selected[0]+i, selected[1]-i]);
            }
            if (movedSpaces.length-1 == 0) {
              moved = true;
            } else {
              for (var i = 0; i < movedSpaces.length-1; i++) {
                if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                  moved = false;
                  attack = false;
                  break;
                } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                  moved = true;
                }
              }
            }
          } else if (x_to > selected[0] && y_to > selected[1]) {
            for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
              movedSpaces.push([selected[0]+i, selected[1]+i]);
            }
            if (movedSpaces.length-1 == 0) {
              moved = true;
            } else {
              for (var i = 0; i < movedSpaces.length-1; i++) {
                if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                  moved = false;
                  attack = false;
                  break;
                } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                  moved = true;
                }
              }
            }
          }
        } else {
          attack = false;
        }
        if (attack) {
          moved = true;
        }
        break;
      // -------------------------------------------------------//
      //                        Black                           //
      //                        queen                           //
      // -------------------------------------------------------//
      case 11:
        //Straight
        if (x_to == selected[0] && y_to < selected[1]) {
          for (var i = 1; i <= Math.abs(selected[1]-y_to); i++) {
            movedSpaces.push([selected[0], selected[1]-i])
          }
          if (movedSpaces.length-1 == 0) {
            moved = true;
          } else {
            for (var i = 0; i < movedSpaces.length-1; i++) {
              if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                moved = false;
                attack = false;
                break;
              } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                moved = true;
              }
            }
          }
        } else if (x_to == selected[0] && y_to > selected[1]) {
          for (var i = 1; i <= Math.abs(selected[1]-y_to); i++) {
            movedSpaces.push([selected[0], selected[1]+i])
          }
          if (movedSpaces.length-1 == 0) {
            moved = true;
          } else {
            for (var i = 0; i < movedSpaces.length-1; i++) {
              if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                moved = false;
                attack = false;
                break;
              } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                moved = true;
              }
            }
          }
        } else if (y_to == selected[1] && x_to < selected[0]) {
          for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
            movedSpaces.push([selected[0]-i, selected[1]])
          }
          if (movedSpaces.length-1 == 0) {
            moved = true;
          } else {
            for (var i = 0; i < movedSpaces.length-1; i++) {
              if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                moved = false;
                attack = false;
                break;
              } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                moved = true;
              }
            }
          }
        } else if (y_to == selected[1] && x_to > selected[0]) {
          for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
            movedSpaces.push([selected[0]+i, selected[1]])
          }
          if (movedSpaces.length-1 == 0) {
            moved = true;
          } else {
            for (var i = 0; i < movedSpaces.length-1; i++) {
              if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                moved = false;
                attack = false;
                break;
              } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                moved = true;
              }
            }
          }
        }
        // Diagonal
        else if (Math.abs(selected[0]-x_to) == Math.abs(selected[1]-y_to)) {
          if (x_to < selected[0] && y_to < selected[1]) {
            for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
              movedSpaces.push([selected[0]-i, selected[1]-i]);
            }
            if (movedSpaces.length-1 == 0) {
              moved = true;
            } else {
              for (var i = 0; i < movedSpaces.length-1; i++) {
                if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                  moved = false;
                  attack = false;
                  break;
                } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                  moved = true;
                }
              }
            }
          } else if (x_to < selected[0] && y_to > selected[1]) {
            for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
              movedSpaces.push([selected[0]-i, selected[1]+i]);
            }
            if (movedSpaces.length-1 == 0) {
              moved = true;
            } else {
              for (var i = 0; i < movedSpaces.length-1; i++) {
                if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                  moved = false;
                  attack = false;
                  break;
                } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                  moved = true;
                }
              }
            }
          } else if (x_to > selected[0] && y_to < selected[1]) {
              for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
                movedSpaces.push([selected[0]+i, selected[1]-i]);
              }
              if (movedSpaces.length-1 == 0) {
                moved = true;
              } else {
                for (var i = 0; i < movedSpaces.length-1; i++) {
                  if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                    moved = false;
                    attack = false;
                    break;
                  } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                    moved = true;
                  }
                }
              }
            } else if (x_to > selected[0] && y_to > selected[1]) {
              for (var i = 1; i <= Math.abs(selected[0]-x_to); i++) {
                movedSpaces.push([selected[0]+i, selected[1]+i]);
              }
              if (movedSpaces.length-1 == 0) {
                moved = true;
              } else {
                for (var i = 0; i < movedSpaces.length-1; i++) {
                  if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] > 0) {
                    moved = false;
                    attack = false;
                    break;
                  } else if (pieceArray[movedSpaces[i][0]][movedSpaces[i][1]] == 0) {
                    moved = true;
                  }
                }
              }
            }
          }
          else {
            attack = false;
          }
          if (attack) {
            moved = true;
          }
          break;
      // -------------------------------------------------------//
      //                        Black                           //
      //                        king                            //
      // -------------------------------------------------------//
      case 12:
        if (x_to == selected[0]-1 && y_to == selected[1] || x_to == selected[0]+1 && y_to == selected[1]) {
          moved = true;
        } else if (y_to == selected[1]-1 && x_to == selected[0] || y_to == selected[1]+1 && x_to == selected[0]) {
          moved = true;
        } else if (x_to == selected[0]-1 && y_to == selected[1]-1) {
          moved = true;
        } else if (x_to == selected[0]-1 && y_to == selected[1]+1) {
          moved = true;
        } else if (x_to == selected[0]+1 && y_to == selected[1]-1) {
          moved = true;
        } else if (x_to == selected[0]+1 && y_to == selected[1]+1) {
          moved = true;
        }
    }
    if (moved) {
      pieceArray[x_to][y_to] = pieceArray[x_from][y_from];
      pieceArray[x_from][y_from] = 0;
      for (var name in pieceClassArray) {
        if (pieceClassArray[name].getNameFromPosition([y_from, x_from])) {
          pieceClassArray[name].movePiece([y_to, x_to])
        }
      }
      paintTile(y_from, x_from);
      paintTile(y_to, x_to);
      paintPieces(y_to, x_to, pieceArray[y_to, x_to]);
      turn++;
      document.getElementById("playerTurn").textContent = turn;
      selected = undefined;
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

  function paintTile(column, row) {
    if (levelArray[column][row] == 1) {
      innhold.fillStyle = "#FFFFFF";
    } else if (levelArray[column][row] == 0) {
      innhold.fillStyle = "#000000";
    }
    innhold.fillRect(column*(width/8),row*(height/8),height/8,width/8);
    paintPieces(column, row, pieceArray[row][column]);
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
        innhold.fillRect(j*(width/8),i*(height/8),height/8,width/8);
      }
    }
    pieceArray.push([8,9,10,11,12,10,9,8]);
    pieceArray.push([7,7,7,7,7,7,7,7]);
    pieceArray.push([0,0,0,0,0,0,0,0]);
    pieceArray.push([0,0,0,0,0,0,0,0]);
    pieceArray.push([0,0,0,0,0,0,0,0]);
    pieceArray.push([0,0,0,0,0,0,0,0]);
    pieceArray.push([1,1,1,1,1,1,1,1]);
    pieceArray.push([2,3,4,5,6,4,3,2]);
  }

  function paintPieces(column, row, piece) {
    innhold.font = "40px Helvetica"
    if (piece >= 1 && piece <= 6) {
      innhold.strokeStyle = "#000000"
      innhold.fillStyle = "#FFFFFF"
    } else if (piece >= 7 && piece <= 12) {
      innhold.strokeStyle = "#FFFFFF"
      innhold.fillStyle = "#000000"
    }
    switch (piece) {
      case 1:
        piece = "P";
        // White pawn
        switch (column) {
          case 0:
            whitePawnA = new Piece("whitePawnA", 1, white, pawn, [column, row]);
            pieceClassArray["whitePawnA"] = whitePawnA;
            break;
          case 1:
            whitePawnB = new Piece("whitePawnB", 1, white, pawn, [column, row]);
            pieceClassArray["whitePawnB"] = whitePawnB;
            break;
          case 2:
            whitePawnC = new Piece("whitePawnC", 1, white, pawn, [column, row]);
            pieceClassArray["whitePawnC"] = whitePawnC;
            break;
          case 3:
            whitePawnD = new Piece("whitePawnD", 1, white, pawn, [column, row]);
            pieceClassArray["whitePawnD"] = whitePawnD;
            break;
          case 4:
            whitePawnE = new Piece("whitePawnE", 1, white, pawn, [column, row]);
            pieceClassArray["whitePawnE"] = whitePawnE;
            break;
          case 5:
            whitePawnF = new Piece("whitePawnF", 1, white, pawn, [column, row]);
            pieceClassArray["whitePawnF"] = whitePawnF;
            break;
          case 6:
            whitePawnG = new Piece("whitePawnG", 1, white, pawn, [column, row]);
            pieceClassArray["whitePawnG"] = whitePawnG;
            break;
          case 7:
            whitePawnH = new Piece("whitePawnH", 1, white, pawn, [column, row]);
            pieceClassArray["whitePawnH"] = whitePawnH;
        }
        break;
      case 2:
        piece = "R";
        // White rook
        switch (column) {
          case 0:
            whiteRookA = new Piece("whiteRookA", 2, white, rook, [column, row]);
            pieceClassArray["whiteRookA"] = whiteRookA;
            break;
          case 7:
            whiteRookH = new Piece("whiteRookH", 2, white, rook, [column, row]);
            pieceClassArray["whiteRookH"] = whiteRookH;
        }
        break;
      case 3:
        piece = "Kn";
        // White knight
        switch (column) {
          case 1:
            whiteKnightB = new Piece("whiteKnightB", 3, white, knight, [column, row]);
            pieceClassArray["whiteKnightB"] = whiteKnightB;
            break;
          case 6:
            whiteKnightG = new Piece("whiteKnightG", 3, white, knight, [column, row]);
            pieceClassArray["whiteKnightG"] = whiteKnightG;
        }
        break;
      case 4:
        piece = "B";
        // White bishop
        switch (column) {
          case 2:
            whiteBishopC = new Piece("whiteBishopC", 4, white, bishop, [column, row]);
            pieceClassArray["whiteBishopC"] = whiteBishopC;
            break;
          case 5:
            whiteBishopF = new Piece("whiteBishopF", 4, white, bishop, [column, row]);
            pieceClassArray["whiteBishopF"] = whiteBishopF;
        }
        break;
      case 5:
        piece = "Q";
        // White queen
        whiteQueen = new Piece("whiteQueen", white, 5, queen, [column, row]);
        pieceClassArray["whiteQueen"] = whiteQueen;
        break;
      case 6:
        piece = "K";
        // White king
        whiteKing = new Piece("whiteKing", white, 6, king, [column, row]);
        pieceClassArray["whiteKing"] = whiteKing;
        break;
      case 7:
        piece = "P";
        // Black pawn
        switch (column) {
          case 0:
            blackPawnA = new Piece("blackPawnA", 7, black, pawn, [column, row]);
            pieceClassArray["blackPawnA"] = blackPawnA;
            break;
          case 1:
            blackPawnB = new Piece("blackPawnB", 7, black, pawn, [column, row]);
            pieceClassArray["blackPawnB"] = blackPawnB;
            break;
          case 2:
            blackPawnC = new Piece("blackPawnC", 7, black, pawn, [column, row]);
            pieceClassArray["blackPawnC"] = blackPawnC;
            break;
          case 3:
            blackPawnD = new Piece("blackPawnD", 7, black, pawn, [column, row]);
            pieceClassArray["blackPawnD"] = blackPawnD;
            break;
          case 4:
            blackPawnE = new Piece("blackPawnE", 7, black, pawn, [column, row]);
            pieceClassArray["blackPawnE"] = blackPawnE;
            break;
          case 5:
            blackPawnF = new Piece("blackPawnF", 7, black, pawn, [column, row]);
            pieceClassArray["blackPawnF"] = blackPawnF;
            break;
          case 6:
            blackPawnG = new Piece("blackPawnG", 7, black, pawn, [column, row]);
            pieceClassArray["blackPawnG"] = blackPawnG;
            break;
          case 7:
            blackPawnH = new Piece("blackPawnH", 7, black, pawn, [column, row]);
            pieceClassArray["blackPawnH"] = blackPawnH;
        }
        break;
      case 8:
        piece = "R";
        // Black rook
        switch (column) {
          case 0:
            blackRookA = new Piece("blackRookA", 8, black, rook, [column, row]);
            pieceClassArray["blackRookA"] = blackRookA;
            break;
          case 7:
            blackRookH = new Piece("blackRookH", 8, black, rook, [column, row]);
            pieceClassArray["blackRookH"] = blackRookH;
        }
        break;
      case 9:
        piece = "Kn";
        // Black knight
        switch (column) {
          case 1:
            blackKnightB = new Piece("blackKnightB", 9, black, knight, [column, row]);
            pieceClassArray["blackKnightB"] = blackKnightB;
            break;
          case 6:
            blackKnightG = new Piece("blackKnightG", 9, black, knight, [column, row]);
            pieceClassArray["blackKnightG"] = blackKnightG;
        }
        break;
      case 10:
        piece = "B";
        // Black bishop
        switch (column) {
          case 2:
            blackBishopC = new Piece("blackBishopC", 10, black, bishop, [column, row]);
            pieceClassArray["blackBishopC"] = blackBishopC;
            break;
          case 5:
            blackBishopF = new Piece("blackBishopF", 10, black, bishop, [column, row]);
            pieceClassArray["blackBishopF"] = blackBishopF;
        }
        break;
      case 11:
        piece = "Q";
        // Black queen
        blackQueen = new Piece("blackQueen", 11, black, queen, [column, row]);
        pieceClassArray["blackQueen"] = blackQueen;
        break;
      case 12:
        piece = "K";
        // Black king
        blackKing = new Piece("blackKing", 12, black, king, [column, row]);
        pieceClassArray["blackKing"] = blackKing;
        break;
      default:
        piece = "";
        // Blank space
    }
    innhold.lineWidth = 3;
    innhold.strokeText(piece, column*(width/8)+(1*(width/32)), row*(height/8)+(3*(height/32)));
    innhold.lineWidth = 1;
    innhold.fillText(piece, column*(width/8)+(1*(width/32)), row*(height/8)+(3*(height/32)));
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
    }

    getPiece() {
      return {name:this.name, color:this.color, piece:this.piece};
    }

    getPosition() {
      return {position:this.position};
    }

    getNameFromPosition(position) {
      if (this.position.toString() === position.toString()) {
        return {name:this.name};
      }
    }

    movePiece(newPosition) {
      this.position = newPosition;
      if (!this.moved) {
        this.moved = true;
      }
    }

    changePiece(newPiece) {
      this.piece = newPiece;
    }

    takePiece() {
      this.taken = true;
    }
  }
}
