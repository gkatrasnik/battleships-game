/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _playerFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _gameBoardFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _gameSetup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);





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
  const player1 = (0,_playerFactory__WEBPACK_IMPORTED_MODULE_0__.default)("human");
  const comp = (0,_playerFactory__WEBPACK_IMPORTED_MODULE_0__.default)("comp");
  const player1Board = (0,_gameBoardFactory__WEBPACK_IMPORTED_MODULE_1__.default)();
  const compBoard = (0,_gameBoardFactory__WEBPACK_IMPORTED_MODULE_1__.default)();
  const setupGame = (0,_gameSetup__WEBPACK_IMPORTED_MODULE_3__.default)(player1, player1Board, player1Gameboard);

  let winner = null;
  let scorePlayer = 0;
  let scoreComp = 0;

  const renderScore = () => {
    scoreBoard.textContent = `${scorePlayer} : ${scoreComp}`;
  };

  //main game loop --attack enemy, enemy attack back. check if all ships are sunk
  const AttackLoop = (event) => {
    const cell = event.target;
    let x = cell.dataset.x;
    let y = cell.dataset.y;

    player1.attack(x, y, compBoard);
    comp.autoAttack(player1Board);

    _dom__WEBPACK_IMPORTED_MODULE_2__.default.renderGameBoard(player1Board, player1Gameboard);
    _dom__WEBPACK_IMPORTED_MODULE_2__.default.renderGameBoard(compBoard, compGameboard, true); //neds to be true

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
    setupGame.addGameSetupEventListeners(player1Gameboard);
    setupGame.setPlayerShips(player1.getShips());
    _dom__WEBPACK_IMPORTED_MODULE_2__.default.renderGameBoard(player1Board, player1Gameboard);
    _dom__WEBPACK_IMPORTED_MODULE_2__.default.renderGameBoard(compBoard, compGameboard, true); //needs to be true to be hidden
  };

  const startGame = () => {
    startGameDiv.style.display = "none";
    addBoardEventListeners();
    setupGame.removeSetupEventListeners(player1Gameboard);
    compBoard.autoPlaceAllShips(comp.getShips());
    _dom__WEBPACK_IMPORTED_MODULE_2__.default.renderGameBoard(player1Board, player1Gameboard);
    _dom__WEBPACK_IMPORTED_MODULE_2__.default.renderGameBoard(compBoard, compGameboard, true); //needs to be true to be hidden
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

  //set event listeners
  addBoardEventListeners();
  startGameButton.addEventListener("click", startGame);
  playAgainButtonDiv.addEventListener("click", playAgain);

  return {
    addBoardEventListeners,
    removeBoardEventListeners,
    setup,
    startGame,
    playAgain,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameplay);


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shipsData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);




const playerFactory = (type) => {
  let ships = createShipsArray(_shipsData__WEBPACK_IMPORTED_MODULE_0__.shipsData);
  let attackedPositions = [];

  //create array of ship obejcts with ship factory
  function createShipsArray(data) {
    let shipsArr = [];
    for (let i = 0; i < data.length; i++) {
      shipsArr.push((0,_shipFactory__WEBPACK_IMPORTED_MODULE_1__.default)(data[i]));
    }
    return shipsArr;
  }

  const getShips = () => {
    return ships;
  };

  const resetShips = () => {
    ships = createShipsArray(_shipsData__WEBPACK_IMPORTED_MODULE_0__.shipsData);
    attackedPositions = [];
  };

  const attack = (x, y, enemyBoard) => {
    let coordinates = [x, y];

    if (
      JSON.stringify(attackedPositions).includes(JSON.stringify(coordinates))
    ) {
      alert("You already attacked these coordinates");
    } else {
      enemyBoard.recieveAttack(x, y);
      attackedPositions.push(coordinates);
    }
  };

  const autoAttack = (enemyBoard) => {
    let x = (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.randomNumber)(0, 9);
    let y = (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.randomNumber)(0, 9);
    let coordinates = [x, y];

    //if coordinates were already attacked, run autoattack again
    if (
      JSON.stringify(attackedPositions).includes(JSON.stringify(coordinates))
    ) {
      autoAttack(enemyBoard);
    } else {
      enemyBoard.recieveAttack(x, y);
      attackedPositions.push(coordinates);
    }
  };

  return {
    getShips,
    resetShips,
    attack,
    autoAttack,
    createShipsArray,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (playerFactory);


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shipsData": () => (/* binding */ shipsData)
/* harmony export */ });
const shipsData = [
  { name: "four", length: 4 },
  { name: "three1", length: 3 },
  { name: "three2", length: 3 },
  { name: "two1", length: 2 },
  { name: "two2", length: 2 },
  { name: "two3", length: 2 },
];




