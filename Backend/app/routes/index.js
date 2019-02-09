var router=require('express').Router();


router.use('/api/restaurantes',require('./restaurant'));
router.use('/api/comidas',require('./comida'));

module.exports=router;
