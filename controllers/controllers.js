const homeController = require('./homeController');

const authController = require('./authController');
const controllerList = {
    'HOME_CONTROLLER' : homeController,
    'AUTH_CONTROLLER' : authController

}
module.exports = controllerList;