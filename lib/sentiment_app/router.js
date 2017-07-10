// This is where we will instantiate the express.Router library to
// define the `/` as GET and `/data` as POST routes
var express = require('express'),
    router = express.Router(),
    util = require('util'),
    analyze = require('./analyze');

(function(){
  // follow strict JavaScript syntax rules
  "use strict";

  module.exports = function(nconf, log) {
    // this will be exposed using the post route in the router
    router.post('/data', function(req,res) {
      log.info('User requested analysis');

      var overall = 0;
      var processed_sentiments = [];

      var sentiments = req.body.text;

      log.debug('Begin processing sentiments');
      analyze.analysis(sentiments, log, function(error, analyzed_sentiments) {
        if(error) {
          res.status(400).send(error);
        } else {
          res.json(analyzed_sentiments);
        }
      });
      log.debug('Finished processing sentimets');
    });

    return router;
  };
})();
