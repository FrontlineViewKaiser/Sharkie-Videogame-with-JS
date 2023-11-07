class BigAssWhale extends MovableObject {
  speed = 10;
  height = 400;
  width = 600;
  hitpoints = 100;
  damageInterval;
  followInterval
  SpawningSequence = [
    "./img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];
  WhaleSwimming = [
    "./img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/11.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/12.png",
  ];
  WhaleHurting = [
    "./img/2.Enemy/3 Final Enemy/Hurt/1.png",
    "./img/2.Enemy/3 Final Enemy/Hurt/2.png",
    "./img/2.Enemy/3 Final Enemy/Hurt/3.png",
    "./img/2.Enemy/3 Final Enemy/Hurt/4.png",
  ];
  DeathSequence = [
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];

  constructor() {
    super().loadImg("./img/2.Enemy/3 Final Enemy/1.Introduce/10.png");
    this.loadImages(this.SpawningSequence);
    this.loadImages(this.WhaleSwimming);
    this.loadImages(this.WhaleHurting);
    this.loadImages(this.DeathSequence);
    this.x = 9999;
    this.y = 60;
    this.animate();
    this.checkProjectileCollisions();
  }

  /**
   * First loops through the spawning animation with a counter, then stops the interval and plays the death and swimming intervals
   */
  animate() {
    let counter = 0;
    let spawnInterval = setInterval(() => {
      if (world.isBossSpawned) {
        if (counter < this.SpawningSequence.length - 1) {
          this.playAnimation(this.SpawningSequence);
          this.x = 4500;
        } else {
          clearInterval(spawnInterval);
          this.followSharkie()
          this.animateDeath();
        }
        counter++;
      }
    }, 150);
  }

  /**
   * Checks if no other animations are triggered, then plays the swim animation and moves the whale left
   */
  swimmingAnimation() {
    this.swimmingInterval = setInterval(() => {
      if (!this.isDead() && !this.isHurt())
        this.playAnimation(this.WhaleSwimming);
    }, 80);
    this.moveLeft();
  }

  /**
   * Instead of its basic movement, the whale checks if the player is to the left or right and then changes direction to chase him down
   * 
   */
  followSharkie() {
    this.followInterval = setInterval(() => {
      if (!this.isDead() && !this.isHurt()) {
        this.playAnimation(this.WhaleSwimming);
        if (this.x > world.character.x) {
          // Player is to the left, move left
          this.changeDirection = false;
          this.x -= this.speed;
        } else if (this.x < world.character.x) {
          // Player is to the right, move right
          this.changeDirection = true;
          this.x += this.speed;
        }
      }
    }, 80);
  }

  /**
   * adjusts hitpoints and plays damage animation if whale is still alive
   */
  takingDamage() {
    this.hitpoints -= 20;
    this.damageInterval = setInterval(() => {
      if (this.isHurt() && !this.isDead()) {
        this.playAnimation(this.WhaleHurting);
      }
    }, 80);
  }

  /**
   * checks of hitpoints have been reduced to 0, then plays deathanimation once before shutting off the game and loading victory screen
   * 
   */
  animateDeath() {
    let counter = 0;
    setInterval(() => {
      if (this.isDead()) {
        if (counter < this.DeathSequence.length - 1) {
          this.playAnimation(this.DeathSequence);
          counter++;
        }
        this.InititiateVictory();
      }
    }, 100);
  }

  /**
   * Is called by animateDeath() after deathanimation is played.
   * First clears all relevant intervals that may interfere, then renders the endgame after 2 seconds
   * 
   */
  InititiateVictory() {
    this.y -= 6;
    clearInterval(world.character.animationInterval);
    clearInterval(this.followInterval);
    clearInterval(this.damageInterval);
    clearInterval(this.projectileInterval);
    setTimeout(() => {
      youWin();
    }, 2200);
  }
}
