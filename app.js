var express = require("express");
var app = express();
var logger = require('./logger');
app.use(logger);

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

app.get('/blocks/:name', function(req, res) {
   var description = blocks[req.params.name];
   if (!description) {
       res.status(404).json('No description found for ' + req.params.name); //sends a return if no block is found with the param entered
       
   } else {
       
       res.json(description);  //will also set status code to 200 success

   }
   });

app.listen(process.env.PORT, process.env.IP, 8080, function() {
    console.log('Listening on port 8080');
});
