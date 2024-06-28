class Particle {
  constructor(x,y,w,h,color,vx,vy,life,grav) {
    this.x=x;this.y=y;this.color=color;
    this.w=w;this.h=h;
    this.vx=vx;
    this.vy=vy;
    this.grav=grav||0;
    this.maxLife=
    this.life=life;
    this.alpha =1;
    this.t= 0;
    this.z = 0;
  }
  update() {
    this.t+=1;
    this.vy += this.grav;
    this.x+=this.vx;
    this.y+=this.vy;
    this.life--;
    if(this.life<=0) {
      this.shouldDelete = true;
    }
    this.alpha = this.life/this.maxLife;
    if(this.customUpdate) this.customUpdate();
  }
  draw(canvas) {
    if(this.t<0)return;
    canvas.fillStyle = this.color;
    // canvas.fillRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h);
    canvas.globalAlpha = this.alpha;
    canvas.beginPath();
    canvas.arc(this.x,this.y+this.z,this.w/2,0,Math.PI*2);
    canvas.fill();
    canvas.globalAlpha = 1;
  }
}

class ImageParticle extends Drawable {
  constructor(image,x,y,w,h,vx,vy,life,grav) {
    super(x,y,w,h);
    this.vx=vx;
    this.vy=vy;
    this.grav=grav||0;
    this.maxLife=
    this.life=life;
    this.image = image;
    this.z=0;
    // this.sortOffset = -15;
    // this.y += this.sortOffset;
    this.trueCoords = true;
  }
  update() {
    super.update();
    this.vy += this.grav;
    this.x+=this.vx;
    this.y+=this.vy;
    this.life--;
    if(this.life<=0) {
      this.shouldDelete = true;
    }
  }
  drawShape(canvas) {
    // canvas.fillStyle = this.color;
    // canvas.fillRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h);
    canvas.globalAlpha = this.life/this.maxLife;
    // canvas.beginPath();
    // canvas.arc(this.x,this.y,this.w/2,0,Math.PI*2);
    // canvas.fill();
    canvas.drawImage(this.image, -this.w/2,-this.h/2,this.w,this.h);
    canvas.globalAlpha = 1;
  }
}