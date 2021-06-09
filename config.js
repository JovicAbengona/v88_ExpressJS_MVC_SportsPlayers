// Database Configuration
const MySQL = require("mysql2");
const Config = require("./config.json");
const Connection = MySQL.createConnection({
    "host": Config.localhost,
    "user": Config.user,
    "password": Config.password,
    "database": Config.database,
    "port": Config.port
});

module.exports = Connection.promise();