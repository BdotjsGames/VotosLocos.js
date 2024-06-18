class EntityTwoPointFiveD {
    constructor(x,y,z=0,drawable) {
        this.x=x;
        this.y=y;
        this.z=z;
        this.drawable = drawable;
    }
    update() {}
    draw(canvas) {
        canvas.save();
        canvas.translate(this.x,this.y+this.z);
        this.drawShape(canvas)
        canvas.restore()
    }
    drawShape(canvas) {
        this.drawable.draw(canvas);
    }
    
}