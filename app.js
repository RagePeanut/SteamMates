var express = require('express');
var app = express();
var request = require('request');
var path = require('path');
var fs = require('fs');

// If you plan to deploy it locally, you can write your API key here
// If you plan to deploy it online, do what you must to secure your key
var DEVKEY = process.env.STEAM_API_KEY;

var tags = [
    'Online Co-op',
    'Multiplayer',
    'Local Co-op',
    'Local Multiplayer'
];

var genres = [
];

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

    if(tag) {

        // The Multiplayer tag is used for Online Multiplayer, taking that into account
        if(tag === 'Online Multiplayer') tag = 'Multiplayer';

        var filePath = './data/tags/' + tag + '.json';

        fs.readFile(filePath, function(err, data) {

            if(err) {
                requestGamesBy('tag', tag, filePath, res);
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(data);
            }

        });

    } else {

        fs.readFile('./data/all.json', function(err, data) {

            if(err) {
                requestGames(res);
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(data);
            }

        });

    }

});

app.get('/api/get_games_by_genre', function(req, res) {

    var genre = req.query.genre;

    if(!genre);

});

// If no API request, handles the redirection to Angular
app.all('*', function (req, res, next) {
    res.sendFile(path.resolve('./public/dist/index.html'));
});

// Server listening
var server = app.listen(app.get('port'), function () {

    console.log('Server is running on', app.get('port'));

});

// Calling updateTagFile which will call itself until all the necessary tags are updated
// Once it's done, it calls updateGenreFile which will do the same
// Once updateGenreFile is done, it will set a timeout of 12 hours on updateTagFile
updateTagFile(0);

async function updateTagFile(i) {
    if(i < tags.length) {
        requestGamesBy('tag', tags[i], './data/tags/' + tags[i] + '.json');
        setTimeout(updateTagFile, 15 * 1000, ++i);
    } else {
        // If i >= tags.length, then it means that all tags have been or are being updated
        // Call updateGenreFile to do the same with genres files
        updateGenreFile(0);
    }
}

async function updateGenreFile(i) {
    if(i < genres.length) {
        requestGamesBy('genre', genres[i], './data/genres/' + genres[i] + '.json');
        setTimeout(updateGenreFile, 15 * 1000, ++i);
    } else {
        // Calling updateTagsFile after 12 hours to start the whole updating process again
        setTimeout(updateTagFile, 12 * 60 * 60 * 1000, 0)
    }
}

async function requestGamesBy(req, needed, filePath, res) {
    var URL = 'http://steamspy.com/api.php?request=' + req + '&' + req + '=' + needed;
    request.get(URL, function(error, response, body) {
        if(res) {
            res.setHeader('Content-Type', 'application/json');
            res.send(body);
        } 
        fs.writeFile(filePath, body, function(err) {
            if(err) console.log(err);
        });
    })
}