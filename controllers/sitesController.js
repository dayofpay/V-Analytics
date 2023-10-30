const router = require("express").Router();
const User = require('../models/User');
const Site = require('../models/Sites');
const middlewares = require('../middlewares/auth');

const siteServices = require('../services/siteServices');

const notificationServices = require('../services/notificationServices');
const { APP_CONFIG } = require("../config/app");
router.get('/create', middlewares.protectedRoute, async (req, res) => {

    res.render('sites/create');
});
router.post('/create', middlewares.protectedRoute, async (req, res) => {
    const {
        site_name,
        company_name,
        site_type,
        site_url
    } = req.body;

    const createSite = await siteServices.createSite({
        site_name,
        company_name,
        site_type,
        site_url
    }, req.user._id)
    if (createSite.hasOwnProperty('error')) {
        res.render('sites/create', {
            hasError: true,
            errorMessage: createSite.error
        });
        return;
    }
    const createNotification = await notificationServices.createNotification({
        type: 'NOTIFICATION_INFO',
        message: 'New Site Created: ' + site_name,
        timing: '__DEFAULT__VALUE'
    }, req.user._id);

    res.redirect(`/sites/${createSite._id}/manage`);



});

router.get('/:id/manage', middlewares.protectedRoute, async (req, res) => {
    let hasAccess = await siteServices.checkUserAccess(req, res);

    const siteData = await Site.findById(req.params.id).exec();

    const successedSites = siteData.geolocation_data.find(site => site.ipData.status === 'success');


    const mapped = JSON.stringify(siteData);
    if(APP_CONFIG.DEBUG.DEBUG_ENABLED){
        console.log(`${APP_CONFIG.DEBUG.DEBUG_PREFIX} Browser List ${siteData.browser_list}`);
    }
    if (hasAccess) {
        res.render('index', {
            siteData: JSON.parse(mapped),
            visitorList: siteData.visitors_list,
            browserList: siteData.browser_list,
            geoLocationData: successedSites
        });
        return;
    }

    res.send({
        'error': 'You dont have permissions to manage this site !'
    })
});

module.exports = router;