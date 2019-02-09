var mongoose = require('mongoose');
var router=require('express').Router();
var Restaurant = mongoose.model('Restaurant');

var ObjectId = mongoose.Types.ObjectId;

//obtener todos los restaurantes
router.get('/', (req, res, next) => {
    Restaurant.find({})
      .then(restaurant =>{
          if(!restaurant){ return res.sendStatus(401); }
          return res.json({'restaurantes': restaurant})
      })
      .catch(next);
  });
  
  
  //obtener un restaurant por ID
  router.get('/:id', (req, res, next) => {
  
    let id = req.params.id
    Restaurant.findById(id)
      .then(restaurant =>{
          if(!restaurant){ return res.sendStatus(401); }
          return res.json({'restaurant': restaurant})
      })
      .catch(next);
  });
  
  //obtener un equipo por nombre
  router.get('/nombre/:nombre', (req, res, next) => {
  
    let nombre = req.params.nombre
    Restaurant.find({nombre:nombre})
      .then(restaurant =>{
          if(!restaurant){ return res.sendStatus(401); }
          return res.json({'restaurant': restaurant})
      })
      .catch(next);
  });
  
  
  //agregar un restaurant
  router.post('/', (req, res, next) => {
    let nombre=req.body.nombre;
    let direccion = req.body.direccion;

    var restaurant = new Restaurant({
            nombre: nombre,
            direccion: direccion
        });
  
        restaurant.save((err, restaurant) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send("Nuevo restaurant agregado \n" + restaurant);
        });
  });
  
  
  //modificar un restaurant por ID
  router.put('/:id', (req, res, next) =>{
    let id = req.params.id;
  
  
    Restaurant.findById(id, function(err, restaurant) {
  
      restaurant.nombre=req.body.nombre;
      restaurant.direccion = req.body.direccion;
  
          restaurant.save((err, restaurant) => {
              if (err) {
                  res.status(500).send(err);
              }
              res.status(200).send("restaurant modificado \n" +restaurant);
          });
      });
  });
  
  //eliminar un equipo por ID
  router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    Restaurant.findByIdAndRemove(id, (err, restaurant)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
                res.status(200).send("restaurant eliminado");
        }
    });
  });
  
  
  
  module.exports=router;