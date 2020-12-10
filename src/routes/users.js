const express = require('express');
const router = express.Router();
const pool = require('../database');
const passport=require('passport');
const{isloggedIn, isNotloggedIn} = require('../lib/auth');
router.get('/', async(req , res)=>{
    const users = await pool.query('SELECT * FROM  users');
    console.log(users);
    res.render('/profile',{users});
});

router.get('/delete', async (req, res)=> {
    const { id }= req.params;
    await pool.query('UPDATE users SET borradolog = 0 WHERE id = ?', [req.user.id]);
    req.logOut();
    res.redirect('/signin');
});

router.get('/edit', async(req,res)=>{
        const{id}=req.params;
        const users = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        console.log(users[0]);
        res.render('user/edit',{users: users[0]});
});
router.post('/edit/:id', async(req,res)=>{
    const{id}=req.params;
    const {username,password,fullname,correo,public} = req.body;
    const newUser = {
        username,
        password,
        fullname,
        correo,
        public
    };
    await pool.query('UPDATE users set ? WHERE id = ?',[newUser,id]);
    res.redirect('/profile')

});
module.exports= router;

