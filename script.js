let data;
let inputField = document.querySelector(".input");
let hamburger = document.querySelector(".hamburger");
let navLinks = document.querySelector(".nav-bar");
let errorMessage = document.querySelector(".error-message");
let submitBtn = document.querySelector(".submit-btn");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  navLinks.classList.toggle("height");
});
submitBtn.addEventListener("click", showUrl);
function showUrl() {
  if (inputField.value.startsWith("https://") && inputField.value.length > 1) {
    let htmlContent = "";
    errorMessage.style.display = "";

    fetch(`https://api.shrtco.de/v2/shorten?url=${inputField.value}`)
      .then((response) => response.json())
      .then((res) => (data = res.result.full_short_link3))
      .then(() => {
        htmlContent = `
        <div class="shortened-card">
        <h4 class="copy-h">${inputField.value}</h4>
        <div class="copy">
        <h4>${data}</h4>
        <button class="copy-btn">copy</button>
        </div>
        </div>`;

        document.querySelector(".shortened").innerHTML += htmlContent;

        inputField.value = "";

        Array.from(document.querySelectorAll(".copy-btn")).forEach((item) => {
          item.addEventListener("click", (e) => {
            let clipText = e.target.previousElementSibling.textContent;
            navigator.clipboard.writeText(clipText);
            e.target.textContent = "copied";
            e.target.style.background = "hsl(255, 11%, 22%)";
            setTimeout(() => {
              e.target.textContent = "copy";
              e.target.style.background = "";
            }, 400);
          });
        });
      });
  } else {
    errorMessage.style.display = "flex";
  }
}
