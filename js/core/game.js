// Create a new pet
const pet = new Pet();

// Connect the burger and sushi buttons to the feed action:
document.getElementById("burger").addEventListener("click", () => {
  pet.feed(7, 4, 5); // Assuming burger gives 5 experience points
  document.getElementById("foodModal").style.display = "none";
});
document.getElementById("sushi").addEventListener("click", () => {
  pet.feed(10, 5, 7); // Assuming sushi gives 7 experience points
  document.getElementById("foodModal").style.display = "none";
});

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

document
  .getElementById("closeLevelUpModal")
  .addEventListener("click", function () {
    document.getElementById("levelUpModal").style.display = "none";
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
  pet.feed(3, 0, 1); // potatoes give 1 experience point
  document.getElementById("foodModal").style.display = "none";
});
document.getElementById("bread").addEventListener("click", () => {
  pet.feed(5, 1, 2); // bread gives 2 experience points
  document.getElementById("foodModal").style.display = "none";
});
document.getElementById("lollypop").addEventListener("click", () => {
  pet.feed(2, 2, 3); // lollypop gives 3 experience points
  document.getElementById("foodModal").style.display = "none";
});
document.getElementById("sodaPop").addEventListener("click", () => {
  pet.feed(1, 3, 4); // soda pop gives 4 experience points
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

    // Increase pet's experience points
    pet.exp += score;
    pet.checkLevelUp();

    pet.updateStats();
    pet.updateCoins();
    pet.paused = false;
  }, 5000);
});

document.getElementById("exitPlayModal").addEventListener("click", () => {
  document.getElementById("playModal").style.display = "none";
});
