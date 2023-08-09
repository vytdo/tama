class NumberRushGame {
  constructor() {
    this.gameArea = document.getElementById("numberRushGame");
    this.score = 0;
  }

  start() {
    this.order = Math.random() < 0.5 ? "asc" : "desc";
    document.getElementById("numberRushPrompt").textContent =
      this.order === "asc"
        ? "CLICK ON THE NUMBERS IN ASCENDING ORDER!"
        : "CLICK ON THE NUMBERS IN DESCENDING ORDER!";
    this.timeLeft = 10;
    this.nextNumber = 1;
    this.nextNumberDesc = 10;
    this.score = 0;
    this.updateTimer();

    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateTimer();
      if (this.timeLeft <= 0) {
        this.end(false);
      }
    }, 1000);

    this.numbers = Array.from({ length: 10 }, (_, i) => i + 1);

    this.numbers.forEach((number) => {
      let numberElement = document.createElement("button");
      numberElement.innerText = number;
      numberElement.id = `number-${number}`;
      numberElement.style.position = "absolute";
      numberElement.style.left = `${20 + Math.random() * 60}vw`;
      numberElement.style.top = `${30 + Math.random() * 50}vh`;
      numberElement.addEventListener("click", () => {
        if (
          (this.order === "asc" && number === this.nextNumber) ||
          (this.order === "desc" && number === this.nextNumberDesc)
        ) {
          this.score++;
          this.gameArea.removeChild(numberElement);
          if (this.order === "asc") {
            this.nextNumber++;
            if (this.nextNumber > 10) {
              this.end(true);
            }
          } else {
            this.nextNumberDesc--;
            if (this.nextNumberDesc < 1) {
              this.end(true);
            }
          }
        }
      });
      this.gameArea.appendChild(numberElement);
    });
  }

  updateTimer() {
    document.getElementById(
      "numberRushTimer"
    ).textContent = `Time left: ${this.timeLeft} seconds`;
  }

  end(success) {
    this.numbers.forEach((number) => {
      let numberElement = document.getElementById(`number-${number}`);
      if (numberElement) {
        this.gameArea.removeChild(numberElement);
      }
    });

    clearInterval(this.timerInterval);

    // Increase their happiness by 10
    pet.happiness = Math.min(pet.happiness + 10, 100);

    // Add 10 to the player's coins if they were successful
    if (success) {
      pet.coins += 10;
    }

    pet.exp += this.score;
    pet.checkLevelUp();

    pet.updateStats();
    pet.updateCoins();
    pet.paused = false;

    // Hide the game container
    document.getElementById("numberRushGame").style.display = "none";
  }
}

const numberRushGame = new NumberRushGame();

document.getElementById("numberRush").addEventListener("click", () => {
  // Pause the game
  pet.paused = true;

  // Show the number rush game
  document.getElementById("playModal").style.display = "none";
  document.getElementById("numberRushGame").style.display = "block";

  // Start the game
  numberRushGame.start();
});

document.getElementById("numberRushGame").style.display = "none";
