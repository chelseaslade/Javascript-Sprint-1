const { Restaurants, Cuisines } = require("./utils/data");
const express = require("express");
const path = require("path");
const {
  generateRandomMenuItem,
  generateMenu,
  selectRandomCuisine,
} = require("./utils/restaurantUtils");

const app = express();
let restaurantData = {}; //This should be populated soon

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

/**
 * GET /
 * Renders the homepage that lists cities and restaurant names.
 */
app.get("/", (request, response) => {
  response.render("index", { restaurants: Restaurants });
});

/**
 * GET /restaurant/:name
 * Displays a specific restaurant's random menu.
 * The cuisine is randomly selected and a menu is generated based on it.
 */
app.get("/restaurant", (request, response) => {
  const restaurantId = request.query.restaurantId;
  console.log(`restaurantId: ${restaurantId}`);

  const randomCuisine = selectRandomCuisine();
  console.log(`Random Cuisine: ${randomCuisine}`);

  const randomMenu = generateMenu(randomCuisine);

  //Display page
  response.render("restaurantmenu", {
    restaurantId,
    randomCuisine,
    randomMenu,
  });
});

//Add any other required routes here
//Menu Alerts
app.get("/menualerts", (request, response) => {
  const randomItem = generateRandomMenuItem("italian");
  console.log(`Random Menu Item: ${randomItem.name}`);

  //Display page
  response.render("menualerts", { randomItem });
});

app.get("/restaurantmenu", (request, response) => {
  //Display Page
  response.render("restaurantmenu");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
