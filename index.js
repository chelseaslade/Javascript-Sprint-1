const { Restaurants, Cuisines } = require("./utils/data");
const express = require("express");
const path = require("path");
const {
  generateRandomMenuItem,
  generateMenu,
  selectRandomCuisine,
} = require("./utils/restaurantUtils");

const app = express();
let restaurantData = [];

//Generate random menu for each restaurant automatically and store in restaurantData array
Restaurants.forEach((restaurant) => {
  const randomCuisine = selectRandomCuisine();
  const restaurantMenu = generateMenu(randomCuisine);
  restaurantData.push({
    id: restaurant.id,
    name: restaurant.name,
    cuisine: randomCuisine,
    menu: restaurantMenu,
  });
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

/**
 * GET /
 * Renders the homepage that lists cities and restaurant names.
 */
app.get("/", (request, response) => {
  //Random restaurant from restaurantData list
  const randomRestaurant =
    restaurantData[Math.floor(Math.random() * restaurantData.length)];

  //Chooses a random cuisine from the list generated for the restaurant menus
  const randomCuisine = randomRestaurant.cuisine;

  const randomItem = generateRandomMenuItem(randomCuisine);

  response.render("index", {
    restaurants: Restaurants,
    randomItem,
    randomCuisine,
  });
});

/**
 * GET /restaurant/:name
 * Displays a specific restaurant's random menu.
 * The cuisine is randomly selected and a menu is generated based on it.
 */
app.get("/restaurant", (request, response) => {
  const restaurantId = request.query.restaurantId;
  console.log(`restaurantId: ${restaurantId}`);

  const restaurant = restaurantData.find((r) => r.id === restaurantId);

  //Display page if restaurant found
  if (restaurant) {
    //Filter for specials
    const specials = restaurant.menu.filter((item) => item.special);

    response.render("restaurantmenu", {
      restaurantId: restaurant.name,
      randomCuisine: restaurant.cuisine,
      randomMenu: restaurant.menu,
      specials,
    });
  } else {
    //Error if restaurant not found
    response.status(404).send("Restaurant not found");
  }
});

//Add any other required routes here
//Menu Alerts
app.get("/menualerts", (request, response) => {
  //Display page
  response.render("menualerts", { Restaurants });
});

app.get("/restaurantmenu", (request, response) => {
  //Display Page
  response.render("restaurantmenu");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
