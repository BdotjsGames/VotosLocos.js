
class Drawable {
    constructor(x,y,w,h) {
      this.x=x;
      this.y=y;
      this.w=w;
      this.h=h;
      this.z=0;
      this.pivotX = this.w/2;
      this.pivotY = this.h/2;
      this.alpha = 1;
      this.red=200;
      this.green=200;
      this.blue=200;
      
      this.morphs = {};
      this.angle = 0;
      this.scaleW = 1;
      this.scaleH = 1;
      this.updates = [];
      this.dx=0;
      this.dy=0;
      this.dz=0;
      this.trueCoords=true;
      this.sortOffset=0;
    }
    setAttr(name, value) {
      this[name] = value;
      return this;
    }
    setSortOffset(offset) {
      this.y += offset;
      this.sortOffset += offset;
    }
    setZ(z) {
      this.z=z;
      return this;
    }
    setAspectScale(t) {
      this.aspectScale = t;
      return this;
    }
    colorObj(obj) {
      this.red = obj.red;
      this.green = obj.green;
      this.blue = obj.blue;
      if(obj.a!=undefined)this.alpha = obj.alpha;
      return this;
    }
    color(r,g,b,a) {
      this.red = r;
      this.green=g;
      this.blue = b;
      if(a!=undefined)this.aplha = a;
      // this.color = Color.colorString(this);
      this._color = 'rgba(' +
        Math.floor(this.red) + ',' +
        Math.floor(this.green) + ',' +
        Math.floor(this.blue) + ',' +
        this.alpha + 
      ')';
      return this;
    }
    center() {
      this.x -= this.w/2;
      this.y -= this.h/2;
      return this;
    }
    setTrueCoords(v) {
      this.trueCoords = v;
      return this;
    }
    pixelSpace() {
      var W = CE.width;
      var H = CE.height;
      if(this.aspectScale)H = CE.width;
      if(this.trueCoords){
        W=1;
        H=1;
      }
      return {
        x: (this.x) * W,
        y: (this.y) * H,
        w: this.w * W,
        h: this.h * H,
        W:W, H:H,
      }
    }
    contains(x,y) {
      var ps = this.pixelSpace();
      return x >= ps.x && x <= ps.x + ps.w && y >= ps.y && y <= ps.y+ps.h;
    }
    update() {
      for(var i in this.morphs) {
        this.morphs[i].update();
        if(this.morphs[i].shouldDelete) {
          delete this.morphs[i];
        }
      }
      // this.color = 'rgba(' +
      //   Math.floor(this.red) + ',' +
      //   Math.floor(this.green) + ',' +
      //   Math.floor(this.blue) + ',' +
      //   this.alpha + 
      // ')';
      if(!this._color) {
        this._color = 'rgba(' +
        Math.floor(this.red) + ',' +
        Math.floor(this.green) + ',' +
        Math.floor(this.blue) + ',' +
        this.alpha + 
      ')';
      }
      var ps = this.pixelSpace();
      this._w = ps.w;
      if(this.aspectScale) this._h = ps.h;
      else this._h = this.h * ps.H;
      for(var i=0;i<this.updates.length;i++) {
        this.updates[i].call(this);
      }
    }
    drawShape() {
      canvas.strokeStyle = Color.darken(this, .8).color;
      canvas.lineWidth = 10;
      canvas.strokeRect(0,0,this._w,this._h);
      canvas.fillRect(0,0,this._w,this._h);
      canvas.fillStyle = Color.darken(this).color;
      canvas.fillRect(0,0,this._w/4,this._h);
      canvas.fillStyle = Color.lighten(this).color;    
      canvas.fillRect(this._w*.4,this._h/10,this._w/2,this._h/4);   
    }
    draw() {
      if(!this._color) {
        this._color = 'rgba(' +
        Math.floor(this.red) + ',' +
        Math.floor(this.green) + ',' +
        Math.floor(this.blue) + ',' +
        this.alpha + 
      ')';
      }
      canvas.fillStyle = this._color;
      canvas.save();
      // canvas.scale(CE.width, CE.height);
      var ps = this.pixelSpace();
      var H = ps.H;
      var x = (this.x+this.dx+this.pivotX) * ps.W;
      var y = (this.y+this.dy+this.pivotY+this.dz) * ps.H;
      canvas.translate(x, y-this.sortOffset+this.z);
      canvas.scale(this.scaleW, this.scaleH);
      canvas.rotate(this.angle);
      canvas.translate(-this.pivotX*ps.W, -this.pivotY*H);
      this.drawShape(canvas);
      canvas.restore();
    }
    addMorph(name, morph, activate, deletes) {
      morph.obj = this;
      morph.deletes = deletes;
      if(activate) morph.activate();
      this.morphs[name] = morph;
      return this;
    }
  }

  