class BotModel extends PlatformerModel {
    constructor(...args) {
        super(...args);
        this.face.hidden = true;
        this.mouth.hidden = true;
        this.anims = botanims;
        // this.attackSound = {play(){}}
        this.attackAnim = this.anims.punch1;
        this.attackCombo = [this.anims.punch1];
        // if(Math.random()>.5) {
            this.attackCombo = [this.anims.punch2];
            this.body2.drawable.image = IMAGES.botTorso1;
        // }
    }
    
    createOptions(){
        super.createOptions({
            headOptions: [IMAGES.botHeadOptions[0]],
            hairOptions: [],
            torsoOptions: [IMAGES.botTorsoOptions[3]],
            armOptions: [IMAGES.armOptions[0]],
            legOptions:[6],
            glassesOptions: [],
            skinOptions: [],
            skirtOptions: [],
            canWheelchair: false,
        });
    }
}


var botanims = {
    punch1: [
      { limbs: 
        [
          {limb: 'arm1', rotation: Math.PI},
          {limb: 'arm2', rotation: Math.PI},
          {limb: 'body2', rotation: -Math.PI/4},
          // {limb: 'hips', rotation: Math.PI/4},
        ],
        time: 5, dx: -6
      },
      {limbs:[],time: 3*3, dx: 12, onStart: self =>{
        self.parent.mx = 0;
        self.parent.my = 0;
        self.parent.vx = 0;
        self.parent.vy = 0;
      }},
      { limbs: 
        [
          {limb: 'arm1', rotation: Math.PI*1.2},
          {limb: 'arm2', rotation: Math.PI*1.2},
          {limb: 'body2', rotation: Math.PI/4},
          {limb: 'body', rotation: Math.PI/4},
          {limb: 'head', rotation: -Math.PI/8},
          {limb: 'legL', rotation: Math.PI/4},
          {limb: 'legL2', rotation: Math.PI/4},
          // {limb: 'hips', rotation: -Math.PI/2},
        ],
        onStart: self=>{
          self.attacking=true
          var p = self.parent;
            p.vx += (p.dx*p.jumpSpeedBoost)
            p.mx = p.dx;
        },
        time: 3*3, dx:20*9
      },
      {
        limbs:[
            {limb: 'body', rotation: Math.PI/3},
        ],
        time: 6, dx:24
      }, 
      {
        limbs: [
            {limb: 'arm1', rotation: 0},
            {limb: 'arm2', rotation: 0},
            {limb: 'body2', rotation: 0},
            {limb: 'body', rotation: Math.PI*2},
            {limb: 'head', rotation: 0},
            {limb: 'legL', rotation: 0},
            {limb: 'legL2', rotation: 0},
        ],
        onStart: self=> {
            self.attacking =false;
            self.parent.vx = 0;
            self.parent.vy = 0;
            self.parent.mx = 0;
            self.parent.my = 0;
        },
        time: 20 , dx: 100
      }
    ],
    punch2: [
        { limbs: 
          [
            {limb: 'arm1', rotation: Math.PI},
            {limb: 'arm2', rotation: Math.PI},
            {limb: 'body2', rotation: -Math.PI/4},
            // {limb: 'hips', rotation: Math.PI/4},
          ],
          time: 5*3, dx: -6
        },
        {limbs:[],time: 3*3, dx: 12, onStart: self =>{
          self.parent.mx = 0;
          self.parent.my = 0;
          self.parent.vx = 0;
          self.parent.vy = 0;
        }},
        { limbs: 
          [
            {limb: 'arm1', rotation: Math.PI*1.2},
            {limb: 'arm2', rotation: Math.PI*1.2},
            {limb: 'body2', rotation: Math.PI/4},
            {limb: 'body', rotation: Math.PI/4},
            {limb: 'head', rotation: -Math.PI/8},
            {limb: 'legL', rotation: Math.PI/4},
            {limb: 'legL2', rotation: Math.PI/4},
            // {limb: 'hips', rotation: -Math.PI/2},
          ],
          onStart: self=>{
            self.attacking=true
            var p = self.parent;
              p.vx += (p.dx*p.jumpSpeedBoost)
              p.mx = p.dx;
          },
          time: 3*3, dx:8*9
        },
        {
            limbs: [
                {limb: 'arm1', rotation: 0},
                {limb: 'arm2', rotation: 0},
                {limb: 'body2', rotation: 0},
                {limb: 'body', rotation: 0},
                {limb: 'head', rotation: 0},
                {limb: 'legL', rotation: 0},
                {limb: 'legL2', rotation: 0},
            ],
          time: 12, dx:0
        }, 
        {
          limbs: [
              {limb: 'arm1', rotation: 0},
              {limb: 'arm2', rotation: 0},
              {limb: 'body2', rotation: 0},
              {limb: 'body', rotation: 0},
              {limb: 'head', rotation: 0},
              {limb: 'legL', rotation: 0},
              {limb: 'legL2', rotation: 0},
          ],
          onStart: self=> {
              self.attacking =false;
              self.parent.vx = 0;
              self.parent.vy = 0;
              self.parent.mx = 0;
              self.parent.my = 0;
          },
          time: 60, dx: 0
        }
      ],
      armSpinny: [
        {
          limbs: [
            {limb: 'arm1', rotation: Math.PI},
            {limb: 'arm2', rotation: Math.PI},
            {limb: 'body2', rotation: -Math.PI/4},
            {limb: 'body', rotation: -Math.PI/4, _y:-10},
            {limb: 'head', rotation: -Math.PI/4},
            {limb: 'legL', rotation: 0},
            {limb: 'legL2', rotation: 0},
          ],time:20, onStart : (self) => {
            self.vz = -10;
            self.attacking = false;
          },
        },
      {
        limbs: [],
        customUpdate: self=>{
          var aa = self.arm1.rotation;
          self.attacking = true
          self.parent.attackHitbox = self.parent.defaultAttackHitbox;
          self.parent.vx = self.parent.dx*self.parent.speed;
          self.parent.vz = 0;
          self.walk();
          self.arm1.rotation = aa + Math.PI/4;
          self.arm2.rotation = aa + Math.PI/4+Math.PI;
        }, time: 50,
      },
      
      {
        limbs: [
          {limb: 'arm1', rotation: Math.PI},
          {limb: 'arm2', rotation: Math.PI},
          {limb: 'body2', rotation: 0},
          {limb: 'body', rotation: Math.PI/2, _y:10},
          {limb: 'head', rotation: Math.PI/4},
          {limb: 'legL', rotation: 0},
          {limb: 'legL2', rotation: 0},
        ],dx:60,time:10, onStart : (self) => {
          self.attacking = false;
        },
      },
      {
        limbs:[],
        dx: 10, time: 50,
      },
      {
        limbs: [
          {limb: 'arm1', rotation: 0},
          {limb: 'arm2', rotation: 0},
          {limb: 'body2', rotation: 0},
          {limb: 'body', rotation: 0, _y:0},
          {limb: 'head', rotation: 0},
          {limb: 'legL', rotation: 0},
          {limb: 'legL2', rotation: 0},
        ],time:60
      }
    ]
  }