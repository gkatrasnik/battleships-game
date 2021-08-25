import shipFactory from "./shipFactory";
import shipsData from "./shipsData";

const gameBoardFactory = () => {
  //create 2d array
  let grid = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  const getGrid = () => {
    return grid;
  };

  //console view is rotated 90 clockwise
  //direction is hirozntal by default, add "vertical" arg to rotate

  const placeShip = (x, y, shipData, direction) => {
    let ship = shipFactory(shipData);
    if (direction === "vertical") {
      ship.changeDirection();
    }
    if (ship.getDirection() === "horizontal") {
      // if ship doesnt fit the board, place it to the edge
      if (x > 10 - ship.length) {
        x = 10 - ship.length;
      }
      //if ship is placed outside the board, place it to the edge
      if (y > 9) {
        y = 9;
      }
      for (let i = 0; i < ship.length; i++) {
        grid[x + i][y] = ship.lifes[i];
      }
    } else if (ship.getDirection() === "vertical") {
      // if ship doesnt fit the board, place it to the edge
      if (y > 10 - ship.length) {
        y = 10 - ship.length;
      }
      //if ship is placed outside the board, place it to the edge
      if (x > 9) {
        x = 9;
      }
      for (let i = 0; i < ship.length; i++) {
        grid[x][y + i] = ship.lifes[i];
      }
    }
  };

  return { getGrid, placeShip };
};

export default gameBoardFactory;
