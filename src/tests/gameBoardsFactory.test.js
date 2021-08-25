import gameBoardFactory from "../scripts/gameBoardFactory";

describe("create gameboards for player1 and player2", () => {
  const gameboard = gameBoardFactory();
  const grid = gameboard.getGrid();
  const newShip = { name: "four", length: 4 };

  test("factory returns 10 rows", () => {
    expect(grid.length).toBe(10);
  });

  test("factory returns 10 cols", () => {
    expect(grid[0].length).toBe(10);
  });

  test("random field is null on start", () => {
    expect(grid[8][7]).toBe(null);
  });

  test("place horizontal ship four to 0,0 ", () => {
    gameboard.placeShip(0, 0, newShip);
    expect(grid[0][0]).toBe("ship");
    expect(grid[1][0]).toBe("ship");
    expect(grid[2][0]).toBe("ship");
    expect(grid[3][0]).toBe("ship");
  });

  test("place horizontal ship four to 0,0 ", () => {
    gameboard.placeShip(0, 0, newShip, "vertical");
    expect(grid[0][0]).toBe("ship");
    expect(grid[0][1]).toBe("ship");
    expect(grid[0][2]).toBe("ship");
    expect(grid[0][3]).toBe("ship");
  });

  test("horizontal ship four placed over the board is placed to the edges  ", () => {
    gameboard.placeShip(9, 9, newShip);
    expect(grid[5][9]).toBe(null);
    expect(grid[6][9]).toBe("ship");
    expect(grid[7][9]).toBe("ship");
    expect(grid[8][9]).toBe("ship");
    expect(grid[9][9]).toBe("ship");
  });

  test("vertical ship four placed over the board is placed to the edges  ", () => {
    gameboard.placeShip(9, 9, newShip, "vertical");
    expect(grid[9][5]).toBe(null);
    expect(grid[9][6]).toBe("ship");
    expect(grid[9][7]).toBe("ship");
    expect(grid[9][8]).toBe("ship");
    expect(grid[9][9]).toBe("ship");
  });
});
