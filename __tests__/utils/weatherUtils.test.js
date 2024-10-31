const { Cuisines, Dishes } = require("../../utils/data");
const {
  generateRandomMenuItem,
  generateMenu,
  selectRandomCuisine,
} = require("../../utils/restaurantUtils");

describe("Restaurant Functions", () => {
  describe("generateRandomMenuItem", () => {
    test("Expect function to return dish from specified cuisine", () => {});
  });

  describe("generateMenu", () => {
    test("Returns between 5 and 10 menu items", () => {});
  });

  describe("selectRandomCuisine", () => {
    test("Ensure random cuisine is one from data array", () => {
      const result = selectRandomCuisine();

      expect(Cuisines).toContain(result);
    });
  });
});
