const bcrypt = require('bcryptjs') 

       
function findAll(callback){  
    global.db.collection("customers").find({}).toArray(callback);
}

function insert(customer, callback){
    global.db.collection("customers").insert(customer, callback);
}

var ObjectId = require("mongodb").ObjectId;
function findOne(id, callback){  
    global.db.collection("customers").find(new ObjectId(id)).toArray(callback);
}

function update(id, customer, callback){
    global.db.collection("customers").updateOne({_id:new ObjectId(id)}, {$set:{nome:customer.nome, idade:customer.idade}}, callback);
}

function deleteOne(id, callback){
    global.db.collection("customers").deleteOne({_id: new ObjectId(id)}, callback);
}

/**ROTINAS PRESTA CONTA */
/**user */
function findallusers(callback){  
    //global.conn.collection("users").find({}).toArray(callback);
    global.db.collection("users").find({}).toArray(callback);
}

function insertuser(user, callback){
    global.db.collection("users").insert(user, callback);
}

var ObjectId = require("mongodb").ObjectId;
function findoneuser(id, callback){  
    global.db.collection("users").find(new ObjectId(id)).toArray(callback);
}

function updateuser(id, user, callback){
    global.db.collection("users").updateOne({_id:new ObjectId(id)}, 
        {$set:{email:user.email, name:user.name, phone:user.phone, cpf:user.cpf }}, callback);
}

function deleteoneuser(id, callback){
    global.db.collection("users").deleteOne({_id: new ObjectId(id)}, callback);
}

function receiveuser(receive, callback){
    global.db.collection("receives").insert(receive, callback);
}

function createUser(email, password, name, phone, cpf, callback){
    const cryptPwd = bcrypt.hashSync(password, 10)
    global.db.collection("users").insert({email, password: cryptPwd, name, 
        phone, cpf}, function(err, result){
        callback(err, result)
    })
}

function findUserByEmail(email, callback){
    global.db.collection("users").findOne({email}, callback)
}

function changePassword(email, password){
    const cryptPwd = bcrypt.hashSync(password, 10)
    global.db.collection("users").updateOne({email}, {$set:{password: cryptPwd}})
}


/**category */

function findallcategories(callback){  
    //global.conn.collection("users").find({}).toArray(callback);
    global.db.collection("categories").find({}).toArray(callback);
}

function insertcategory(category, callback){
    global.db.collection("categories").insert(category, callback);
}

var ObjectId = require("mongodb").ObjectId;
function findonecategory(id, callback){  
    global.db.collection("categories").find(new ObjectId(id)).toArray(callback);
}

function updatecategory(id, category, callback){
    global.db.collection("categories").updateOne({_id:new ObjectId(id)}, 
        {$set:{description:category.description}}, callback);
}

function deleteonecategory(id, callback){
    global.db.collection("categories").deleteOne({_id: new ObjectId(id)}, callback);
}




module.exports = { findAll, insert, findOne, update, deleteOne, 
    findallusers, insertuser, findoneuser, updateuser, deleteoneuser, 
    receiveuser, createUser, findUserByEmail, changePassword, 
    findallcategories, insertcategory, findonecategory, updatecategory, deleteonecategory}

