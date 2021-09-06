import { randomNumber } from "./helpers";
const gameBoardFactory = () => {
  //create 2d array
  let grid = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  const getGrid = () => {
    return grid;
  };

  const autoPlaceShip = (ship) => {
    const x = randomNumber(0, 9);
    const y = randomNumber(0, 9);
    const direction = Math.round(Math.random());

    if (direction > 0.5) {
      ship.changeDirection();
    }

    let shipDirection = ship.getDirection();
    const place = placeShip(x, y, ship, shipDirection);
    if (place !== true) {
      autoPlaceShip(ship);
    }
  };

  const autoPlaceAllShips = (arrayOfShips) => {
    for (let i = 0; i < arrayOfShips.length; i++) {
      autoPlaceShip(arrayOfShips[i]);
    }
  };

  //dom view is rotated 90 degres
  //direction is horizontal by default, add "vertical" arg to rotate
  const placeShip = (x, y, ship, direction) => {
    //rotate ship to vertical if "verical" in args
    if (isPlaceEmpty(x, y, ship, direction) === true) {
      if (direction === "horizontal") {
        //if ship is placed outside the board, place it to the edge
        if (x > 10 - ship.length) {
          x = 10 - ship.length;
        }
        if (y > 9) {
          y = 9;
        }
        //place ship to x,y from args
        for (let i = 0; i < ship.length; i++) {
          grid[x + i][y] = { ship, i, status: null };
        }
      } else if (direction === "vertical") {
        //if ship is placed outside the board, place it to the edge
        if (y > 10 - ship.length) {
          y = 10 - ship.length;
        }
        if (x > 9) {
          x = 9;
        }
        //place ship to x,y from args
        for (let i = 0; i < ship.length; i++) {
          grid[x][y + i] = { ship, i, status: null };
        }
      }

      return true;
    } else {
      return false;
    }
  };

  //check if all slots are empty -> return true, if there is ship return false
  const isPlaceEmpty = (x, y, ship, direction) => {
    let coordinates = [];
    if (direction === "horizontal") {
      // if ship doesnt fit the board, place it to the edge
      if (x > 10 - ship.length) {
        x = 10 - ship.length;
      }
      //if ship is placed outside the board, place it to the edge
      if (y > 9) {
        y = 9;
      }
      for (let i = 0; i < ship.length; i++) {
        coordinates.push(grid[x + i][y]);
      }

      //check every ship coordinate is null
      if (coordinates.every((x) => x === null)) {
        return true;
      }
    } else if (direction === "vertical") {
      // if ship doesnt fit the board, place it to the edge
      if (y > 10 - ship.length) {
        y = 10 - ship.length;
      }
      //if ship is placed outside the board, place it to the edge
      if (x > 9) {
        x = 9;
      }
      for (let i = 0; i < ship.length; i++) {
        coordinates.push(grid[x][y + i]);
      }
      if (coordinates.every((x) => x === null)) {
        return true;
      }
    }
    //.
    return false;
  };

  //if there is ship, send hit(index) and mark spot hit, else just mark it miss
  const recieveAttack = (x, y) => {
    if (grid[x][y] === null) {
      grid[x][y] = "miss";
    } else if (typeof grid[x][y] === "object" && grid[x][y] !== null) {
      grid[x][y].ship.hit(grid[x][y].i);
      grid[x][y].status = "hit";
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

  const resetBoard = () => {
    grid = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
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
