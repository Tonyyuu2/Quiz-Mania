$(function() {


  $('#share').click(function(event) {
    event.preventDefault();
    const url = "http://localhost:8080" + $(this).attr("href");
    console.log(url);
  });

  $('#check').click(function(e) {
    e.preventDefault();

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.has('qid');
    const qid = searchParams.get('qid');
    const que = searchParams.get('que');

    const $selectedOption = $("input[name=option]:checked");
    const userInput = $selectedOption.val();
    $.ajax({
      type: "GET",
      url: `/quiz-attempts/${qid}/questions/${que}/check`,
      data: { 'option': userInput }
    }).then(function(result) {
      console.log(result);
      if (result.isTrue) {
        $selectedOption.parent().css("background-color", "#97DBAE");
      } else {
        $selectedOption.parent().css("background-color", "#FF7878");
        $(`input[value= "${result.answer}"]`).parent().css("background-color", "#97DBAE");
      }

      $('#check').addClass('hide');
      $('#next').removeClass('hide');
    });
  });

  let executeRocket = function (callback) {
      $(".rocket_container").animate({
        easing: "swing",
        height: "1000px",
        right: "500px",
        opacity: "0.01"
      });
      window.setTimeout(callback, 800)

  }

  $('#startQuiz').click(function (e) {
    e.preventDefault();
    let startQuizLink = $(this).attr('data-url');
    executeRocket(function () {
      console.log("callback", startQuizLink);
      window.location.href = startQuizLink;
    })
  })


  // $('primary-btn share').click(function (e) {
  //   e.preventDefault();
  //   navigator.clipboard.writeText("href").then(function() {
  //     /* clipboard successfully set */
  //   }, function() {
  //     /* clipboard write failed */
  //   });
  //   $('primary-btn share').addClass('share1');
  // })

});

