const { Cuisines, Dishes } = require("../../utils/data");
const {
  generateRandomMenuItem,
  generateMenu,
  selectRandomCuisine,
} = require("../../utils/restaurantUtils");

describe("Restaurant Functions", () => {
  describe("generateRandomMenuItem", () => {
    // Test implementations go here
  });

  describe("generateMenu", () => {
    // Test implementations go here
  });

  describe("selectRandomCuisine", () => {
    test("Ensure random cuisine is one from data array", () => {
      const result = selectRandomCuisine();

      expect(Cuisines).toContain(result);
    });
  });
});
