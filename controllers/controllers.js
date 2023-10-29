const homeController = require('./homeController');

const authController = require('./authController');

const sitesController = require('./sitesController');

const notificationsController = require('./notificationController');

const profileController = require('./userController');

const analyticsController = require('./analyticsController');


const controllerList = {
    'HOME_CONTROLLER' : homeController,
    'AUTH_CONTROLLER' : authController,
    'SITES_CONTROLLER' : sitesController,
    'NOTIFICATIONS_CONTROLLER' : notificationsController,
    'PROFILE_CONTROLLER' : profileController,
    'ANALYTICS_CONTROLLER' : analyticsController,

}
module.exports = controllerList;