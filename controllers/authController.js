

const router = require("express").Router();

const { APP_CONFIG } = require("../config/app");
const middlewares = require('../middlewares/auth');

const userServices = require('../services/userServices');

router.get('/login',middlewares.preventAuthenticatedUser, async (req, res) => {

    res.render('auth/login');
  });

router.post('/login',middlewares.preventAuthenticatedUser,async (req,res) => {

    const {email,password} = req.body;
    const token = await userServices.login(email,password);

    if(token.hasOwnProperty('error')){
        if(APP_CONFIG.DEBUG.DEBUG_ENABLED){
            console.log(`${APP_CONFIG.DEBUG.DEBUG_PREFIX} Invalid Username OR Password !`);
        }
        res.render('auth/login',{hasError:true,errorMessage:token.error});

        return;
    }

    res.cookie('auth',token,{httpOnly:true});
    res.redirect('/');
})
router.get('/register',middlewares.preventAuthenticatedUser,async(req,res) => {
    res.render('auth/register');
});


router.post('/register',middlewares.preventAuthenticatedUser,async(req,res) => {
    let {name,company,email,password,repeatPassword} = req.body;


    const token = await userServices.createUser({name,company,email,password,repeatPassword});

    if (token.hasOwnProperty('error')) {
        console.log("Error has occured.");
        res.render('auth/register', {hasError:true, errorMessage: token.error });
        return;
    }

    if(APP_CONFIG.DEBUG.DEBUG_ENABLED){
        console.log(`${APP_CONFIG.DEBUG.DEBUG_PREFIX} Token - ${token}`);
    }
    res.cookie("auth", token, { httpOnly: true });

    res.redirect("/");
});






router.get('/logout',middlewares.protectedRoute,async(req,res) => {
    res.clearCookie("auth");
    res.redirect("/");
})
  

module.exports = router;