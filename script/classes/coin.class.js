class Coin extends DrawableObject {
  height = 35;
  width = 35;

  animationSequence = [
    "./img/4. Marcadores/1. Coins/1.png",
    "./img/4. Marcadores/1. Coins/2.png",
    "./img/4. Marcadores/1. Coins/3.png",
    "./img/4. Marcadores/1. Coins/4.png",
  ];
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImg("img/4. Marcadores/op L1.png");
    this.loadImages(this.animationSequence);
    this.animate();
  }

  /**
   * plays animation
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.animationSequence);
    }, 150);
  }
}
