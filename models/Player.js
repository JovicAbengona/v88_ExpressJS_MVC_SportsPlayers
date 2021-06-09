const db = require("../config");

module.exports = {
    getPlayers: () => {
        return db.execute(`SELECT CONCAT(p.first_name, ' ', p.last_name) AS 'player_name', p.gender, p.image, s.name AS 'sport'
                                FROM sports.players AS p
                                JOIN sports.details AS d ON p.id = d.player_id
                                JOIN sports.sports_details AS s ON d.sports_detail_id = s.id`);
    }
}