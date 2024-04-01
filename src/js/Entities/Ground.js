class Ground{
    constructor(x,y,w,h) {
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
    }
    update() {}
    draw() {
        canvas.fillStyle = "#444";
        var {x,y,w,h} = this;
        canvas.fillRect(x,y,w,h);
        for(var i=0;i<w;i++) {

        }
    }
}