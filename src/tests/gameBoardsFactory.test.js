import gameBoardFactory from "../scripts/gameBoardFactory";
import shipFactory from "../scripts/shipFactory";

describe("create gameboards for player1 and player2", () => {
  const gameboard = gameBoardFactory();
  const grid = gameboard.getGrid();
  const shipData = { name: "four", length: 4 };

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
    const ship = shipFactory(shipData);
    gameboard.placeShip(0, 0, ship, "horizontal", grid);
    expect(grid[0][0].ship.name).toBe("four");
    expect(grid[1][0].ship.name).toBe("four");
    expect(grid[2][0].ship.name).toBe("four");
    expect(grid[3][0].ship.name).toBe("four");
  });

  test("horizontal ship four placed over the board is placed to the edges  ", () => {
    const ship = shipFactory(shipData);
    gameboard.placeShip(9, 9, ship, "horizontal", grid);
    expect(grid[5][9]).toBe(null);
    expect(grid[6][9].ship.name).toBe("four");
    expect(grid[7][9].ship.name).toBe("four");
    expect(grid[8][9].ship.name).toBe("four");
    expect(grid[9][9].ship.name).toBe("four");
  });

  test("isPositionOk returns false if there is already a ship on position  ", () => {
    const ship = shipFactory(shipData);

    gameboard.placeShip(0, 0, ship, "horizontal", grid);

    const newShip2 = shipFactory({ name: "four2", length: 4 });
    expect(gameboard.isPlaceEmpty(0, 0, newShip2, grid)).toBe(false);
  });

  test("recieveAttack changes x,y field to o", () => {
    gameboard.recieveAttack(5, 5, grid);
    expect(grid[5][5]).toBe("o");
  });
});
