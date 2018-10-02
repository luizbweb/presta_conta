const bcrypt = require('bcryptjs')  
const LocalStrategy = require('passport-local').Strategy

module.exports = function(passport){
    
    function findUser(email, callback){
        global.db.collection("users").findOne({"email": email}, function(err, doc){
            callback(err, doc);
        });
    }
    
    function findUserById(id, callback){
        const ObjectId = require("mongodb").ObjectId;
        global.db.collection("users").findOne({_id: ObjectId(id) }, (err, doc) => {
            callback(err, doc);
        });
    }


    passport.serializeUser(function(user, done){
        done(null,user._id);
    });

    passport.deserializeUser(function(id, done){
        findUserById(id, function(err,user){
            done(err, user);
        });
    });

    passport.use(new LocalStrategy( { 
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, done) => {
        findUser(email, (err, user) => {
        if (err) { return done(err) }

        // usuário inexistente
        if (!user) { return done(null, false) }


       
        // comparando as senhas
        bcrypt.compare(password, user.password, (err, isValid) => {
            if (err) { return done(err) }
            if (!isValid) { return done(null, false) }
            return done(null, user)
        })
        })
    }
    ));
}