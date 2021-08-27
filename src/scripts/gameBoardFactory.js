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
          grid[x + i][y] = { ship, i };
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
          grid[x][y + i] = { ship, i };
        }
      }
    } else {
      console.log(
        `cant place - ${ship.name} -  on ${x},${y},${ship.getDirection()}`
      );
    }

    return { ship };
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

  //if there is ship, send hit(index) nd mark spot x, else just mark it x
  const recieveAttack = (x, y, grid) => {
    let board = grid;
    if (board[x][y] === null) {
      board[x][y] = "o";
    } else if (typeof board[x][y] === "object" && board[x][y] !== null) {
      board[x][y].ship.hit(board[x][y].i);
      //check if all ships are sunk/ still floating
      allShipsSunk()
        ? console.log("all ships are sunk")
        : console.log("still floating");
    }
  };

  //returns true if there is any ships still not sunk
  const allShipsSunk = () => {
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid.length; j++) {
        if (typeof grid[i][j] === "object" && grid[i][j] !== null) {
          if (grid[i][j].ship.isSunk() === false) {
            return false;
          }
        }
      }
    }
    return true;
  };

  return {
    grid,
    getGrid,
    placeShip,
    isPlaceEmpty,
    recieveAttack,
    allShipsSunk,
  };
};

export default gameBoardFactory;
