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

function gameController(playerXName = "Player X", playerOName = "Player O") {
  const board = gameBoard();

  const players = [
    {
      name: playerXName,
      token: "X",
    },
    {
      name: playerOName,
      token: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (position) => {
    console.log(
      `Changing position ${position} to ${getActivePlayer().name}'s position`
    );
    board.changeValue(position, getActivePlayer().token);
    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = gameController();
