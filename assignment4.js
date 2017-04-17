// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function() {
  // Magic!
  $(".flexsearch-input").on("keyup", function () {
    $(".predictions").empty();
    getPredictions($(".flexsearch-input").val());
  });

  function getPredictions(val) {
    if(val != "") {
      $.ajax({
        url: "http://www.mattbowytz.com/simple_api.json?data=all",
        method: "GET",
        datatype: "json"
      })
      .done(function (data) {
        $.each(data['data'], function () {
          debugger;
            $.each(this, function () {
              /* check if the lowercase versions of the input matchest the beginning
              of the lowercase version of one of the suggestions returned by thee
              ajax calls */
              if(this.toString().toLowerCase().match("^" + val.toLowerCase())) {
                if($(".predictions").hasClass("predictionsContainer") === false) {
                  $(".predictions").addClass("predictionsContainer");
                }
                $(".predictions").append("<li><a href='http://www.google.com/search?q=" + this + "' target='_blank'>" + this + "<a></li>");
              }
          })
        });
      });
    }
    else {
      $(".predictions").removeClass("predictionsContainer");
    }
  }
})();
