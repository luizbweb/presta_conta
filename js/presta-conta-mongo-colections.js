// Iniciando um banco de dados mongo db no Windows usando nodejs

// Essa versão aparentemente não funciona mais.


var mongo = require('mongodb'),
Server = mongo.Server,
Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var database = new Db('test', server);

database.collection('employee',	function(err,coll){
		var employee = {name:'user1', email:'user1@email.com', country: 'germany'}; 
		//Insert. 
		coll.insertOne( employee, function (err){ 
		if(err)	console.log(err);
		else 
		console.log('inserted data was success'); 
	});
});

/*function(err, db) { 
	if(!err) {
		console.log("connected"); 
		
	}
}*/