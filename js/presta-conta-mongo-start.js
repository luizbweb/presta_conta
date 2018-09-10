// Iniciando um banco de dados mongo db no Windows usando e adicionando uma coleção
// Mais informações em - http://mongodb.github.io/node-mongodb-native/3.0/quick-start/quick-start/

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'presta-conta-db';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
	assert.equal(null, err);
	console.log("Connected sucessfully to server");
	const db = client.db(dbName);
	client.close();
});

// Use to insert documentens into a colection
const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}
