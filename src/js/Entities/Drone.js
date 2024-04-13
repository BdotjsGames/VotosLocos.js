
class Drone extends BeatEmUpper{
  constructor(x,y) {
    super(x,y,50,50,"brown");
    this.speed = 1;
    this.grav = 0.25;
    this.shootTime = 60*2;
    this.shootTimer = 0;
    this.heal = 0.01;
    this.contactDamage = 0;
    this.health = this.maxHealth = 15;
    // this.offset = Math.random()*this.shootTime
  }
  getHit(other) {
    super.getHit(other) 
    this.shootTimer =0;
  }
  setScene(scene) {
    this.scene=scene;
    scene.enemyCount ++;
  }
  die() {
    super.die();
    this.scene.enemyCount--;
  }
  getInputs() {
    if(this.scene.dialogueBlocking)return;
    var player = this.scene.player;
    if(!player)return;
    var dx = player.x-this.x;
    var dy = player.y-this.y;
    var dz = player.z-this.z;
    // var ds = Math.abs(dx)+Math.abs(dy)+Math.abs(dz);
    if(this.invul<=0&&Math.abs(dx)<5+player.w/2 && Math.abs(dy)<20+player.h/2&&Math.abs(dz)<100){
    // if(ds<50&&this.invul<=0) {
      player.collide(this);
    }
    this.dx = dx>0?1:-1;
    // this.vy += Math.cos(frameCount*Math.PI/10)*.1;
    this.vz += ((player.z - 50 - this.z)/50-this.vz)/10

    if(Math.abs(dx) < 500) {
      this.shootTimer++;
      if(this.shootTimer >= this.shootTime) {
        this.shootTimer = 0;
        this.scene.addEntity(new LaserBeam(this.x,this.y,this.z,this.dx*5, 100));
        SOUNDS.laser.play();
      }
    }
    if(dy>50)this.my=1;
    if(dy<-50)this.my=-1;
  }
  initModel() {
    this.model = new DroneModel(this);
  }
}