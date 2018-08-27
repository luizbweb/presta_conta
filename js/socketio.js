// Socket.io Application

// Instale o socket.io e teste com acesso a internet

var app = require('http').createServer(handler),
io = require('socket.io').listen(app),
fs = require('fs');

app.listen(8098);

console.log('server started on port 8098');
function handler(req, res) {
	fs.readFile(__dirname + '/index.html', function(err, data){
		if(err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}

		res.writeHead(200);
		res.end(data);
	});
}

io.sockets.on('connection', function(socket){
	socket.emit('news', { content: 'news from server' });
	socket.on('feedback', function (data){
		console.log(data);
		socket.emit('news', { content: 'news' + new Date() });
	});
});

