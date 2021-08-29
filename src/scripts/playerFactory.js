import { shipsData } from "./shipsData";
import shipFactory from "./shipFactory";

const playerFactory = (type = "human") => {
  let ships = createShipsArray(shipsData);

  //create array of ship obejcts with ship factory
  function createShipsArray(data) {
    let shipsArr = [];
    for (let i = 0; i < data.length; i++) {
      shipsArr.push(shipFactory(data[i]));
    }
    return shipsArr;
  }

  const getShips = () => {
    return ships;
  };

  const getType = () => {
    return type;
  };

  const changeHasTurn = () => {
    hasTurn = !hasTurn;
  };

  const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const attack = (x, y, enemyBoard) => {
    enemyBoard.recieveAttack(x, y);
  };

  const autoAttack = (enemyBoard) => {
    const grid = enemyBoard.getGrid();
    let x = randomNumber(0, 9);
    let y = randomNumber(0, 9);

    if (grid[x][y] === "x") {
      console.log(`ship attacked already (${x},${y})`);
      autoAttack(enemyBoard);
    } else if (grid[x][y] === "o") {
      console.log(`empty spot attacked already (${x},${y})`);
      autoAttack(enemyBoard);
    } else if (grid[x][y] === null) {
      console.log(`miss (${x},${y})`);
      enemyBoard.recieveAttack(x, y);
    } else {
      console.log(`hit (${x},${y})`);
      enemyBoard.recieveAttack(x, y);
    }
  };

  return {
    getShips,
    getType,
    attack,
    autoAttack,
    changeHasTurn,
    createShipsArray,
  };
};

export default playerFactory;
