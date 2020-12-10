const express = require('express');
const router = express.Router();
const pool = require('../database');
const passport=require('passport');
const{isloggedIn, isNotloggedIn} = require('../lib/auth');

router.get('/addlist',isloggedIn,(req,res)=>{
    res.render('Listas/listas');
});

router.post('/newlist',isloggedIn, async (req,res)=>{
    const {nombre,description,public} = req.body;
    const newlist = {
            nombre,
            description,
            public,
            user_id: req.user.id
    };
    console.log(newlist);
    await pool.query('INSERT INTO lists set ?', [newlist]);
    res.redirect('/lists');
});

router.get('/', isloggedIn,async(req , res)=>{
    const lists = await pool.query('SELECT * FROM  lists WHERE user_id = ?',[req.user.id]);
    console.log(lists);
    res.render('Listas/addlist',{lists});
});


router.get('/delete/:id',isloggedIn, async (req, res)=> {
    const { id }= req.params;
    await pool.query('DELETE FROM lists WHERE id = ?', [id]);
    res.redirect('/lists');
});

router.get('/edit/:id',isloggedIn, async(req,res)=>{
        const{id}=req.params;
        const lists = await pool.query('SELECT * FROM lists WHERE id = ?', [id]);
        console.log(lists[0]);
        res.render('Listas/edit',{lists: lists[0]});
});

router["m-search"]('/search',isloggedIn, async(req,res)=>{
    const{ search}= req.body;
    const newquery = {search};
    console.log[search]
    const lists = await pool.query('SELECT * FROM lists WHERE nombre = ? '[search]);
    console.log(lists[0]);
   res.render('Listas/search',{lists: lists[0]});
});

router.get('/ver/:id',isloggedIn, async(req,res)=>{
    const{id}=req.params;
    const toy = await pool.query('SELECT * FROM toy WHERE lists_id = ?', [id]);
    console.log(toy[0]);
    res.render('Listas/ver',{toy: toy[0]});
});

router.post('/edit/:id', isloggedIn,async(req,res)=>{
    const{id}=req.params;
       const {nombre,description,public} = req.body;
    const newlist = {
            nombre,
            description,
            public
    };
    await pool.query('UPDATE lists set ? WHERE id = ?',[newlist,id]);
    res.redirect('/lists')

});

module.exports= router;