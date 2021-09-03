import gameplay from "./scripts/gameplay";
import dom from "./scripts/dom";
import { shipsData } from "./scripts/shipsData";
import "./styles/styles.css";
import shipFactory from "./scripts/shipFactory";

const game = gameplay();
const compBoard = game.getCompBoard();

game.startGame();

console.log(compBoard.getGrid());
