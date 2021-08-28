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

  const attack = (x, y, enemyBoard) => {
    enemyBoard.recieveAttack(x, y);
  };

  const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const autoAttack = (enemyBoard) => {
    let x = randomNumber(0, 9);
    let y = randomNumber(0, 9);

    enemyBoard.recieveAttack(x, y);
  };

  return { getShips, getType, attack, changeHasTurn, createShipsArray };
};

export default playerFactory;
