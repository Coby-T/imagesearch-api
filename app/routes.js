'use strict';

module.exports = function (app, db) {
    
    var path = require('path');
    var dateFormat = require('dateformat');
    
    app.get('/', function (req, res) {
        res.send("Read me.");
    });
    
    app.get('/search', handlePost);
    
    app.get('/latestsearches', handleGet);
    
    function handleGet(req, res) {
        var searchHistory = db.collection('searches');
        searchHistory.find().toArray(function(err, latestSearches) {
            if (err) {
                throw new Error('Error retrieving files from database.');
            }
            res.json(latestSearches);
        });
    }
    
    function handlePost(req, res) {
        var date = new Date();
        var currentSearch = {
            'query': decodeURIComponent(req.query.q),
            'page': req.query.offset || "0",
            'date': dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT")
        };
        var SearchController = require("./searchController.js");
        var controller = new SearchController(db);
        
        controller.search(currentSearch, function(results) {
            res.end(results);
        });
        controller.addToSearchHistory(currentSearch);
    }
};