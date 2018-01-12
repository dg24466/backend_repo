//Express is required for creating Node.js based web apps
var express = require('express');
//body-parser is used to parse the Request body and populate the req.
var bodyParser = require('body-parser');
//mongoose is used for interacting with MongoDB - ODM
var mongoose = require('mongoose');
// Create Express app
var app = express();
// Setting port no for listening
app.set('port', 8080);
app.use(bodyParser.json());
//Let’s specify mongodb’s database name and the fully qualified path of mongod // server
var dbHost = 'mongodb://localhost:27017/mediwareDB';
mongoose.connect(dbHost);

//Create a schema for user
var userSchema = mongoose.Schema({
    id: { type: Number, index: true, unique: true },
    username: String,
    password: String
});
var user = mongoose.model('users', userSchema);
// connecting to Mongod instance mongoose.connection;
//Starting up the server on the port: 9999
app.listen(app.get('port'), function () {
    console.log('Server up: http://localhost:' + app.get('port'));
});
// To allow CORS - Cross Origin Resrouce Sharing
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Get all the users
app.get('/users', function (req, res) {
    user.find({}, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});
