// <!-- Animated Words -->

document.addEventListener("DOMContentLoaded", (event) => {
  const textArray = ["Designer", "Developer", "Freelancer", "Photographer"];
  const typingSpeed = 200;
  const erasingSpeed = 200;
  const newTextDelay = 500;
  let textArrayIndex = 0;
  let charIndex = 0;
  const typedTextSpan = document.getElementById("typed-text");

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingSpeed + 1100);
    }
  }

  setTimeout(type, newTextDelay + 250);
});

// animated-number

document.addEventListener("DOMContentLoaded", function () {
  const animatedNumbers = document.querySelectorAll(".animated-number");

  animatedNumbers.forEach((animatedNumber) => {
    const endValue = parseInt(animatedNumber.getAttribute("data-end"), 10);
    const duration = 1000; // Duration of the animation in milliseconds
    const frameDuration = 1000 / 20; // Approximate frame duration for 60fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = setInterval(() => {
              frame++;
              const progress = frame / totalFrames;
              const currentNumber = Math.round(endValue * progress);

              animatedNumber.textContent = currentNumber;

              if (frame === totalFrames) {
                clearInterval(counter);
                animatedNumber.textContent = endValue;
              }
            }, frameDuration);

            observer.unobserve(animatedNumber);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(animatedNumber);
  });
});

// <!-- Code injected by live-server -->
// <![CDATA[  <-- For SVG support
if ("WebSocket" in window) {
  (function () {
    function refreshCSS() {
      var sheets = [].slice.call(document.getElementsByTagName("link"));
      var head = document.getElementsByTagName("head")[0];
      for (var i = 0; i < sheets.length; ++i) {
        var elem = sheets[i];
        var parent = elem.parentElement || head;
        parent.removeChild(elem);
        var rel = elem.rel;
        if (
          (elem.href && typeof rel != "string") ||
          rel.length == 0 ||
          rel.toLowerCase() == "stylesheet"
        ) {
          var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, "");
          elem.href =
            url +
            (url.indexOf("?") >= 0 ? "&" : "?") +
            "_cacheOverride=" +
            new Date().valueOf();
        }
        parent.appendChild(elem);
      }
    }
    var protocol = window.location.protocol === "http:" ? "ws://" : "wss://";
    var address =
      protocol + window.location.host + window.location.pathname + "/ws";
    var socket = new WebSocket(address);
    socket.onmessage = function (msg) {
      if (msg.data == "reload") window.location.reload();
      else if (msg.data == "refreshcss") refreshCSS();
    };
    if (
      sessionStorage &&
      !sessionStorage.getItem("IsThisFirstTime_Log_From_LiveServer")
    ) {
      console.log("Live reload enabled.");
      sessionStorage.setItem("IsThisFirstTime_Log_From_LiveServer", true);
    }
  })();
} else {
  console.error(
    "Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading."
  );
}
