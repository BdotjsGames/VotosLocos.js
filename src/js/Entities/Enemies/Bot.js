class Bot extends BeatEmUpper {
    constructor(x,y) {
        super(x,y,20,40,"#666","#444")
        // this.model.face.drawable.image = IMAGES.botHead;

        this.speed = 3;
        this.grav = 0.25;
        this.shootTime = 60;
        this.shootTimer = 60;
        this.regen = 0.01;
        this.health = this.maxHealth = 30;
        this.contactDamage = 3;
        this.name = 'bot';
        this.talkSound = SOUNDS.botTalk;
        this.every = 3;
        this.followY = true;//Math.random()>.5;
        this.followX = Math.random()>.5;
        this.noticed = false;
        this.isBot = true;
        this.attackHitbox = {
            width: 40, height: 40,
        }
        this.largeHitbox= { width: 150, height: 70};

        this.noticeDistance = 300
        this.attackX = 240
        this.attackY = 120
        this.enemySeekRange = 20;

        this.rangeDistance = 10;
    }

    throwProjectile() {
        var data = this.item.type;
        var z = this.z + (-this.model.legLength-20)*2;
        var proj = this.scene.addEntity(new LaserBeam(this.x+30*this.dx+this.vx,this.y,z,this.dx*10,5, 100,this.enemies));
        if(data.drawShape)
            proj.drawShape = data.drawShape;
        if(data.damage)
            proj.damage = data.damage;
        SOUNDS.enemyThrow.play();
        
    }
    die() {
        super.die();
        if(Math.random()<.2) {
            this.scene.addEntity(createItemDrop(this.x,this.y,ITEMS.flag, 10))
        }
    }
    setScene(scene) {
        this.scene=scene;
        this.scene.enemies.push(this);
        this.allies = this.scene.enemies;
        this.enemies = this.scene.players;
    }
    initModel(w, h, color,color2) {
        this.model = new BotModel(w, h, color,color2, this);
    }
    getHit(args) {
        super.getHit(args);
        this.shootTimer = 0;
    }
    update() {
        if(this.scene.dialogueBlocking) {
            return;
        }
        super.update();
    }
    getInputs() {
        if(this.inputBlocking)return;
        if(this.scene.dialogueBlocking) {
            this.mx = 0;
            this.my = 0;
            return;
        }
        this.enemySearchUpdate();
        // return;
        var player = this.scene.player;
        if(!player)return;
        var dx = player.x-this.x;
        var dy = player.y-this.y;
        var dz = player.z-this.z;
        if(Math.abs(dx)+Math.abs(dy) < this.noticeDistance && this.dx * dx >0) {
            this.noticed = true;
        }
        if(!this.noticed) {
            if(Math.random()>.8&&frameCount%10==0)this.dx = this.dx*-1;
            return;
        }
        // if(Math.random()>.9&&frameCount%10==0) {
        //     this.mx = Math.random()>.5?-1:1;
        //     this.my = Math.random()>.5?-1:1;
        // }
        // var ds = Math.abs(dx)+Math.abs(dy)+Math.abs(dz);
        if(!this.model.anim) {
            this.dx = dx>0?1:-1;
            this.shootTimer++;
            if(this.invul<=0&&Math.abs(dx)<this.attackX && Math.abs(dy)<this.attackY+player.h/2 && this.shootTimer>=this.shootTime) {
                // this.vx = this.dx * this.speed*2;
                // this.vy = Math.sign(dy)*this.speed*2;
                this.mx = dx>0?1:-1;
                this.my = dy>0?1:-1;
                this.jumpSpeedBoost = this.speed*3;
                this.attack();
                this.shootTimer = 0;
            }
            // this.vy += Math.cos(frameCount*Math.PI/10)*.1;
            // this.vz += ((player.z - 50 - this.z)/50-this.vz)/10
            if(this.followY) {
                if(dy>50)this.my=1;
                if(dy<-50)this.my=-1;
            }
            if(this.followX) {
                dx += -this.rangeDistance*this.dx;
                if(dx>50)this.mx=1;
                if(dx<-50)this.mx=-1;
            }
        }
        this.scene.enemies.forEach(other=>{ 
            if(other==this)return;
            var dx = other.x-this.x;
            var dy = other.y-this.y;
            var rr = dx*dx+dy*dy
            if(rr<2500) {
                var r = Math.sqrt(rr);
                if(r==0) {
                    dx = 1;
                    dy = 0;
                    r = 1;
                }
                this.x -= dx/r;
                this.y -= dy/r;
            }
        })
        // if(this.model.attacking) {
        //     this.model.outlineColor = 'red';
        // }else {
        //     this.model.outlineColor = 'black';
        // }
    }
}



var enemyThrowAnim = [
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
        self.parent.telegraphProjectile = true;
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
        self.parent.throwProjectile()

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
      time: 20,
    },
    {
      limbs: [],
      onStart: self => {
        self.parent.telegraphProjectile = false;
      }, time: 1
    }
  ]