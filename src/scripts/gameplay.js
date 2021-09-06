import playerFactory from "./playerFactory";
import gameBoardFactory from "./gameBoardFactory";
import dom from "./dom";
import gameSetup from "./gameSetup";

const gameplay = () => {
  //define DOM elements
  const gameboardsContainer = document.getElementById("gameboards-container");
  const player1Gameboard = document.getElementById("player1-gameboard");
  const compGameboard = document.getElementById("comp-gameboard");
  const scoreBoard = document.getElementById("scoreboard");
  const startGameButton = document.getElementById("start-game-button");
  const playAgainButton = document.getElementById("play-again-button");
  const playAgainButtonDiv = document.getElementById("play-again-button-div");
  const winnerText = document.getElementById("winner");
  const winnerDiv = document.getElementById("winner-div");
  const startGameDiv = document.getElementById("start-game-div");
  const rotateShipDiv = document.getElementById("rotate-ship-div");

  // define players, gameboards
  const player1 = playerFactory("human");
  const comp = playerFactory("comp");
  const player1Board = gameBoardFactory();
  const compBoard = gameBoardFactory();
  const setupGame = gameSetup(player1, player1Board, player1Gameboard);

  let gameOver = false;
  let winner = null;
  let scorePlayer = 0;
  let scoreComp = 0;

  const renderScore = () => {
    scoreBoard.textContent = `${scorePlayer} : ${scoreComp}`;
  };

  const changeGameOver = () => {
    gameOver = !gameOver;
  };

  //main game loop
  const AttackLoop = (event) => {
    const cell = event.target;
    let x = cell.dataset.x;
    let y = cell.dataset.y;

    player1.attack(x, y, compBoard);
    comp.autoAttack(player1Board);

    dom.renderGameBoard(player1Board, player1Gameboard);
    dom.renderGameBoard(compBoard, compGameboard); //neds to be true

    if (compBoard.allShipsSunk()) {
      removeBoardEventListeners();
      winner = player1;
      winnerText.textContent = "Player wins!";
      winnerDiv.style.display = "flex";
      scorePlayer++;
      renderScore();
    } else if (player1Board.allShipsSunk()) {
      removeBoardEventListeners();
      winner = comp;
      winnerText.textContent = "Player wins!";
      winnerDiv.style.display = "flex";
      compScore++;
      renderScore();
    }
  };

  const setup = () => {
    removeBoardEventListeners();
    setupGame.addGameSetupEventListeners(player1Gameboard, player1Board);
    setupGame.setPlayerShips(player1.getShips());

    dom.renderGameBoard(player1Board, player1Gameboard);
    dom.renderGameBoard(compBoard, compGameboard); //needs to be true to be hidden
  };

  const startGame = () => {
    startGameDiv.style.display = "none";
    addBoardEventListeners();
    setupGame.removeSetupEventListeners(player1Gameboard);
    compBoard.autoPlaceAllShips(comp.getShips());
    dom.renderGameBoard(player1Board, player1Gameboard);
    dom.renderGameBoard(compBoard, compGameboard); //needs to be true to be hidden
    renderScore();
  };

  const playAgain = () => {
    player1.resetShips();
    comp.resetShips();
    player1Board.resetBoard();
    compBoard.resetBoard();
    setup();
    winnerDiv.style.display = "none";
    rotateShipDiv.style.display = "flex";
  };

  const addBoardEventListeners = () => {
    compGameboard.addEventListener("click", AttackLoop);
  };

  const removeBoardEventListeners = () => {
    compGameboard.removeEventListener("click", AttackLoop);
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
  startGameButton.addEventListener("click", startGame);
  playAgainButtonDiv.addEventListener("click", playAgain);

  return {
    addBoardEventListeners,
    removeBoardEventListeners,
    changeGameOver,
    setup,
    startGame,
    playAgain,
    getPlayer1,
    getComp,
    getPlayer1Board,
    getCompBoard,
    getDomElements,
  };
};

export default gameplay;
