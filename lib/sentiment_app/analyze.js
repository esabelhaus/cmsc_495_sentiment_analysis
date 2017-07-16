var sentiment = require('sentiment');

(function(){
  // follow strict JavaScript syntax rules
  "use strict";

  exports.analysis = function(sentiments, log, callback) {
    var overall = 0;
    var num_processed = 0;
    var processed_sentiments = [];

    if (sentiments.length === 0) {
      // respond with an error
      log.debug("missing a sentiment");
      callback('ERROR: no sentences provided');
    } else {
      // log the raw sentiments
      log.debug(sentiments);

      for(var sent in sentiments) {
        // log the step of processing each line
        log.debug("processing:", sentiments[sent]);
        var result = sentiment(sentiments[sent]);
        if (result.score !== 0) {
          overall += result.score;
          num_processed++;
        }
        processed_sentiments.push(
          {
            "score": result.score,
            "sentence": sentiments[sent]
          }
        );
      }

      // ensure we don't divide by 0
      if (num_processed === 0) {
        num_processed++;
      }

      // log the processed sentiments
      log.debug(processed_sentiments);
      log.debug("Overall score", overall / num_processed);

      callback(null, {
        "overall": overall / num_processed,
        "processed_sentiments": processed_sentiments
      });
    }
  };

})();
