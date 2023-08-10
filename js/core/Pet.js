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
    this.level = 1;
    this.exp = 0;
    this.paused = false;
  }

  updateBackgroundAvailability() {
    const bg3 = document.getElementById("background3");
    // Add more backgrounds as needed

    if (this.level >= 3) {
      bg3.classList.remove("locked-background");
    } else {
      bg3.classList.add("locked-background");
    }
  }

  updateFoodAvailability() {
    const burger = document.getElementById("burger");
    const sushi = document.getElementById("sushi");
    const blueJellySandwich = document.getElementById("blueJellySandwich");
    const frenchToast = document.getElementById("frenchToast");
    const strawberryCake = document.getElementById("strawberryCake");

    if (this.level >= 3) {
      blueJellySandwich.classList.remove("locked-food");
    } else {
      blueJellySandwich.classList.add("locked-food");
    }

    if (this.level >= 4) {
      frenchToast.classList.remove("locked-food");
    } else {
      frenchToast.classList.add("locked-food");
    }

    if (this.level >= 5) {
      burger.classList.remove("locked-food");
      strawberryCake.classList.remove("locked-food");
    } else {
      burger.classList.add("locked-food");
      strawberryCake.classList.add("locked-food");
    }

    if (this.level >= 7) {
      sushi.classList.remove("locked-food");
    } else {
      sushi.classList.add("locked-food");
    }
  }

  setPetImage() {
    let petImg = document.getElementById("petImg");
    petImg.src =
      this.gender === "male"
        ? "assets/images/pets/pet_male.png"
        : "assets/images/pets/pet_female.png";
  }

  start(name) {
    this.name = name;
    document.getElementById("petNameDisplay").textContent = this.name;

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
      const petContainer = document.getElementById("petContainer");
      const petArea = document.getElementById("petArea");
      const maxLeft = petArea.offsetWidth - petContainer.offsetWidth;
      const currentLeft = parseInt(petContainer.style.left) || 0;
      const movementDistance = Math.floor(Math.random() * 40) - 20;
      let newLeft = currentLeft + movementDistance;
      newLeft = Math.max(0, Math.min(newLeft, maxLeft));
      petContainer.style.left = `${newLeft}px`;
    }
  }

  poop() {
    if (!this.paused) {
      this.poops++;
      const poop = document.createElement("img");
      poop.src = "assets/images/misc/poop.png";
      poop.classList.add("poop");
      const petArea = document.getElementById("petArea");
      petArea.appendChild(poop);
      this.cleanliness = Math.max(0, 100 - this.poops * 10);
      this.updateStats();
      poop.style.setProperty("--random-x", Math.random());
    }
  }

  endGame() {
    if (!this.paused) {
      clearInterval(this.interval);
      this.gameOver = true;
      const timeAlive = Math.floor((Date.now() - this.startTime) / 1000);
      document.getElementById(
        "timeAlive"
      ).textContent = `You kept your pet alive for ${timeAlive} seconds.`;
      document.getElementById("gameOverModal").style.display = "block";
      clearInterval(this.moveInterval);
      clearInterval(this.poopInterval);
    }
  }

  updateStats() {
    if (!this.gameOver) {
      this.updateBackgroundAvailability();
      this.updateFoodAvailability();
      document.getElementById("hunger").value = this.hunger;
      document.getElementById("happiness").value = this.happiness;
      document.getElementById("cleanliness").value = this.cleanliness;
      document.getElementById(
        "levelDisplay"
      ).textContent = `Level: ${this.level}`;
      document.getElementById("experience").value = this.exp;
      document.getElementById("experience").max =
        this.getExperienceForNextLevel();
      document.documentElement.style.setProperty("--hunger", this.hunger);
      document.documentElement.style.setProperty("--happiness", this.happiness);
      document.documentElement.style.setProperty(
        "--cleanliness",
        this.cleanliness
      );
    }
  }

  checkLevelUp() {
    if (this.exp >= this.getExperienceForNextLevel()) {
      this.level++;
      console.log("Leveled up! Current level:", this.level);
      let levelUpModal = document.getElementById("levelUpModal");
      let levelUpMessage = document.getElementById("levelUpMessage");
      let levelUpReward = document.getElementById("levelUpReward");
      levelUpMessage.textContent = `Your pet has leveled up to Level ${this.level}!`;
      levelUpReward.textContent = `You've been awarded ${
        this.level * 5
      } coins!`;
      levelUpModal.style.display = "block";
      this.exp = 0;
    }
  }

  getExperienceForNextLevel() {
    return Math.pow(this.level, 2) * 10;
  }

  feed(amount, cost = 0, exp = 0) {
    if (!this.gameOver) {
      console.log("Feeding pet. Current experience:", this.exp);
      if (this.coins >= cost) {
        this.hunger = Math.min(this.hunger + amount, 100);
        this.coins -= cost;
        this.exp += exp;
        console.log(
          "Checking level-up. Current experience:",
          this.exp,
          "Required experience for next level:",
          this.getExperienceForNextLevel()
        );
        this.checkLevelUp();
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
      const petArea = document.getElementById("petArea");
      const poops = petArea.getElementsByClassName("poop");
      while (poops.length > 0) {
        poops[0].parentNode.removeChild(poops[0]);
      }
      this.cleanliness = 100;
      this.poops = 0;
      this.updateStats();
    }
  }
}
