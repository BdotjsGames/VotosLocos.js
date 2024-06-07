class CircleDrawable extends Drawable {
    drawShape(canvas) {
        canvas.strokeStyle = this.strokeColor || Color.darken(this, .8).color;
        canvas.lineWidth = this.lineWidth||10;
        canvas.beginPath();
        canvas.arc(0,0,this._w,0,Math.PI*2);
        canvas.stroke();
        canvas.fill();
    }
}