class Poison extends DrawableObject {
    img;
    animationSequence = [
        './img/4. Marcadores/Posión/Animada/1.png',
        './img/4. Marcadores/Posión/Animada/2.png',
        './img/4. Marcadores/Posión/Animada/3.png',
        './img/4. Marcadores/Posión/Animada/4.png',
        './img/4. Marcadores/Posión/Animada/5.png',
        './img/4. Marcadores/Posión/Animada/6.png',
        './img/4. Marcadores/Posión/Animada/7.png',
        './img/4. Marcadores/Posión/Animada/8.png'
    ]

    constructor(x, y) {
        super().loadImg("img/4. Marcadores/Posión/Animada/1.png");
        this.loadImages(this.animationSequence)
        this.animate()
        this.x = x;
        this.y = y;
    }

    /**
     * animates basic movement
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.animationSequence)
        }, 150);
    }
    
    
}