import shipsData from "./scripts/shipsData";
import shipFactory from "./scripts/shipFactory";
import gameBoardFactory from "./scripts/gameBoardFactory";

const newShip = { name: "four", length: 4 };

const board = gameBoardFactory();
board.placeShip(1, 1, newShip, "vertical"); //board is rotated 90 clockwise

console.log(board.getGrid());
