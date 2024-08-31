let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
   if (!started) {
      console.log("Game started");
      started = true;

      levelUp();
   }
});

function userFlash(btn) {
   btn.classList.add("userFlash");

   setTimeout(() => {
      btn.classList.remove("userFlash");
   }, 250);
}
function gameFlash(btn) {
   btn.classList.add("flash");

   setTimeout(() => {
      btn.classList.remove("flash");
   }, 250);
}

function levelUp() {
   userSeq = [];
   level++;
   h2.innerText = `Level ${level}`;

   let randIdx = Math.floor(Math.random() * 4);
   let randColor = btns[randIdx];
   let randBtn = document.querySelector(`.${randColor}`);

   //    console.log(randIdx);
   //    console.log(randColor);
   //    console.log(randBtn);

   gameSeq.push(randColor);
   console.log(gameSeq);

   gameFlash(randBtn);
}

function checkAns(idx) {
   if (userSeq[idx] === gameSeq[idx]) {
      if (userSeq.length == gameSeq.length) {
         setTimeout(levelUp, 1000);
      }
   } else {
      h2.innerHTML = `Game over!  Your score was ${level} <br> Press any key to start`;
      document.querySelector("body").style.backgroundColor = "red";
      setTimeout(function () {
         document.querySelector("body").style.backgroundColor = "white";
      }, 2000);

      reset();
   }
}

function btnPress() {
   let btn = this;
   userFlash(btn);
   let userColor = btn.getAttribute("id");
   userSeq.push(userColor);

   checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
for (btn of allBtn) {
   btn.addEventListener("click", btnPress);
}

function reset() {
   started = false;
   userSeq = [];
   gameSeq = [];
   level = 0;
}