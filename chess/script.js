//test

//Constant variables
const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';
const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';

//no-Constant variables
let selectedCell;
let boardData;
let table;
let lastPiece = [];
let lastCell = [];
let counterLastPiece = -1;

//basic piece information
class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }

  replaceRowAndCol(newrow, newcol){
    this.row = newrow;
    this.col = newcol;
  }

  //possible move of every piece
  getPossibleMoves() {

    //array of relative moves for the piece
    let moves = [];

    if (this.type === PAWN) {
      moves = this.getPawnMoves(boardData);
    }
    else if (this.type === ROOK) {
      moves = this.getRookMoves(boardData);
    }
    else if (this.type === KNIGHT) {
      moves = this.getKnightMoves(boardData);
    }
    else if (this.type === BISHOP) {
      moves = this.getBishopMoves(boardData);
    }
    else if (this.type === KING) {
      moves = this.getKingMoves(boardData);
    }
    else if (this.type === QUEEN) {
      moves = this.getQueenMoves(boardData);
    }
    //bug check
    else {
      console.log("Unknown type", type)
    }

    // array of absolut moves for the player from his position
    // let absoluteMoves = [];

    // for (let relativeMove of relativeMoves) {
    //   const absoluteRow = this.row + relativeMove[0];
    //   const absoluteCol = this.col + relativeMove[1];
    //   absoluteMoves.push([absoluteRow, absoluteCol]);
    // }

    // array of filtered moves according to border size
    let filteredMoves = [];

    for (let absoluteMove of moves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
        filteredMoves.push(absoluteMove);
      }
    }
    return filteredMoves;
  }

  //function for every piece specific move
  getPawnMoves(boardData) {

    let result = [];

    //movs for W direction
    if (this.player == WHITE_PLAYER) {

      // first move 
      if (this.row == 1) {
        let opositions = [];
        opositions.push([this.row + 2, this.col]);
        opositions.push([this.row + 1, this.col]); 
        for (const oposition of opositions){
          if(boardData.isEmpty(oposition[0], oposition[1]) == true){
           result.push([oposition[0], oposition[1]])
          }
        }
      }

      //regular move
       else if(boardData.isEmpty(this.row + 1, this.col) == true){
        result.push([this.row + 1, this.col]);
       }
      
      //eat move
      if (boardData.isEmpty(this.row + 1, this.col +1) == false ){
        result.push([this.row + 1, this.col +1])
      }
      if (boardData.isEmpty(this.row +1, this.col -1) == false ){
        result.push([this.row +1, this.col -1])
      }

    }

    //movs for B direction
    // first move
    else if (this.row == 6) {
      let opositions = [];
      opositions.push([this.row - 2, this.col]);
      opositions.push([this.row - 1, this.col]);  
      for (const oposition of opositions){
        if(boardData.isEmpty(oposition[0], oposition[1]) == true){
         result.push([oposition[0], oposition[1]])
        }
      }
    }

    //regular move 
     else if(boardData.isEmpty(this.row - 1, this.col) == true){
        result.push([this.row - 1, this.col]);
       }
    
       //eat move
      if (boardData.isEmpty(this.row - 1, this.col +1) == false ){
        result.push([this.row - 1, this.col +1])
      }
      if (boardData.isEmpty(this.row -1, this.col -1) == false ){
        result.push([this.row -1, this.col -1])
      }
  
    return result ;
    }

  getRookMoves(boardData) {
    let result = [];

    result = result.concat(this.getMovesInDirection(-1, 0, boardData));
    result = result.concat(this.getMovesInDirection(1, 0, boardData));
    result = result.concat(this.getMovesInDirection(0, -1, boardData));
    result = result.concat(this.getMovesInDirection(0, 1, boardData));
    
    return result;
  }

  getKnightMoves(boardData) {
    let result = [];
    const Options = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1,2], [-1,2], [1,-2], [-1,-2]];
    for (let Option of Options) {
      let row = this.row + Option[0];
      let col = this.col + Option[1];
      if (!boardData.isPlayer(row, col, this.player)) {
        result.push([row, col]);
      }
    }
    return result;
  }

  getBishopMoves(boardData) {
    let result = [];

    result = result.concat(this.getMovesInDirection(1, 1, boardData));
    result = result.concat(this.getMovesInDirection(1, -1, boardData));
    result = result.concat(this.getMovesInDirection(-1, 1, boardData));
    result = result.concat(this.getMovesInDirection(-1, -1, boardData));

    return result;
  }

  getKingMoves(boardData) {
    let result = [];
    const Options = [[1, 0], [1, -1], [1, 1], [0, -1], [0, 1], [-1, 0], [-1, 1], [-1, -1]];
    for (let Option of Options) {
      let row = this.row + Option[0];
      let col = this.col + Option[1];
      if (!boardData.isPlayer(row, col, this.player)) {
        result.push([row, col]);
      }
    }
    return result;

  }

  getQueenMoves(boardData) {
    let result = [];
    result = result.concat(this.getMovesInDirection(-1, 0, boardData));
    result = result.concat(this.getMovesInDirection(1, 0, boardData));
    result = result.concat(this.getMovesInDirection(0, -1, boardData));
    result = result.concat(this.getMovesInDirection(0, 1, boardData));
    result = result.concat(this.getMovesInDirection(1, 1, boardData));
    result = result.concat(this.getMovesInDirection(1, -1, boardData));
    result = result.concat(this.getMovesInDirection(-1, 1, boardData));
    result = result.concat(this.getMovesInDirection(-1, -1, boardData));
    return result;
  }

  //get enamy color player
  getOpponent(){
    if (this.player == WHITE_PLAYER){
      return BLACK_PLAYER;
    }
    return WHITE_PLAYER;
    
  }

  //stop possible move after other player
  getMovesInDirection(directionRow, directionCol, boardData) {
    let result = [];

    for (let i = 1; i < BOARD_SIZE; i++) {
      let row = this.row + directionRow * i;
      let col = this.col + directionCol * i;
      if (boardData.isEmpty(row, col) == true) {
        result.push([row, col]);
      } 
      else  {
        result.push([row, col]);
        return result;
      }
    }
    return result;
  }


}

