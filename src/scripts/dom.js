const dom = (() => {
  const renderCell = (x, y, gameboard, value) => {
    let cell = document.createElement("div");
    if (typeof gameboard[y][x] === "object" && gameboard[y][x] !== null) {
      cell.textContent = `${value.ship.name}`;
    } else if (value === "x") {
      cell.textContent = "x";
    } else if (value === "o") {
      cell.textContent = "o";
    } else {
      cell.textContent = "";
    }

    cell.className = "grid-cell";
    cell.dataset.x = x;
    cell.dataset.y = y;

    return cell;
  };

  const renderGameBoard = (gameboard, parentElement) => {
    parentElement.innerHTML = "";
    const board = gameboard.getGrid();
    const gridRender = [];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        let cell = renderCell(j, i, board, board[i][j]);
        gridRender.push(cell);
      }
    }

    for (let i = 0; i < gridRender.length; i++) {
      parentElement.appendChild(gridRender[i]);
    }
  };

  return { renderGameBoard };
})();

export default dom;
