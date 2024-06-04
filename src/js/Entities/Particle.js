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
  }
  update() {
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
    canvas.fillStyle = this.color;
    // canvas.fillRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h);
    canvas.globalAlpha = this.alpha;
    canvas.beginPath();
    canvas.arc(this.x,this.y,this.w/2,0,Math.PI*2);
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
  drawShape() {
    // canvas.fillStyle = this.color;
    // canvas.fillRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h);
    canvas.globalAlpha = this.life/this.maxLife;
    // canvas.beginPath();
    // canvas.arc(this.x,this.y,this.w/2,0,Math.PI*2);
    // canvas.fill();
    canvas.drawImage(this.image, 0,0,this.w,this.h);
    canvas.globalAlpha = 1;
  }
}