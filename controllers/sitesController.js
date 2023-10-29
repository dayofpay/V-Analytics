const router = require("express").Router();

const middlewares = require('../middlewares/auth');

router.get('/create', middlewares.protectedRoute, async (req, res) => {

    res.render('sites/create');
});
router.post('/create', middlewares.protectedRoute, async (req, res) => {
    console.log(req.body);
});

module.exports = router;