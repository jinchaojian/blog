var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var request = require('request');
var config=require('./config/config');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var register = require('./routes/register');

//var posts=require('./routes/posts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res,next){
    var pn=0;
    request(config.development.server+'chac/blog/getIndexBlog/?&pn='+pn, function(error, response, body) {
        if (!error) {
            var result = JSON.parse(body);
            if (result.ret == 200) {
                res.render('index', {
                    'path':'',
                    result: result.data,
                    'title':result.ret
                });
            } else{
                res.render('error', {
                    'message': result.message,
                    error: {
                        'status': result.ret,
                        'stack': ''
                    }
                });
            }
        } else {
            console.error('posts failed:', error);
            next(error);
        }
    })
})

app.get('/:pn',function(req,res,next){
    var pn=0;
    if(req.params.pn){
        pn=req.params.pn;
    }
    request(config.development.server+'chac/blog/getIndexBlog/?&pn='+pn, function(error, response, body) {
        if (!error) {
            var result = JSON.parse(body);
            if (result.ret == 200) {
                console.log(result.ret);
                res.render('index', {
                    'pn':pn,
                    result: result.data,
                    'title':result.ret
                });
            } else{
                res.render('error', {
                    'message': result.message,
                    error: {
                        'status': result.ret,
                        'stack': ''
                    }
                });
            }
        } else {
            console.error('posts failed:', error);
            next(error);
        }
    })
})

//app.use('/', index);
/*app.get('/', function(req, res) {
  res.send('hello, express');
});*/
/*app.get('/posts',function(req,res,next){
    res.render('posts', { title: '登陆' });
});*/

app.get('/posts', function(req, res, next) {
    //res.render('posts', { title: '登陆' });
    request('http://localhost/chac_blog_api/public/index.php/chac/user/login/?&nickname=242p2&password=11', function(error, response, body) {
        if (!error) {
            var result = JSON.parse(body);
            if (result.code == 200) {
                res.render('posts', {
                    'path':'',
                    result: result.data,
                    'title':result.code
                });
            } else{
                res.render('error', {
                    'message': result.message,
                    error: {
                        'status': result.code,
                        'stack': ''
                    }
                });
            }
        } else {
            console.error('posts failed:', error);
            next(error);
        }
    })
});





app.use('/users', users);
app.use('/login',login);
app.use('/register',register);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//新增测试修改路由请求
app.listen(3000);
module.exports = app;
