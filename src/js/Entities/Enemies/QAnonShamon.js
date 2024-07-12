class QAnonShamon extends Bot {
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
        this.model.attackCombo = [enemyThrowAnim,enemyThrowAnim,enemyThrowAnim, anims.groundSlam];
        this.item.type = ITEMS.beerBottle;
    }
    throwProjectile() {
        var data = this.item.type;
        var z = this.z + (-this.model.legLength-20)*2;
        var proj = this.scene.addEntity(new LaserBeam(this.x+30*this.dx+this.vx,this.y,z,this.dx*10,5, 100,this.enemies));
        if(data.drawShape)
            proj.drawShape = data.drawShape;
        if(data.damage)
            proj.damage = data.damage;
    }
    initModel(w, h, color,color2) {
        this.model = new PlatformerModel(w, h, "#cf5c26","#cf5c26", this, null, {
            headOptions: [IMAGES.QAnonHead],
            hairOptions: [],
            torsoOptions: [IMAGES.torsoMilitary],
            armOptions: [IMAGES.armBare],
            legOptions:[6],
            glassesOptions: [],
            skinOptions: [],
            skirtOptions: [],
            canWheelchair: false,
        })
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
      onStart: self => {
        self.parent.telegraphProjectile = false;
      },
      time: 10,
    }
  ]