// information on the game
class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
  }

  // Returns piece in row, col, or undefined if not exists.
  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece;
      }
    }

  }

 isEmpty(row, col){
  if (this.getPiece(row, col) !== undefined ){
    return false ;
  }
   else{
     return true ;
   }
 }

 isPlayer(row, col, player) {
  const piece = this.getPiece(row, col);
  if(piece !== undefined && piece.player === player){
    return true;
  }
  else return false;
  
}

  //get piece index in the array
  getindex(row, col) {
    let i = -1 ;
    let index ;
    for (const piece of this.pieces) {
      i++
      if (piece.row === row && piece.col === col) {
        index = i ;
        return index;
      }
    }

  }

  // get team color of piece
  getTeam(row, col) {
    if (this.getPiece(row, col).player == undefined) {
      return undefined;
    }
    if (this.getPiece(row, col).player == WHITE_PLAYER) {
      return WHITE_PLAYER;
    }
    if (this.getPiece(row, col).player == BLACK_PLAYER) {
      return BLACK_PLAYER;
    }
  }

  //move piece
  getMove(row, col, type, player, lastrow, lastcol, lastCell) {

    addImg(table.rows[row].cells[col], player, type);
    lastCell.getElementsByTagName("img")[0].remove();
  }

}

function updatePiecesArray(arr, index ,row, col, type, player){
  arr[index] = new Piece(row, col, type, player);
} 

