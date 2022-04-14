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
    const queid = searchParams.get('que');

    const addAttmept = function(qid, queid, isTrue) {

      console.log("From post request", qid, queid, isTrue);

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
      console.log("From get request", qid, queid, result.isTrue);
      addAttmept(qid, queid, result.isTrue);
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

  /* =========Trying out the API things====== */
  $('.generator').click(function(e) {
    e.preventDefault();
    const loadQuestion = async function() {
      const APIUrl = 'https://opentdb.com/api.php?amount=5';
      const result = await fetch(`${APIUrl}`);
      const data = await result.json();
      return data;
    };

    loadQuestion().then((result) => {

      $.ajax({
        type: "POST",
        url: "/quizzes/random",
        data: { data: result }
      });

    }
    );
  });


});