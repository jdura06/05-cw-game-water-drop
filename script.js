// Variables to control game state
let gameRunning = false; // Keeps track of whether game is active or not
let dropMaker; // Will store our timer that creates drops regularly
let timerMaker; // Will store our timer countdown interval
let score = 0; // Tracks the player's score
let timeLeft = 30; // Game duration in seconds

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const messageEl = document.getElementById("game-message");
const startBtn = document.getElementById("start-btn");
const gameContainer = document.getElementById("game-container");

// Wait for button click to start the game
document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
  // Prevent multiple games from running at once
  if (gameRunning) return;

  gameRunning = true;
  score = 0;
  timeLeft = 30;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  messageEl.textContent = "";
  startBtn.disabled = true;
  gameContainer.querySelectorAll(".water-drop").forEach((drop) => drop.remove());

  // Create new drops every second (1000 milliseconds)
  dropMaker = setInterval(createDrop, 1000);
  timerMaker = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (!gameRunning) return;

  timeLeft -= 1;
  timeEl.textContent = timeLeft;

  if (timeLeft <= 0) {
    endGame();
  }
}

function endGame() {
  if (!gameRunning) return;

  gameRunning = false;
  clearInterval(dropMaker);
  clearInterval(timerMaker);
  startBtn.disabled = false;

  const endingMessage = score >= 20
    ? "You win! Great job!"
    : "Try again! Reach 20 drops to win.";

  messageEl.textContent = endingMessage;
  gameContainer.querySelectorAll(".water-drop").forEach((drop) => drop.remove());
}

function createDrop() {
  // Create a new div element that will be our water drop
  const drop = document.createElement("div");
  drop.className = "water-drop";

  // Make drops different sizes for visual variety
  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  drop.style.width = drop.style.height = `${size}px`;

  // Position the drop randomly across the game width
  // Subtract 60 pixels to keep drops fully inside the container
  const gameWidth = document.getElementById("game-container").offsetWidth;
  const xPosition = Math.random() * (gameWidth - 60);
  drop.style.left = xPosition + "px";

  // Make drops fall for 4 seconds
  drop.style.animationDuration = "4s";

  // Add the new drop to the game screen
  gameContainer.appendChild(drop);

  // When a drop is clicked, increase score and remove it
  drop.addEventListener("click", () => {
    score += 1;
    scoreEl.textContent = score;
    drop.remove();
  });

  // Remove drops that reach the bottom (weren't clicked)
  drop.addEventListener("animationend", () => {
    drop.remove(); // Clean up drops that weren't caught
  });
}
