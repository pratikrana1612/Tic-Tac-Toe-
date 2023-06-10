const section = document.getElementById("main_section");
const h1 = document.getElementById("chance");
const line = document.querySelector(".line");
const backDrop = document.querySelector("#backdrop");
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
      array.forEach(el => document.getElementById(el).style['backgroundColor']="rgba(144, 238, 144, 0.7)")
      return 
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

section.addEventListener("click", ClickHandler);
