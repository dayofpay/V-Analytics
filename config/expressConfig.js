const path = require('path');;
const cookieParse = require("cookie-parser");
const {auth}  = require('../middlewares/auth');

const expressConfig = (app,express) => {
    app.use(express.static(path.resolve(__dirname,'../public')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParse());
    app.use(auth);
}


module.exports = expressConfig;