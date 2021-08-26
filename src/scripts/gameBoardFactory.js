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
  //direction is horizontal by default, add "vertical" arg to rotate
  const placeShip = (x, y, shipData, direction, grid) => {
    let ship = shipFactory(shipData);
    let board = grid;

    //rotate ship to vertical if "verical" in args
    if (direction === "vertical") {
      ship.changeDirection();
    }

    if (isPlaceEmpty(x, y, ship, board)) {
      if (ship.getDirection() === "horizontal") {
        //if ship is placed outside the board, place it to the edge
        if (x > 10 - ship.length) {
          x = 10 - ship.length;
        }
        if (y > 9) {
          y = 9;
        }
        //place ship to x,y from args
        for (let i = 0; i < ship.length; i++) {
          grid[x + i][y] = ship.lifes[i];
        }
      } else if (ship.getDirection() === "vertical") {
        //if ship is placed outside the board, place it to the edge
        if (y > 10 - ship.length) {
          y = 10 - ship.length;
        }
        if (x > 9) {
          x = 9;
        }
        //place ship to x,y from args
        for (let i = 0; i < ship.length; i++) {
          grid[x][y + i] = ship.lifes[i];
        }
      }
    } else {
      console.log(`cant place - ${ship.name} -  on this position`);
    }
  };

  //private func, check if there is ship already
  const isPlaceEmpty = (x, y, ship, grid) => {
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
        if (grid[x + i][y] != null) {
          return false;
        }
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
        if (grid[x][y + i] != null) {
          return false;
        }
      }
    }
    return true;
  };

  return { grid, getGrid, placeShip, isPlaceEmpty };
};

export default gameBoardFactory;
