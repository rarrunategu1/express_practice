var express = require("express");
var app = express();

app.get('/', function(req, res){
    res.write('Howdy Partner');
    res.end();
});

app.get('/blocks', function(req, res){
    res.redirect(301, '/parts');
});

app.listen(process.env.PORT, process.env.IP, 8080, function() {
    console.log('Listening on port 8080');
});
