class Rect {
  constructor(x,y,w,h,color) {
    this.x=x;this.y=y;
    this.w=w;
    this.h=h;
    this.color = color;
  }
  draw(canvas) {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h);
  }
}

class Circle {
  constructor(x,y,r,color) {
    this.x=x;this.y=y;this.r=r;this.color=color;
  }
  draw(canvas,override) {
    if(override&&override.color)canvas.fillStyle=override.color;
    else canvas.fillStyle = this.color;
    var r = this.r;
    if(override&&override.dw) {
      r+=override.dw;
    }
    var dx =0;
    var dy =0;
    if(override) {
      if(override.dx)dx=override.dx;
      if(override.dy)dy=override.dy;
    }
    canvas.beginPath();
    canvas.arc(this.x+dx,this.y+dy,r,0,Math.PI*2);
    canvas.fill();
  }
}
var offCanvasE = document.createElement('canvas');
offCanvasE.width = 128;
offCanvasE.height = 128;
var offCanvas = offCanvasE.getContext('2d');
class ImageDrawable {
  constructor(image,x=0,y=0,w,h) {
    this.image = image;
    this.x=x;this.y=y;this.w=w;this.h=h;
    if(!w&&!h) {
      this.w = image.width;
      this.h = image.height;
    }
    else if(!this.w) {
      this.w = image.width/image.height*this.h;
    }else if(!this.h) {
      this.h = image.height/image.width*this.w;
    }
    this.hidden = false;
    this.x-=this.w/2;
    this.y-=this.h/2;
  }
  reInit() {
    var image = this.image;
    if(!this.w&&!this.h) {
      this.w = image.width;
      this.h = image.height;
    }
    else if(!this.w) {
      this.w = image.width/image.height*this.h;
    }else if(!this.h) {
      this.h = image.height/image.width*this.w;
    }
    this.hidden = false;
    this.x-=this.w/2;
    this.y-=this.h/2;
  }
  setScaleToImage() {
    if(!this.image)return;
    this.w = this.image.width;
    this.h = this.image.height;
  }
  update() {}
  draw(canvas,override) {
    if(this.hidden)return;
    if(!this.image)return;
    if(this.image.width==0)return;
    if(override
      &&override.color!='black'
    ) {
      offCanvasE.width = this.image.width;
      offCanvasE.height = this.image.height;
      offCanvas.fillStyle = override.color;
      offCanvas.fillRect(0,0,this.image.width,this.image.height);
      offCanvas.globalCompositeOperation='destination-in'
      offCanvas.drawImage(this.image,0,0);

      // canvas.save();
      // canvas.scale(1+override.dw/10,1+override.dw/10)
      var dw = override.dw+1;
      canvas.drawImage(offCanvasE,0,0,this.image.width,this.image.height,this.x-dw,this.y-dw,this.w+dw*2,this.h+dw*2);
      // canvas.restore();
      return;
    }
    canvas.drawImage(this.image,this.x,this.y,this.w,this.h);
  }
}

class ExtendableImageDrawable extends ImageDrawable{
  constructor(image, x,y,w,h,pivotX,extendX=0) {
    super(image,x,y,w,h);
    this.pivotX = pivotX;
    this.extendX = extendX;
  }
  draw(canvas,override) {
    if(this.extendX==0)return super.draw(canvas,override);
    if(override)return;
    if(this.hidden)return;
    if(!this.image)return;
    // if(true)
    // {
    //   canvas.drawImage(this.image,this.x,this.y,this.w,this.h);
    //   canvas.drawImage(this.image,this.pivotX,12,this.image.width-this.pivotX,this.image.height-12,
    //     this.x+this.w*(this.pivotX+this.extendX)/this.image.width, this.y+(12)*this.h/this.image.height,
    //     this.w*(1-this.pivotX/this.image.width),
    //     (this.image.height-12)*this.h/this.image.height,
    //   )
    //   return;
    // }
    if(this.extendX>0) {
      canvas.drawImage(this.image,this.pivotX,0,1,this.image.height,
        this.x+(this.pivotX)*(this.w/this.image.width)-1,this.y,this.extendX*(this.w/this.image.width)+2,this.h);
    }
    if(this.extendX<0) {
      canvas.drawImage(this.image,this.pivotX-this.extendX,0,this.image.width-this.pivotX+this.extendX,this.image.height,
        this.x+this.w*((this.pivotX+0)/this.image.width),this.y,this.w*(1-(this.pivotX-this.extendX)/this.image.width),this.h);
    } else {
      canvas.drawImage(this.image,this.pivotX,0,this.image.width-this.pivotX,this.image.height,
        this.x+this.w*((this.pivotX+this.extendX)/this.image.width),this.y,this.w*(1-this.pivotX/this.image.width),this.h);
    }
    
      canvas.drawImage(this.image,0,0,this.pivotX,this.image.height,
        this.x-.1,this.y,this.w*(this.pivotX/this.image.width)+.2,this.h);

    
        // if(this.extendX>4) {
        //   canvas.globalAlpha=0.5;
        //   canvas.drawImage(this.image,this.pivotX+1,0,1,this.image.height,
        //     this.x+(this.pivotX+4)*(this.w/this.image.width)-1,this.y,(this.extendX-3)*(this.w/this.image.width)+2,this.h);
        //   canvas.globalAlpha = 1;
        // }
  }
}

