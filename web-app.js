var http = require('http');
// io = require('socket.io').listen(app),
fs = require('fs');

var server = http.createServer( function (req, res) {
	console.log(req.url);

	/*
	Arquivos a serem direcionados
	usuario.html
	projeto.html
	contribuicao.html
	recebimento.html
	*/
	if (req.url=='/') {
		fs.readFile(__dirname + '/index.html', function(err, data){
			if(err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}
			res.writeHead(200);
			res.end(data);
		});
	} else
	if (req.url=='/usuario') {
		fs.readFile(__dirname + '/usuario.html', function(err, data){
			if(err) {
				res.writeHead(500);
				return res.end('Error loading usuario.html');
			}
			res.writeHead(200);
			res.end(data);
		});
	} else
	if (req.url=='/projeto') {
		fs.readFile(__dirname + '/projeto.html', function(err, data){
			if(err) {
				res.writeHead(500);
				return res.end('Error loading projeto.html');
			}
			res.writeHead(200);
			res.end(data);
		});
	} else
	if (req.url=='/contribuicao') {
		fs.readFile(__dirname + '/contribuicao.html', function(err, data){
			if(err) {
				res.writeHead(500);
				return res.end('Error loading contribuicao.html');
			}
			res.writeHead(200);
			res.end(data);
		});
	} else
	if (req.url=='/recebimento') {
		fs.readFile(__dirname + '/recebimento.html', function(err, data){
			if(err) {
				res.writeHead(500);
				return res.end('Error loading recebimento.html');
			}
			res.writeHead(200);
			res.end(data);
		});
	} else
	{
		res.write('Page not found');
		res.end();
	}

});

server.listen(8084);
console.log('Server is running on port 8084');