'use strict';

module.exports = function (app, db) {
    
    var express = require('express');
    var dateFormat = require('dateformat');
    
    app.get('/', express.static("views"));
    
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
            var resultArr = [];
            results.map(function(resultObj) {
                resultArr.push({
                    title: resultObj.title,
                    description: (resultObj.description) ? resultObj.description : " ",
                    uploader: (resultObj.account_url) ? resultObj.account_url : " ",
                    upload_date: datetimeConvert(resultObj.datetime),
                    link: resultObj.link
                });
            });
            res.json(resultArr);
        });
        controller.addToSearchHistory(currentSearch);
    }
    
    function datetimeConvert (dateString) {
        var date = new Date(dateString * 1000);
        return dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    }
};