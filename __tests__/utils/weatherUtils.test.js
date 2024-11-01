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
    test("Each menu item should have valid properties", () => {
      const result = generateMenu(selectRandomCuisine());

      result.forEach((item) => {
        //Check for name
        expect(item).toHaveProperty("name");
        expect(typeof item.name).toBe("string");
        expect(item.name.length).toBeGreaterThan(0);

        //Check for description
        expect(item).toHaveProperty("description");
        expect(typeof item.description).toBe("string");
        expect(item.description.length).toBeGreaterThan(0);

        //Check for price
        expect(item).toHaveProperty("price");
        expect(typeof item.price).toBe("string");

        // Check if price can be parsed to a float
        expect(!isNaN(parseFloat(item.price))).toBe(true);

        //Check for special property
        expect(item).toHaveProperty("special");
        expect(typeof item.special).toBe("boolean");
      });
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
