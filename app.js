var express = require('express');
var app = express();
var request = require('request');
var path = require('path');

// If you plan to deploy it locally, you can write your API key here
// If you plan to deploy it online, do what you must to secure your key
var DEVKEY = process.env.STEAM_API_KEY;

// You can replace process.env.PORT by another port, for example 5000 if you run it locally
// See with your web host which port to use if you want to run it online
app.set('port', process.env.PORT);

app.use(express.static(__dirname + '/public/dist'));

app.get('/api/get_steamid64', function(req, res) {

    var customURL = req.query.customurl;

    if(customURL) {

        var URL = 'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key='
            + DEVKEY + '&vanityurl='
            + customURL;
        request.get(URL, function(error, steamResponse, steamBody) {
            res.setHeader('Content-Type', 'application/json');
            res.send(steamBody);
        });

    } else {

        res.setHeader('Content-Type', 'application/json');
        res.send({response: {message: "No customURL set", success: 0}});

    }
    
});

app.get('/api/get_users', function(req, res) {

    var users = req.query.steamids;

    if(users) {

        var URL = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key='
            + DEVKEY + '&steamids='
            + users;
        request.get(URL, function(error, steamResponse, steamBody) {
            res.setHeader('Content-Type', 'application/json');
            res.send(steamBody);
        });

    } else {

        res.setHeader('Content-Type', 'application/json');
        res.send({response: {players: []}});

    }

});

app.get('/api/get_games', function(req, res) {

    var steamid = req.query.steamid;

    if(steamid) {

        var URL = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=' 
            + DEVKEY + '&steamid='
            + steamid + '&include_appinfo='
            + 1;
        request.get(URL, function(error, steamResponse, steamBody) {
            res.setHeader('Content-Type', 'application/json');
            res.send(steamBody);
        });

    } else {

        res.setHeader('Content-Type', 'application/json');
        res.send({response: {game_count: 0, games: []}});

    }

});

app.get('/api/get_games_by_tag', function(req, res) {

    var tag = req.query.tag;
    var URL;

    if(tag) {

        URL = 'http://steamspy.com/api.php?request='
            + 'tag' + '&tag='
            + tag;

    } else {

        URL = 'http://steamspy.com/api.php?request=all';

    }

    request.get(URL, function(error, steamResponse, steamBody) {
        res.setHeader('Content-Type', 'application/json');
        res.send(steamBody);
    });

});

// If no API request, handles the redirection to Angular
app.all('*', function (req, res, next) {
    res.sendFile(path.resolve('./public/dist/index.html'));
});

// Server listening
var server = app.listen(app.get('port'), function () {

    console.log('Server is running on', app.get('port'));

});