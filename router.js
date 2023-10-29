const router = require('express').Router();


const controllerList = require('./controllers/controllers');

router.use(controllerList.HOME_CONTROLLER);


router.use('/auth',controllerList.AUTH_CONTROLLER);
// router.use('/electronic',controllerList.ELECTRONIC_CONTROLLER);
router.get("*", (req, res) => {
  res.send({'error' : 'This page does not exist'})
});



module.exports = router;