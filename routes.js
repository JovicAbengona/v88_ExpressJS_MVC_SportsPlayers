const Express = require("express");
const Router = Express.Router();
const bodyParser = require("body-parser");
const Player = require("./controllers/Players");

Router.use(bodyParser.urlencoded({ extended: true }));

Router.get("/", Player.index);
Router.get("/get_players", Player.getPlayers);
Router.post("/search_players", Player.searchPlayers);

module.exports = Router;