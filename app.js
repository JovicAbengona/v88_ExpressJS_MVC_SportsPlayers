const Express = require("express");
const App = Express();
const Routes = require("./routes");
const ErrController = require("./controllers/Errors");
const Session = require("express-session");

App.use(Express.static(__dirname + "/assets"));
App.set('views', __dirname + '/views'); 
App.set('view engine', 'ejs');
App.use(Session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
}));

//Use Routes
App.use(Routes);

// Errors
App.use(ErrController.get404); // not found
App.use(ErrController.get500); // server error

App.listen(8080, function(){
    console.log("Listening on 8080");
});