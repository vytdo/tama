// Create a new pet
const pet = new Pet();

let currentFoodPage = 1;
const totalFoodPages = 2; // Total number of food pages

document.getElementById("nextFoodPage").addEventListener("click", () => {
  if (currentFoodPage < totalFoodPages) {
    document.getElementById(`foodPage${currentFoodPage}`).style.display =
      "none";
    currentFoodPage++;
    document.getElementById(`foodPage${currentFoodPage}`).style.display =
      "block";
  }
});

document.getElementById("prevFoodPage").addEventListener("click", () => {
  if (currentFoodPage > 1) {
    document.getElementById(`foodPage${currentFoodPage}`).style.display =
      "none";
    currentFoodPage--;
    document.getElementById(`foodPage${currentFoodPage}`).style.display =
      "block";
  }
});

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

// When opening the food modal, always show the first page
document.getElementById("feed").addEventListener("click", () => {
  currentFoodPage = 1;
  for (let i = 1; i <= totalFoodPages; i++) {
    document.getElementById(`foodPage${i}`).style.display =
      i === 1 ? "block" : "none";
  }
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

document.getElementById("blueJellySandwich").addEventListener("click", () => {
  pet.feed(6, 6, 5); // Adjust the experience points
  document.getElementById("foodModal").style.display = "none";
});
document.getElementById("frenchToast").addEventListener("click", () => {
  pet.feed(5, 5, 4); // Adjust the experience points
  document.getElementById("foodModal").style.display = "none";
});
document.getElementById("pho").addEventListener("click", () => {
  pet.feed(8, 4, 3); // Adjust the experience points
  document.getElementById("foodModal").style.display = "none";
});
document.getElementById("pinkEnergyDrink").addEventListener("click", () => {
  pet.feed(4, 7, 6); // Adjust the experience points
  document.getElementById("foodModal").style.display = "none";
});
document.getElementById("strawberryCake").addEventListener("click", () => {
  pet.feed(10, 8, 7); // Adjust the experience points
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

// File: game.js

// Open the shop modal when the shop button is clicked
document.getElementById("shop").addEventListener("click", () => {
  document.getElementById("shopModal").style.display = "block";
});

// Close the shop modal when the exit button is clicked
document.getElementById("exitShopModal").addEventListener("click", () => {
  document.getElementById("shopModal").style.display = "none";
});

// Purchase and apply a background
function purchaseBackground(backgroundID, cost, levelRequired) {
  if (pet.level >= levelRequired && pet.coins >= cost) {
    pet.coins -= cost;
    pet.updateCoins();
    const petArea = document.getElementById("petArea");
    petArea.style.backgroundImage = `url('./assets/images/backgrounds/${backgroundID}.png')`;
    document.getElementById("shopModal").style.display = "none";
  } else {
    alert("You don't have enough coins or level for this background.");
  }
}

// Connect the background buttons
document
  .getElementById("background1")
  .addEventListener("click", () => purchaseBackground("bubblegum_bg", 0, 1));
document
  .getElementById("background2")
  .addEventListener("click", () => purchaseBackground("greenyfields_bg", 1, 1));
document
  .getElementById("background3")
  .addEventListener("click", () => purchaseBackground("frenchfries_bg", 2, 3));
// Add more backgrounds as needed

// File: game.js

// Function to show the background shop and hide the clothing shop
function showBackgroundShop() {
  document.getElementById("backgroundShop").style.display = "block";
  document.getElementById("clothingShop").style.display = "none";
}

// Function to show the clothing shop and hide the background shop
function showClothingShop() {
  document.getElementById("backgroundShop").style.display = "none";
  document.getElementById("clothingShop").style.display = "block";
}

// Event listener to switch to background shop when the "Backgrounds" button is clicked
document
  .getElementById("shopBackgrounds")
  .addEventListener("click", showBackgroundShop);

// Event listener to switch to clothing shop when the "Clothing" button is clicked
document
  .getElementById("shopClothing")
  .addEventListener("click", showClothingShop);

// File: game.js
function purchaseClothing(itemID, cost, imageSrc, imageStyle) {
  if (pet.coins >= cost) {
    pet.coins -= cost;
    pet.updateCoins();

    // Create an image element for the clothing item
    let clothingImg = document.createElement("img");
    clothingImg.src = imageSrc;
    clothingImg.className = "clothing-item-image";

    // Apply additional styles if provided
    if (imageStyle) {
      for (let property in imageStyle) {
        clothingImg.style[property] = imageStyle[property];
      }
    }

    // Add the clothing image to the clothing container
    document.getElementById("clothingContainer").appendChild(clothingImg);
  } else {
    alert("You don't have enough coins for this clothing item.");
  }
}

document.getElementById("propellerHat").addEventListener("click", () =>
  purchaseClothing(
    "propellerHat",
    10,
    "./assets/images/clothing/propeller_hat.png",
    { top: "2px", left: "33px", width: "50px", height: "50px" } // Adjust the width and height as needed
  )
);

document.getElementById("bucketPropellerHat").addEventListener("click", () =>
  purchaseClothing(
    "bucketPropellerHat",
    10,
    "./assets/images/clothing/bucketpropeller_hat.png",
    { top: "px", left: "39px", width: "55px", height: "55px" } // Adjust the width and height as needed
  )
);

document.getElementById("baseballHat").addEventListener("click", () =>
  purchaseClothing(
    "baseballHat",
    12,
    "./assets/images/clothing/baseball_hat.png",
    { top: "2px", left: "33px", width: "50px", height: "50px" } // Adjust the width and height as needed
  )
);

document.getElementById("witchHat").addEventListener("click", () =>
  purchaseClothing(
    "witchHat",
    12,
    "./assets/images/clothing/witch_hat.png",
    { top: "0.1px", left: "38px", width: "55px", height: "55px" } // Adjust the width and height as needed
  )
);

// File: game.js
document.getElementById("exitClothingShop").addEventListener("click", () => {
  document.getElementById("shopModal").style.display = "none";
});
