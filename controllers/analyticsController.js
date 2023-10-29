const { preventAuthenticatedUser } = require('../middlewares/auth');

const router = require('express').Router();
const Site = require('../models/Sites');
let cors = require('cors');

let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
}
router.post('/sites/:id', async (req,res) => {
    // Get Site URL

    try{
        const siteUrl = await Site.findById(req.params.id).exec();
        if(siteUrl){

            console.log(req.body,'VISITOR DATA');

            // Now lets make sure that origin matches the sites url

            const origin = req.get('Origin');

            if(origin === siteUrl.site_url){
                res.header('Access-Control-Allow-Origin', origin);
            }
            else{
                res.status(403).send('Forbidden');
            }
        }
        else{
            console.log(false);
        }
    }
    catch(error){
        console.error('An error occured while trying to parse visitor data',error);
    }


})

module.exports = router;