const router = require("express").Router();
const User = require('../models/User');
const middlewares = require('../middlewares/auth');

router.get('/:id', middlewares.protectedRoute, async (req, res) => {

    const userId = req.params.id;

    res.render('profiles/index');
});

module.exports = router;
