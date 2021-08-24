import shipFactory from "./scripts/shipFactory";
const shipData = { name: "four", length: 4 };
const newShip = shipFactory(shipData);
console.log(newShip);
