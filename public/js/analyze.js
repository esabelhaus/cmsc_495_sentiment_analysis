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
  alert(data);
}

function displayError(message) {
  "use strict";

  console.log(message);
  $('#flash').text(message);
  $(function() {
    $('#flash').delay(500).fadeIn('normal', function() {
      $(this).delay(2500).fadeOut();
    });
  });
}
