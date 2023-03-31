function gameBoard() {
  const positions = 9;
  const board = [];

  for (let i = 0; i < positions; i++) {
    board.push(cell());
  }

  const getBoard = () => board;

  const changeValue = (position, player) => {
    const selectedPositionValue = board[position].getValue();
    if (selectedPositionValue != 0) return;
    board[position].addToken(player);
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((cell) => cell.getValue());
    console.log(boardWithCellValues);
  };

  return {
    getBoard,
    changeValue,
    printBoard,
  };
}

function cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

game = gameBoard();
