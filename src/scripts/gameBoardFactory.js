import { randomNumber } from "./helpers";
import gameplay from "./gameplay";

const gameBoardFactory = () => {
  //create 2d array
  let grid = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  const getGrid = () => {
    return grid;
  };

  const resetBoard = () => {
    grid = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
  }

  const autoPlaceShip = (ship) => {
    const x = randomNumber(0, 9);
    const y = randomNumber(0, 9);
    const direction = Math.round(Math.random());

    if (direction > 0.5) {
      ship.changeDirection();
    }

    const place = placeShip(x, y, ship, ship.getDirection());
    console.log(ship.getDirection());
    if (!place) {
      autoPlaceShip(ship);
    }
  };

  const autoPlaceAllShips = (arrayOfShips) => {
    for (let i = 0; i < arrayOfShips.length; i++) {
      autoPlaceShip(arrayOfShips[i]);
    }
  };

  //console view is rotated 90 clockwise
  //direction is horizontal by default, add "vertical" arg to rotate
  const placeShip = (x, y, ship, direction) => {
    //rotate ship to vertical if "verical" in args
    if (direction === "vertical") {
      ship.changeDirection();
    }

    if (isPlaceEmpty(x, y, ship)) {
      if (ship.getDirection() === "horizontal") {
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
      } else if (ship.getDirection() === "vertical") {
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
      }
      return true;
    } else {
      console.log(
        `cant place - ${ship.name} -  on ${x},${y},${ship.getDirection()}`
      );
      return false;
    }
  };

  //private func, check if there is ship already
  const isPlaceEmpty = (x, y, ship) => {
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

  //if there is ship, send hit(index) and mark spot x, else just mark it o
  const recieveAttack = (x, y) => {
    if (grid[y][x] === null) {
      grid[y][x] = "o";
    } else if (typeof grid[y][x] === "object" && grid[y][x] !== null) {
      grid[y][x].ship.hit(grid[y][x].i);
      grid[y][x] = "x";
      //check if all ships are sunk/ still floating
      if (allShipsSunk()) {
        console.log("all ships are sunk");
        gameplay().changeGameOver();
      } else {
        console.log("still floating");
      }
    }
  };

  //returns false if there are any ships still not sunk
  const allShipsSunk = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
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
    getGrid,
    resetBoard,
    placeShip,
    isPlaceEmpty,
    recieveAttack,
    allShipsSunk,
    autoPlaceShip,
    autoPlaceAllShips,
  };
};

export default gameBoardFactory;
