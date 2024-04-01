class CheeseburgerJohnsonModel extends Model {
  constructor(parent) {
    super(parent);
    var w = 20;
    var h = 40;
    var stuff = [
      ["#da5",0],
      ["#3d3",1],
      ["#ff0",1],
      ["#951",2],
      ["#da5",1],
    ]
    var w = h/stuff.length;
    var y = h/4;
    this.w=w;
    this.h=h;
    this.body = this.createLimb(0,0);
    for(var i=stuff.length-1;i>=0;i--) {
      var thing = stuff[i];
      this.body.createAfter(0,y,new Line(-w/2,0,w/2,0,w*2,'round',thing[0]));
      y-=h/stuff.length/2*thing[1];
    }
    this.face = this.body.createAfter(0,-h/4);
    this.face.createAfter(-w/2,0,new Circle(0,0,w/3,'black'));
    this.face.createAfter(w/2,0,new Circle(0,0,w/3,'black'));
  }
  attack() {
    if(this.attacking)return;
    if(this.cooldownTimer>0)return;
    this.attackSound.play();
    this.doubleJumping=false;
    this.parent.wallColliding = false;
    this.attacking = true;
    var dx = this.parent.dx;
    this.idle();
    this.rotation = 0;
    this.body.rotation = -Math.PI/4*dx;
    this.head.rotation = -this.body.rotation/2;
    this.attackTimer = 15;
  }
  update() {
    var d = this.parent.vz/40 || 0;
    d+=Math.cos(frameCount*Math.PI/40)/10;
    this.scaleX += (1-d-this.scaleX)/10;
    this.scaleY += (1+d-this.scaleY)/10;
    if(this.crouching&&this.grounded) this.crouch();
    if(this.grounded) {
      if(this.scaleY<1)
        this.body._y = (1-this.scaleY)*this.h;
      else
        this.body._y = (1-this.scaleY)*this.h/4;
    } else if(this.ceilingCollide) {
      this.body._y = -(1-this.scaleY)*this.h;
    } else {
      this.body._y=0;
    }
    // this.traverseLimbs((l,i)=>{
    //   l._y += this.parent.vy * i * 10;
    // })
    this.face._x = this.parent.dx*2;
    this.rotation = Math.cos(frameCount*Math.PI/10)*Math.PI/20*this.parent.vx/this.parent.speed;
  }
  crouch() {
    this.scaleY = 0.5;
    this.scaleX = 1.5;
  }
  jump() {
    this.scaleY = 2;
    this.scaleX = .5;
  }
  doubleJump() {
    this.scaleY = 2;
    this.scaleX = .5;
  }
  wallCollide() {
    var d = Math.abs(this.parent.vx)/30;
    this.scaleX = 1-d;
    this.scaleY = 1+d;
  }
  attack() {

  }
  land() {
    this.scaleY = .8;
    this.scaleX = 1.2+Math.abs(this.parent.vy)/20;
  }
}