const dom = (() => {
  const renderCell = (x, y, value, hidden) => {
    let cell = document.createElement("div");

    if (value === null) {
      cell.classList.add("default");
    } else if (value === "miss") {
      cell.classList.add("miss");
    } else {
      //if rendering hidden gameboard(enemy), ships are not shown
      if (hidden) {
        cell.classList.add("default");
      } else {
        cell.classList.add("ship");
        cell.textContent = value.ship.name; //----------------debuging
      }
      if (value.status === "hit") {
        cell.classList.add("hit");
        cell.textContent = value.ship.name; //----------------debuging
      }
      if (value.ship.isSunk()) {
        cell.classList.add("sunk");
        cell.textContent = value.ship.name; //----------------debuging
      }
    }

    cell.classList.add("grid-cell");
    cell.dataset.x = x;
    cell.dataset.y = y;

    return cell;
  };

  const renderGameBoard = (gameboard, parentElement, hidden) => {
    parentElement.innerHTML = "";
    const board = gameboard.getGrid();
    const gridRender = [];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        let cell = renderCell(i, j, board[i][j], hidden);
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
