var Routes = require('./sentiment_app/router'),
    nconf = require('nconf'),
    log_factory = require('./sentiment_app/logger');

(function(){
  // follow strict JavaScript syntax rules
  "use strict";

  // this invokes all functions of the application through the router
  function SentimentApp(app, configFile) {
    // specify what the express app is within SentimentApp
    this.app = app;
    // load the specified configuration file
    nconf.file({ file: configFile });
    // get the log level from the config file
    var log_lvl = nconf.get("log:level");
    // create log factory with defined log level
    var log = log_factory(log_lvl);
    // use router library to define core RESTful web functionality
    var routes = new Routes(nconf.get("queue"), log);

    // instruct Express to handle all web routes defined in routes
    app.use('/', routes);
    // instruct express to log all requests when debugging is enabled
    app.use(function(req, res, next) {
      req.log = log.debug("Request received: ", req.body);
      next();
    });
  }

  // This provides the main export of the application for use with express in app.js
  module.exports = function(app, configFile) {
    return new SentimentApp(app, configFile);
  };

})();
