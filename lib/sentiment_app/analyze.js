var sentiment = require('sentiment');

(function(){
  // follow strict JavaScript syntax rules
  "use strict";

  exports.analysis = function(sentiments, log, callback) {
    var overall = 0;
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
        overall += result.score;
        processed_sentiments.push(
          {
            "score": result.score,
            "sentence": sentiments[sent]
          }
        );
      }

      // log the processed sentiments
      log.debug(processed_sentiments);
      log.debug("Overall score", overall / sentiments.length);

      callback(null, {
        "overall": overall / sentiments.length,
        "processed_sentiments": processed_sentiments
      });
    }
  };

})();
