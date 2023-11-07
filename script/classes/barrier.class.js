class Barrier extends MovableObject {
  img;
  width = 200;
  height = 200;

  constructor(img, x, y) {
    super()
    this.img = img;
    this.loadImg(this.img);
    this.x = x;
    this.y = y;
  }
}
