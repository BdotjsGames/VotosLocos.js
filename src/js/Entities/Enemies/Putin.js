// class Putin extends Bot {
class Putin extends Bot {
    constructor(x,y) {
        super(x,y);
        this.health = this.maxHealth = 200;
        // if(DEV)this.health = 1;
        // this.hitResistence = 100;
        this.getknockBack = 2
        this.attackX = 800;
        this.attackY = 60;
        this.noticeDistance = 1000;
        this.rangeDistance = 600;
        this.straffing = true;
        this.item.type = ITEMS.sodaBottle;
        this.name = "Putin";
        // this.model.attackCombo.push(putinSpawnAnimation,putinSpawnAnimation,putinSpawnAnimation)
        this.model.attackCombo = [putinSpawnAnimation, putinSpawnAnimation,putinSpawnAnimation, enemyThrowAnim,enemyThrowAnim,enemyThrowAnim, putinSlam]
        // this.model.attackCombo = [enemyJumpAway, enemyThrowAnim,enemyThrowAnim,enemyThrowAnim, botanims.armSpinny]
        this.model.scaleBoth = 1.2;
        this.phase=1;
    }
    getHit(other) {
      super.getHit(other)
      if(this.model.animKeyFrame&&this.model.animKeyFrame.vulnerable) {
        this.model.startAnim(anims.dazed)
      }
    }
    update() {
      super.update();
      if(this.dead) {
        var tx = this.scene.level.width*.75;
        this.x += (tx-this.x) * .01;
      }
      if(this.health<this.maxHealth*2/3&&this.phase==1) {
        this.phase=2;
        this.jump();
        this.startShield();
      }
      if(this.health<this.maxHealth/3&&this.phase==2) {
        this.phase=3;
        this.jump();
        // this.dodge();
        this.hitResistence = 100;
        this.getknockBack = 4;
        // this.model.outlineColor = 'yellow'
        this.startShield();
      }
    }
    die() {
      if(this.dead)return;
      // return;
      this.animDuringCutscene = true;
      this.dead = true;
      this.model.endAnim();
      this.model.die();
      this.obj = this;
      var horse;
      // this.x = this.scene.level.width/2;
      this.y = 0;
      this.shouldStealCamera = true;
      // this.vx = (this.scene.level.width/2-this.x) / 10;
      this.vz = -1;
      this.scene.playDialogue([
        {person: this, zoom: 2, text: " "}
      ], true, () => this.scene.loadNextLevel())
      return;
      this.scene.playDialogue([
        {person: this, zoom:2, text: "Oh no. It is time to make escape"},
        {onStart: () => {
          super.die();
          // this.shouldDelete = true;
          horse = this.scene.addEntity(new PutinOnAHorse(this.x,this.y))
        }},
        {person: this, text: "Good luck with bots"},
        {person: this, text: "hahahaha"},
        {onStart: () => {
          horse.mx = 1;
        }}
      ])

    }
    spawnBot() {
        // var data = this.item.type;
        // var z = this.z + (-this.model.legLength-20)*2;
        // var proj = this.scene.addEntity(new LaserBeam(this.x+30*this.dx+this.vx,this.y,z,this.dx*10,5, 100,this.enemies));
        // if(data.drawShape)
        //     proj.drawShape = data.drawShape;
        // if(data.damage)
        //     proj.damage = data.damage;
        var x = player.x + (Math.random()*2-1) * 300;// + (Math.random()*2-1)*100;
        var y = player.y + (Math.random()*2-1) * 300;// + (Math.random()*2-1)*100;
        if(y<10)y=10;
        if(x<0)x=0;
        this.scene.addEntity(new BotSpawnAirStrike(x,y));
    }
    initModel(w, h, color,color2) {
        this.model = new PutinModel(w, h,"#f6e1c5", "#d3a684", this);
    }
    getInputs() {
      var player = this.scene.player;
      var dx = player.x-this.x;
      var dy = player.y-this.y;
      this.dx = dx>0?1:-1;
      this.shootTimer ++;
      if(this.model.anim)return;

      if(dy>50) {
        this.my = 1;
      }
      if(dy<-50) {
        this.my = -1;
      }
      
      if(Math.abs(dx)<300&&this.health<this.maxHealth/2) { 
        // this.model.attack(anims.punch1);
        this.mx = -this.dx;
      }
      if(Math.abs(dx)<100) { 
        // this.model.attack(anims.punch1);
        this.mx = (this.scene.level.width/2-this.x)>0?1:-1
        // this.jump();
      }
      if(Math.abs(dx)>600) {
        this.mx=0;
      }
      
      if(this.shootTimer>this.shootTime) {
        this.shootTimer=0;
        if(Math.abs(dx)<50) { 
          this.model.attack(anims.punch1);
        }else if(Math.abs(dx)<100) {
          this.model.attack(putinSlam)
        }else {
          if(this.scene.enemies.length<6) {
            this.attack()
          } else {
            this.model.attack(this.enemyThrowAnim)
          }
        }
      }

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

  var putinSlam = [
    {
      limbs: [
        {limb: 'body2', rotation: -Math.PI/4},
        {limb: 'body', rotation: -Math.PI/4},
        {limb: 'head', rotation: 0},
        {limb: 'legL', rotation: Math.PI/6},
        {limb: 'legL2', rotation: 0},
        {limb: 'legR', rotation: -Math.PI/6},
        {limb: 'legR2', rotation: 0},
        {limb: 'arm1', rotation: -Math.PI},
        {limb: 'arm2', rotation: -Math.PI},
      ],
      unInteruptable: true,
      onStart: self=> {
        self.parent.startShield();
      },
      customUpdate: self => {
        self.parent.vz= -10;
      },
      time: 15
    },
    {
      limbs:[],
      time:10
    },
    {
      limbs: [
        {limb: 'body2', rotation: Math.PI/4},
        {limb: 'body', rotation: Math.PI/2},
        {limb: 'head', rotation: 0},
        {limb: 'legL', rotation: Math.PI/6},
        {limb: 'legL2', rotation: Math.PI/2},
        {limb: 'legR', rotation: -Math.PI/6},
        {limb: 'legR2', rotation: Math.PI/2},
        {limb: 'arm1', rotation: -Math.PI/2},
        {limb: 'arm2', rotation: -Math.PI/2},
      ],
      customUpdate: self => {
        self.parent.vz= 0;
      },
      time: 10
    },
    {
      limbs: [
        {limb: 'body2', rotation: 0},
        {limb: 'body', rotation: Math.PI/2,_y:30},
        {limb: 'head', rotation: 0},
        {limb: 'arm1', rotation: -Math.PI},
        {limb: 'arm2', rotation: -Math.PI},
      ],
      damage: 15,
      customUpdate: self => {
        self.parent.vz= 40;
        if(self.parent.grounded) {
          self.parent.stopShield();
          self.parent.attackHitbox = self.parent.largeHitbox;
          if(self.unlanded) {
            self.unlanded = false;
            spawnDeathParticles(self.parent.scene,self.parent.x,self.parent.y,self.parent.z,250,32)
            SOUNDS.attack.play();
          }
        }
      },
      onStart: self => {
        self.parent.vz = 30;
        self.attacking = true
        self.unlanded = true;
        // self.parent.attackHitbox = self.parent.largeHitbox;
        self.knockbackUp = 20;
      },
      time: 20
    },
    {
      unInteruptable: true,
      interuptable: false,
      vulnerable: true,
      limbs: [
        {limb: 'body2', rotation: 0},
        {limb: 'body', rotation: Math.PI/2,_y:30},
        {limb: 'head', rotation: 0},
        {limb: 'arm1', rotation: -Math.PI},
        {limb: 'arm2', rotation: -Math.PI},
      ],
       time: 120, onStart: self=>{
        self.attacking=false;
        self.knockbackUp = 0;
      }
    },
    {
      unInteruptable: true,
      interuptable: false,
      vulnerable: true,
      limbs: 
      [
        {limb: 'body2', rotation: 0},
        {limb: 'body', rotation: 0,_y:0},
        {limb: 'head', rotation: 0},
        {limb: 'legL', rotation: 0},
        {limb: 'legL2', rotation: 0},
        {limb: 'arm1', rotation: 0},
        {limb: 'arm2', rotation: 0},
        // {limb: 'hips', rotation: -Math.PI/2},
      ], time: 30, onStart: self=>{
        self.attacking=false;
        self.knockbackUp = 0;
      }
    }
  ]