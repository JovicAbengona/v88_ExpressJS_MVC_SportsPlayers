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
        let filters = {
            "genders": [],
            "sports": []
        };
        let players = [];
        let player_name = request.body.player_name.toLowerCase();
        
        if(request.body.female != undefined)
			filters.genders.push(request.body.female);
		if(request.body.male != undefined)
            filters.genders.push(request.body.male);
		if(request.body.basketball != undefined)
			filters.sports.push(request.body.basketball);
        if(request.body.volleyball != undefined)
			filters.sports.push(request.body.volleyball);
        if(request.body.baseball != undefined)
			filters.sports.push(request.body.baseball);
        if(request.body.soccer != undefined)
			filters.sports.push(request.body.soccer);
        if(request.body.football != undefined)
			filters.sports.push(request.body.football);

        request.session.players.forEach(player => {
            if(player.player_name.toLowerCase().includes(player_name)){
                if(filters.genders.length != 0 && filters.sports.length == 0){
                    filters.genders.forEach(gender => {
                        if(player.gender == gender)
                            players.push(player);
                    });
                }
                else if(filters.sports.length != 0 && filters.genders.length == 0){
                    filters.sports.forEach(sport => {
                        if(player.sport == sport)
                            players.push(player);
                    });
                }
                else if(filters.genders.length != 0 && filters.sports.length != 0){
                    filters.genders.forEach(gender => {
                        filters.sports.forEach(sport => {
                            if(player.gender == gender && player.sport == sport)
                                players.push(player);
                        })
                    });
                }
                else
                    players.push(player);
            }
        });

        response.render("templates/players", { players: players });
    }
}