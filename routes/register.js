var express = require('express');
var router = express.Router();
var config=require('../config/config');
var request=require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register', { title: '注册' });
});




module.exports = router;
