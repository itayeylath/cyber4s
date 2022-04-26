
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
const PIECES = [ROOK, KNIGHT, BISHOP, KING, QUEEN, BISHOP, KNIGHT, ROOK];

//no-Constant variables
let selectedCell;
let boardData;
let table;
let lastPiece = [];
let lastCell = [];
let counterLastPiece = -1;
let turn = 1;

function updatePiecesArray(arr, index, row, col, type, player) {
  arr[index] = new Piece(row, col, type, player);
}

function ClearBoard() {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove('possible-move', 'selected', 'enamy');
    }
  }
}

// creat all pieces for new game
function getInitialpieces() {
  let result = [];

  for (let i = 0; i < BOARD_SIZE; i++) {
    result.push(new Piece(0, i, PIECES[i], WHITE_PLAYER));
    result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
    result.push(new Piece(6, i, PAWN, BLACK_PLAYER));
    result.push(new Piece(7, i, PIECES[i], BLACK_PLAYER));
  }
  return result;
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
  selectedCell = event.currentTarget;
  let counterMove = 0;

  //print possible moves for selceted cell
  if (counterLastPiece > -1) {
    if (table.rows[row].cells[col].classList[1] == "possible-move") {
      // move piece 
      if (lastPiece[counterLastPiece] !== undefined && piece == undefined) { }
      boardData.getMove(row, col, lastPiece[counterLastPiece].type, lastPiece[counterLastPiece].player, lastCell[counterLastPiece].row, lastPiece[counterLastPiece].col, lastCell[counterLastPiece]);
      updatePiecesArray(boardData.pieces, boardData.getindex(lastPiece[counterLastPiece].row, lastPiece[counterLastPiece].col), row, col, lastPiece[counterLastPiece].type, lastPiece[counterLastPiece].player);
      counterMove++;
    }

    // eat piece
    else if (table.rows[row].cells[col].classList[1] == "enamy") {
      boardData.getremove(row, col);
      boardData.getMove(row, col, lastPiece[counterLastPiece].type, lastPiece[counterLastPiece].player, lastCell[counterLastPiece].row, lastPiece[counterLastPiece].col, lastCell[counterLastPiece]);
      updatePiecesArray(boardData.pieces, boardData.getindex(lastPiece[counterLastPiece].row, lastPiece[counterLastPiece].col), row, col, lastPiece[counterLastPiece].type, lastPiece[counterLastPiece].player);
      counterMove++;
    }
    // Clear all previous selected and possible moves
    ClearBoard();
  }
  if (piece !== undefined && counterMove === 0) {
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
  selectedCell.classList.add('selected');

  lastPiece.push(piece);
  lastCell.push(selectedCell)
  counterLastPiece++;
  turn++

}

//creat the board
function creatChessBoard() {
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

  //print in the console first board data
  console.log(boardData);

  //add image for every piece
  for (let piece of boardData.pieces) {
    addImg(table.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
}

// by loaded the page the func started
window.addEventListener('load', creatChessBoard);