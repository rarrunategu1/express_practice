var express = require('express');
var router = express.Router(); //returns router instance which can be mounted as middleware
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false }); //forces use of the natie querystring Node Library

 var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
     
 };
 //using chain function below to chain some function calls
    
   router.route('/') 
   .get(function(req, res) {
    res.json(Object.keys(blocks));
})
.post(parseUrlencoded, function(req, res) {
    var newBlock = req.body;
    blocks[newBlock.name] = newBlock.description;
    
    res.status(201).json(newBlock.name);
});

router.route('/:name')

.all(function(req, res, next) { //all route is for all requests for a given path
    var name = req.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    req.blockName = block;
    next();
})

.get(function(req, res) {
   var description = blocks[req.blockName];
   if (!description) {
       res.status(404).json('No description found for ' + req.params.name); //sends a return if no block is found with the param entered
       
   } else {
       
       res.json(description);  //will also set status code to 200 success
}
})

//create delete route that calls delete function
.delete(function(req, res) {
    delete blocks[req.blockName];  //removes entry from blocks object above
    res.sendStatus(200);  //sets response body to ok
    
});




module.exports = router; //exports the router as a node module