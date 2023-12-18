const router = require('express').Router()
const passport = require('passport')
const User = require('../models/user')


const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi')
const Schema = {
    name : Joi.string().min(6).required(),
    email : Joi.string().min(6).required().email(),
    password : Joi.string().min(6).required()
}

    

//auth login
router.get('/login',(req,res)=>{
    //login
    res.send('postman GET /login')
})

router.post('/login', (req, res,next) => {
    console.log('login local ?? ')
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user){
            return res.send("username_not_exist");
        } 
        else {
            req.logIn(user, async err => {
                if (err) throw err;
                try {
                    const result = await User.findOne({username: req.body.username});
                    console.log('username = ',result.username);
                    return res.send('successfully_authenticated');
                } catch (error) {
                    console.error(error);
                    return res.send('password_not_match')
                }
            })
        }
    })(req, res, next);
});

//auth register
router.post("/register",async (req,res)=>{
    console.log('in auth-routes : /regitser ')
    console.log(req.body);
    //check the data is valid
    const validation = Joi.validate(req.body,Schema);
    
    
   

    // try {
    //     const doc = await User.findOne({ username: req.body.username });
    //     if (doc) {
    //         res.send("User Exists");
    //     }
    //     if(!doc){
    //         const hashedPassword = await bcrypt.hash(req.body.password,10); 
    //         const newUser = new User({
    //             username: req.body.username,
    //             password: hashedPassword,
    //             realname: req.body.realname,
    //             studentID: req.body.studentID,
    //             email: req.body.email
    //         });
    //         await newUser.save();
    //         res.send("create");
    //     }
    // }catch (err){
    //     throw err;
    // }
})

//auth logout
router.get('/logout',(req,res)=>{
    //logout
    req.logout(err => {
        
    });
    res.render('home');
})


//auth  google
router.get('/google',passport.authenticate('google',{
    scope : ['profile','email']
}))

router.get('/google/redirect',(passport.authenticate('google')),(req,res)=>{
    //res.redirect(`${process.env.frontUrl}/profile`)
    res.redirect(`${process.env.backUrl}/profile/me`)
})


module.exports = router;