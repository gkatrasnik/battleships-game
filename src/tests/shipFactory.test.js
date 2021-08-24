import shipFactory from "../scripts/shipFactory";

describe("ship factory make ships objects", () => {
  describe("ship properties", () => {
    const shipData = { name: "four", length: 4 };
    const newShip = shipFactory(shipData);

    test("ship name is shipData.name", () => {
      expect(newShip.name).toBe("four");
    });

    test("ship length is shipData.length", () => {
      expect(newShip.length).toBe(4);
    });

    test("how many lifes does ship have", () => {
      expect(newShip.lifes.length).toBe(4);
    });

    test("all ship lifes are null", () => {
      expect(newShip.lifes).toEqual([null, null, null, null]);
    });

    test("hit ship(2) turns index 2 to hit)", () => {
      newShip.hit(2);
      expect(newShip.lifes).toEqual([null, null, "hit", null]);
    });

    test("is not sunk on start", () => {
      expect(newShip.isSunk()).toBe(false);
    });

    test("ship is sunk if all lifes are hit", () => {
      newShip.hit(0);
      newShip.hit(1);
      newShip.hit(2);
      newShip.hit(3);
      expect(newShip.isSunk()).toBe(true);
    });

    test("ship is horizontal on start", () => {
      expect(newShip.getDirection()).toBe("horizontal");
    });

    test("ship is vertical after changing direction", () => {
      newShip.changeDirection();
      expect(newShip.getDirection()).toBe("vertical");
    });
  });
});
