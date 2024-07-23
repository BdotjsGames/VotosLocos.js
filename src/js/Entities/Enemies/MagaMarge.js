class MagaMarge extends Bot {
    constructor(x,y) {
        super(x,y);
        this.shootTime = 10;
        this.speed = 4;
        this.noticeDistance = 300;
        this.followY = true;
        this.followX = false;
        this.attackX = 500;
        this.attackY = 60;
        this.noticed = true;
        this.health = this.maxHealth = 100;
        this.getknockBack = 3;
        this.hitResistence = 10;
        // this.knockBack = 30;
        this.knockBackUp = -5;
        this.attackHitbox = this.defaultAttackHitbox= {
            width: 120, height: 50, zheight: 100
        }
    }
    initModel(w, h, color,color2) {
        this.model = new PlatformerModel(w, h, "#3f3f74","#3f3f74", this, null, {
            headOptions: [IMAGES.MagaMargeHead],
            hairOptions: [],
            torsoOptions: [IMAGES.MagaMargeTorso],
            armOptions: [IMAGES.MagaMargeArm],
            legOptions:[6],
            glassesOptions: [],
            skinOptions: [],
            skirtOptions: [],
            canWheelchair: false,
        })
        var anims = margeAnims;
        this.model.attackCombo = [anims.punch1,anims.punch2,anims.strike];
    }
}


