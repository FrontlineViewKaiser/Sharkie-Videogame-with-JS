class Jellyfish extends MovableObject {
  jellyfishSwimming = [
    "./img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "./img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "./img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "./img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];
  deathSequence = [
    "./img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
    "./img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
    "./img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
    "./img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
  ];
  isDead = false;

  constructor() {
    super().loadImg("./img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png");
    this.x = 420 + Math.random() * 4000;
    this.y = 50 + Math.random() * 380;
    this.speed = Math.random();
    this.loadImages(this.jellyfishSwimming);
    this.loadImages(this.deathSequence);
    this.checkProjectileCollisions()
    this.animate();
  }

  /**
   * moves the jellyfish and continuously plays swimming animation until death
   * 
   */
  animate() {
    this.moveSinus();
    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.jellyfishSwimming);
      }
    }, 100);
  }

  /**
   * creates a movement pattern in the shape of a sinuswave
   * 
   */
  moveSinus() {
    setInterval(() => {
      if (!this.isDead) {
        this.y +=
          this.amplitude * Math.sin(2 * Math.PI * this.frequency * this.time);
        this.x -= this.speed;
        this.time += 0.01;
      }
    }, 1000 / 60);
  }

  /**
   * is played when a bubble hits it, loops through the death animation and moves it upwards until the jellyfish reaches the end of the screen
   * 
   */
  deathAnimation() {
    this.isDead = true;
    let interval = setInterval(() => {
      this.playAnimation(this.deathSequence);
      this.y -= 12;
      if (this.y < -50) {
        clearInterval(interval);
      }
    }, 80);
  }
}
