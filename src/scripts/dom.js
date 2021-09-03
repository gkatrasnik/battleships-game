const dom = (() => {
  const renderCell = (x, y, grid, value, hidden) => {
    let cell = document.createElement("div");
    
    
    //if rendering hidden gameboard(enemy), ships are not shown    
    if (typeof grid[y][x] === "object" && grid[y][x] !== null){
      if (hidden){
        cell.classList.add("default");
      }else {
        cell.classList.add("ship");
      }
      
    }    
    else if (value === "x") {
    cell.classList.add("hit");
      

    } else if (value === "o") {
      cell.classList.add("miss");
    } else {
      cell.classList.add("default");
    }

    cell.classList.add("grid-cell")
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
        let cell = renderCell(j, i,  board, board[i][j], hidden);
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
