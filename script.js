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
    return boardWithCellValues;
  };

  const getField = (index) => {
    return board[index].getValue();
  };

  const reset = () => {
    for (let i = 0; i < positions; i++) {
      board[i].addToken(0);
    }
  };

  return {
    getBoard,
    changeValue,
    printBoard,
    getField,
    reset,
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
  let count = 1;
  let isOver = false;
  const display = document.querySelector(".display");

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
    const boardArray = board.printBoard();
    const displayText = `${getActivePlayer().name}'s turn.`;
    return { displayText, boardArray };
  };

  const playRound = (position) => {
    if (isOver === true) return;
    board.changeValue(position, getActivePlayer().token);
    if (checkWinner()) {
      display.textContent = "You Win!";
      isOver = true;
      return;
    }
    if (count === 9) {
      display.textContent = "It's a draw.";
      isOver = true;
      return;
    }
    count++;
    switchPlayerTurn();
  };

  const resetGameController = () => {
    count = 1;
    isOver = false;
    activePlayer = players[0];
  };

  const checkWinner = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions.some((possibleCombination) =>
      possibleCombination.every(
        (index) => board.getField(index) === getActivePlayer().token
      )
    );
  };

  return {
    playRound,
    printNewRound,
    board,
    resetGameController,
  };
}

function UIController() {
  const game = gameController();
  const display = document.querySelector(".display");
  const blocks = document.querySelectorAll(".block");
  const reset = document.querySelector(".reset");

  const updateDisplay = () => {
    const boardArray = game.printNewRound().boardArray;
    blocks.forEach((div) => {
      let blockId = div.id;
      div.textContent = boardArray[blockId];
      if (div.textContent == 0) {
        div.textContent = "";
      }
    });
    if (
      display.textContent === "You Win!" ||
      display.textContent === "It's a draw."
    )
      return;
    display.textContent = game.printNewRound().displayText;
  };

  blocks.forEach((div) => {
    div.addEventListener("click", () => {
      let divId = div.id;
      game.playRound(divId);
      updateDisplay();
    });
  });

  reset.addEventListener("click", () => {
    game.board.reset();
    game.resetGameController();
    display.textContent = "";
    updateDisplay();
  });

  updateDisplay();
}

UIController();
