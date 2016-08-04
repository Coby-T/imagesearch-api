'use strict';

module.exports = function Controller (db) {
    
    var searchHistory = db.collection('searches');
    
    this.search = function (searchParameters, callback) {
        var query = searchParameters.query;
        var page = searchParameters.page;
        var https = require('https');
        var requestOptions = {
            protocol: 'https:',
            method: 'GET',
            host: 'api.imgur.com',
            path: '/3/gallery/search/'+ page + '?q=' + query,
            headers: {'Authorization' : "Client-ID " + (process.env.CLIENT_ID || 'faca5501ac60472')}
        };
        var request = https.request(requestOptions, function (req) {
            var result = '';
            req.setEncoding('utf8');
            req.on('data', function(data) {
                result += data;
            });
            req.on('end', function() {
                callback(JSON.parse(result).data);
            });
        });
        request.end();
    };
    
    this.addToSearchHistory = function (currentSearch) {
        searchHistory.save({
            query: currentSearch.query,
            date: currentSearch.date
        });
    };
    
};