/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const shipFactory = (shipData) => {
  const name = shipData.name;
  const length = shipData.length;
  let direction = "horizontal";
  const lifes = new Array(length).fill(name);

  const getDirection = () => {
    return direction;
  };

  const changeDirection = () => {
    if (direction === "horizontal") {
      direction = "vertical";
    } else if (direction === "vertical") {
      direction = "horizontal";
    }
  };

  const hit = (index) => {
    lifes[index] = "hit";
  };

  const isSunk = () => {
    return lifes.every((life) => life === "hit");
  };

  return {
    name,
    length,
    lifes,
    direction,
    getDirection,
    changeDirection,
    hit,
    isSunk,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shipFactory);


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randomNumber": () => (/* binding */ randomNumber)
/* harmony export */ });
const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};




/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

const gameBoardFactory = () => {
  //create 2d array
  let grid = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  const getGrid = () => {
    return grid;
  };

  const autoPlaceShip = (ship) => {
    const x = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.randomNumber)(0, 9);
    const y = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.randomNumber)(0, 9);
    const direction = Math.round(Math.random());

    if (direction > 0.5) {
      ship.changeDirection();
    }

    let shipDirection = ship.getDirection();
    const place = placeShip(x, y, ship, shipDirection);
    if (place !== true) {
      autoPlaceShip(ship);
    }
  };

  const autoPlaceAllShips = (arrayOfShips) => {
    for (let i = 0; i < arrayOfShips.length; i++) {
      autoPlaceShip(arrayOfShips[i]);
    }
  };

  //dom view is rotated 90 degres
  //direction is horizontal by default, add "vertical" arg to rotate
  const placeShip = (x, y, ship, direction) => {
    //rotate ship to vertical if "verical" in args
    if (isPlaceEmpty(x, y, ship, direction) === true) {
      if (direction === "horizontal") {
        //if ship is placed outside the board, place it to the edge
        if (x > 10 - ship.length) {
          x = 10 - ship.length;
        }
        if (y > 9) {
          y = 9;
        }
        //place ship to x,y from args
        for (let i = 0; i < ship.length; i++) {
          grid[x + i][y] = { ship, i, status: null };
        }
      } else if (direction === "vertical") {
        //if ship is placed outside the board, place it to the edge
        if (y > 10 - ship.length) {
          y = 10 - ship.length;
        }
        if (x > 9) {
          x = 9;
        }
        //place ship to x,y from args
        for (let i = 0; i < ship.length; i++) {
          grid[x][y + i] = { ship, i, status: null };
        }
      }

      return true;
    } else {
      return false;
    }
  };

  //check if all slots are empty -> return true, if there is ship return false
  const isPlaceEmpty = (x, y, ship, direction) => {
    let coordinates = [];
    if (direction === "horizontal") {
      // if ship doesnt fit the board, place it to the edge
      if (x > 10 - ship.length) {
        x = 10 - ship.length;
      }
      //if ship is placed outside the board, place it to the edge
      if (y > 9) {
        y = 9;
      }
      for (let i = 0; i < ship.length; i++) {
        coordinates.push(grid[x + i][y]);
      }

      //check every ship coordinate is null
      if (coordinates.every((x) => x === null)) {
        return true;
      }
    } else if (direction === "vertical") {
      // if ship doesnt fit the board, place it to the edge
      if (y > 10 - ship.length) {
        y = 10 - ship.length;
      }
      //if ship is placed outside the board, place it to the edge
      if (x > 9) {
        x = 9;
      }
      for (let i = 0; i < ship.length; i++) {
        coordinates.push(grid[x][y + i]);
      }
      if (coordinates.every((x) => x === null)) {
        return true;
      }
    }
    //.
    return false;
  };

  //if there is ship, send hit(index) and mark spot hit, else just mark it miss
  const recieveAttack = (x, y) => {
    if (grid[x][y] === null) {
      grid[x][y] = "miss";
    } else if (typeof grid[x][y] === "object" && grid[x][y] !== null) {
      grid[x][y].ship.hit(grid[x][y].i);
      grid[x][y].status = "hit";
    }
  };

  //returns false if there are any ships still not sunk
  const allShipsSunk = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (typeof grid[i][j] === "object" && grid[i][j] !== null) {
          if (grid[i][j].ship.isSunk() === false) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const resetBoard = () => {
    grid = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
  };

  return {
    getGrid,
    resetBoard,
    placeShip,
    isPlaceEmpty,
    recieveAttack,
    allShipsSunk,
    autoPlaceShip,
    autoPlaceAllShips,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameBoardFactory);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const dom = (() => {
  const renderCell = (x, y, value, hidden) => {
    let cell = document.createElement("div");

    if (value === null) {
      cell.classList.add("default");
    } else if (value === "miss") {
      cell.classList.add("miss");
    } else {
      //if rendering hidden gameboard(enemy), ships are not shown
      if (hidden) {
        cell.classList.add("default");
      } else {
        cell.classList.add("ship");
      }
      if (value.status === "hit") {
        cell.classList.add("hit");
      }
      if (value.ship.isSunk()) {
        cell.classList.add("sunk");
      }
    }

    cell.classList.add("grid-cell");
    cell.dataset.x = x;
    cell.dataset.y = y;

    return cell;
  };

  const renderGameBoard = (gameboard, parentElement, hidden) => {
    parentElement.innerHTML = "";
    const board = gameboard.getGrid();
    const gridRender = [];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        let cell = renderCell(i, j, board[i][j], hidden);
        gridRender.push(cell);
      }
    }

    for (let i = 0; i < gridRender.length; i++) {
      parentElement.appendChild(gridRender[i]);
    }
  };

  return { renderGameBoard };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


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
    _dom__WEBPACK_IMPORTED_MODULE_0__.default.renderGameBoard(gameboard, parentElement);

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameSetup);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__.default, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__.default && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__.default.locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__.default.locals : undefined);


