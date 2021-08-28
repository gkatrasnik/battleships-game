import shipFactory from "./scripts/shipFactory";
import gameBoardFactory from "./scripts/gameBoardFactory";
import playerFactory from "./scripts/playerFactory";

const shipsData = { name: "four", length: 4 };
const player1 = playerFactory("human");
const comp = playerFactory("comp");
const player1Board = gameBoardFactory();
const compBoard = gameBoardFactory();
const ship = shipFactory(shipsData);

compBoard.placeShip(0, 0, ship, "horizontal");
player1.attack(0, 0, compBoard);
player1.attack(1, 0, compBoard);
player1.attack(2, 0, compBoard);
player1.attack(3, 0, compBoard);
player1.attack(9, 9, compBoard);

console.log(compBoard.getGrid());
