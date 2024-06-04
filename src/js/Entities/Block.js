class Block {
    constructor(x,y,z,w,d,h) {
        this.x=x;
        this.y=y;
        this.z=z;
        this.w=w;
        this.d=d;
        this.h=h;
        this.color1 = "#acf";
        this.color2 = "#69a";
    }
    update() {}
    draw(canvas) {
        var x = this.x;
        var y = this.y-this.h;
        var w = this.w;
        var h = this.h;
        canvas.fillStyle = this.color1;
        canvas.fillRect(x,y-this.d,w,this.d);
        canvas.fillStyle = this.color2;
        canvas.fillRect(x,y,w,h);
    }
}