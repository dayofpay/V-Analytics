

const router = require("express").Router();

const middlewares = require('../middlewares/auth');

const userServices = require('../services/userServices');

router.get('/login',middlewares.preventAuthenticatedUser, async (req, res) => {

    res.render('auth/login');
  });


router.get('/register',middlewares.preventAuthenticatedUser,async(req,res) => {
    res.render('auth/register');
});


router.post('/register',middlewares.preventAuthenticatedUser,async(req,res) => {
    let {name,company,email,password,repeatPassword} = req.body;


    const token = await userServices.createUser({name,company,email,password,repeatPassword});

    if (token.hasOwnProperty('error')) {
        console.log("Invalid username or password.");
        res.render('auth/register', {hasError:true, errorMessage: token.error });
        return;
    }
  
    console.log(token);
    res.cookie("auth", token, { httpOnly: true });
    res.redirect("/");
})
  

module.exports = router;