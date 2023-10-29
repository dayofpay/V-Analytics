const router = require('express').Router();


const controllerList = require('./controllers/controllers');

router.use(controllerList.HOME_CONTROLLER);


// router.use('/auth',controllerList.AUTH_CONTROLLER);
// router.use('/electronic',controllerList.ELECTRONIC_CONTROLLER);
router.get("*", (req, res) => {
  res.render("errors/404");
});



module.exports = router;