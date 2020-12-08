const express = require('express');
const { query } = require('../database');
const router = express.Router();
const pool = require('../database');

router.get('/newproducto',(req,res)=>{
    res.render('wish/add');
});

router.post('/newproducto', async (req,res)=>{
    const {nombre,description,setiene,price} = req.body;
    const newproduct = {
            nombre,
            description,
            setiene,
            price
    };
    console.log(newproduct);
    await pool.query('INSERT INTO toy set ?', [newproduct]);
    res.redirect('/product');
});

router.get('/', async(req , res)=>{
    const toy = await pool.query('SELECT * FROM  toy');
    console.log(toy);
    res.render('wish/addlist',{toy});
});

router.get('/delete/:id', async (req, res)=> {
    const { id }= req.params;
    await pool.query('DELETE FROM toy WHERE id = ?', [id]);
    res.redirect('/product');
});

router.get('/edit/:id', async(req,res)=>{
        const{id}=req.params;
        const toys = await pool.query('SELECT * FROM toy WHERE id = ?', [id]);
        console.log(toys[0]);
        res.render('wish/edit',{toys: toys[0]});
});
router.post('/edit/:id', async(req,res)=>{
    const{id}=req.params;
    const {nombre,description,setiene,price} = req.body;
    const newproduct = {
            nombre,
            description,
            setiene,
            price
    };
    await pool.query('UPDATE toy set ? WHERE id = ?',[newproduct,id]);
    res.redirect('/product')

});
module.exports= router;