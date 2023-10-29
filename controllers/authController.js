

const router = require("express").Router();

const middlewares = require('../middlewares/auth');

router.get('/login',middlewares.preventAuthenticatedUser, async (req, res) => {

    res.render('auth/login');
  });
  

module.exports = router;