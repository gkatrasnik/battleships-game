const dom = (() => {
  const renderCell = (x, y, value) => {
    let cell = document.createElement("div");
    cell.textContent = `${x}, ${y}, ${value}`;
    cell.className = "grid-cell";
    cell.dataset.x = x;
    cell.dataset.y = y;
    cell.dataset.value = value;
    return cell;
  };

  const renderGameBoard = (gameboard, parentElement) => {
    const board = gameboard.getGrid();
    const gridRender = [];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        gridRender.push(renderCell(i, j, board[i][j]));
      }
    }

    for (let i = 0; i < gridRender.length; i++) {
      parentElement.appendChild(gridRender[i]);
    }
  };

  return { renderGameBoard };
})();

export default dom;
