const {
    preventAuthenticatedUser
} = require('../middlewares/auth');

const router = require('express').Router();
const Site = require('../models/Sites');
let cors = require('cors');
const ipTools = require('../utils/ipTools');
const security = require('../utils/security');
const config = require('../config/app');
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
router.post('/sites/:id', async (req, res) => {
    // Get Site URL

    // Check if the ip blocking feature is enabled
    if(config.APP_CONFIG.SECURITY.IP_BLACKLIST){
        if(config.APP_CONFIG.SECURITY.BLACKLIST_SETTINGS.BANNED_IPS.includes(req.ip)){
            res.status(403).send({AuthorizationException : 'Your ip address is banned on this website !'});
            return;
        }
    }
    try {
        if(config.APP_CONFIG.SECURITY.PROXY_CHECK){
            const checkProxy = await security.isProxy(req.ip);
            if(checkProxy.isProxy){
                res.status(403).send({SecurityException : 'You are not allowed to send analytics data using Proxy'});
                return;
            }
        }
        const siteUrl = await Site.findById(req.params.id).exec();
        if (siteUrl) {

            // if you want to debug > console.log(req.body, 'VISITOR DATA');

            // Now lets make sure that origin matches the sites url

            const origin = req.get('Origin');
            if (origin === siteUrl.site_url) {
                res.header('Access-Control-Allow-Origin', origin);

                // Increment the visitors amount
                if (!siteUrl.visitors_list.includes(req.ip)) {
                    siteUrl.visitors_list.push(req.ip);
                    siteUrl.browser_list.push({data:req.get('User-Agent')});
                    siteUrl.visitors++;
                    const date = new Date();
                    siteUrl.visit_dates.push(date);
                    // Get IP Info

                    let ipData = await ipTools.fetchIPData(req.ip);
                    siteUrl.geolocation_data.push({
                        ipData
                    });
                }

                siteUrl.visits++;
                siteUrl.save();
            } else {
                res.status(403).send({
                    'CORS_EXCEPTION': 'You are not allowed to send data to this URL'
                });
            }
        } else {
            if(config.APP_CONFIG.DEBUG.DEBUG_ENABLED){
                console.log(`${config.APP_CONFIG.DEBUG.DEBUG_PREFIX} This site does not exists!`);
            }
        }
    } catch (error) {
        res.send({
            'error': 'An error occured while trying to send analytics data, please contact developers'
        })
        console.error('An error occured while trying to parse visitor data', error);
    }


})

module.exports = router;