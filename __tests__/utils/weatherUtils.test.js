const { Cuisines, Dishes } = require("../../utils/data");
const {
  generateRandomMenuItem,
  generateMenu,
  selectRandomCuisine,
} = require("../../utils/restaurantUtils");

//All Restaurant Function Tests
describe("Restaurant Functions", () => {
  //Test for Generate Random Item Function
  describe("generateRandomMenuItem", () => {
    test("Expect function to return a dish name from specified cuisine", () => {
      const randomCuisine = selectRandomCuisine();
      const result = generateRandomMenuItem(randomCuisine);
      //Create array of dishes in selected cuisine
      const dishArray = Dishes[randomCuisine];

      //Confirm that name of result dish is within dish names of the cuisine
      const dishNames = dishArray.map((dish) => dish.name);
      expect(dishNames).toContain(result.name);
    });
  });

  //Tests for Generate Menu Function
  describe("generateMenu", () => {
    test("Returns between 5 and 10 menu items", () => {
      const result = generateMenu(selectRandomCuisine());

      //Check that length of menu is between 5-10
      expect(result.length).toBeGreaterThanOrEqual(5);
      expect(result.length).toBeLessThanOrEqual(10);
    });
  });

  //Tests for Random Cuisine Function
  describe("selectRandomCuisine", () => {
    test("Ensure random cuisine is one from data array", () => {
      const result = selectRandomCuisine();

      //Confirm result is in Cuisines array
      expect(Cuisines).toContain(result);
    });
  });
});
