function gameBoard() {
  const positions = 9;
  const board = [];

  for (let i = 0; i < positions; i++) {
    board.push(cell());
  }

  const getBoard = () => board;

  return {
    getBoard,
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
