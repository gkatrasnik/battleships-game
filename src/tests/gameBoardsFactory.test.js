import gameBoardFactory from "../scripts/gameBoardFactory";

describe("create gameboards for player1 and player2", () => {
  const gameboard = gameBoardFactory();
  const grid = gameboard.getGrid();

  test("factory returns 10 rows", () => {
    expect(grid.length).toBe(10);
  });

  test("factory returns 10 cols", () => {
    expect(grid[0].length).toBe(10);
  });

  test("random field is null on start", () => {
    expect(grid[8][7]).toBe(null);
  });
});
