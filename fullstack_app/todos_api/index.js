var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
    res.sendFile('index.html');
})

app.use('/api/todos', todoRoutes);

app.get('/json', function(req, res) {
    res.json({
        message: "Hello There",
        date: Date.now(),
        port: port
    })
})

app.get('/happy', function(req, res) {
    res.send(":)");
})

app.listen(port, function() {
    console.log("app is running " + port);
})
