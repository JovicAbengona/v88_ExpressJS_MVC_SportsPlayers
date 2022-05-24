const Player = require("../models/Player");

module.exports = {
    index: (request, response) => {
        response.render("index");
    },
    getPlayers: async (request, response) => {
        if(request.session.players == undefined){
            const getPlayers = await Player.getPlayers();
            request.session.players = getPlayers[0];
        }

        response.render("templates/players", { players: request.session.players });
    },
    searchPlayers: (request, response) => {
        let players = [];
        let player_name = request.body.player_name.toLowerCase();

        request.session.players.forEach(player => {
            if(player.player_name.toLowerCase().includes(player_name)){
                if('gender' in request.body && !('sport' in request.body)){
                    if(request.body.gender.includes(player.gender))
                        players.push(player);
                }
                else if('sport' in request.body && !('gender' in request.body)){
                    if(request.body.sport.includes(player.sport))
                        players.push(player);
                }
                else if('gender' in request.body && 'sport' in request.body){
                    if(request.body.gender.includes(player.gender) && request.body.sport.includes(player.sport))
                        players.push(player);
                }
                else{
                    players.push(player);
                }
            }
        });

        response.render("templates/players", { players: players });
    }
}