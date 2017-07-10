var sentiment = require('sentiment');

(function(){
  // follow strict JavaScript syntax rules
  "use strict";

  exports.analysis = function(sentiments, log, callback) {

    if (sentiments.length === 0) {
      // respond with an error
      callback('ERROR: no sentences provided');
    }

    for(var sent in sentiments) {
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

    callback(null, {
      "overall": overall / sentiments.length,
      "processed_sentiments": processed_sentiments
    });
  };

})();
