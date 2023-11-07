class DrawableObject {
  height = 50;
  width = 50;
  x = 20;
  y = 250;
  img;
  imageCache = {};
  oldImagePath = "";
  currentImage = 0;

  /**
   * loads an image to a new instance of a class
   * @param {string} path path to an image
   */
  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }


/**
 * loads an array full of images to the imageCache to prepare for animations
 * @param {array} array 
 */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * draw method for canvas
   * @param {ctx} ctx 
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


  /**
   * Makes sure the animation begins at 0 before looping through all images in an array to draw them one by one, creating an animation
   * 
   * @param {array} images array of images to be played
   */
  playAnimation(images) {
    if (this.oldImagePath == "" || this.oldImagePath != images[0]) {
      this.currentImage = 0;
      this.oldImagePath = images[0];
    }
    this.currentImage = (this.currentImage + 1) % images.length;
    let path = images[this.currentImage];
    this.img = this.imageCache[path];
  }

  /**
   * returns through if two objects collide based on their inherent height, width and position.
   * 
   * 
   * @param {object} obj 
   * @returns true if objects encroach on each others hitboxes
   */
  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.height >= obj.y &&
      this.y <= obj.y + obj.height
    );
  }
}
