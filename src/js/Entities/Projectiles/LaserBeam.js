class LaserBeam {
  constructor(x,y,z,vx, damage, life, enemies) {
    this.w = 20;
    this.h = 8; 
    this.x=x;this.y=y;this.vx=vx;
    this.z=z;
    this.life=life;
    this.contactDamage = damage;
    this.enemies = enemies;
    this.frameCount = 0;
  }
  update() {
    if(this.scene.dialogueBlocking)return;
    this.x += this.vx;
    this.life --;
    if(this.life<=0) {
      this.shouldDelete = true;
    }
    this.frameCount += 1;
    this.enemies.forEach(enemy=>{
      var dx = Math.abs(enemy.x-this.x);
      var dy = Math.abs(enemy.y-this.y);
      var dz = Math.abs(enemy.z-this.z);
      if(dx<10+enemy.w/2 && dy<50+enemy.h/2&&dz<100) {
        enemy.getHit(this);
        this.shouldDelete = true;
      }
    })
    // var player = this.scene.player;
    // if(!player)return;
    // var dx = Math.abs(player.x-this.x);
    // var dy = Math.abs(player.y-this.y-player.h/2);
    // var dz = Math.abs(player.z-this.z);
    // if(dx<5+player.w/2 && dy<2+player.h/2&&dz<10) {
    //   player.getHit(this);
    //   this.shouldDelete = true;
    // }
  }
  drawShape(canvas) {

    canvas.fillStyle = 'red';
    canvas.fillRect(this.w/2,this.h/2+this.z,this.w,this.h);
  }
  draw(canvas) {
    canvas.save();
    canvas.translate(this.x,this.y+this.z);
    this.drawShape(canvas);
    canvas.restore();
  }
}