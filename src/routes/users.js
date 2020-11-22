const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add',(req,res)=>{
    res.render('user/add');
});
module.exports= router;

