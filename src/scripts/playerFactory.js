import { shipsData } from "./shipsData";
import shipFactory from "./shipFactory";
import { randomNumber } from "./helpers";

const playerFactory = (type) => {
  let ships = createShipsArray(shipsData);
  let attackedPositions = [];

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

  const resetShips = () => {
    ships = createShipsArray(shipsData)
  }

  const attack = (x, y, enemyBoard) => {
    let coordinates = [x, y];

    if (
      JSON.stringify(attackedPositions).includes(JSON.stringify(coordinates))
    ) {
      alert("You already attacked these coordinates");
    } else {
      enemyBoard.recieveAttack(x, y);
      attackedPositions.push(coordinates);
    }
  };

  const autoAttack = (enemyBoard) => {
    let x = randomNumber(0, 9);
    let y = randomNumber(0, 9);
    let coordinates = [x, y];

    //if coordinates were already attacked, run autoattack again
    if (
      JSON.stringify(attackedPositions).includes(JSON.stringify(coordinates))
    ) {
      autoAttack(enemyBoard);
    } else {
      enemyBoard.recieveAttack(x, y);
      attackedPositions.push(coordinates);
    }
  };

  return {
    getShips,
    resetShips,
    attack,
    autoAttack,
    createShipsArray,
  };
};

export default playerFactory;
