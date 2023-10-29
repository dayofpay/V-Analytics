

const router = require("express").Router();

const middlewares = require('../middlewares/auth');

router.get('/',middlewares.protectedRoute, async (req, res) => {

    res.render('sites/index');
  });
  

module.exports = router;