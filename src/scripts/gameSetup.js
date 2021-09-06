import dom from "./dom";
import gameplay from "./gameplay";

const gameSetup = (player, gameboard, parentElement) => {
  const startGameDiv = document.getElementById("start-game-div");
  const rotateShipDiv = document.getElementById("rotate-ship-div");
  const rotateShipButton = document.getElementById("rotate-ship-button");

  const grid = gameboard.getGrid();
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
    const direction = currentShip.getDirection();
    let cells = [];
    const cell = event.target;
    let x = parseInt(cell.dataset.x);
    let y = parseInt(cell.dataset.y);
    for (let i = 0; i < currentShip.length; i++) {
      let xa = null;
      let ya = null;
      if (direction === "horizontal") {
        xa = x + i;
        ya = y;
      } else if (direction === "vertical") {
        xa = x;
        ya = y + i;
      }
      let spot = document.querySelector(`[data-x="${xa}"][data-y="${ya}"]`);

      cells.push(spot);
    }

    cells.forEach((cell) => cell.classList.add("preview"));
  };

  const removePreviewShip = (event) => {
    const direction = currentShip.getDirection();
    let cells = [];
    const cell = event.target;
    let x = parseInt(cell.dataset.x);
    let y = parseInt(cell.dataset.y);

    for (let i = 0; i < currentShip.length; i++) {
      let xa = null;
      let ya = null;
      if (direction === "horizontal") {
        xa = x + i;
        ya = y;
      } else if (direction === "vertical") {
        xa = x;
        ya = y + i;
      }

      let spot = document.querySelector(`[data-x="${xa}"][data-y="${ya}"]`);
      cells.push(spot);
    }
    cells.forEach((cell) => cell.classList.remove("preview"));
  };

  const placeShip = (event) => {
    console.log(currentShip);
    const cell = event.target;
    let x = parseInt(cell.dataset.x);
    let y = parseInt(cell.dataset.y);
    let placeShip = gameboard.placeShip(
      x,
      y,
      currentShip,
      currentShip.getDirection()
    );
    dom.renderGameBoard(gameboard, parentElement);
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

  const addGameSetupEventListeners = (grid, gameboard) => {
    grid.addEventListener("mouseover", previewShip);
    grid.addEventListener("mouseout", removePreviewShip);
    grid.addEventListener("click", (e) => {
      placeShip(e, gameboard);
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
