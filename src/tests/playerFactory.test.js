import playerFactory from "../scripts/playerFactory";
import gameBoardFactory from "../scripts/gameBoardFactory";
import shipFactory from "../scripts/shipFactory";

describe("both players can attack enemy board and have same ships", () => {
  const shipsData = [{ name: "four", length: 4 }];
  const shipData = { name: "four", length: 4 };

  const player1 = playerFactory("human");
  const comp = playerFactory("comp");
  const player1Board = gameBoardFactory();
  const compBoard = gameBoardFactory();
  const ship = shipFactory(shipData);

  test("player type is human", () => {
    expect(player1.getType()).toBe("human");
  });

  test("both players has same ships", () => {
    const array1 = player1.getShips();
    const array2 = comp.getShips();
    let result = JSON.stringify(array1) === JSON.stringify(array2);
    expect(result).toBe(true);
  });

  test("player can attack comp", () => {
    compBoard.placeShip(0, 0, ship, "horizontal");
    player1.attack(0, 0, compBoard);
    player1.attack(1, 0, compBoard);
    player1.attack(2, 0, compBoard);
    player1.attack(3, 0, compBoard);
    player1.attack(9, 9, compBoard);
    expect(compBoard.getGrid()[0][0]).toBe("x");
    expect(compBoard.getGrid()[1][0]).toBe("x");
    expect(compBoard.getGrid()[2][0]).toBe("x");
    expect(compBoard.getGrid()[3][0]).toBe("x");
    expect(compBoard.getGrid()[4][0]).toBe(null);
    expect(compBoard.getGrid()[9][9]).toBe("o");
  });
});
