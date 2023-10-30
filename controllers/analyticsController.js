const {
    preventAuthenticatedUser
} = require('../middlewares/auth');

const router = require('express').Router();
const Site = require('../models/Sites');
let cors = require('cors');
const ipTools = require('../utils/ipTools');

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

    try {
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
                    siteUrl.browser_list.push(req.get('User-Agent'));
                    siteUrl.visitors++;
                    // Get IP Info

                    let ipData = await ipTools.fetchIPData('45.83.216.22');
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
            console.log(false);
        }
    } catch (error) {
        res.send({
            'error': 'An error occured while trying to send analytics data, please contact developers'
        })
        console.error('An error occured while trying to parse visitor data', error);
    }


})

module.exports = router;