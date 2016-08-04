'use strict';

var express = require('express');
var mongo = require('mongodb').MongoClient;
var routes = require('./app/routes.js');
var app = express();

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/data';
var PORT = process.env.PORT || '8080';

mongo.connect(MONGODB_URI, function(err, db) {
   if (err) {
       throw new Error('Could not connect to the database.');
   }
   else {
       console.log('Successfully connected to the database.');
   }

    routes(app, db);
    
    app.listen(PORT, function() {
        console.log('Node.js is now listening on port ' + PORT);
    });
});