// Client facing scripts here
$(function() {
  $('#share').click(function(event) {
    event.preventDefault();
    const url = "http://localhost:8080" + $(this).attr("href");
    console.log(url);
  });

  $('#check').click(function(e) {
    e.preventDefault();
    const $selectedOption = $("input[name=option]:checked");
    const myval = $selectedOption.val();
    console.log("Initial value from jQuery", myval);
    $.ajax({
      type: "GET",
      url: '/quiz-attempts/1/questions/1',
      data: { 'option': myval }
    }).then(function(result) {
      console.log(result);
      if (result.isTrue) {
        $selectedOption.parent().css("background-color", "green");
      } else {
        $selectedOption.parent().css("background-color", "red");
        $(`input[value= ${result.answer}]`).parent().css("background-color", "green");
      }
      $('#check').val("Next");
      $('#check').attr("id", "next");
      $('#next').text("Next");
    });
  });
});
