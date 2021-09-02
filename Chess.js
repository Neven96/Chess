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
  let upgradeTo;
  let upgradeToPiece;
  let turn;

  let x_true;
  let previous_x;
  let y_true;
  let previous_y;
  let rokadeTo;
  let rokadeFrom;

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
    pause = false;
    setup = false;
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
    setup = true;
    console.log(pieceClassArray);
    document.getElementById("pauseKnapp").style.display = "initial";
    document.getElementById("undoKnapp").style.display = "initial";
    document.getElementById("turnTimerDiv").style.display = "initial";
  }

  bane.addEventListener('click', function(e) {
    if (started && !pause) {
      const rect = bane.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      x_true = Math.floor(x / (width/8));
      y_true = Math.floor(y / (height/8));
      console.log("X: "+x_true+", Y: "+y_true);
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
  // And I am not sure which is actually which anymore...
  function movePiece(x_from, y_from, x_to, y_to) {
    moved = false;
    upgrade = false;
    rokade = false;
    upgradeTo = 1;
    upgradeToPiece = 1;
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
        if (x_to == 0) {
          upgrade = true;
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
        if (x_to == 7) {
          upgrade = true;
        }
        break;
      // -------------------------------------------------------//
      //                                                        //
      //                        ROOK                            //
      //                                                        //
      // -------------------------------------------------------//
      case 2:
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
      //                                                        //
      //                        KNIGHT                          //
      //                                                        //
      // -------------------------------------------------------//
      case 3:
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
      //                                                        //
      //                        BISHOP                          //
      //                                                        //
      // -------------------------------------------------------//
      case 4:
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
      //                                                        //
      //                        QUEEN                           //
      //                                                        //
      // -------------------------------------------------------//
      case 5:
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
      //                                                        //
      //                        KING                            //
      //                                                        //
      // -------------------------------------------------------//
      case 6:
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
        if (mod(turn,2) == 1) {
          if (!whiteKing.getMoved()["moved"]) {
            if (!whiteRookA.getMoved()["moved"]) {
              if (pieceArray[7][3] == 0 && pieceArray[7][2] == 0 && pieceArray[7][1] == 0) {
                if (x_to == 7 && y_to == 2) {
                  moved = true;
                  rokadeFrom = 0;
                  rokadeTo = 3;
                  rokade = true;
                }
              }
            }
            if (!whiteRookH.getMoved()["moved"]) {
              if (pieceArray[7][5] == 0 && pieceArray[7][6] == 0) {
                if (x_to == 7 && y_to == 6) {
                  moved = true;
                  rokadeFrom = 7;
                  rokadeTo = 5;
                  rokade = true;
                }
              }
            }
          }
        } else if (mod(turn,2) == 0) {
          if (!blackKing.getMoved()["moved"]) {
            if (!blackRookA.getMoved()["moved"]) {
              if (pieceArray[0][3] == 0 && pieceArray[0][2] == 0 && pieceArray[0][1] == 0) {
                if (x_to == 0 && y_to == 2) {
                  moved = true;
                  rokadeFrom = 0;
                  rokadeTo = 3;
                  rokade = true;
                }
              }
            }
            if (!blackRookH.getMoved()["moved"]) {
              if (pieceArray[0][5] == 0 && pieceArray[0][6] == 0) {
                if (x_to == 0 && y_to == 6) {
                  moved = true;
                  rokadeFrom = 7;
                  rokadeTo = 5;
                  rokade = true;
                }
              }
            }
          }
        }
        break;
    }
    if (moved) {
      pieceArray[x_to][y_to] = pieceArray[x_from][y_from];
      pieceArray[x_from][y_from] = 0;
      // Upgrade pawn
      if (upgrade) {
        upgradeTo = prompt("Upgrade pawn! 1=Rook, 2=Knight, 3=Bishop, 4=Queen")
        if (pieceArray[x_to][y_to] >= 1 && pieceArray[x_to][y_to] <= 6) {
          switch (parseInt(upgradeTo)) {
            case 1:
              upgradeToPiece = 2;
              break;
            case 2:
              upgradeToPiece = 3;
              break;
            case 3:
              upgradeToPiece = 4;
              break;
            case 4:
              upgradeToPiece = 5;
              break;
            default:
              upgradeToPiece = 1;
          }
        } else if (pieceArray[x_to][y_to] >= 7 && pieceArray[x_to][y_to] <= 12) {
          switch (parseInt(upgradeTo)) {
            case 1:
              upgradeToPiece = 8;
              break;
            case 2:
              upgradeToPiece = 9;
              break;
            case 3:
              upgradeToPiece = 10;
              break;
            case 4:
              upgradeToPiece = 11;
              break;
            default:
              upgradeToPiece = 7;
          }
        }
        pieceArray[x_to][y_to] = upgradeToPiece;
      }
      // Rokade
      if (rokade) {
        pieceArray[x_to][rokadeTo] = pieceArray[x_to][rokadeFrom];
        pieceArray[x_to][rokadeFrom] = 0;
        paintTile(rokadeFrom, x_to);
        paintTile(rokadeTo, x_to);
        paintPieces(rokadeTo, x_to, pieceArray[x_to][rokadeTo]);

        for (var name in pieceClassArray) {
          if (pieceClassArray[name].getNameFromPosition([rokadeFrom, x_to])) {
            pieceClassArray[name].movePiece([rokadeTo, x_to], turn, false);
          }
        }
      }

      for (var name in pieceClassArray) {
        if (pieceClassArray[name].getNameFromPosition([y_from, x_from])) {
          pieceClassArray[name].movePiece([y_to, x_to], turn, false);
          if (upgrade) {
            pieceClassArray[name].changePiece(upgradeToPiece);
          }
          console.log(pieceClassArray[name].getPreviousPositions());
        }
      }

      paintTile(y_from, x_from);
      paintTile(y_to, x_to);
      paintPieces(y_to, x_to, pieceArray[y_to, x_to]);
      selected = undefined;
      endTurn();
    }
  }

  document.getElementById("pauseKnapp").onclick = function() {pauseSpill();}

  function pauseSpill() {
    if (!pause) {
      pause = true;
      clearInterval(timeInterval);
      document.getElementById("pauseKnapp").textContent = "Play";
    } else if (pause) {
      pause = false;
      timeKeeping();
      document.getElementById("pauseKnapp").textContent = "Pause";
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
    for (var name in pieceClassArray) {
      if (turn in pieceClassArray[name].getPreviousPositions()) {
        previousPosition = pieceClassArray[name].getPreviousPositions()[turn];

        pieceArray[previousPosition[1]][previousPosition[0]] = pieceArray[previousPosition[3]][previousPosition[2]];
        pieceArray[previousPosition[3]][previousPosition[2]] = 0;
        pieceClassArray[name].movePiece([previousPosition[1], previousPosition[0]], turn, true);

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
    innhold.font = "42px Helvetica"
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
        if (!setup) {
          switch (column) {
            case 0:
              whitePawnA = new Pawn("whitePawnA", 1, white, pawn, [column, row]);
              pieceClassArray["whitePawnA"] = whitePawnA;
              whitePawnA.updateMoves(column, row-1);
              whitePawnA.updateMoves(column, row-2);
              break;
            case 1:
              whitePawnB = new Pawn("whitePawnB", 1, white, pawn, [column, row]);
              pieceClassArray["whitePawnB"] = whitePawnB;
              whitePawnB.updateMoves(column, row-1);
              whitePawnB.updateMoves(column, row-2);
              break;
            case 2:
              whitePawnC = new Pawn("whitePawnC", 1, white, pawn, [column, row]);
              pieceClassArray["whitePawnC"] = whitePawnC;
              whitePawnC.updateMoves(column, row-1);
              whitePawnC.updateMoves(column, row-2);
              break;
            case 3:
              whitePawnD = new Pawn("whitePawnD", 1, white, pawn, [column, row]);
              pieceClassArray["whitePawnD"] = whitePawnD;
              whitePawnD.updateMoves(column, row-1);
              whitePawnD.updateMoves(column, row-2);
              break;
            case 4:
              whitePawnE = new Pawn("whitePawnE", 1, white, pawn, [column, row]);
              pieceClassArray["whitePawnE"] = whitePawnE;
              whitePawnE.updateMoves(column, row-1);
              whitePawnE.updateMoves(column, row-2);
              break;
            case 5:
              whitePawnF = new Pawn("whitePawnF", 1, white, pawn, [column, row]);
              pieceClassArray["whitePawnF"] = whitePawnF;
              whitePawnF.updateMoves(column, row-1);
              whitePawnF.updateMoves(column, row-2);
              break;
            case 6:
              whitePawnG = new Pawn("whitePawnG", 1, white, pawn, [column, row]);
              pieceClassArray["whitePawnG"] = whitePawnG;
              whitePawnG.updateMoves(column, row-1);
              whitePawnG.updateMoves(column, row-2);
              break;
            case 7:
              whitePawnH = new Pawn("whitePawnH", 1, white, pawn, [column, row]);
              pieceClassArray["whitePawnH"] = whitePawnH;
              whitePawnH.updateMoves(column, row-1);
              whitePawnH.updateMoves(column, row-2);
          }
        }
        break;
      case 2:
        piece = "R";
        // White rook
        if (!setup) {
          switch (column) {
            case 0:
              whiteRookA = new Rook("whiteRookA", 2, white, rook, [column, row]);
              pieceClassArray["whiteRookA"] = whiteRookA;
              break;
            case 7:
              whiteRookH = new Rook("whiteRookH", 2, white, rook, [column, row]);
              pieceClassArray["whiteRookH"] = whiteRookH;
          }
        }
        break;
      case 3:
        piece = "N";
        // White knight
        if (!setup) {
          switch (column) {
            case 1:
              whiteKnightB = new Knight("whiteKnightB", 3, white, knight, [column, row]);
              pieceClassArray["whiteKnightB"] = whiteKnightB;
              whiteKnightB.updateMoves(column-1, row-2);
              whiteKnightB.updateMoves(column+1, row-2);
              break;
            case 6:
              whiteKnightG = new Knight("whiteKnightG", 3, white, knight, [column, row]);
              pieceClassArray["whiteKnightG"] = whiteKnightG;
              whiteKnightG.updateMoves(column-1, row-2);
              whiteKnightG.updateMoves(column+1, row-2);
          }
        }
        break;
      case 4:
        piece = "B";
        // White bishop
        if (!setup) {
          switch (column) {
            case 2:
              whiteBishopC = new Bishop("whiteBishopC", 4, white, bishop, [column, row]);
              pieceClassArray["whiteBishopC"] = whiteBishopC;
              break;
            case 5:
              whiteBishopF = new Bishop("whiteBishopF", 4, white, bishop, [column, row]);
              pieceClassArray["whiteBishopF"] = whiteBishopF;
          }
        }
        break;
      case 5:
        piece = "Q";
        // White queen
        if (!setup) {
          whiteQueen = new Queen("whiteQueen", white, 5, queen, [column, row]);
          pieceClassArray["whiteQueen"] = whiteQueen;
        }
        break;
      case 6:
        piece = "K";
        // White king
        if (!setup) {
          whiteKing = new King("whiteKing", white, 6, king, [column, row]);
          pieceClassArray["whiteKing"] = whiteKing;
        }
        break;
      case 7:
        piece = "P";
        // Black pawn
        if (!setup) {
          switch (column) {
            case 0:
              blackPawnA = new Pawn("blackPawnA", 7, black, pawn, [column, row]);
              pieceClassArray["blackPawnA"] = blackPawnA;
              blackPawnA.updateMoves(column, row+1);
              blackPawnA.updateMoves(column, row+2);
              break;
            case 1:
              blackPawnB = new Pawn("blackPawnB", 7, black, pawn, [column, row]);
              pieceClassArray["blackPawnB"] = blackPawnB;
              blackPawnB.updateMoves(column, row+1);
              blackPawnB.updateMoves(column, row+2);
              break;
            case 2:
              blackPawnC = new Pawn("blackPawnC", 7, black, pawn, [column, row]);
              pieceClassArray["blackPawnC"] = blackPawnC;
              blackPawnC.updateMoves(column, row+1);
              blackPawnC.updateMoves(column, row+2);
              break;
            case 3:
              blackPawnD = new Pawn("blackPawnD", 7, black, pawn, [column, row]);
              pieceClassArray["blackPawnD"] = blackPawnD;
              blackPawnD.updateMoves(column, row+1);
              blackPawnD.updateMoves(column, row+2);
              break;
            case 4:
              blackPawnE = new Pawn("blackPawnE", 7, black, pawn, [column, row]);
              pieceClassArray["blackPawnE"] = blackPawnE;
              blackPawnE.updateMoves(column, row+1);
              blackPawnE.updateMoves(column, row+2);
              break;
            case 5:
              blackPawnF = new Pawn("blackPawnF", 7, black, pawn, [column, row]);
              pieceClassArray["blackPawnF"] = blackPawnF;
              blackPawnF.updateMoves(column, row+1);
              blackPawnF.updateMoves(column, row+2);
              break;
            case 6:
              blackPawnG = new Pawn("blackPawnG", 7, black, pawn, [column, row]);
              pieceClassArray["blackPawnG"] = blackPawnG;
              blackPawnG.updateMoves(column, row+1);
              blackPawnG.updateMoves(column, row+2);
              break;
            case 7:
              blackPawnH = new Pawn("blackPawnH", 7, black, pawn, [column, row]);
              pieceClassArray["blackPawnH"] = blackPawnH;
              blackPawnH.updateMoves(column, row+1);
              blackPawnH.updateMoves(column, row+2);
          }
        }
        break;
      case 8:
        piece = "R";
        // Black rook
        if (!setup) {
          switch (column) {
            case 0:
              blackRookA = new Rook("blackRookA", 8, black, rook, [column, row]);
              pieceClassArray["blackRookA"] = blackRookA;
              break;
            case 7:
              blackRookH = new Rook("blackRookH", 8, black, rook, [column, row]);
              pieceClassArray["blackRookH"] = blackRookH;
          }
        }
        break;
      case 9:
        piece = "N";
        // Black knight
        if (!setup) {
          switch (column) {
            case 1:
              blackKnightB = new Knight("blackKnightB", 9, black, knight, [column, row]);
              pieceClassArray["blackKnightB"] = blackKnightB;
              blackKnightB.updateMoves(column-1, row+2);
              blackKnightB.updateMoves(column+1, row+2);
              break;
            case 6:
              blackKnightG = new Knight("blackKnightG", 9, black, knight, [column, row]);
              pieceClassArray["blackKnightG"] = blackKnightG;
              blackKnightG.updateMoves(column-1, row+2);
              blackKnightG.updateMoves(column+1, row+2);
          }
        }
        break;
      case 10:
        piece = "B";
        // Black bishop
        if (!setup) {
          switch (column) {
            case 2:
              blackBishopC = new Bishop("blackBishopC", 10, black, bishop, [column, row]);
              pieceClassArray["blackBishopC"] = blackBishopC;
              break;
            case 5:
              blackBishopF = new Bishop("blackBishopF", 10, black, bishop, [column, row]);
              pieceClassArray["blackBishopF"] = blackBishopF;
          }
        }
        break;
      case 11:
        piece = "Q";
        // Black queen
        if (!setup) {
          blackQueen = new Queen("blackQueen", 11, black, queen, [column, row]);
          pieceClassArray["blackQueen"] = blackQueen;
        }
        break;
      case 12:
        piece = "K";
        // Black king
        if (!setup) {
          blackKing = new King("blackKing", 12, black, king, [column, row]);
          pieceClassArray["blackKing"] = blackKing;
        }
        break;
      default:
        piece = "";
        // Blank space
    }
    innhold.lineWidth = 4;
    innhold.strokeText(piece, column*(width/8)+(5*(width/128)), row*(height/8)+(5*(height/64)));
    innhold.lineWidth = 1;
    innhold.fillText(piece, column*(width/8)+(5*(width/128)), row*(height/8)+(5*(height/64)));
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
      return {color:this.color};
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

    movePiece(newPosition, turn, undo) {
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
          this.piece = rook;
          break;
        case 3:
        case 9:
          this.piece = knight;
          break;
        case 4:
        case 10:
          this.piece = bishop;
          break;
        case 5:
        case 11:
          this.piece = queen;
          break;
        default:
          this.piece = pawn;
      }
    }
  }

  class Rook extends Piece {
    constructor(name, number, color, piece, position) {
      super(name, number, color, piece, position);
    }
  }

  class Knight extends Piece {
    constructor(name, number, color, piece, position) {
      super(name, number, color, piece, position);
    }
  }

  class Bishop extends Piece {
    constructor(name, number, color, piece, position) {
      super(name, number, color, piece, position);
    }
  }

  class Queen extends Piece {
    constructor(name, number, color, piece, position) {
      super(name, number, color, piece, position);
    }
  }

  class King extends Piece {
    constructor(name, number, color, piece, position) {
      super(name, number, color, piece, position);
    }
  }
}
