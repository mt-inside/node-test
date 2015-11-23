var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('views', './views');

app.get('/hello', function (req, res) {
    res.send('Hello World!');
});

app.get('/', function(req, res) {
    res.render('index', {});
});

app.use(express.static('app'));
app.use('/lib', express.static('bower_components'));
app.use('/data', express.static('data'));

var server = app.listen(1337, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server running at http://%s:%s', host, port);
});
