var express = require('express');
var router = express.Router();
var config=require('../config/config');
var request=require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: '登陆' });
});

router.post('/',function(req,res,next){
    request.post({
        url:config.server+'chac/user/reg/?',
        formData:{
            nickname:req.body.nickname,
            password:req.body.password
        }
    })
})

module.exports = router;
