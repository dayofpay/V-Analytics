const homeController = require('./homeController');

const authController = require('./authController');

const sitesController = require('./sitesController');

const notificationsController = require('./notificationController');

const profileController = require('./userController');
const controllerList = {
    'HOME_CONTROLLER' : homeController,
    'AUTH_CONTROLLER' : authController,
    'SITES_CONTROLLER' : sitesController,
    'NOTIFICATIONS_CONTROLLER' : notificationsController,
    'PROFILE_CONTROLLER' : profileController,

}
module.exports = controllerList;