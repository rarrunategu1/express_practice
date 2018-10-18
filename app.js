var express = require("express");
var app = express();

app.use(express.static('public'));

app.listen(process.env.PORT, process.env.IP, 8080, function() {
    console.log('Listening on port 8080');
});
