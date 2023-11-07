class Pufferfish extends MovableObject {
  aggro = false;
  PufferfishSwimming = [
    "./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];

  PufferfishTransformation = [
    "./img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png",
  ];
  PufferfishAggroState = [
    "./img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png",
  ];
  PufferfishDeathSequence = [
    './img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png'
  ]
  currentImage = 0;
  isDead

  constructor() {
    super().loadImg(
      "./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png"
    );
    this.x = 420 + Math.random() * 4000;
    this.y = 50 + Math.random() * 330;
    this.speed = Math.random() * 2;
    this.loadImages(this.PufferfishSwimming);
    this.loadImages(this.PufferfishTransformation);
    this.loadImages(this.PufferfishAggroState);
    this.loadImages(this.PufferfishDeathSequence);
    this.animate();
    this.moveLeft();
    this.changeBehavior();
    this.checkProjectileCollisions()
  }

  /**
   * plays basic swimming animation and checks distance between pufferfish and sharkie until the aggro is triggered
   */
  animate() {
    let interval = setInterval(() => {
      this.playAnimation(this.PufferfishSwimming);
      this.checkDistanceBetweenSharkieAndPufferfishes();
      if (this.aggro || this.isDead) {
        clearInterval(interval);
      }
    }, 80);
  }


  /**
   * plays continuously to check if sharkie is too close.
   * turns aggro to true and triggeres a transformation
   */
  checkDistanceBetweenSharkieAndPufferfishes() {
    const thresholdDistance = 400;

    let distance = this.getDistance(
      world.character.x,
      world.character.y,
      this.x,
      this.y
    );

    if (distance < thresholdDistance && !this.aggro) {
      this.aggro = true;
      this.changeBehavior();
    }
  }

  /**
   * compares the positions of the characters and enemies coordinates and returns the distance as a number
   * 
   * @param {number} x1 
   * @param {number} y1 
   * @param {number} x2 
   * @param {number} y2 
   * @returns distance as a number
   */
  getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  /**
   * messenger function between checkDistanceBetweenSharkieAndPufferfishes() and transform() to trigger the latter.
   * put in place to prevent simultaneous transformation of ALL pufferfishes
   */
  changeBehavior() {
    if (this.aggro) {
      this.transform();
    }
  }

  /**
   * Loops through transformation sequence before playing a new swimming animation and increasing the speed
   * 
   */
  transform() {
    let counter = 0;
    let intervalTransformation = setInterval(() => {
      if (counter < this.PufferfishTransformation.length) {
        this.playAnimation(this.PufferfishTransformation);
        counter++;
      } else {
        clearInterval(intervalTransformation);
        let intervalAggroState = setInterval(() => {
          this.playAnimation(this.PufferfishAggroState);
          if(this.isDead) {
           clearInterval(intervalAggroState) 
           this.speed = 6;
          }
        }, 80);
        this.speed = 25;
      }
    }, 80);
  }

  /**
   * Plays the death animation, moves the enemy upwards and ends the interval when he leaves the map
   * 
   */
  deathAnimation() {
    this.isDead = true;
    let interval = setInterval(() => {
      this.playAnimation(this.PufferfishDeathSequence);
      this.y -= 12;
      if (this.y < -50) {
        clearInterval(interval)
      }
    }, 80);
  }

}
