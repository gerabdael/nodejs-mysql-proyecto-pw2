const express = require('express');
const router = express.Router();

const passport=require('passport');
const{isloggedIn, isNotloggedIn} = require('../lib/auth');

router.get('/signup',isNotloggedIn,(req,res)=>{
    res.render('user/add')
});

router.post('/signup',isNotloggedIn,passport.authenticate('local.signup',{
        successRedirect: '/signup',
        failureRedirect: '/signup',
        session:false
})); 

router.get('/signin',isNotloggedIn,(req,res)=>{
    res.render('user/signin');
});

router.post('/signin',isNotloggedIn,(req,res,next)=>{
    passport.authenticate('local.signin',{
        successRedirect:'/profile',
        failureRedirect: '/signin'
    })(req,res,next);
});

router.get('/profile', isloggedIn, (req,res)=> {
    res.render('profile');
});
router.get('/logout',isloggedIn,(req,res)=>{
    req.logOut();
    res.redirect('/');
})
module.exports= router;