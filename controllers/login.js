var url         = require('url');
var querystring = require('querystring');


exports.loginGet = function(req, res, next){
    res.render('login', {title: 'testAuth', url: req.url })
}

//Initial Auth
//https://www.carfu.com/login?state=abc&client_id=alexa-skill&scope=order_car%20basic_profile&response_type=code&redirect_uri=https%3A%2F%2Fpitangui.amazon.com%2Fspa%2Fskill%2Faccount-linking-status.html%3FvendorId%3DAAAAAAAAAAAAAA

//hit code

//Redirect URL
//https://pitangui.amazon.com/spa/skill/account-linking-status.html?vendorId=AAAAAAAAAAAAAA&state=xyz&code=SplxlOBeZQQYbYS6WxSbIA 

// http://localhost:3000/api/oauth2/authorize?client_id=this_is_my_id&response_type=code&redirect_uri=http://localhost:3000
exports.loginPost = function(req, res, next){
    console.log('got here')
    var urlObj = querystring.parse(req.body.url, '&', '=')
    console.log(urlObj)
    var host = req.headers.origin;
    var endpoint = '/api/oauth2/authorize';
    var client_id = 'alexa-skill';
    var response_type = 'code';
    var state = urlObj.state;
    var redirect_uri = urlObj.redirect_uri || req.headers.origin;

    // get auth code
    var url = host + endpoint + "?client_id=" + client_id + "&response_type=" + response_type + "&redirect_uri=" + redirect_uri;
    // var url = redirect_uri + '&state=' + state + '&code=' + code; 

    res.redirect(url);
}