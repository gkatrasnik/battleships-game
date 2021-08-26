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

  const hit = (slot) => {
    lifes[slot] = "hit";
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

export default shipFactory;
