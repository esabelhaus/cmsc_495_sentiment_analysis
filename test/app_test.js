var express = require('express'),
    app = express(),
    SentimentApp = require('../lib/sentiment_app'),
    expressValidator = require('express-validator'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(),
    nock = require('nock'),
    request = require('supertest');

(function(){
  "use strict";
  app.use(cookieParser());
  app.use(express.static('../public'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(expressValidator());

  var sentimental = new SentimentApp(app, 'config.json');

  var sentiments = {
    "text": [
      "When a father gives to his son,",
      "both laugh;",
      "when a son gives to his father,",
      "both cry."
    ]
  };

  describe('POST to api with valid data', function() {
    it('should respond with a json object with sentiments and overall score', function(done) {
      request(app)
      .post('/data')
      .send(sentiments)
      .expect(200)
      .end(function(err, res){
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
  });

})();