// creat all pieces for new game
function getInitialpieces() {

  //array of 32 pices
  let result = [];

  //first row
  addFirstRowPieces(result, 0, WHITE_PLAYER);
  addFirstRowPieces(result, 7, BLACK_PLAYER);

  //second row
  for (let i = 0; i < BOARD_SIZE; i++) {
    result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
    result.push(new Piece(6, i, PAWN, BLACK_PLAYER));
  }

  return result;
}

function addFirstRowPieces(result, row, player) {
  result.push(new Piece(row, 0, ROOK, player));
  result.push(new Piece(row, 1, KNIGHT, player));
  result.push(new Piece(row, 2, BISHOP, player));
  result.push(new Piece(row, 3, KING, player));
  result.push(new Piece(row, 4, QUEEN, player));
  result.push(new Piece(row, 5, BISHOP, player));
  result.push(new Piece(row, 6, KNIGHT, player));
  result.push(new Piece(row, 7, ROOK, player));
}

//add image to cell
function addImg(cell, player, name) {
  const img = document.createElement("img")
  img.src = 'img/' + player + '/' + name + '.png';
  cell.appendChild(img);
}

// decoration and move by click
function onCellClick(event, row, col) {
  const piece = boardData.getPiece(row, col);

  // Clear all previous selcted and possible moves
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
      table.rows[i].cells[j].classList.remove('selected');
      table.rows[i].cells[j].classList.remove('enamy');
    }
  }

  //print possible moves for selceted cell
  if (piece !== undefined) {
    let possibleMoves = piece.getPossibleMoves();
    for (let possibleMove of possibleMoves) {
      const cellRow = possibleMove[0];
      const cellCol = possibleMove[1];
      const cell = table.rows[cellRow].cells[cellCol];

      if (boardData.getPiece(cellRow, cellCol) == undefined) {
        cell.classList.add('possible-move');
      }
      //W vs B
      else if (boardData.getTeam(cellRow, cellCol) == WHITE_PLAYER && boardData.getTeam(row, col) == BLACK_PLAYER) {
        cell.classList.add('enamy');
      }
      //B vs W
      else if (boardData.getTeam(cellRow, cellCol) == BLACK_PLAYER && boardData.getTeam(row, col) == WHITE_PLAYER) {
        cell.classList.add('enamy');
      }
    }
  }

  // Show selected cell
  selectedCell = event.currentTarget;
  selectedCell.classList.add('selected');

  // move piece 
  if (counterLastPiece > -1 ) {
    
    if (lastPiece[counterLastPiece] !== undefined && piece == undefined) { 
      boardData.getMove(row, col, lastPiece[counterLastPiece].type, lastPiece[counterLastPiece].player, lastCell[counterLastPiece].row, lastPiece[counterLastPiece].col, lastCell[counterLastPiece] ) ;
      
      updatePiecesArray(boardData.pieces, boardData.getindex(lastPiece[counterLastPiece].row,lastPiece[counterLastPiece].col ),row ,col, lastPiece[counterLastPiece].type, lastPiece[counterLastPiece].player) ;
    }
  }
  
  lastPiece.push(piece);
  lastCell.push(selectedCell)
  counterLastPiece++;

}

//creat the board
function creatCessBoard() {
  table = document.createElement('table');
  document.body.appendChild(table);

  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElemnt = table.insertRow();
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = rowElemnt.insertCell();
      if ((row + col) % 2 === 0) {
        cell.className = 'light-cell';
      } else {
        cell.className = 'dark-cell';
      }
      // every click on cell onCellClick will start
      cell.addEventListener('click', (event) => onCellClick(event, row, col));
      if (lastPiece == undefined) {
        cell.addEventListener('click', (event) => lastSelected(event, row, col));
      }
    }
  }

  //creat array of pieces for new game
  boardData = new BoardData(getInitialpieces());


  //print in the console first board data
  console.log(boardData);

  //add image for every piece
  for (let piece of boardData.pieces) {
    addImg(table.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
}

// by loaded the page the func started
window.addEventListener('load', creatCessBoard);