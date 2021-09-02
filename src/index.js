import gameplay from "./scripts/gameplay";
import dom from "./scripts/dom";
import "./styles/styles.css";

const gameboardsContainer = document.getElementById("gameboards-container");
const player1Gameboard = document.getElementById("player-gameboard");
const compGameboard = document.getElementById("comp-gameboard");
const scoreBoard = document.getElementById("scoreboard");

const game = gameplay();
const player1 = game.getPlayer1();
const comp = game.getComp();
const player1Board = game.getPlayer1Board();
const compBoard = game.getCompBoard();

dom.renderGameBoard(player1Board, player1Gameboard);
dom.renderGameBoard(compBoard, compGameboard);
