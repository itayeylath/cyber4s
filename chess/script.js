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

//basic piece information
class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }

  //possible move of every piece
  getPossibleMoves() {

    //array of relative moves for the piece
    let relativeMoves = [];

    if (this.type === PAWN) {
      relativeMoves = this.getPawnRelativeMoves();
    }
    else if (this.type === ROOK) {
      relativeMoves = this.getRookRelativeMoves();
    }
    else if (this.type === KNIGHT) {
      relativeMoves = this.getKnightRelativeMoves();
    }
    else if (this.type === BISHOP) {
      relativeMoves = this.getBishopRelativeMoves();
    }
    else if (this.type === KING) {
      relativeMoves = this.getKingRelativeMoves();
    }
    else if (this.type === QUEEN) {
      relativeMoves = this.getQueenRelativeMoves();
    }
    //bug check
    else {
      console.log("Unknown type", type)
    }

    // array of absolut moves for the player from his position
    let absoluteMoves = [];

    for (let relativeMove of relativeMoves) {
      const absoluteRow = this.row + relativeMove[0];
      const absoluteCol = this.col + relativeMove[1];
      absoluteMoves.push([absoluteRow, absoluteCol]);
    }

    // array of filtered moves according to his position and border size
    let filteredMoves = [];

    for (let absoluteMove of absoluteMoves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
        filteredMoves.push(absoluteMove);
      }
    }
    return filteredMoves;
  }

  //function for every piece specific move
  getPawnRelativeMoves() {
    if (this.player == WHITE_PLAYER) {
      if (this.row == 1) {
        return [[2, 0], [1, 0]];
      }
      else {
        return [[1, 0]];
      }
    }
    else if (this.row == 6) {
      return [[-2, 0], [-1, 0]];
    }
    else {
      return [[-1, 0]];
    }
  }

  getRookRelativeMoves() {
    let result = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
    }
    return result;
  }

  getKnightRelativeMoves() {
    return [[2, 1], [2, -1], [-2, 1], [-2, -1]];
  }

  getBishopRelativeMoves() {
    let result = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, i]);
      result.push([i, -i]);
      result.push([-i, -i]);
      result.push([-i, i]);
    }
    return result;
  }

  getKingRelativeMoves() {
    let result = [];
    result.push([1, 0], [1, -1], [1, 1], [0, -1], [0, 1], [-1, 0], [-1, 1], [-1, -1]);
    return result;
  }

  getQueenRelativeMoves() {
    let result = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, i]);
      result.push([i, -i]);
      result.push([-i, -i]);
      result.push([-i, i]);
    }
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
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

// decoration by click
function onCellClick(event, row, col) {
  const piece = boardData.getPiece(row, col);
  //print piece in the console
  console.log(piece)
  // console.log(boardData.getTeam(row, col))

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
    }
  }

  //creat array of pieces for new game
  boardData = new BoardData(getInitialpieces());

  //print in the console board data
  console.log(boardData);

  //add image for every piece
  for (let piece of boardData.pieces) {
    addImg(table.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
}

// by loaded the page the func started
window.addEventListener('load', creatCessBoard);

