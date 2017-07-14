function analyzeInput() {
  "use strict";

  if($('textarea').val().length === 0) {
    displayError('Please input some text, then submit again');
  } else {
    $.ajax({
      type: "POST",
      url: "/data",
      async: true,
      dataType: 'json',
      contentType: 'application/json',
      data: $('textarea').val().split('\n'),
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
