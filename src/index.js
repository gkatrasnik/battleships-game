import shipFactory from "./scripts/shipFactory";
import gameBoardFactory from "./scripts/gameBoardFactory";

const shipData = { name: "four", length: 4 };
const newShip = shipFactory(shipData);
console.log(newShip);

const board = gameBoardFactory();
console.log(board.getGrid());
