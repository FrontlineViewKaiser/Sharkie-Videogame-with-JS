class Background extends MovableObject {
    height = 480;
    width = 720;
    y = 0;





    constructor(imgPath, x) {
        super().loadImg(imgPath)
        this.x = x;
    }
        
}