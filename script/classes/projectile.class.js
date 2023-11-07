class Projectile extends MovableObject {
  speedY;
  speedX;
  direction;

  constructor(x, y, direction, poison) {
    super();
    if (poison) {
      this.loadImg(
        "./img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png"
      );
    } else {
      this.loadImg("./img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    }

    this.throw(x, y, direction);
  }

  /**
   * moves the bubble in an inverted curve, starting close to the characters mouth. Direction is used to invert the values to left if needed
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {number} direction either 1 or -1 depending on direction of character
   */
  throw(x, y, direction) {
    clearInterval(this.interval);
    this.x = x;
    this.y = y;
    this.speedY = -8;
    this.speedX = 20 * direction;
    this.applyGravity();
    let interval = setInterval(() => {
      this.x += this.speedX;
    }, 1000 / 20);
  }
}
