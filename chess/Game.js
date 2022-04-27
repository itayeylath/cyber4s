
class Game {
    constructor(firstPlayer) {
        //creat array of pieces for new game
      boardData = new BoardData(getInitialpieces());
      this.currentPlayer = firstPlayer;
      this.winner = undefined;
    }
  
    // Tries to actually make a move. Returns true if successful.
    // tryMove(piece, row, col) {
    //   const possibleMoves = this.getPossibleMoves(piece);
    //   // possibleMoves looks like this: [[1,2], [3,2]]
    //   for (const possibleMove of possibleMoves) {
    //     // possibleMove looks like this: [1,2]
    //     if (possibleMove[0] === row && possibleMove[1] === col) {
    //       // There is a legal move
    //       this.boardData.removePiece(row, col);
    //       piece.row = row;
    //       piece.col = col;
    //       this.currentPlayer = piece.getOpponent();
    //       return true;
    //     }
    //   }
    //   return false;
    // }
    // move piece

  // getMove(row, col, type, player, lastrow, lastcol, lastCell) {
    getMove(row, col, type, player, lastrow, lastcol, lastCell) {
      
    addImg(table.rows[row].cells[col], player, type);
    lastCell.getElementsByTagName("img")[0].remove();
    
  }

    getTurnMoves(piece) {
      if (this.currentPlayer == piece.player) {
        return true;
      }
      else{
      return false;
      }
    }

    getremove(row, col) {
      if(boardData.pieces[boardData.getindex(row, col)].type === KING){
        if(this.currentPlayer === BLACK_PLAYER){
          this.winner = WHITE_PLAYER ;
        }
        else{
          this.winner = BLACK_PLAYER ;
        }
      const WIneerPop = document.createElement("div");
      WIneerPop.textContent = "the winner is " + this.winner ;
      WIneerPop.className = 'winner' ;
      table.appendChild(WIneerPop);
      }
      boardData.pieces.splice(boardData.getindex(row, col), 1);
      table.rows[row].cells[col].getElementsByTagName("img")[0].remove();
  
      console.log(boardData);
    }

  }
  