var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');



app.get('/', function(req, res) {
    res.render('index', { title: 'Hey', message: 'hello,world!' });
});

app.get('/hello', function(req, res) {
    res.send('hello,world!');
});





app.listen(8000);