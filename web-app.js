var http = require('http');
// io = require('socket.io').listen(app),
fs = require('fs');

var server = http.createServer( function (req, res) {
	console.log(req.url);

	if (req.url=='/') {
		res.write('Welcome to http nodejs');
		res.end();
	} else
	if (req.url=='/customer') {
		res.write('Welcome to Customer page');
		res.end();
	} else
	if (req.url=='/admin') {
		res.write('Welcome to Admin page');
		res.end();
	} else
	if (req.url=='/msg') {
		// res.write('msg.html');
		fs.readFile(__dirname + '/msg.html', function(err, data){
			if(err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}
			res.writeHead(200);
			res.end(data);
		});
		// res.end();
	} else
	{
		res.write('Page not found');
		res.end();
	}

});

server.listen(8084);
console.log('Server is running on port 8084');