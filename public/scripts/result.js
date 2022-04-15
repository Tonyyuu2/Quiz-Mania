$(function() {
  //confetti

  const Confettiful = function (el) {
    this.el = el;
    this.containerEl = null;

    this.confettiFrequency = 3;
    this.confettiColors = ["#fce18a", "#ff726d", "#b48def", "#f4306d"];
    this.confettiAnimations = ["slow", "medium", "fast"];

    this._setupElements();
    this._renderConfetti();
  };

  Confettiful.prototype._setupElements = function () {
    const containerEl = document.createElement("div");
    const elPosition = this.el.style.position;

    if (elPosition !== "relative" || elPosition !== "absolute") {
      this.el.style.position = "relative";
    }

    containerEl.classList.add("confetti-container");

    this.el.appendChild(containerEl);

    this.containerEl = containerEl;
  };

  Confettiful.prototype._renderConfetti = function () {
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

      confettiEl.removeTimeout = setTimeout(function () {
        confettiEl.parentNode.removeChild(confettiEl);
      }, 7000);

      this.containerEl.appendChild(confettiEl);
      if (intervalCounter > 100) {
        clearInterval(this.confettiInterval);
      }
    }, 25);
  };

  window.confettiful = new Confettiful(document.querySelector(".mainQuizResultContainer"));

  const popUp = document.querySelector(".share");
  const shareDialog = document.querySelector("dialog")

  popUp.addEventListener('click', function (event) {
    event.preventDefault();
    const url = event.target.href
    console.log('popUp-------', popUp, url);
    const actualLink = shareDialog.querySelector(".share_url");
    actualLink.href = url;
    actualLink.textContent = url;
    shareDialog.showModal();
  } );

  const copyLinkUrl = document.querySelector("#copyLinkButton");

  copyLinkUrl.addEventListener('click', function (event) {
    event.preventDefault();
    navigator.clipboard.writeText(popUp.href);
  });

  $('#copyLinkButton').click(function (e) {
    $('#copyLinkButton').addClass("complete");

  })

});
