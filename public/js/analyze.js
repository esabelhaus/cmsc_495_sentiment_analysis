function analyzeInput() {
  "use strict";

  var req_data = JSON.stringify({
    "text": $('textarea').val().split('\n')
  });

  if($('textarea').val().length === 0) {
    displayError('Please input some text, then submit again');
  } else {
    $.ajax({
      type: "POST",
      url: "/data",
      async: true,
      dataType: 'json',
      contentType: 'application/json',
      data: req_data,
      success: displayOutput,
      error: function(err) {
        displayError(err.responseText);
      }
    });
  }
};

function displayOutput(data) {
  "use strict";

  $('#success').text("Sentiment Processed Successfully");
  $(function() {
    $('#success').delay(500).fadeIn('normal', function() {
      $(this).delay(2500).fadeOut();
    });
  });

  $('#output').empty();

  $('#output').append($('<li>').text('Overall Sentiment Score: ' + data.overall));

  $.each(data.processed_sentiments, function(n) {
    $('#output').append($('<li>').text(data.processed_sentiments[n].score + ', ' + data.processed_sentiments[n].sentence));
  });

  $('html, body').animate({ scrollTop: $("#output").offset().top }, 2000);
};

function displayError(message) {
  "use strict";

  $('#flash').text(message);
  $(function() {
    $('#flash').delay(500).fadeIn('normal', function() {
      $(this).delay(2500).fadeOut();
    });
  });
};
