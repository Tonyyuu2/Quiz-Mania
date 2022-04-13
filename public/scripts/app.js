// Client facing scripts here
$(function() {
  $('#share').click(function(event) {
    event.preventDefault();
    const url = "http://localhost:8080" + $(this).attr("href");
    console.log(url);
  });

  const createPage = (data) => {
    const $page = $(`<div class="ques_title flex-row">
    <h1 class="ques_number">${data.id}</h1>
    <h2 class="ques">${data.question_desc}</h2>

  </div>
  <div class="ques_options flex-row">
    <div class="options">
      <input
        type="radio"
        id="margotDisney"
        name="option"
        value="${data.option_1}"
      />
      <label for="margotDisney">${data.option_1}</label>
    </div>
    <div class="options">
      <input
        type="radio"
        id="waltDisney"
        name="option"
        value="${data.option_2}"
      />
      <label for="waltDisney">${data.option_2}</label>
    </div>
    <div class="options">
      <input
        type="radio"
        id="royDisney"
        name="option"
        value="${data.option_3}"
      />
      <label for="royDisney">${data.option_3}</label>
    </div>
    <div class="options">
      <input
        type="radio"
        id="maddoxDisney"
        name="option"
        value="${data.option_4}"
      />
      <label for="maddoxDisney">${data.option_4}</label>
    </div>
  </div>
  <div class="ques_btn">
    <button type="submit" class="primary-btn check" value="submit">
      Submit
    </button>
  </div>`)
    return $page;

  }

  const clickTwo = function(e) {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: '/quiz-attempts/ajax/1'
    }).then(result => {
      $('.ques_container').empty();
      $('.ques_container').append(createPage(result[1]));
      $('.next').val("Check");
      $('.next').addClass('check')
      $('.next').text("Check");
      $('.check').removeClass('next')
      $('.check').on('click', clickOne)
    });
  };

  const clickOne = function(e) {
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
      $('.check').val("Next");
      $('.check').addClass('next');
      $('.next').text("Next");
      $('.check').removeClass('check');
      $('.next').on('click', clickTwo);
      // console.log('$(\'.next\') :', $('.next'));
    });
  };
  $('.check').click(clickOne);
});

