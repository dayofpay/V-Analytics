const router = require("express").Router();

const middlewares = require('../middlewares/auth');

const siteServices = require('../services/siteServices');

const notificationServices = require('../services/notificationServices');
router.get('/', middlewares.protectedRoute, async (req, res) => {
  const userSites = await siteServices.getSitesByUser(req.user._id);
  const mapped = JSON.stringify(userSites);
  res.render('sites/index', userSites.hasOwnProperty('error') ?
    [] : {
      siteData: JSON.parse(mapped)
    });
  const createNotification = await notificationServices.createNotification({type:'NOTIFICATION_ALERT',message:'Test message',timing:'__DEFAULT__VALUE'},req.user._id);

  console.log(createNotification);
  
});


module.exports = router;