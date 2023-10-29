const homeController = require('./homeController');

const authController = require('./authController');

const sitesController = require('./sitesController');

const notificationsController = require('./notificationController');
const controllerList = {
    'HOME_CONTROLLER' : homeController,
    'AUTH_CONTROLLER' : authController,
    'SITES_CONTROLLER' : sitesController,
    'NOTIFICATIONS_CONTROLLER' : notificationsController,

}
module.exports = controllerList;