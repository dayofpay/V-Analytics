const homeController = require('./homeController');

const authController = require('./authController');

const sitesController = require('./sitesController');
const controllerList = {
    'HOME_CONTROLLER' : homeController,
    'AUTH_CONTROLLER' : authController,
    'SITES_CONTROLLER' : sitesController,

}
module.exports = controllerList;