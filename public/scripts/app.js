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
      console.log("callback", startQuizLink);
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
  //styling and popout menu------------------


  $(function() {
    $(".share_btn").dialog();
  });



  // $('primary-btn share').click(function (e) {
  //   e.preventDefault();
  //   navigator.clipboard.writeText("href").then(function() {
  //     /* clipboard successfully set */
  //   }, function() {
  //     /* clipboard write failed */
  //   });
  //   $('primary-btn share').addClass('share1');
  // })

  /* =========Trying out the API things====== */

  //background animation

  const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

  const numBalls = 50;
  const balls = [];

  for (let i = 0; i < numBalls; i++) {
    let ball = document.createElement("div");
    ball.classList.add("ball");
    ball.style.background = colors[Math.floor(Math.random() * colors.length)];
    ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
    ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
    ball.style.transform = `scale(${Math.random()})`;
    ball.style.width = `${Math.random()}em`;
    ball.style.height = ball.style.width;

    balls.push(ball);
    document.querySelector('.homeHeadingContainer').append(ball);
  }

  // Keyframes

  balls.forEach((el, i, ra) => {
    let to = {
      x: Math.random() * (i % 2 === 0 ? -11 : 11),
      y: Math.random() * 12
    };

    let anim = el.animate(
      [
        { transform: "translate(0, 0)" },
        { transform: `translate(${to.x}rem, ${to.y}rem)` }
      ],
      {
        duration: (Math.random() + 1) * 2000, // random duration
        direction: "alternate",
        fill: "both",
        iterations: Infinity,
        easing: "ease-in-out"
      }
    );
  });

  //confetti
  console.log('confetti-------', window.confetti);
  const Confettiful = function(el) {
    this.el = el;
    this.containerEl = null;

    this.confettiFrequency = 3;
    this.confettiColors = ["#fce18a", "#ff726d", "#b48def", "#f4306d"];
    this.confettiAnimations = ["slow", "medium", "fast"];

    this._setupElements();
    this._renderConfetti();
  };

  Confettiful.prototype._setupElements = function() {
    const containerEl = document.createElement("div");
    const elPosition = this.el.style.position;

    if (elPosition !== "relative" || elPosition !== "absolute") {
      this.el.style.position = "relative";
    }

    containerEl.classList.add("confetti-container");

    this.el.appendChild(containerEl);

    this.containerEl = containerEl;
  };

  Confettiful.prototype._renderConfetti = function() {
    let intervalCounter = 0;
    this.confettiInterval = setInterval(() => {
      intervalCounter++;
      const confettiEl = document.createElement("div");
      const confettiSize = Math.floor(Math.random() * 3) + 7 + "px";
      const confettiBackground = this.confettiColors[
        Math.floor(Math.random() * this.confettiColors.length)
      ];
      const confettiLeft = Math.floor(Math.random() * this.el.offsetWidth) + "px";
      const confettiAnimation = this.confettiAnimations[
        Math.floor(Math.random() * this.confettiAnimations.length)
      ];

      confettiEl.classList.add(
        "confetti",
        "confetti--animation-" + confettiAnimation
      );
      confettiEl.style.left = confettiLeft;
      confettiEl.style.width = confettiSize;
      confettiEl.style.height = confettiSize;
      confettiEl.style.backgroundColor = confettiBackground;

      confettiEl.removeTimeout = setTimeout(function() {
        confettiEl.parentNode.removeChild(confettiEl);
      }, 3000);

      this.containerEl.appendChild(confettiEl);
      if (intervalCounter > 100) {
        clearInterval(this.confettiInterval);
      }
    }, 25);
  };

  window.confettiful = new Confettiful(document.querySelector(".mainQuizResultContainer"));


});



