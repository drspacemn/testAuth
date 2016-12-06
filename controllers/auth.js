// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../app/models/user');
var BearerStrategy = require('passport-http-bearer').Strategy;
var Token = require('../app/models/token');

passport.use(new BasicStrategy(
  function(username, password, callback) {
    console.log('got to func')
    User.findOne({ username: username }, function (err, user) {
      if (err) { return callback(err); }

      // No user found with that username
      if (!user) { return callback(null, false); }

      // Make sure the password is correct
      user.verifyPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }

        // Password did not match
        console.log('didnot make it')
        if (!isMatch) { return callback(null, false); }

        // Success
        console.log('made it')
        return callback(null, user);
      });
    });
  }
));

passport.use('client-basic', new BasicStrategy(
    function(username, password, callback){
        Client.findOne({ id: username}, function(err, client){
            if(err) {return callback(err)}

            if(!client || client.secret !== password) {return callback(null, false)}

            return callback(null, client)
        })
    }
))

passport.use(new BearerStrategy(
  function(accessToken, callback) {
    Token.findOne({value: accessToken }, function (err, token) {
      if (err) { return callback(err); }

      // No token found
      if (!token) { return callback(null, false); }

      User.findOne({ _id: token.userId }, function (err, user) {
        if (err) { return callback(err); }

        // No user found
        if (!user) { return callback(null, false); }

        // Simple example with no scope
        callback(null, user, { scope: '*' });
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
exports.isClientAuthenticated = passport.authenticate('client-basic', {session: false})
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });

