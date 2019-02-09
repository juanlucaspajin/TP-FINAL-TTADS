var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    nombre: {type: String, required: true},
    direccion: {type: String, required: true}
});

module.exports = mongoose.model('Restaurant', restaurantSchema);