class CurveTrail {
  constructor(x1,y1,width,cap,color) {
    this.x1=x1;
    this.y1=y1;
    this.ex = x1;
    this.ey = y1;
    this.mx = x1;
    this.my = y1;
    this.points = [];
    this.length = 3;
    this.points.push([x1,y1]);
    this.width=width;
    this.cap=cap;
    this.color = color;
  }
  setEnd(x,y) {
    this.mx=this.ex;
    this.my=this.ey;
    this.ex+=(x-this.ex)/10;
    this.ey+=(y-this.ey)/10;
  }
  draw(canvas,override) {
    if(override&&override.color) canvas.strokeStyle = override.color;
    else canvas.strokeStyle = this.color;
    canvas.lineCap = this.cap;
    var w = this.width;
    if(override&&override.dw) {
      w+=override.dw*2;
    }
    var dx=0;
    var dy =0;
    if(override) {
      if(override.dx) dx += override.dx;
      if(override.dy) dy += override.dy;
    }
    canvas.lineWidth = w;
    canvas.beginPath();
    canvas.moveTo(this.x1+dx,this.y1+dy);
    canvas.quadraticCurveTo(this.mx+dx,this.my+dy,this.ex+dx,this.ey+dy);
    canvas.stroke();
  }
}

class Line {
  constructor(x1,y1,x2,y2,width,cap,color){
    this.x1=x1;
    this.y1=y1;
    this.x2=x2;
    this.y2=y2;
    this.width=width;
    this.cap=cap;
    this.color=color;
    this.hidden = false;
  }
  draw(canvas,override) {
    if(this.hidden)return;
    if(override&&override.color) canvas.strokeStyle = override.color;
    else canvas.strokeStyle = this.color;
    canvas.lineCap = this.cap;
    var w = this.width;
    var dw = 0;
    if(override&&override.dw) {
      w+=override.dw*2;
      if(this.cap=="butt")
        dw = override.dw*1.5;
    }
    var dx = 0;
    var dy = 0;
    if(override) {
      if(override.dx) dx=override.dx;
      if(override.dy) dy=override.dy;
    }
    canvas.lineWidth = w;
    canvas.beginPath();
    canvas.moveTo(this.x1+dx,this.y1+dy-dw);
    canvas.lineTo(this.x2+dx,this.y2+dw);
    canvas.stroke();
  }
}

class Limb {
  constructor(x,y,drawable,rotation,ignoresOverride) {
    this.ignoresOverride=ignoresOverride;
    this._x=0;
    this._y=0;
    this.scaleX=1;
    this.scaleY=1;
    this.x=x;this.y=y;
    this.rotation = rotation || 0;
    this._rotation = this.rotation;
    this.drawable = drawable;
    this.before = [];
    this.after = [];
    this.quantizeRotation = false;
    this.hidden = false;
  }
  changePalette(palleteName, i) {
    var img = this.drawable.image;
    if(!img)return;
    if(!img.palletSwaps)return
    var skinPallete = img.palletSwaps[palleteName];
    if(!skinPallete)return;
    var skin = skinPallete[i];
    if(!skin)return;
    skin.palletSwaps = img.palletSwaps;
    this.drawable.image = skin;
  }
  createBefore(...args) {
    var limb = new Limb(...args);
    limb.parent = this;
    limb.model = this.model;
    this.before.push(limb);
    return limb;
  }
  createAfter(...args) {
    var limb = new Limb(...args);
    limb.parent = this;
    limb.model = this.model;
    this.after.push(limb);
    return limb;
  }
  draw(canvas,override) {
    if(this.hidden)return;
    if(override&&this.ignoresOverride)return;
    canvas.save();
    canvas.translate(this.x+this._x,this.y+this._y);
    if(this.rotation) {
      if(this.quantizeRotation) {
        var q = 2;
        canvas.rotate(this._rotation+Math.round((this.rotation-this._rotation)*q)/q);
      } else 
      canvas.rotate(this.rotation);
    }
    canvas.scale(this.scaleX,this.scaleY);
    this.before.forEach(function(e){e.draw(canvas,override)});
    if(this.drawable)this.drawable.draw(canvas,override);
    this.after.forEach(function(e){e.draw(canvas,override)});
    canvas.restore();
  }
}