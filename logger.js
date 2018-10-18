//logger middleware used to display the duration of each request made to app

module.exports =function(req, res, next) {
    var start = +new Date();
    var stream = process.stdout; //logs logger messages to standard output which is a writeable stream
    var url = req.url;  //gets request url
    var method = req.method; //gets http method
    
    res.on('finish', function() {
        var duration = +new Date() - start; //calculates durations
        var message = method + ' to ' + url + '\ntook ' + duration + ' ms \n\n';
        stream.write(message); //prints logs message to standard out  by calling write function on stream object
        
    });
    
 next();   
}