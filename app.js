const section = document.getElementById("main_section");
const h1 = document.getElementById("chance");
const line = document.querySelector(".line");
const backDrop = document.querySelector("#backdrop");
const el_score1 = document.getElementById(`user1-score`);
const el_score2 = document.getElementById(`user2-score`);
let [user1Score, user2Score] = intialSetup();
// let user1Score = localStorage.getItem("user1") || 0;
// let user2Score = localStorage.getItem("user2") || 0;

let sings = new Array(9);
let turn = "user1";
let possibleWins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
localStorage.setItem("user1", user1Score);
localStorage.setItem("user2", user2Score);

 function intialSetup () {
  if (!localStorage.getItem("user1") || !localStorage.getItem("user2")) {
    localStorage.setItem("user1", 0);
    localStorage.setItem("user2", 0);
  }
  let user1Score = localStorage.getItem("user1") || 0;
  let user2Score = localStorage.getItem("user2") || 0;
  el_score1.textContent = user1Score;
  el_score2.textContent = user2Score;
  return [user1Score, user2Score];
};
const gameOver = (winner) => {
  section.removeEventListener("click", ClickHandler);
  backDrop.classList.add("backdrop");
  backDrop.innerHTML = `<h1>${winner} is the winner!</h1>`.toUpperCase();
};
const drawTheLine = (winningPair) => {
  const el = document.getElementById(winningPair[0]);
  line.style.display = "block";
  if (
    possibleWins[0] === winningPair ||
    possibleWins[1] === winningPair ||
    possibleWins[2] === winningPair
  ) {
    line.classList.add("line_horizontal");
    console.log(el.offsetTop);
    line.style.top = el.offsetTop + 50 + "px";
    line.style.left = 0 + "px";
  } else if (
    possibleWins[3] === winningPair ||
    possibleWins[4] === winningPair ||
    possibleWins[5] === winningPair
  ) {
    line.classList.add("line_vertical");
    line.style.left = el.offsetLeft + 50 + "px";
    line.style.top = 0 + "px";
  } else if (
    possibleWins[6] === winningPair ||
    possibleWins[7] === winningPair
  ) {
    line.classList.add("line_horizontal");
    line.style.transform =
      possibleWins[7] === winningPair ? "rotate(135deg)" : "rotate(225deg)";
  }
};
const scoreUpdate = (winner) => {
  if (!winner) {
    return;
  }
  const key = winner;
  let score = winner === "user1" ? ++user1Score : ++user2Score;
  localStorage.setItem(key, score);
  el_score1.textContent = user1Score;
  el_score2.textContent = user2Score;
};
const WinnerChecker = function (Player) {
  for (const array of possibleWins) {
    if (
      (sings[array[0]] === "⭕" || sings[array[1]] === "❌") &&
      sings[array[0]] === sings[array[1]] &&
      sings[array[1]] === sings[array[2]]
    ) {
      console.log(`${Player} is the winer`);
      gameOver(Player);
      drawTheLine(array);
      scoreUpdate(Player);
      array.forEach(
        (el) =>
          (document.getElementById(el).style["backgroundColor"] =
            "rgba(144, 238, 144, 0.7)")
      );
      return;
    }
  }
  if (!sings.includes(undefined)) {
    console.log(`Game is Draw`);
    gameOver("NO ONE");
  }
};
const ClickHandler = (event) => {
  if (turn === "user1" && !event.target.textContent) {
    h1.textContent = "❌'s Turn";
    event.target.textContent = "⭕";
    index = event.target.id || -1;
    sings[index] = "⭕";
    turn = "user2";
    console.log(sings);
    WinnerChecker("user1");
  } else if (turn === "user2" && !event.target.textContent) {
    h1.textContent = "⭕'s Turn";
    event.target.textContent = "❌";
    index = event.target.id || -1;
    sings[index] = "❌";
    turn = "user1";
    WinnerChecker("user2");
    console.log(sings);
  }
};
const cheter = (event) => {
  if (event.key === "p") {
    sings.forEach((sing, idx) => {
      if (sing) {
        document.getElementById(idx).textContent = sing === "⭕" ? "❌" : "⭕";
      }
    });
    sings = sings.map((sing) => (sing && sing === "⭕" ? "❌" : "⭕"));
    console.log("cheated");
    // console.log(sings);
  }
};
section.addEventListener("click", ClickHandler);
document.body.addEventListener("keypress", cheter);
