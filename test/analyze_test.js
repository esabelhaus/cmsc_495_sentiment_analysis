var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

var analyze = require('../lib/sentiment_app/analyze');


var sentiments = ["When a father gives to his son,",
                  "both laugh;",
                  "when a son gives to his father,",
                  "both cry."];

describe('ANALYZE: successfully processes sentiments', function() {
  it('should return a json object with sentiments and overall score')
});
