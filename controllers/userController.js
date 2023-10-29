const router = require("express").Router();
const User = require('../models/User');
const middlewares = require('../middlewares/auth');

router.post('/seen', middlewares.protectedRoute, async (req, res) => {
});

module.exports = router;
