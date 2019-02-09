var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comidaSchema = new Schema({
    nombre: {type: String, required: true},
    ingredientes: [{type: String, required: true}],
    restaurantPrepara: {type: Schema.Types.ObjectId, ref: 'Restaurant', required: true}
});

module.exports = mongoose.model('Comida', comidaSchema);