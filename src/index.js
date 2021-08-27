import shipsData from "./scripts/shipsData";
import shipFactory from "./scripts/shipFactory";
import gameBoardFactory from "./scripts/gameBoardFactory";

//ship data
const ship = { name: "four1", length: 4 };
const newShip = { name: "four", length: 4 };
const newShip2 = { name: "three", length: 3 };
const newShip3 = { name: "three1", length: 3 };

const board = gameBoardFactory();
const grid = board.getGrid();

board.placeShip(5, 5, newShip, "horizontal", grid); //board is rotated 90 clockwise
board.placeShip(9, 9, ship, "vertical", grid); //board is rotated 90 clockwise
board.placeShip(0, 0, newShip2, "horizontal", grid); //board is rotated 90 clockwise
board.placeShip(0, 0, newShip3, "vertical", grid); //board is rotated 90 clockwise
board.recieveAttack(0, 0, grid);

console.log(board.getGrid());
