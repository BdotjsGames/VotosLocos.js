class Cloud extends ImageDrawable{
    constructor(x,y) {
        super(IMAGES.cloud, x,y)
        this.vx = Math.random();
    }
    update() {
        this.x += this.vx;
    }
}