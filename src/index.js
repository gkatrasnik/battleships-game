import gameplay from "./scripts/gameplay";
import dom from "./scripts/dom";
import { shipsData } from "./scripts/shipsData";
import "./styles/styles.css";
import shipFactory from "./scripts/shipFactory";

const game = gameplay();

const domElements = game.getDomElements();
const player1 = game.getPlayer1();
const comp = game.getComp();
const player1Board = game.getPlayer1Board();
const compBoard = game.getCompBoard();

game.setup();

console.log(compBoard.getGrid());
