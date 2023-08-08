class Pet {
  constructor() {
    this.name = "";
    this.gender = Math.random() < 0.5 ? "male" : "female";
    this.hunger = 100;
    this.happiness = 100;
    this.cleanliness = 100;
    this.gameOver = false;
    this.startTime = Date.now();
    this.setPetImage();
    this.coins = 20;
    this.updateCoins();
  }

  setPetImage() {
    let petImg = document.getElementById("petImg");
    petImg.src = this.gender === "male" ? "pet_male.png" : "pet_female.png";
  }

  start(name) {
    this.name = name;
    document.getElementById("petNameDisplay").textContent = this.name;
    this.interval = setInterval(() => {
      this.hunger--;
      this.happiness--;
      this.cleanliness--;

      this.updateStats();

      if (this.hunger <= 0 || this.happiness <= 0 || this.cleanliness <= 0) {
        this.endGame();
      }
    }, 1000);
  }

  endGame() {
    clearInterval(this.interval);
    this.gameOver = true;

    // Calculate how long the pet was kept alive
    const timeAlive = Math.floor((Date.now() - this.startTime) / 1000);
    document.getElementById(
      "timeAlive"
    ).textContent = `You kept your pet alive for ${timeAlive} seconds.`;

    // Show the game over modal
    document.getElementById("gameOverModal").style.display = "block";
  }

  updateStats() {
    if (!this.gameOver) {
      document.getElementById("hunger").value = this.hunger;
      document.getElementById("happiness").value = this.happiness;
      document.getElementById("cleanliness").value = this.cleanliness;

      document.documentElement.style.setProperty("--hunger", this.hunger);
      document.documentElement.style.setProperty("--happiness", this.happiness);
      document.documentElement.style.setProperty(
        "--cleanliness",
        this.cleanliness
      );
    }
  }

  feed(amount, cost = 0) {
    if (!this.gameOver) {
      if (this.coins >= cost) {
        this.hunger = Math.min(this.hunger + amount, 100);
        this.coins -= cost;
        this.updateStats();
        this.updateCoins();
      } else {
        document.getElementById("notEnoughCoinsModal").style.display = "block";
      }
    }
  }

  updateCoins() {
    document.getElementById("coinAmount").textContent = this.coins;
  }

  play() {
    if (!this.gameOver) {
      this.happiness = Math.min(this.happiness + 20, 100);
      this.updateStats();
    }
  }

  clean() {
    if (!this.gameOver) {
      this.cleanliness = Math.min(this.cleanliness + 20, 100);
      this.updateStats();
    }
  }
}

// Create a new pet
const pet = new Pet();

// Start the game when the start button is clicked
document.getElementById("start").addEventListener("click", () => {
  document.getElementById("menu").style.display = "none";
  document.getElementById("startModal").style.display = "block";
  document.getElementById("petGender").textContent = pet.gender;
});

// Start the game when the start game button in the modal is clicked
document.getElementById("startGame").addEventListener("click", () => {
  let name = document.getElementById("petName").value;
  if (name) {
    document.getElementById("startModal").style.display = "none";
    document.getElementById("game").style.display = "block";
    pet.start(name);
  } else {
    alert("Please enter a name for your pet.");
  }
});

// Connect buttons to pet actions

document.getElementById("play").addEventListener("click", () => pet.play());
document.getElementById("clean").addEventListener("click", () => pet.clean());

// Connect the play again button
document
  .getElementById("playAgain")
  .addEventListener("click", () => location.reload());

// Hide the game and show the menu at the start
document.getElementById("game").style.display = "none";
document.getElementById("menu").style.display = "flex";

// Show the instructions when the instructions button is clicked
document.getElementById("instructionsButton").addEventListener("click", () => {
  document.getElementById("instructionsModal").style.display = "block";
});

// Hide the instructions when the close button is clicked
document.getElementById("closeInstructions").addEventListener("click", () => {
  document.getElementById("instructionsModal").style.display = "none";
});

// Open the food modal when the feed button is clicked
document.getElementById("feed").addEventListener("click", () => {
  document.getElementById("foodModal").style.display = "block";
});

// Feed the pet when a food button is clicked
document.getElementById("potato").addEventListener("click", () => {
  pet.feed(3, 0); // potatoes are free
  document.getElementById("foodModal").style.display = "none";
});
document.getElementById("bread").addEventListener("click", () => {
  pet.feed(5, 1); // bread costs 1 coin
  document.getElementById("foodModal").style.display = "none";
});
document.getElementById("lollypop").addEventListener("click", () => {
  pet.feed(2, 2); // lollypop costs 2 coins
  document.getElementById("foodModal").style.display = "none";
});
document.getElementById("sodaPop").addEventListener("click", () => {
  pet.feed(1, 3); // soda pop costs 3 coins
  document.getElementById("foodModal").style.display = "none";
});

// Close the food modal when the exit button is clicked
document.getElementById("exitFoodModal").addEventListener("click", () => {
  document.getElementById("foodModal").style.display = "none";
});

document.getElementById("closeNotEnoughCoins").addEventListener("click", () => {
  document.getElementById("notEnoughCoinsModal").style.display = "none";
});
