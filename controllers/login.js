var url         = require('url');
var querystring = require('querystring');


exports.loginGet = function(req, res, next){
    res.render('login', {title: 'testAuth', url: req.url })
}

// http://localhost:3000/api/oauth2/authorize?client_id=this_is_my_id&response_type=code&redirect_uri=http://localhost:3000
exports.loginPost = function(req, res, next){

    console.log(urlObj)
    var urlObj = querystring.parse(req.body.url, '&', '=')
    var host = req.headers.origin;
    var endpoint = '/api/oauth2/authorize';
    var client_id = 'alexa-skill';
    var response_type = 'code';
    var redirect_uri = 'http://localhost:3000';

    var url = host + endpoint + "?client_id=" + client_id + "&response_type=" + response_type + "&redirect_uri=" + redirect_uri;

    res.redirect(url);
}