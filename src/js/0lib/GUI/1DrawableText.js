class DrawableText extends Drawable{
    constructor(text,x,y,w,h,size) {
      super(x,y,w,h);
      this.text=text;
      this.fontSize = size;
      this.fontFamily = FONT_FAMILY.default;
      this.textAlign ='center';
      this.textBaseline = 'middle';
      this.textPosition = w/2;
    }
    drawShape(canvas) {
      // super.drawShape(canvas);
      var w = this._w;
      var h = this._h;
      // canvas.fillStyle=Color.darken(this).color;
      // canvas.fillRect(0,0,w,h);
      canvas.fillStyle=this._color;
      var ps = this.pixelSpace();
      canvas.font = this.fontSize*ps.W +'px ' + this.fontFamily;
      canvas.textAlign = this.textAlign;
      canvas.textBaseline='middle';
      canvas.fillText(this.text,this.textPosition, h/2,w);
    }
  }