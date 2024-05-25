class Ground{
    constructor(x,y,w,h) {
        this.x=x;
        this.y=-1000;
        this.z=y;
        this.w=w;
        this.h=h;
    }
    update() {}
    draw() {
        canvas.fillStyle = "#444";
        var {x,z,w,h} = this;
        canvas.fillRect(x,z,w,h);
        var tile = IMAGES.backgroundTileStreetSidewalk;
        for(var i=0;i<w;i+=tile.width*2-1) {
            canvas.drawImage(tile,i,z-204,tile.width*2,tile.height*2);
            // canvas.drawImage(tile,i,z-322,tile.width*2,tile.height*2);
        }
    }
}