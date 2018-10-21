var express = require("express");
var app = express();
var logger = require('./logger');
app.use(logger);

app.use('/', express.static('public'));

var blocks = require('./routes/blocks');
app.use('/blocks', blocks); //mounts blocks route in blocks path and all requests are dispatched to this /blocks router
    
var locations = {
    'Fixed': 'First floor', 'Movable': 'Second floor', 'Rotating': 'Penthouse'
};

app.get('/locations/:name', function(req, res) {
    var location = locations[req.blockName];
       if (!location) {
       res.status(404).json('No location found for ' + req.params.name); //sends a return if no block is found with the param entered
       
   } else {
       
       res.json(location);  //will also set status code to 200 success
}
});

app.listen(process.env.PORT, process.env.IP, 8080, function() {
    console.log('Listening on port 8080');
});
