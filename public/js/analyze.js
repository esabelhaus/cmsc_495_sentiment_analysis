function analyzeInput() {
  "use strict";

  if($('textarea').val().length === 0) {
    $('#flash').text('Please input some text, then submit again');
    $(function() {
      $('#flash').delay(500).fadeIn('normal', function() {
        $(this).delay(2500).fadeOut();
      });
    });
  }

  // $.ajax({
  //   type: "POST",
  //   url: "/data",
  //   data: $('textarea').val().split('\n');
  // });
};
