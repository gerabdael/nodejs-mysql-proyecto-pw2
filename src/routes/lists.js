const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/addlist',(req,res)=>{
    res.render('Listas/listas');
});

router.post('/newlist', async (req,res)=>{
    const {nombre,description,public} = req.body;
    const newlist = {
            nombre,
            description,
            public
    };
    console.log(newlist);
    await pool.query('INSERT INTO lists set ?', [newlist]);
    res.redirect('/lists');
});

router.get('/', async(req , res)=>{
    const lists = await pool.query('SELECT * FROM  lists');
    console.log(lists);
    res.render('Listas/addlist',{lists});
});

router.get('/delete/:id', async (req, res)=> {
    const { id }= req.params;
    await pool.query('DELETE FROM lists WHERE id = ?', [id]);
    res.redirect('/lists');
});

router.get('/edit/:id', async(req,res)=>{
        const{id}=req.params;
        const lists = await pool.query('SELECT * FROM lists WHERE id = ?', [id]);
        console.log(lists[0]);
        res.render('Listas/edit',{lists: lists[0]});
});
router.post('/edit/:id', async(req,res)=>{
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