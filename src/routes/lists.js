const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/addlist',(req,res)=>{
    res.render('wish/addlist');
});
module.exports= router;