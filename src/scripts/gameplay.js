import playerFactory from "./playerFactory";
import gameBoardFactory from "./gameBoardFactory";

const gameplay = () => {
  const player1 = playerFactory("human");
  const comp = playerFactory("comp");
  const player1Board = gameBoardFactory();
  const compBoard = gameBoardFactory();

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

  const startGame = () => {};

  const playAgain = () => {};

  const attackCell = () => {};

  return {
    startGame,
    playAgain,
    attackCell,
    getPlayer1,
    getComp,
    getPlayer1Board,
    getCompBoard,
  };
};

export default gameplay;
