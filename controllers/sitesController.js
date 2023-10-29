const router = require("express").Router();
const User = require('../models/User');
const middlewares = require('../middlewares/auth');

const siteServices = require('../services/siteServices');
router.get('/create', middlewares.protectedRoute, async (req, res) => {

    res.render('sites/create');
});
router.post('/create', middlewares.protectedRoute, async (req, res) => {
    const {site_name,company_name,site_type,site_url} = req.body;

    const createSite = await siteServices.createSite({site_name,company_name,site_type,site_url},req.user._id)
    if(createSite.hasOwnProperty('error')){
        res.render('sites/create',{hasError:true,errorMessage:createSite.error});

        return;
    }
    
    res.redirect(`/sites/${createSite._id}`);



});

module.exports = router;