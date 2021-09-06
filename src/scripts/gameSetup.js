import dom from "./dom";
import gameplay from "./gameplay";

const gameSetup = (player, board, parentElement) => {
  const startGameDiv = document.getElementById("start-game-div");
  const rotateShipDiv = document.getElementById("rotate-ship-div");
  const rotateShipButton = document.getElementById("rotate-ship-button");

  let grid = board; //dont really need that
  let ships = player.getShips();
  let placedShips = [];
  let currentShip = ships[0];
  let currentShipIndex = 0;

  const setPlayerShips = (shipsArr) => {
    ships = shipsArr;
    setCurrentShip(ships[0]);
  };

  const setCurrentShip = (ship) => {
    currentShip = ship;
  };

  const getCurentShip = () => {
    return currentShip;
  };

  const setGrid = (gameboard) => {
    //dont really need that
    grid = gameboard.getGrid();
  };

  //doesnt work
  const previewShip = (event) => {
    const cell = event.target;
    let x = cell.dataset.x;
    let y = cell.dataset.y;
    cell.classList.add("preview");

    // cell.classList.add("preview");
  };

  const removePreviewShip = (event) => {
    const cell = event.target;
    let x = cell.dataset.x;
    let y = cell.dataset.y;
    cell.classList.remove("preview");
  };

  const placeShip = (event) => {
    console.log(currentShip);
    const cell = event.target;
    let x = parseInt(cell.dataset.x);
    let y = parseInt(cell.dataset.y);
    let placeShip = board.placeShip(
      x,
      y,
      currentShip,
      currentShip.getDirection()
    );
    dom.renderGameBoard(board, parentElement);
    if (placeShip) {
      placedShips.push(currentShip);
      currentShipIndex++;
      setCurrentShip(ships[currentShipIndex]);
    }

    //if all ships are placed
    if (JSON.stringify(placedShips) === JSON.stringify(ships)) {
      rotateShipDiv.style.display = "none";
      startGameDiv.style.display = "flex";
      resetSetup();
    }
  };

  const resetSetup = () => {
    setCurrentShip(null);
    currentShipIndex = 0;
    placedShips = [];
  };

  const addGameSetupEventListeners = (grid, board) => {
    grid.addEventListener("mouseover", previewShip);
    grid.addEventListener("mouseout", removePreviewShip);
    grid.addEventListener("click", (e) => {
      placeShip(e, board);
    });
  };

  const removeSetupEventListeners = (grid) => {
    grid.removeEventListener("mouseover", previewShip);
    grid.removeEventListener("mouseout", removePreviewShip);
    grid.removeEventListener("click", placeShip);
  };

  rotateShipButton.addEventListener("click", () => {
    currentShip.changeDirection();
  });

  return {
    setGrid,
    setPlayerShips,
    setCurrentShip,
    getCurentShip,
    addGameSetupEventListeners,
    removeSetupEventListeners,
    previewShip,
    removePreviewShip,
    placeShip,
  };
};

export default gameSetup;
