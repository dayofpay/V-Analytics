const router = require("express").Router();
const User = require('../models/User');
const middlewares = require('../middlewares/auth');
const utils = require('../utils/avatars');
router.get('/:id', middlewares.protectedRoute, async (req, res) => {

    const userData = await User.findById(req.params.id).exec();
    const mapped = JSON.stringify(userData);
    const userDetails = JSON.parse(mapped);
    const userImage = await utils.getAvatar(userData.email);
    res.render('profiles/index',{userDetails,userImage});
});

module.exports = router;
