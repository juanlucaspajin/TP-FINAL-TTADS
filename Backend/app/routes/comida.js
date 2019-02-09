var mongoose = require('mongoose');
var router=require('express').Router();
var Comida = mongoose.model('Comida');

var ObjectId = mongoose.Types.ObjectId;


router.get('/', (req, res, next) => {
  Comida.find({})
    .then(comida =>{
        if(!comida){ return res.sendStatus(401); }
        return res.json({'comidas': comida})
    })
    .catch(next);
});



router.get('/:id', (req, res, next) => {

  let id = req.params.id
  Comida.findById(id)
    .then(comida =>{
        if(!comida){ return res.sendStatus(401); }
        return res.json({'comida': comida})
    })
    .catch(next);
});


router.get('/nombre/:nombre', (req, res, next) => {

  let nombre = req.params.nombre
  Comida.find({nombre:nombre})
    .then(comida =>{
        if(!comida){ return res.sendStatus(401); }
        return res.json({'comida': comida})
    })
    .catch(next);
});

//get by id restaurant
router.get('/:id_restaurant', (req, res, next) => {
    let restaurant = req.params.id_restaurant;
    Comida.find({restaurantPrepara:restaurant})
        .then(comida => {
            if(!comida){ return res.sendStatus(401); }
            return res.json({'comida': comida})
        })
        .catch(next);
});



router.post('/', (req, res, next) => {
  let nombre=req.body.nombre;
  let ingredientes = req.body.ingredientes;
  let restaurant = req.body.restaurant;

  var comida = new Comida({
          nombre: nombre,
          ingredientes: ingredientes,
          restaurantPrepara: restaurant
      });

      comida.save((err, comida) => {
          if (err) {
              res.status(500).send(err);
          }
          res.status(200).send("Nueva comida agregada \n" + comida);
      });
});


//modificar un equipo por ID
router.put('/:id', (req, res, next) =>{
  let id = req.params.id;

  Comida.findById(id, function(err, comida) {

    comida.nombre=req.body.nombre;
    comida.ingredientes = req.body.ingredientes;
    comida.restaurantPrepara = req.body.restaurant;

        comida.save((err, comida) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send("comida modificada \n" +comida);
        });
    });
});

//eliminar un equipo por ID
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    COmida.findByIdAndRemove(id, (err, comida)=>{
      if(err){
          res.status(500).send(err);
      }
      else{
              res.status(200).send("comida eliminada");
      }
  });
});



module.exports=router;