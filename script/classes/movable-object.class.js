class MovableObject extends DrawableObject {
  speed;
  changeDirection = false;
  hitpoints;
  speedY;
  acceleration = 1.5;
  amplitude = 2 + Math.random() * 1; // Amplitude of Sinuswave
  frequency = 1 + Math.random() * 1; // Frequenz of Sinuswave
  time = 0;
  lastHit = 0;
  projectileInterval

  /**
   * moves an objects x position to create horizontal movement
   * 
   */
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 80);
  }

  /**
   * Is triggered if character is hit while not still in dmg animation carries the dmg-type to trigger the appropriate animation
   * Lowers hitpoints based on difficulty, makes sure the hitpoints don't go below 0 and sets a time for the last-hit
   * 
   * @param {string} damage the type (poison/shock) of the dmg sustained
   */
  isHit(damage) {
    if (!this.isHurt()) {
      if (this instanceof Character) {
        this.isHitBy = damage;
      }
      this.hitpoints -= 2 * difficulty;
      if (this.hitpoints < 0) {
        this.hitpoints = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    }
  }

  /**
   * checks for the last time a character was hit, if it was recently it return true to prevent other animation from interfering
   * with hurt animations and to simulate stun (e.g. character can't spit until it returns false)
   * 
   * @returns true, if damage was sustained recently (<550ms)
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    return timepassed < 550;
  }

  /**
   * 
   * @returns true if hitpoints are 0
   */
  isDead() {
    return this.hitpoints == 0;
  }

  /**
   * simulates "gravity" (or rather anti-gravity) of the bubbles floating up 
   * 
   */
  applyGravity() {
    setInterval(() => {
      this.y -= this.speedY;
      this.speedY += this.acceleration;
    }, 1000 / 20);
  }

  /**
   * Checks if an enemy has been hit with a bubble using "isColliding()"
   * If a hit is registered the bubble disappears.
   * For regular enemies the death animation is played and for the whale damage is registered is case poison is active
   * 
   */
  checkProjectileCollisions() {
    this.projectileInterval = setInterval(() => {
      world.projectiles.forEach((projectile, index) => {
        if (this.isColliding(projectile)) {
          if (this instanceof Jellyfish || this instanceof Pufferfish) {
            this.deathAnimation();
            world.projectiles.splice(index, 1);
          } else if (this instanceof BigAssWhale && world.isPoisonAttack) {
            this.lastHit = new Date().getTime();
            this.takingDamage();
            world.projectiles.splice(index, 1);
          }
        }
      });
    }, 1000 / 20);
  }

}
