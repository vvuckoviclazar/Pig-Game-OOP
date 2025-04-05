"use strict";

const playerScore1 = document.querySelector(".player1-score");
const playerScore2 = document.querySelector(".player2-score");
const currentScore1 = document.querySelector(".current-score1");
const currentScore2 = document.querySelector(".current-score2");
const randomNumber = document.querySelector(".random-number");
const newGameBtn = document.querySelector(".new-game");
const generateBtn = document.querySelector(".generate-number");
const holdBtn = document.querySelector(".hold");
const right = document.querySelector(".right-player");
const left = document.querySelector(".left-player");
const currentDiv1 = document.querySelector(".current-Div1");
const currentDiv2 = document.querySelector(".current-Div2");

class Game {
  constructor(scoreElement, currentScoreElement) {
    this.score = 0;
    this.currentScore = 0;
    this.scoreElement = scoreElement;
    this.currentScoreElement = currentScoreElement;
  }

  addToCurrentScore(number) {
    this.currentScore += number;
    this.updateCurrentScoreUI();
  }

  holdScore() {
    this.score += this.currentScore;
    this.resetCurrentScore();
    this.updateScoreUI();
  }

  resetCurrentScore() {
    this.currentScore = 0;
    this.updateCurrentScoreUI();
    return this.currentScore;
  }

  resetScore() {
    this.score = 0;
    this.updateScoreUI();
    return this.score;
  }

  getScore() {
    return this.score;
  }

  updateScoreUI() {
    this.scoreElement.textContent = this.score >= 20 ? "Winner!" : this.score;
  }

  updateCurrentScoreUI() {
    this.currentScoreElement.textContent = this.currentScore;
  }
}

class GameManager {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.activePlayer = "player1";
    this.currentRandom = Math.ceil(Math.random() * 6);
    this.gameOver = false;
    randomNumber.textContent = this.currentRandom;
  }

  getActivePlayer() {
    return this.activePlayer === "player1" ? this.player1 : this.player2;
  }

  getInactivePlayer() {
    return this.activePlayer === "player1" ? this.player2 : this.player1;
  }

  switchPlayer() {
    this.activePlayer = this.activePlayer === "player1" ? "player2" : "player1";
  }

  updateUI(activeSide, inactiveSide, activeCurrentDiv, inactiveCurrentDiv) {
    randomNumber.textContent = this.currentRandom;

    activeSide.style.backgroundColor = "rgba(6, 73, 174, 0.646)";
    inactiveSide.style.backgroundColor = "rgba(115, 169, 250, 0.471)";

    activeCurrentDiv.style.backgroundColor = "rgb(0, 72, 155)";
    inactiveCurrentDiv.style.backgroundColor = "rgba(144, 186, 249, 0.264)";
  }

  winner() {
    if (this.player1.getScore() >= 20) {
      playerScore1.textContent = "Winner!";
      left.style.backgroundColor = "goldenrod";
      currentDiv1.style.backgroundColor = "rgba(144, 186, 249, 0.264)";
      this.gameOver = true;
    } else if (this.player2.getScore() >= 20) {
      playerScore2.textContent = "Winner!";
      right.style.backgroundColor = "goldenrod";
      currentDiv2.style.backgroundColor = "rgba(144, 186, 249, 0.264)";
      this.gameOver = true;
    }
  }

  rollNewRandom() {
    this.currentRandom = Math.ceil(Math.random() * 6);
    randomNumber.textContent = this.currentRandom;
  }
}

const player1 = new Game(playerScore1, currentScore1);
const player2 = new Game(playerScore2, currentScore2);

const gameManager = new GameManager(player1, player2);

generateBtn.addEventListener("click", () => {
  if (gameManager.gameOver) return;

  gameManager.rollNewRandom();

  if (gameManager.currentRandom === 1) {
    gameManager.getActivePlayer().resetCurrentScore();
    gameManager.switchPlayer();

    if (gameManager.activePlayer === "player1") {
      gameManager.updateUI(left, right, currentDiv1, currentDiv2);
    } else {
      gameManager.updateUI(right, left, currentDiv2, currentDiv1);
    }

    return;
  }

  if (gameManager.activePlayer === "player1") {
    gameManager.updateUI(left, right, currentDiv1, currentDiv2);
  } else {
    gameManager.updateUI(right, left, currentDiv2, currentDiv1);
  }

  gameManager.getActivePlayer().addToCurrentScore(gameManager.currentRandom);
  gameManager.getInactivePlayer().resetCurrentScore();
});

holdBtn.addEventListener("click", () => {
  if (gameManager.gameOver) return;

  gameManager.getActivePlayer().holdScore();
  gameManager.winner();

  if (gameManager.gameOver) return;

  gameManager.switchPlayer();

  if (gameManager.activePlayer === "player1") {
    gameManager.updateUI(left, right, currentDiv1, currentDiv2);
  } else {
    gameManager.updateUI(right, left, currentDiv2, currentDiv1);
  }
});

newGameBtn.addEventListener("click", () => {
  gameManager.rollNewRandom();

  player1.resetScore();
  player2.resetScore();
  player1.resetCurrentScore();
  player2.resetCurrentScore();

  gameManager.activePlayer = "player1";
  gameManager.gameOver = false;

  gameManager.updateUI(left, right, currentDiv1, currentDiv2);
});
