const shipFactory = (shipData) => {
  const name = shipData.name;
  const length = shipData.length;

  const lifes = new Array(length).fill(null);

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
    hit,
    isSunk,
  };
};

export default shipFactory;
