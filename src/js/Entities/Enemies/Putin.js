// class Putin extends Bot {
class Putin extends Bot {
    constructor(x,y) {
        super(x,y);
        this.health = this.maxHealth = 150;
        this.hitResistence = 100;
        this.attackX = 800;
        this.attackY = 60;
        this.noticeDistance = 1000;
        this.rangeDistance = 600;
        this.straffing = true;
        this.item.type = ITEMS.beerBottle;
        // this.model.attackCombo.push(putinSpawnAnimation,putinSpawnAnimation,putinSpawnAnimation)
        this.model.attackCombo = [putinSpawnAnimation, putinSpawnAnimation,putinSpawnAnimation, anims.groundSlam, anims.punch1,anims.punch2,enemyJumpAway, enemyThrowAnim,enemyThrowAnim,enemyThrowAnim, botanims.armSpinny]
        // this.model.attackCombo = [enemyJumpAway, enemyThrowAnim,enemyThrowAnim,enemyThrowAnim, botanims.armSpinny]
    }
    spawnBot() {
        // var data = this.item.type;
        // var z = this.z + (-this.model.legLength-20)*2;
        // var proj = this.scene.addEntity(new LaserBeam(this.x+30*this.dx+this.vx,this.y,z,this.dx*10,5, 100,this.enemies));
        // if(data.drawShape)
        //     proj.drawShape = data.drawShape;
        // if(data.damage)
        //     proj.damage = data.damage;
        var x = player.x + player.vx * 10;// + (Math.random()*2-1)*100;
        var y = player.y + player.vy * 10;// + (Math.random()*2-1)*100;
        this.scene.addEntity(new BotSpawnAirStrike(x,y));
    }
    initModel(w, h, color,color2) {
        this.model = new PutinModel(w, h,"#f6e1c5", "#d3a684", this);
    }
}

var putinSpawnAnimation = [
    {
      doLegWalk: true,
      limbs: [
        {limb: 'body2', rotation: -Math.PI/10},
        {limb: 'body', rotation: 0},
        {limb: 'head', rotation: 0},
        {limb: 'legL', rotation: 0},
        {limb: 'legL2', rotation: 0},
        {limb: 'arm1', rotation: -Math.PI*1.3},
        {limb: 'arm2', rotation: 0},
      ],
      customUpdate: self => {
        self.parent.mx=0;
        self.parent.my = 0;
        // self.parent.telegraphProjectile = true;
      },
      time: 20,
    },
    {
      doLegWalk: true,
      limbs: [
        {limb: 'body2', rotation: Math.PI/10},
        {limb: 'body', rotation: 0},
        {limb: 'head', rotation: 0},
        {limb: 'legL', rotation: 0},
        {limb: 'legL2', rotation: 0},
        {limb: 'arm1', rotation: -Math.PI/2},
        {limb: 'arm2', rotation: 0},
      ],
      time: 2,
      onStart: self => {
        self.parent.spawnBot()

      }
    },
    {
      doLegWalk: true,
      limbs: [
        {limb: 'body2', rotation: 0},
        {limb: 'body', rotation: 0},
        {limb: 'head', rotation: 0},
        {limb: 'legL', rotation: 0},
        {limb: 'legL2', rotation: 0},
        {limb: 'arm1', rotation: 0},
        {limb: 'arm2', rotation: 0},
      ],
      onStart: self => {
        // self.parent.telegraphProjectile = false;
      },
      time: 10,
    }
  ]

  var enemyJumpAway= [
    {
      limbs: [],
      onStart: (self) => {
        var dx = player.x>self.x?1:-1;
        self.parent.mx = - dx;
        self.parent.jump();
      }, time: 20,
      customUpdate: (self) => {
        var dx = player.x>self.x?1:-1;
        self.parent.mx = -dx;

      }
    }
  ]