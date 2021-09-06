import dom from "./dom";

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

  const setGrid = (gameboard) => {
    //dont really need that
    grid = gameboard.getGrid();
  };

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
    cells.forEach((cell) => {
      cell.classList.toggle("preview");
    });
  };

  //place ship on click
  const placeShip = (event) => {
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

  const addGameSetupEventListeners = (gridElement) => {
    gridElement.addEventListener("mouseover", previewShip);
    gridElement.addEventListener("mouseout", removePreviewShip);
    gridElement.addEventListener("click", (e) => {
      placeShip(e);
      removePreviewShip(e);
    });
  };

  const removeSetupEventListeners = (gridElement) => {
    gridElement.removeEventListener("mouseover", previewShip);
    gridElement.removeEventListener("mouseout", removePreviewShip);
    gridElement.removeEventListener("click", placeShip);
  };

  rotateShipButton.addEventListener("click", () => {
    currentShip.changeDirection();
  });

  return {
    setGrid,
    setPlayerShips,
    setCurrentShip,
    addGameSetupEventListeners,
    removeSetupEventListeners,
    previewShip,
    removePreviewShip,
    placeShip,
  };
};

export default gameSetup;
