const jwt = require("../lib/jwt");
const config = require('../database/config');

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


exports.protectedRoute = (req,res,next) => {
  console.log('Authentication Middleware Called');
  if (req.user) {
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