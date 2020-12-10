const express = require('express');
const router = express.Router();

router.get('/',(req,res)=> {
    res.render('landingpage/landing')
});

module.exports= router;