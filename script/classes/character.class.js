class Character extends MovableObject {
  height = 150;
  width = 200;
  swimmingSequence = [
    "./img/1.Sharkie/3.Swim/1.png",
    "./img/1.Sharkie/3.Swim/2.png",
    "./img/1.Sharkie/3.Swim/3.png",
    "./img/1.Sharkie/3.Swim/4.png",
    "./img/1.Sharkie/3.Swim/5.png",
    "./img/1.Sharkie/3.Swim/6.png",
  ];
  idlingSequence = [
    "./img/1.Sharkie/1.IDLE/1.png",
    "./img/1.Sharkie/1.IDLE/2.png",
    "./img/1.Sharkie/1.IDLE/3.png",
    "./img/1.Sharkie/1.IDLE/4.png",
    "./img/1.Sharkie/1.IDLE/5.png",
    "./img/1.Sharkie/1.IDLE/6.png",
    "./img/1.Sharkie/1.IDLE/7.png",
    "./img/1.Sharkie/1.IDLE/8.png",
    "./img/1.Sharkie/1.IDLE/9.png",
    "./img/1.Sharkie/1.IDLE/10.png",
    "./img/1.Sharkie/1.IDLE/11.png",
    "./img/1.Sharkie/1.IDLE/12.png",
    "./img/1.Sharkie/1.IDLE/13.png",
    "./img/1.Sharkie/1.IDLE/14.png",
    "./img/1.Sharkie/1.IDLE/15.png",
    "./img/1.Sharkie/1.IDLE/16.png",
    "./img/1.Sharkie/1.IDLE/17.png",
    "./img/1.Sharkie/1.IDLE/18.png",
  ];

  longIdlingSequence = [
    "./img/1.Sharkie/2.Long_IDLE/i1.png",
    "./img/1.Sharkie/2.Long_IDLE/I2.png",
    "./img/1.Sharkie/2.Long_IDLE/I3.png",
    "./img/1.Sharkie/2.Long_IDLE/I4.png",
    "./img/1.Sharkie/2.Long_IDLE/I5.png",
    "./img/1.Sharkie/2.Long_IDLE/I6.png",
    "./img/1.Sharkie/2.Long_IDLE/I7.png",
    "./img/1.Sharkie/2.Long_IDLE/I8.png",
    "./img/1.Sharkie/2.Long_IDLE/I9.png",
    "./img/1.Sharkie/2.Long_IDLE/I10.png",
    "./img/1.Sharkie/2.Long_IDLE/I11.png",
    "./img/1.Sharkie/2.Long_IDLE/I12.png",
    "./img/1.Sharkie/2.Long_IDLE/I13.png",
    "./img/1.Sharkie/2.Long_IDLE/I14.png",
  ];
  poisonSequence = [
    "./img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "./img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "./img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "./img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
  ];

  shockSequence = [
    "./img/1.Sharkie/5.Hurt/2.Electric shock/1.png",
    "./img/1.Sharkie/5.Hurt/2.Electric shock/2.png",
    "./img/1.Sharkie/5.Hurt/2.Electric shock/3.png",
  ];

  deathSequencePoison = [
    "./img/1.Sharkie/6.dead/1.Poisoned/1.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/2.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/3.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/4.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/5.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/6.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/7.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/8.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/9.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/10.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/11.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/12.png",
  ];
  deathSequenceShock = [
    "./img/1.Sharkie/6.dead/2.Electro_shock/1.png",
    "./img/1.Sharkie/6.dead/2.Electro_shock/2.png",
    "./img/1.Sharkie/6.dead/2.Electro_shock/4.png",
    "./img/1.Sharkie/6.dead/2.Electro_shock/5.png",
    "./img/1.Sharkie/6.dead/2.Electro_shock/7.png",
    "./img/1.Sharkie/6.dead/2.Electro_shock/8.png",
    "./img/1.Sharkie/6.dead/2.Electro_shock/9.png",
    "./img/1.Sharkie/6.dead/2.Electro_shock/10.png",
  ];

  spittingSequence = [
    "./img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/1.png",
    "./img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/2.png",
    "./img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/3.png",
    "./img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/4.png",
    "./img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/5.png",
    "./img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/6.png",
    "./img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/7.png",
  ];
  lastTimeMoved;
  idleTime;
  currentImage = 0;
  world;
  speed = 30;
  hitpoints = 100;
  isSpitting = false;
  startSpitting = false
  isHitBy;
  animationInterval;

  constructor() {
    super().loadImg("./img/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.idlingSequence);
    this.loadImages(this.longIdlingSequence);
    this.loadImages(this.poisonSequence);
    this.loadImages(this.shockSequence);
    this.loadImages(this.deathSequencePoison);
    this.loadImages(this.deathSequenceShock);
    this.loadImages(this.swimmingSequence);
    this.loadImages(this.spittingSequence);
    this.animate();
    this.idling();
    this.longIdling();
    this.spit();
    this.lastTimeMoved = new Date().getTime();
  }

  /**
   * The basic interval that loops through all main animations
   * 
   */
  animate() {
    this.animationInterval = setInterval(() => {
      this.swimmingAnimation();
      this.swimRight();
      this.swimLeft();
      this.swimUp();
      this.swimDown();
      this.displayDeath();
      this.displayDamage();
    }, 1000 / 15);
  }

  /**
   * if no other animation-parameter are met, plays basic idle animation
   */
  idling() {
    setInterval(() => {
      if (this.isIdle()) {
        this.playAnimation(this.idlingSequence);
      }
    }, 100);

    
  }

  /**
   * If the iddle time is too long, this interval plays the longIdle-animation, 
   * 
   */
  longIdling() {
    setInterval(() => {
      let currentTime = new Date().getTime();
      this.idleTime = currentTime - this.lastTimeMoved;

      if (this.idleTime > 6000) {
        this.playAnimation(this.longIdlingSequence);
      }
    }, 300);
  }


  /**
   * resets Idle time
   */
  resetIdle() {
    this.lastTimeMoved = new Date().getTime();
  }

  /**
   * Checks if the boundaries are not reached yet and the appropriate button is clicked and the char is not dead, then moves in the desired direction
   */
  swimRight() {
    if (
      this.world.keyboard.RIGHT &&
      this.x <= this.world.level.levelEnd &&
      !this.isDead()
    ) {
      this.changeDirection = false;
      this.x += this.speed;
    }
    this.world.camera_x = -this.x;
  }

  /**
   * Checks if the boundaries are not reached yet and the appropriate button is clicked and the char is not dead, then moves in the desired direction
   */
  swimLeft() {
    if (this.world.keyboard.LEFT && this.x >= -650 && !this.isDead()) {
      this.changeDirection = true;
      this.x -= this.speed;
    }
    this.world.camera_x = -this.x;
  }

    /**
   * Checks if the boundaries are not reached yet and the appropriate button is clicked and the char is not dead, then moves in the desired direction
   */
  swimUp() {
    if (this.world.keyboard.UP && !this.isDead() && this.y > -70) {
      this.y -= this.speed / 2;
    }
  }

    /**
   * Checks if the boundaries are not reached yet and the appropriate button is clicked and the char is not dead, then moves in the desired direction
   */
  swimDown() {
    if (this.world.keyboard.DOWN && !this.isDead() && this.y < 380) {
      this.y += this.speed / 2;
    }
  }

  /**
   * plays the swim animation if the char is moving
   */
  swimmingAnimation() {
    if (this.isSwimming()) {
      this.playAnimation(this.swimmingSequence);
      this.resetIdle();
    }
  }

  /**
   * Checks if a new bubble is added (this.startSpitting), then plays the animation and sets "isSpitting" to true while the animation is played.
   * sets (this.startSpitting) back to false to avoid a chain
   * 
   */
  spit() {
    setInterval(() => {
      if (this.startSpitting) {
        this.isSpitting = true;
        this.spittingAnimation();
        this.resetIdle();
        this.startSpitting = false
      }
    }, 1000 / 60);
  }


  /**
   * Sets an interval that loops through the spitting animation, if the numberof loops exceeds the length of the animation, it clears the interval and sets isSpitting = false;
   * 
   */
  spittingAnimation() {
      let counter = 0;
      let interval = setInterval(() => {
        if (counter < this.spittingSequence.length) {
          this.playAnimation(this.spittingSequence);
        } else {
          clearInterval(interval);
          this.isSpitting = false;
        }
        counter++;
      }, 60);
  }

  /**
   * Is played when the character has 0 hitpoints, depending on the last sustained type of damage a different animation is played.
   * Ends the game after the animation is over
   * 
   */
  displayDeath() {
    if (this.isDead() && this.isHitBy == "poison") {
      this.playAnimation(this.deathSequencePoison);
      setTimeout(() => {
        clearInterval(this.animationInterval)
        gameOver()
      }, 800);
    } else if (this.isDead() && this.isHitBy == "shock") {
      this.playAnimation(this.deathSequenceShock);
      setTimeout(() => {
        clearInterval(this.animationInterval)
        gameOver()
      }, 800);
    }
  }

  /**
   * Plays an animation depending on the type of damage sustained if the character isHurt()
   * 
   */
  displayDamage() {
    if (this.isHurt() && !this.isDead() && this.isHitBy == "poison") {
      this.resetIdle();
      this.playAnimation(this.poisonSequence);
    } else if (this.isHurt() && !this.isDead() && this.isHitBy == "shock") {
      this.resetIdle();
      this.playAnimation(this.shockSequence);
    }
  }


  /**
   * A revamp of the basic isColliding() function with sharkies adjusted hitbox.
   * Checks for collisions with other objects
   * 
   * @param {object} obj The type f object in the world, can be character, enemy, barrier, coins etc.
   * @returns collision
   */
  isColliding(obj) {
    let adjustedX = this.x + 40;
    let adjustedY = this.y + 50;
    let adjustedWidth = this.width - 70;
    let adjustedHeight = this.height - 70;

    return (
      adjustedX + adjustedWidth >= obj.x &&
      adjustedX <= obj.x + obj.width &&
      adjustedY + adjustedHeight >= obj.y &&
      adjustedY <= obj.y + obj.height
    );
  }
  
  /**
   * checks if the character is currently meeting any parameters for animations OTHER than the idleAnimation
   * 
   * @returns returns true to trigger the idle animation
   */
isIdle() {
  return !this.world.keyboard.UP &&
  !this.world.keyboard.DOWN &&
  !this.world.keyboard.LEFT &&
  !this.world.keyboard.RIGHT &&
  !this.isDead() &&
  !this.isHurt() &&
  this.idleTime < 6000 &&
  !this.isSpitting
}  

/**
 * Checks if the character is spitting AND a movement key is pressed
 * @returns retrurns true to trigger swimming animation
 */
isSwimming() {
  return (!this.isSpitting && this.world.keyboard.UP) ||
  this.world.keyboard.DOWN ||
  this.world.keyboard.LEFT ||
  this.world.keyboard.RIGHT
}

















}

