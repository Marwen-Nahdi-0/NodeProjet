var mongoose = require('mongoose');
var schemaSalle = new mongoose.Schema({
    NameSalle:String,
    Capacite : Number,
    Equipements:String,
    IsAvailable : Boolean,
    Location:String,
    StartTime:Number,
    EndTime : Number,
    Price:Number,
});
var Salle = new mongoose.model('Salle', schemaSalle);
module.exports = Salle;