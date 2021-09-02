import playerFactory from "./playerFactory";
import gameBoardFactory from "./gameBoardFactory";
import dom from "./dom";

const gameplay = () => {
  //define DOM elements
  const gameboardsContainer = document.getElementById("gameboards-container");
  const player1Gameboard = document.getElementById("player1-gameboard");
  const compGameboard = document.getElementById("comp-gameboard");
  const scoreBoard = document.getElementById("scoreboard");

  // define players, gameboards
  const player1 = playerFactory("human");
  const comp = playerFactory("comp");
  const player1Board = gameBoardFactory();
  const compBoard = gameBoardFactory();

  let gameOver = false;

  const changeGameOver = () => {
    gameOver = !gameOver;
  };

  const AttackLoop = (event) => {
    const cell = event.target;
    let x = cell.dataset.x;
    let y = cell.dataset.y;

    player1.attack(x, y, compBoard);
    comp.autoAttack(player1Board);

    dom.renderGameBoard(player1Board, player1Gameboard);
    dom.renderGameBoard(compBoard, compGameboard);

    if (compBoard.allShipsSunk() || player1Board.allShipsSunk()) {
      removeBoardEventListeners();
      console.log("gameover");
    }
  };

  const startGame = () => {
    compBoard.autoPlaceAllShips(comp.getShips());
    player1Board.autoPlaceAllShips(player1.getShips());
  };

  const addBoardEventListeners = () => {
    compGameboard.addEventListener("click", AttackLoop);
  };

  const removeBoardEventListeners = () => {
    compGameboard.removeEventListener("click", AttackLoop);
    console.log("eventlisteners removed");
  };

  //getters
  const getDomElements = () => {
    return { gameboardsContainer, player1Gameboard, compGameboard, scoreBoard };
  };

  const getPlayer1 = () => {
    return player1;
  };

  const getComp = () => {
    return comp;
  };
  const getPlayer1Board = () => {
    return player1Board;
  };
  const getCompBoard = () => {
    return compBoard;
  };

  //set event listeners
  addBoardEventListeners();

  return {
    addBoardEventListeners,
    removeBoardEventListeners,
    changeGameOver,
    startGame,
    getPlayer1,
    getComp,
    getPlayer1Board,
    getCompBoard,
    getDomElements,
  };
};

export default gameplay;
