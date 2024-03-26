var mongoose = require('mongoose');
var schemaSalle = new mongoose.Schema({
    Capacite : Number,
    Equipements: {
        type: [String]
     },
});
var Salle = new mongoose.model('Salle', schemaSalle);
module.exports = Salle;