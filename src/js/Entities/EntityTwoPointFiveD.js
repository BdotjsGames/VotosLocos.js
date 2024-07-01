class EntityTwoPointFiveD {
    constructor(x,y,z=0,drawable) {
        this.x=x;
        this.y=y;
        this.z=z;
        this.scale = 1;
        this.drawable = drawable;
        this.rotation = 0;
    }
    update() {}
    draw(canvas) {
        canvas.save();
        canvas.translate(this.x,this.y+this.z);
        if(this.rotation)canvas.rotate(this.rotation);
        if(this.scale!=1) canvas.scale(this.scale,this.scale);
        this.drawShape(canvas)
        canvas.restore()
    }
    drawShape(canvas) {
        this.drawable.draw(canvas);
    }
    
}
class ImageTwoPointFiveD extends EntityTwoPointFiveD{
    constructor(x,y,z=0,image) {
        super(x,y,z);
        this.image = image;
    }
    drawShape() {
        canvas.drawImage(this.image, -this.image.width/2,-this.image.height);
    }
}