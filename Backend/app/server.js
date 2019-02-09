var express        = require('express');
var mongoose    = require('mongoose');
var bodyParser     = require('body-parser');
var cors           = require('cors');
var methodOverride = require('method-override');

var app            = express();

const port = 3000;


// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(cors());


// Connection to DB
mongoose.connect('mongodb://localhost/tp2',{useMongoClient: true });
require('./models/restaurant');
require('./models/comida');

app.use(require('./routes'));

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Funciona!");
});
app.use(router);




// Start server
app.listen(port, function() {
  console.log("Node server running on http://localhost:3000");
});
