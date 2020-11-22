const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/newproduct',(req,res)=>{
    res.render('wish/add');
});
module.exports= router;