class statusBar extends DrawableObject {
  IMAGES;
  percentage;

  constructor(IMAGES, y, percentage) {
    super();
    this.IMAGES = IMAGES;
    this.x = 40;
    this.y = y;
    this.height = 60;
    this.width = 200;
    this.loadImages(this.IMAGES);
    this.setPercentage(percentage);
  }

  /**
   * sets the percentage of the statusbar and then uses returnStatusBasedOnPercentage() to set the appropriate picture
   * 
   * @param {number} percentage between 100 and -1
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.returnStatusBasedOnPercentage()];
    this.img = this.imageCache[path];
  }

  /**
   * 
   * @returns number that correlates to an index of a picture inside the IMAGES array
   * 
   */
  returnStatusBasedOnPercentage() {
    if (this.percentage > 99) {
      return 5;
    } else if (this.percentage > 79) {
      return 4;
    } else if (this.percentage > 59) {
      return 3;
    } else if (this.percentage > 39) {
      return 2;
    } else if (this.percentage > 9) {
      return 1;
    } else {
      return 0;
    }
  }
}


