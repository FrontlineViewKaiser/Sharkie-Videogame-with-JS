class World {
  level = level1;
  character = new Character();
  canvas;
  ctx;
  keyboard;
  camera_x = -100;
  lastShotTime = 0;
  shotCooldown = 650;
  statusBars = [
    new statusBar(
      [
        "./img/4. Marcadores/green/Life/0_  copia 3.png",
        "./img/4. Marcadores/green/Life/20_ copia 4.png",
        "./img/4. Marcadores/green/Life/40_  copia 3.png",
        "./img/4. Marcadores/green/Life/60_  copia 3.png",
        "./img/4. Marcadores/green/Life/80_  copia 3.png",
        "./img/4. Marcadores/green/Life/100_  copia 2.png",
      ],
      10,
      100
    ),
    new statusBar(
      [
        "./img/4. Marcadores/orange/0_  copia 2.png",
        "./img/4. Marcadores/orange/20_  copia.png",
        "./img/4. Marcadores/orange/40_  copia 2.png",
        "./img/4. Marcadores/orange/60_  copia 2.png",
        "./img/4. Marcadores/orange/80_  copia 2.png",
        "./img/4. Marcadores/orange/100_ copia 2.png",
      ],
      50,
      0
    ),
    new statusBar(
      [
        "./img/4. Marcadores/Purple/0_.png",
        "./img/4. Marcadores/Purple/20_.png",
        "./img/4. Marcadores/Purple/40_.png",
        "./img/4. Marcadores/Purple/60_.png",
        "./img/4. Marcadores/Purple/80_.png",
        "./img/4. Marcadores/Purple/100_.png",
      ],
      90,
      0
    ),
  ];
  projectiles = [new Projectile()];
  isBossSpawned = false;
  isPoisonAttack = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;

    this.draw();
    this.setToWorld();
    this.run();
  }

  /**
   * Sets character instance to this world
   */
  setToWorld() {
    this.character.world = this;
  }

  /**
   * uses draw method to add all relevant objects and also sets camera
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addObject(this.level.backgroundObjects);
    this.addObject(this.level.barriers);
    this.addObject(this.level.coins);
    this.addObject(this.level.poison);

    this.ctx.translate(-this.camera_x, 0); //back
    this.addObject(this.statusBars);
    this.ctx.translate(this.camera_x, 0); // forward

    this.addToMap(this.character);
    this.addObject(this.level.jellyfishes);
    this.addObject(this.level.pufferfishes);
    this.addObject(this.level.boss);
    this.addObject(this.projectiles);
    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * loops through each object in an array and then draws it
   *
   * @param {array} array
   */
  addObject(array) {
    array.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * draws an object onto the canvas, based on its direction
   * @param {object} object
   */
  addToMap(object) {
    if (object.changeDirection) {
      this.ctx.save();
      this.ctx.translate(object.width, 0);
      this.ctx.scale(-1, 1);
      object.x = object.x * -1;
    }
    object.draw(this.ctx);
    //object.drawFrame(this.ctx);

    if (object.changeDirection) {
      object.x = object.x * -1;
      this.ctx.restore();
    }
  }
  

  /**
   * runs the basiv functions of the game continuously
   */
  run() {
    setInterval(() => {
      this.checkProjectiles();
      this.checkCollisions();
      this.checkForBoss();
    }, 200);
  }

  /**
   * sets current time.
   * If all parameters are met characters "startSpitting" will be set to true, forms a new bubbles with parametres depending on characters direction
   * and pushes it in the priojectiles array. Records last shot time as current time. Sets a timeout to prevent too many bubbles being formed.
   * checks for poison use.
   */
  checkProjectiles() {
    let currentTime = Date.now();
    if (this.canSpit(currentTime)) {
      this.character.startSpitting = true;
      setTimeout(() => {
        this.checkForPoisonUse();
        if (this.character.changeDirection) {
          let bubble = new Projectile(
            this.character.x + 30,
            this.character.y + 100,
            -1,
            this.isPoisonAttack
          );
          this.projectiles.push(bubble);
        } else {
          let bubble = new Projectile(
            this.character.x + 125,
            this.character.y + 100,
            1,
            this.isPoisonAttack
          );
          this.projectiles.push(bubble);
        }
      }, 360);
      this.lastShotTime = currentTime;
    }
  }

  /**
   * runs collisions
   */
  checkCollisions() {
    this.checkEnemyCollisions();
    this.checkCollectibleCollisions();
  }

  /**
   * checks collisions with objects that damage the player
   */
  checkEnemyCollisions() {
    this.level.pufferfishes.forEach((pufferfish) => {
      if (!pufferfish.isDead) {
        this.collisionEffect(pufferfish, "poison");
      }
    });
    this.level.jellyfishes.forEach((jellyfish) => {
      if (!jellyfish.isDead) {
        this.collisionEffect(jellyfish, "shock");
      }
    });
    this.level.boss.forEach((boss) => {
      if (!boss.isDead()) {
        this.collisionEffect(boss, "poison");
      }
    });
    this.level.barriers.forEach((barrier) => {
      this.collisionEffect(barrier, "poison");
    });
  }

  /**
   * Checks if the character is colliding with an object, if yes it registeres a hit and adjusts the healtbar accordingly
   * 
   * @param {object} object objects that damage the player
   * @param {string} damage type of dmg as string
   */
  collisionEffect(object, damage) {
    if (this.character.isColliding(object)) {
      this.character.isHit(damage);
      this.statusBars[0].setPercentage(this.character.hitpoints);
    }
  }

/**
 * checks if the character collides with a coin or poison and then collects it
 * 
 */
  checkCollectibleCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.collect("coin", index);
      }
    });
    this.level.poison.forEach((poison, index) => {
      if (this.character.isColliding(poison)) {
        this.collect("poison", index);
      }
    });
  }


  /**
   * Checks type of collectble, removes the item from the world by splicing its array, then sets the percentage of the corresponding statusbar
   * 
   * @param {string} item eiter coin or poison 
   * @param {number} index of the item that has collided with the player
   */
  collect(item, index) {
    if (item == "coin") {
      this.level.coins.splice(index, 1);
      let coinCount = this.statusBars[1].percentage;
      coinCount += 2.5;
      this.statusBars[1].setPercentage(coinCount);
    } else if (item == "poison") {
      this.level.poison.splice(index, 1);
      let poisonCount = this.statusBars[2].percentage;
      poisonCount += 6.6666666667;
      this.statusBars[2].setPercentage(poisonCount);
    }
  }

  /**
   * The boss is spawned when the character reaches a certain threshold.
   * This checks for this threshold to enable poison use and prevent multiple bosses spawning
   */
  checkForBoss() {
    if (this.character.x > 3999 && !this.isBossSpawned) {
      this.isBossSpawned = true;
      this.isPoisonAttack = true;
    }
  }

  /**
   * triggered eery time a new bubble is formed
   * Checks if poison is enabled, reduces the amount of poison, sets the poison-statusbar and disables poison attacks if no more poison is available
   */
  checkForPoisonUse() {
    if (this.isPoisonAttack) {
      let poisonCount = this.statusBars[2].percentage;
      poisonCount -= 6.6666666667;
      this.statusBars[2].setPercentage(poisonCount);
      if (poisonCount < 6.6666666) {
        this.isPoisonAttack = false;
      }
    }
  }

  /**
   * checks if all parametres are met for a new spit-attack to be executed.
   * 
   * @param {time} currentTime 
   * @returns true if all parametres are met
   */
  canSpit(currentTime) {
    return (
      this.keyboard.SPACE &&
      currentTime - this.lastShotTime > this.shotCooldown &&
      !this.character.isHurt() &&
      !this.character.isDead()
    );
  }
}
