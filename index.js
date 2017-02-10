var express = require('express');
var app = express();

//路由位置定义
var indexRouter=require('./routes/index');
var userRouter=require('./routes/users');


app.set('views', './views');
app.set('view engine', 'jade');



//路由设置
app.use('/',indexRouter);
app.use('/users',userRouter);




/*app.get('/', function(req, res) {
    res.render('index', { title: 'Hey', message: 'hello,world!' });
});

app.get('/hello', function(req, res) {
    res.send('hello,world!');
});


app.get('/nihao', function(req, res) {
    res.send('nihao!');
});*/


app.listen(8000);