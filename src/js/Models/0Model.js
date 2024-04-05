class Model {
  constructor(parent) {
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.scaleBoth = 1;
    this.parent = parent;
    this.parts = [];
    this.outlineColor = "black";
    this._rotation = this.rotation;
    this.quantizeRotation = false;
    this.flip = false;
  }
  update(){}
  traverseLimbs(callback) {
    this.traverseList(this.parts,0,callback)
  }
  traverseList(list,i,callback) {
    list.forEach((part,j)=>{
      i=this.traverseList(part.before, i+j,callback)
      callback(part, i+j);
      i=this.traverseList(part.after, i+j+1,callback)
    })
    return i;
  }
  createLimb(x,y,drawable,rotation) {
    var limb = new Limb(x,y,drawable,rotation);
    limb.parent=this;
    limb.model=this;
    this.parts.push(limb);
    return limb;
  }
  draw(x,y) {
    canvas.save();
    canvas.translate(x,y);
    if(this.quantizeRotation) {
      var q = 4;
      canvas.rotate(this._rotation+Math.round((this.rotation-this._rotation)*q)/q);
    } else canvas.rotate(this.rotation);
    canvas.scale(this.scaleX*this.scaleBoth,this.scaleY*this.scaleBoth);
    if(this.flip) {
      canvas.scale(-1,1);
    }
    // canvas.strokeRect(-this.w/2,-this.h/2,this.w,this.h);
    this.parts.forEach(function(e) {
      e.draw();
    });
    canvas.restore();
  }
  drawOutline(x,y) {
    var color = this.outlineColor;
    canvas.save();
    canvas.translate(x,y);
    canvas.rotate(this.rotation);
    canvas.scale(this.scaleX*this.scaleBoth,this.scaleY*this.scaleBoth);
    if(this.flip) {
      canvas.scale(-1,1);
    }
    // canvas.strokeRect(-this.w/2,-this.h/2,this.w,this.h);
    this.parts.forEach(function(e) {
      e.draw({color: color, dw: 1});
    });
    canvas.restore();
  }
  drawHighlight(x,y) {
    canvas.save();
    canvas.translate(x,y);
    canvas.rotate(this.rotation);
    canvas.scale(this.scaleX*this.scaleBoth,this.scaleY*this.scaleBoth);
    if(this.flip) {
      canvas.scale(-1,1);
    }
    // canvas.strokeRect(-this.w/2,-this.h/2,this.w,this.h);
    this.parts.forEach(function(e) {
      e.draw();
      e.draw({color: "#ffffff88", dw: -2,dx:1,dy:-1});
    });
    canvas.restore();
  }
}