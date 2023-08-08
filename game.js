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
    this.poops = 0;
    this.paused = false;
  }

  setPetImage() {
    let petImg = document.getElementById("petImg");
    petImg.src = this.gender === "male" ? "pet_male.png" : "pet_female.png";
  }

  start(name) {
    this.name = name;
    document.getElementById("petNameDisplay").textContent = this.name;

    // Set the initial position of the pet to the middle of the petArea
    const petContainer = document.getElementById("petContainer");
    const petArea = document.getElementById("petArea");
    const middle = (petArea.offsetWidth - petContainer.offsetWidth) / 2;
    petContainer.style.left = `${middle}px`;

    this.interval = setInterval(() => {
      if (!this.paused) {
        this.hunger--;
        this.happiness--;

        this.updateStats();

        if (this.hunger <= 0 || this.happiness <= 0 || this.cleanliness <= 0) {
          this.endGame();
        }
      }
    }, 1000);

    // Start the pet movement
    this.moveInterval = setInterval(() => {
      if (!this.paused) {
        this.move();
      }
    }, 1000);

    this.poopInterval = setInterval(() => {
      if (!this.paused && Math.random() < 0.1) {
        this.poop();
      }
    }, 1000);
  }

  move() {
    if (!this.paused) {
      // Get the pet container and pet area elements
      const petContainer = document.getElementById("petContainer");
      const petArea = document.getElementById("petArea");

      // Calculate the maximum left position
      const maxLeft = petArea.offsetWidth - petContainer.offsetWidth;

      // Get the pet's current position
      const currentLeft = parseInt(petContainer.style.left) || 0;

      // Calculate a new position a small, random distance to the left or right
      const movementDistance = Math.floor(Math.random() * 40) - 20;
      let newLeft = currentLeft + movementDistance;

      // Make sure the new position is within the pet area
      newLeft = Math.max(0, Math.min(newLeft, maxLeft));

      // Update the pet container's position
      petContainer.style.left = `${newLeft}px`;
    }
  }

  poop() {
    if (!this.paused) {
      // Increase the number of poops
      this.poops++;

      // Create a new poop element
      const poop = document.createElement("img");
      poop.src = "poop.png";
      poop.classList.add("poop");

      // Add the poop element to the pet area
      const petArea = document.getElementById("petArea");
      petArea.appendChild(poop);

      // Decrease the cleanliness stat based on the number of poops on the screen
      this.cleanliness = Math.max(0, 100 - this.poops * 10);
      this.updateStats();

      poop.style.setProperty("--random-x", Math.random());
    }
  }

  endGame() {
    if (!this.paused) {
      clearInterval(this.interval);
      this.gameOver = true;

      // Calculate how long the pet was kept alive
      const timeAlive = Math.floor((Date.now() - this.startTime) / 1000);
      document.getElementById(
        "timeAlive"
      ).textContent = `You kept your pet alive for ${timeAlive} seconds.`;

      // Show the game over modal
      document.getElementById("gameOverModal").style.display = "block";

      clearInterval(this.moveInterval);
      clearInterval(this.poopInterval);
    }
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
      // Remove all the poops
      const petArea = document.getElementById("petArea");
      const poops = petArea.getElementsByClassName("poop");
      while (poops.length > 0) {
        poops[0].parentNode.removeChild(poops[0]);
      }

      // Reset the cleanliness stat and poops counter
      this.cleanliness = 100;
      this.poops = 0;
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

document.getElementById("play").addEventListener("click", () => {
  document.getElementById("playModal").style.display = "block";
});

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

// COIN SMASH
document.getElementById("coinSmash").addEventListener("click", () => {
  // Pause the game
  pet.paused = true;

  // Show the coin smash game
  document.getElementById("playModal").style.display = "none";
  document.getElementById("coinSmashGame").style.display = "block";

  // Initialize the score
  let score = 0;

  // Increase the score when the coin is clicked
  document.getElementById("coinSmashCoin").addEventListener("click", () => {
    score++;

    // Apply the "smash" animation
    const coin = document.getElementById("coinSmashCoin");
    coin.style.transform = "scale(1.5)";

    // After a short delay, remove the "smash" animation
    setTimeout(() => {
      coin.style.transform = "scale(1)";
    }, 100);
  });

  // End the game after 5 seconds
  setTimeout(() => {
    document.getElementById("coinSmashGame").style.display = "none";

    // Add the score to the player's coins
    pet.coins += score;

    // Increase their happiness by 5
    pet.happiness = Math.min(pet.happiness + 5, 100);
    pet.updateStats();
    pet.updateCoins();
    pet.paused = false;
  }, 5000);
});

document.getElementById("numberRush").addEventListener("click", () => {
  // Code to start the number rush game goes here
});

document.getElementById("exitPlayModal").addEventListener("click", () => {
  document.getElementById("playModal").style.display = "none";
});

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