/***/ }),
/* 10 */
/***/ ((module) => {



var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 11 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute("media", media);
  } else {
    style.removeAttribute("media");
  }

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, style);
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


function domAPI(options) {
  var style = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(style, options, obj);
    },
    remove: function remove() {
      removeStyleElement(style);
    }
  };
}

module.exports = domAPI;

/***/ }),
/* 12 */
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),
/* 13 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(style) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    style.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 14 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var style = document.createElement("style");
  options.setAttributes(style, options.attributes);
  options.insert(style);
  return style;
}

module.exports = insertStyleElement;

/***/ }),
/* 15 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, style) {
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),
/* 16 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#root {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  font-family: \"Roboto\", sans-serif;\r\n}\r\n\r\n#title {\r\n  margin-bottom: 2vh;\r\n  margin-top: 0;\r\n}\r\n\r\n.popup {\r\n  display: none;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background-color: white;\r\n  border: 2px solid black;\r\n  position: absolute;\r\n  top: 20vh;\r\n  margin-left: auto;\r\n  width: 350px;\r\n  height: 200px;\r\n  text-align: center;\r\n}\r\n\r\n#rotate-ship-div {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background-color: white;\r\n  border: 2px solid black;\r\n  position: absolute;\r\n  top: 50px;\r\n  margin-left: auto;\r\n  width: 150px;\r\n  height: 90px;\r\n  text-align: center;\r\n}\r\n\r\n#gameboards-container {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.gameboard-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin: 1em;\r\n  align-items: center;\r\n  margin-top: 0;\r\n}\r\n\r\n#player1-gameboard {\r\n  cursor: pointer;\r\n  width: 440px;\r\n  height: 440px;\r\n  border: 3px solid blue;\r\n}\r\n\r\n#comp-gameboard {\r\n  cursor: crosshair;\r\n  width: 440px;\r\n  height: 440px;\r\n  border: 3px solid red;\r\n}\r\n#titles {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}\r\n\r\n.player-name {\r\n  margin-top: 0;\r\n  margin-bottom: 0.5em;\r\n}\r\n\r\n.control-button {\r\n  cursor: pointer;\r\n  background-color: white;\r\n  color: black;\r\n  border: 2px solid #555555;\r\n  font-size: 1.1em;\r\n}\r\n\r\n.control-button:hover {\r\n  background-color: #555555;\r\n  color: white;\r\n}\r\n\r\n.grid-cell {\r\n  width: 40px;\r\n  height: 40px;\r\n  border: 2px solid white;\r\n\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n}\r\n\r\n.ship {\r\n  background-color: steelblue;\r\n}\r\n\r\n.default {\r\n  background-color: lightgrey;\r\n}\r\n\r\n.hit {\r\n  background-color: lightcoral;\r\n}\r\n\r\n.sunk {\r\n  background-color: red;\r\n  border: 2px solid darkred;\r\n}\r\n\r\n.miss {\r\n  background-color: grey;\r\n}\r\n\r\n.preview {\r\n  background-color: lightsteelblue;\r\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 17 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_gameplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);



const game = (0,_scripts_gameplay__WEBPACK_IMPORTED_MODULE_0__.default)();
game.setup();

})();

/******/ })()
;