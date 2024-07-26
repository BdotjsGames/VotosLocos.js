class BackgroundBuilding extends Drawable{
    constructor(x,y,w,h,color) {
        super(x,y,w,h);
        this.color = color;
        this.trueCoords = true;
        this.setSortOffset(-100);
    }
    drawShape(canvas) {
        canvas.fillStyle = this.color;
        var {w,h} = this;
        canvas.fillRect(1,1-h,w-2,h-2);
        canvas.strokeStyle = "black";
        canvas.strokeWidth = 1;
        canvas.lineWidth = 2;
        canvas.strokeRect(1,-h+1,w-2,h-2);
    }
}