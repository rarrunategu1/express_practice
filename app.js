var express = require("express");
var app = express();
var logger = require('./logger');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false }); //fores use of the natie querystring Node Library

app.use(logger);

app.use('/', express.static('public'));

 var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'};
    
//create delete route that calls delete function
app.delete('/blocks/:name', function(req, res) {
    delete blocks[req.blockName];  //removes entry from blocks object above
    res.sendStatus(200);  //sets response body to ok
    
});

app.post('/blocks', parseUrlencoded, function(req, res) {
    var newBlock = req.body;
    blocks[newBlock.name] = newBlock.description;
    
    res.status(201).json(newBlock.name);
});

    
app.get('/blocks', function(req, res) {
    res.json(Object.keys(blocks));
});
    
var locations = {
    'Fixed': 'First floor', 'Movable': 'Second floor', 'Rotating': 'Penthouse'
};

app.param('name', function(req, res, next) {
    var name = req.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    
    req.blockName = block;
    
    next();
});

app.get('/blocks/:name', function(req, res) {
   var description = blocks[req.blockName];
   if (!description) {
       res.status(404).json('No description found for ' + req.params.name); //sends a return if no block is found with the param entered
       
   } else {
       
       res.json(description);  //will also set status code to 200 success
}
    
    
});

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
