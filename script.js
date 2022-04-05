//Shorten any valid URL
//See a list of their shortened links, even after refreshing the browser
//Copy the shortened link to their clipboard in a single click
let data;
let inputField = document.querySelector(".input");
let hamburger = document.querySelector(".hamburger");
let navLinks = document.querySelector(".nav-bar");
let errorMessage = document.querySelector(".error-message");
let submitBtn = document.querySelector(".submit-btn");
inputField.addEventListener("focusout", () => {
  if (inputField.value.length < 1) {
    errorMessage.style.display = "flex";
  } else if (inputField.value.length > 0) {
    errorMessage.style.display = "";
  }
});

let check;
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  if (check) {
    navLinks.addEventListener("transitionend", () => {
      navLinks.style.height = "0px";
      check = false;
    });
  } else {
    navLinks.style.height = "max-content";
    check = true;
  }
});

submitBtn.addEventListener("click", (e) => {
  console.log(e.target);
  fetch(`https://api.shrtco.de/v2/shorten?url=${inputField.value}`)
    .then((response) => response.json())
    .then((res) => (data = res.result.full_short_link3))
    .then(() => showUrl(data));
});

function showUrl(url) {
  let html = `<div class="shortened-card">
  <h4 class="copy-h">${inputField.value}</h4>
  <div class="copy">
    <h4>${url}</h4>
    <button>copy</button>
  </div>
</div>`;

  document.querySelector(".shortened").innerHTML += html;
  inputField.value = "";
}
