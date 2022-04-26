
class Game {
    constructor(firstPlayer) {
        //creat array of pieces for new game
      boardData = new BoardData(getInitialpieces());
      this.currentPlayer = firstPlayer;
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
  }
  