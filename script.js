const bat = document.getElementById("bat");
const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");
const ballsDisplay = document.getElementById("balls");
const oversDisplay = document.getElementById("overs");
const totalBallsDisplay = document.getElementById("totalBalls");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");

let score = 0;
let balls = 0;
let totalBalls = 12; // 2 overs
let gameOver = false;

function updateScoreboard() {
  scoreDisplay.textContent = score;
  ballsDisplay.textContent = balls;
  oversDisplay.textContent = \`\${Math.floor(balls / 6)}.\${balls % 6}\`;
}

function dropBall() {
  if (balls >= totalBalls || gameOver) {
    message.textContent = "🎉 Innings Over!";
    resetBtn.style.display = "inline-block";
    return;
  }

  let ballTop = 0;
  let randomLeft = Math.floor(Math.random() * 240) + 20;
  ball.style.left = randomLeft + "px";
  ball.style.top = "0px";

  const interval = setInterval(() => {
    if (gameOver) {
      clearInterval(interval);
      return;
    }

    ballTop += 5;
    ball.style.top = ballTop + "px";

    const ballBottom = ball.offsetTop + ball.offsetHeight;
    const batTop = bat.offsetTop;
    const ballCenter = ball.offsetLeft + ball.offsetWidth / 2;
    const batLeft = bat.offsetLeft;
    const batRight = batLeft + bat.offsetWidth;

    if (ballBottom >= batTop) {
      clearInterval(interval);
      balls++;
      if (ballCenter >= batLeft && ballCenter <= batRight) {
        const run = Math.random() > 0.5 ? 6 : 4;
        score += run;
        message.textContent = \`\${run} RUNS! 🏃\`;
      } else {
        message.textContent = "🏏 OUT!";
        gameOver = true;
        resetBtn.style.display = "inline-block";
      }

      updateScoreboard();

      setTimeout(() => {
        message.textContent = "";
        dropBall();
      }, 1000);
    }
  }, 30);
}

bat.addEventListener("click", () => {
  bat.style.transform = "rotate(-45deg)";
  setTimeout(() => {
    bat.style.transform = "rotate(0deg)";
  }, 200);
});

resetBtn.addEventListener("click", () => {
  score = 0;
  balls = 0;
  gameOver = false;
  updateScoreboard();
  message.textContent = "";
  resetBtn.style.display = "none";
  dropBall();
});

updateScoreboard();
dropBall();
