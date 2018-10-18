var express = require("express");
var app = express();
var logger = require('./logger');
app.use(logger);

app.use(express.static('public'));

app.get('/blocks', function(req, res) {
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    res.json(blocks);
});

app.listen(process.env.PORT, process.env.IP, 8080, function() {
    console.log('Listening on port 8080');
});
