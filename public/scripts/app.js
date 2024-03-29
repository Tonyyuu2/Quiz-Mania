$(function() {


  $('#share').click(function(event) {
    event.preventDefault();
    const url = "http://localhost:8080" + $(this).attr("href");
  });

  $('#check').click(function(e) {
    e.preventDefault();

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.has('qid');
    const qid = searchParams.get('qid');
    const queid = searchParams.get('que');

    const addAttmept = function(qid, queid, isTrue) {

      $.ajax({
        type: "POST",
        url: "/quiz-attempts/my-attempts",
        data: { qid: `${qid}`, queid: `${queid}`, isTrue: `${isTrue}` }
      });

    };

    const $selectedOption = $("input[name=option]:checked");
    const userInput = $selectedOption.val();
    $.ajax({
      type: "GET",
      url: `/quiz-attempts/${qid}/questions/${queid}/check`,
      data: { 'option': userInput }
    }).then(function(result) {
      addAttmept(qid, queid, result.isTrue);

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

  let executeRocket = function(callback) {
    $(".rocket_container").animate({
      easing: "swing",
      height: "1000px",
      right: "500px",
      opacity: "0.01"
    });
    window.setTimeout(callback, 800);
  };

  $('#startQuiz').click(function(e) {
    e.preventDefault();
    let startQuizLink = $(this).attr('data-url');
    executeRocket(function() {
      window.location.href = startQuizLink;
    });
  });

  $('.generator').click(function(e) {
    e.preventDefault();
    const loadQuestion = async function() {
      const APIUrl = 'https://opentdb.com/api.php?amount=5&type=multiple';
      const result = await fetch(`${APIUrl}`);
      const data = await result.json();
      return data;
    };

    loadQuestion().then((result) => {
      $.ajax({
        type: "POST",
        url: "/quizzes/random",
        data: { data: result }
      }).then(() => {
        window.location.reload();
      });

    }
    );
  });
});



