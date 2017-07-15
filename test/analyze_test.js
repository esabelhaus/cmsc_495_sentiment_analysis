var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

var logger = require('../lib/sentiment_app/logger.js');

var analyze = require('../lib/sentiment_app/analyze');


var sentiments = ["When a father gives to his son,",
                  "both laugh;",
                  "when a son gives to his father,",
                  "both cry."];

// expectation of processed sentiments
// {
//   overall: 0,
//   processed_sentiments:[
//     { score: 0, sentence: 'When a father gives to his son,' },
//     { score: 1, sentence: 'both laugh;' },
//     { score: 0, sentence: 'when a son gives to his father,' },
//     { score: -1, sentence: 'both cry.' }
//   ]
// }

describe('ANALYZE: successfully processes sentiments', function() {
  it('should return a json object with sentiments and overall score', function(done) {
    analyze.analysis(sentiments, logger("debug"), function(err, res){
      if(err) {
        done(err);
      }
      assert(res.overall === 0);
      assert(res.processed_sentiments[0].score === 0);
      assert(res.processed_sentiments[1].score === 1);
      assert(res.processed_sentiments[2].score === 0);
      assert(res.processed_sentiments[3].score === -1);
      done();
    });
  });
});

describe('ANALYZE: successfully handles when no sentence is provided', function(){
  it('should return an error statement', function(done) {
    console.log([].length);
    analyze.analysis([], logger("debug"), function(err, res) {
      should.exist(err);
      assert(err === "ERROR: no sentences provided");
      done();
    });
  });
});
