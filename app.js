var express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    SentimentApp = require('./lib/sentiment_app');

(function() {
  // follow strict JavaScript syntax rules
  "use strict";

  // allow sessions to persist using cookies on request so that user sessions are not mixed up
  app.use(cookieParser());

  // serve up content which exists in the public folder
  app.use(express.static('public'));

  app.set('view engine', 'pug');

  // invoke SentimentApp and integrate functionality into Express app
  var sentimental = new SentimentApp(app, 'config.json');

  // have express app listen over port 3000 on TCP
  app.listen(3000);
})();
