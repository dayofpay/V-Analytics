const jwt = require("../lib/jwt");
const config = require('../database/config');
const notificationServices = require('../services/notificationServices');
exports.auth = async (req, res, next) => {

  const token = req.cookies["auth"];

  if (token) {
    try {
      const decodedToken = await jwt.verify(token, config.JWT.SECRET_TOKEN);
      req.user = decodedToken;
      res.locals.user = decodedToken;
      res.locals.isAuthenticated = true;
      next();
    } catch (error) {
      console.log({ error });
      res.clearCookie("auth");
      res.redirect("/auth/login");
    }
  } else {
    next();
  }
};


exports.protectedRoute = async (req,res,next) => {
  console.log('Authentication Middleware Called');
  if (req.user) {
    req.user.notification_amount = (await notificationServices.getNotifications(req.user._id)).amount;
    const mapped = JSON.stringify(((await notificationServices.getNotifications(req.user._id)).notifications));
    req.user.notifications = JSON.parse(mapped);
    return next();
  }
  res.redirect('/auth/login');
}


exports.preventAuthenticatedUser = (req,res,next) => {


  if(req.user){
    res.redirect('/');
  }

  next();
}