var margeAnims = {
    punch1: [
        {
          doLegWalk: true,
          limbs: 
          [
            {limb: 'arm1', rotation: 0},
            {limb: 'arm2', rotation: 0,scaleX:2,scaleY:2},
            {limb: 'body2', rotation: 0},
            {limb: 'body', rotation: 0},
            {limb: 'head', rotation: 0},
            // {limb: 'hips', rotation: Math.PI/4},
          ],
          time: 1, //dx: -6
          unInteruptable: true,
        },
        { 
          doLegWalk: true,
          limbs: 
          [
            {limb: 'arm2', rotation: -Math.PI/2, _x: 2, scaleX: 2, scaleY:2},
            // {limb: 'arm2', rotation: Math.PI*1.2},
            {limb: 'body2', rotation: 0, _x:2},
            {limb: 'body', rotation: 0},
            // {limb: 'head', rotation: -Math.PI/8},
            // {limb: 'legL', rotation: Math.PI/4},
            // {limb: 'legL2', rotation: Math.PI/4},
            // {limb: 'hips', rotation: -Math.PI/2},
          ],
          
          onStart: self=>{
            self.attacking=true
            self.unInteruptable = false;
            self.parent.attackHitbox = self.parent.defaultAttackHitbox;
            var p = self.parent;
            if(!p.grounded && p.mx || p.isBot) {
              p.vx = (p.dx*p.jumpSpeedBoost)
            }
            spawnAttackParticle(
              self.parent.scene,
              self.parent.x+self.parent.dx*80,
              self.parent.y+2,
              self.parent.z-(self.legLength+20)*2,
              0,
              self.parent.dx<0,0,
              IMAGES.hitEffect2
            );
          },
          time: 1, dx:5
        },
        {
          doLegWalk: true,
          
          limbs:[
            {limb: 'arm2', rotation: -Math.PI/2, _x: 2, scaleX: 1.5, scaleY:1.5},
            // {limb: 'arm2', rotation: Math.PI*1.2},
            {limb: 'body2', rotation: 0, _x:2},
            {limb: 'body', rotation: 0},
          ],
          time: 5
        },
        {
          limbs:[
            {limb: 'arm2', rotation: -Math.PI/20, _x: 0, scaleX: 1, scaleY:1},
            {limb: 'body2', rotation: Math.PI/20, _x: 0},
          ],
          time: 8
        }
      ],
      punch2: [
        { 
          doLegWalk: true,
          limbs: 
          [
            {limb: 'arm1', rotation: 0,scaleX:2,scaleY:2},
            {limb: 'arm2', rotation: 0},
            {limb: 'body2', rotation: 0},
            {limb: 'body', rotation: 0},
            {limb: 'head', rotation: 0},
            // {limb: 'hips', rotation: Math.PI/4},
          ],
          unInteruptable: true,
          time: 1,// dx: -6
        },
        { 
          doLegWalk: true,
          limbs: 
          [
            {limb: 'arm1', rotation: -Math.PI/2, _x: 10, scaleX: 2, scaleY:2},
            {limb: 'arm2', rotation: 0, _x: -10},
            {limb: 'body2', rotation: 0, _x:5},
            {limb: 'body', rotation: 0},
            // {limb: 'head', rotation: -Math.PI/8},
            // {limb: 'legL', rotation: Math.PI/4},
            // {limb: 'legL2', rotation: Math.PI/4},
            // {limb: 'hips', rotation: -Math.PI/2},
          ],
          
          onStart: self=>{
            self.attacking=true
            self.unInteruptable = false;
            var p = self.parent;
            if(!p.grounded && p.mx || p.isBot) {
              p.vx = (p.dx*p.jumpSpeedBoost)
            }
            spawnAttackParticle(
              self.parent.scene,
              self.parent.x+self.parent.dx*80,
              self.parent.y+2,
              self.parent.z-(self.legLength+20)*2,
              0,
              self.parent.dx<0,0,
              IMAGES.hitEffect2
            );
          },
          time: 2, dx:5
        },
        {
          
          doLegWalk: true,
          limbs:[
            {limb: 'arm1', rotation: -Math.PI/2, _x: 10, scaleX: 1.5, scaleY:1.5},
            {limb: 'arm2', rotation: 0, _x: -10},
            {limb: 'body2', rotation: 0, _x:5},
            {limb: 'body', rotation: 0},
          ],
          time: 5
        },
        {
          
          limbs:[
            {limb: 'arm1', rotation: -Math.PI/20, _x: 0, scaleX: 1, scaleY:1},
            {limb: 'arm2', rotation: -Math.PI/20, _x: 0},
            {limb: 'body2', rotation: Math.PI/20, _x: 0},
          ],
          time: 8
        }
      ],
      strike: [
        { limbs: 
          [
            {limb: 'arm1', rotation: Math.PI,scaleX:1.5,scaleY:1.5},
            {limb: 'arm2', rotation: Math.PI,scaleX:1.5,scaleY:1.5},
            {limb: 'body2', rotation: -Math.PI/4},
            // {limb: 'hips', rotation: Math.PI/4},
          ],
          
          unInteruptable: true,
          time: 5, dx: -6
        },
        {limbs:[],time: 3, dx: 12},
        { limbs: 
          [
            {limb: 'arm1', rotation: Math.PI*1.2,scaleX:2,scaleY:2},
            {limb: 'arm2', rotation: Math.PI*1.2,scaleX:2,scaleY:2},
            {limb: 'body2', rotation: Math.PI/4},
            {limb: 'body', rotation: Math.PI/4},
            {limb: 'head', rotation: -Math.PI/8},
            {limb: 'legL', rotation: Math.PI/4},
            {limb: 'legL2', rotation: Math.PI/4},
            // {limb: 'hips', rotation: -Math.PI/2},
          ],
          
          damage: 15,
    
          onStart: self=>{
            self.attacking=true
            self.parent.attackHitbox = self.parent.defaultAttackHitbox;
            var p = self.parent;
            if(!p.grounded && p.mx || p.isBot) {
              p.vx = (p.dx*p.jumpSpeedBoost)
            }
            spawnAttackParticle(
              self.parent.scene,
              self.parent.x+self.parent.dx*100,
              self.parent.y+2,
              self.parent.z-(self.legLength+20)*2,
              0,
              self.parent.dx<0,0
            );
          },
          time: 3, dx:12
        },
        {
          limbs:[
            {limb: 'arm1', rotation: Math.PI*1.2,scaleX:1,scaleY:1},
            {limb: 'arm2', rotation: Math.PI*1.2,scaleX:1,scaleY:1},
          ],
          
          time: 12
        }
      ],
    }