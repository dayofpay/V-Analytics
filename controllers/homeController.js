

const router = require("express").Router();

const middlewares = require('../middlewares/auth');

const siteServices = require('../services/siteServices');
router.get('/',middlewares.protectedRoute, async (req, res) => {
    const userSites = await siteServices.getSitesByUser(req.user._id);
    const mapped = JSON.stringify(userSites);
    res.render('sites/index',{siteData:JSON.parse(mapped)});
  });
  

module.exports = router;