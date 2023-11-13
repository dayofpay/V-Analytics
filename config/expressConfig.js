const path = require('path');;
const cookieParse = require("cookie-parser");
const {auth}  = require('../middlewares/auth');
const cors = require('cors');
const expressConfig = (app,express) => {
    app.use(express.static(path.resolve(__dirname,'../public')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParse());
    app.use(auth);
    app.use(cors());
}


module.exports = expressConfig;