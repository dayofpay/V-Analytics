const router = require("express").Router();
const User = require('../models/User');
const middlewares = require('../middlewares/auth');

router.get('/:id', middlewares.protectedRoute, async (req, res) => {

    const userData = await User.findById(req.params.id).exec();


    res.render('profiles/index',userData);
});

module.exports = router;
