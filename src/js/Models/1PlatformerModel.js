class PlatformerModel extends Model {
  constructor(w,h,color,color2,parent, modelOptions, modelOptions2) {
    super(parent);
    this.modelOptions = modelOptions;
    this.w=w;this.h=h;this.color=color;   
    this.color2= color2;
    this.moving = false;
    this.grounded = true;
    this.moveLocked = false;
    this.highFiveCount = 0;
    this.highFiveTime = 12;
    this.frameCount = 0;
    this.hairColor = 0;
    this.skinColorIndex = 0;
    this.impactStopTimer=0;
    this.self = this;
    this.anims=anims;
    this.dodging = false;
    this.attackCombo = [anims.strike, -1,anims.flipKick, anims.groundSlam, anims.armSpinny];
    // this.attackCombo = [anims.throw];
    // this.attackCombo = [anims.armSpinny];
    // this.attackCombo = [anims.punch1, anims.punch2, anims.strike];
    this.attackComboIndex = 0;
    this.attackAnim = anims.strike;
    this.skirtOn = true;
    this.skateBoardOn = false;
    if(!parent) {
      this.parent = {
        dx:1,vx:10,vy:0,
        mx: 0, 
        moving: true,
        grounded: true
      }
    }
    this.createModel();
    this.createOptions(modelOptions2);
    if(this.modelOptions) {
      this.modelOptions.forEach((index, i) => {
        var option = this.customizableOptions[i]
        option.index = index;
        option.onChange(option.options[index], index);
      })
    } else {
      this.randomize();
    }
  }
  loadModelOptions(modelOptions) {
    this.modelOptions = modelOptions;
    if(this.modelOptions) {
      this.modelOptions.forEach((index, i) => {
        var option = this.customizableOptions[i]
        option.index = index;
        option.onChange(option.options[index], index);
      })
    }
  }
  randomize() {
    this.customizableOptions.forEach(option => {
      if(!option.options||!option.options.length)return;
      var index = Math.floor(Math.random()*option.options.length)
      if(option.name=="Legs")if(Math.random()>.5)index=0;
      option.index = index;
      option.onChange(option.options[index], index)
    });
  }
  getModelOptions() {
    var modelOptions = []
    this.customizableOptions.forEach(option => {
      modelOptions.push(option.index);
    })
    return modelOptions;
  }
  createOptions(options={}) {
    var armOptions = options.armOptions||IMAGES.armOptions;
    var legOptions = options.legOptions||[8,10,5,6,7];
    var skirtOptions = options.skirtOptions || IMAGES.skirts;
    var wheelChairLegValue = -1;
    var skateBoardValue = -2;
    if(options.headOptions) {
      this.headBase.drawable.image = options.headOptions[0];
    }
    if(options.canWheelchair) {
      // legOptions.push(wheelChairLegValue)
      // skirtOptions.push(wheelChairLegValue);
      skirtOptions = [...skirtOptions, wheelChairLegValue, skateBoardValue]
      // skirtOptions = [].concat(skirtOptions, [wheelChairLegValue])
    }
    this.customizableOptions = [
      {
        name: "skin",
        options: options.skinOptions||PALLETE_KEY.skin.mapping.map((a,i)=>i),
        index: 0,
        onChange: (value, i) => {
          this.skinColorIndex = value;
          // this.headBase.drawable.image = value;
          this.changeSkinColor(value);
        }
      },
      {
        name: "face",
        options: options.headOptions||IMAGES.headOptions,
        index: 0,
        category: "head",
        onChange: (value, i) => {
          this.headBase.drawable.image = value;
          this.headBase.drawable.setScaleToImage();
          this.changeSkinColor(this.skinColorIndex);
          if(i>9) {
            this.mouth.hidden = true;
            this.face.hidden = true;
          } else {
            this.mouth.hidden = false;
            this.face.hidden = false;
          }
        }
      },
      {
        name: "hair",
        category: "head",
        options: options.hairOptions||IMAGES.hairOptions,
        index: 0,
        onChange: (value) => {
          this.hairType = value;
          this.hair.drawable.image = value;
          this.hair.drawable.setScaleToImage();
          this.changeHairColor(this.hairColor);
        }
      },
      {
        name: "hair color",
        category: "head",
        options: PALLETE_KEY.hair.mapping,
        index: 0,
        onChange: (value,i) => {
          this.hairColor = i;
          this.changeHairColor(i);
        }
      },
      {
        name: "glasses",
        category: "head",
        options: options.glassesOptions||IMAGES.glassesOptions,
        index: 0,
        onChange: (value) => {
          this.glasses.drawable.image = value;
          this.glasses.drawable.setScaleToImage();
          this.glasses.changePalette('hair', this.hairColor);
        }
      },
      {
        name: "Torso",
        category: "body",
        options: options.torsoOptions||IMAGES.torsoOptions,
        index: 0,
        onChange: (value,i) => {
          this.hairType = value;
          this.body2.drawable.image = value;
          if(i<=armOptions.length)
          this.arm1.drawable.image = armOptions[i];
          this.arm2.drawable.image = armOptions[i];
          this.changeSkinColor(this.skinColorIndex);
        }
      },
      {
        name: "width",
        category: "body",
        options: options.widthOptions||[0,1,2,4,6,-2,-1,],
        index: 0,
        onChange: (value) => {
          this.bwidth = 15+value;
          this.arm1.x = -this.bwidth/4-4;
          this.arm2.x = this.bwidth-9;
          this.body2.drawable.x = -18 - Math.floor(value/2);
          this.skirt.x = -Math.floor(value/2);

          this.body2.drawable.extendX = value;
          this.skirt.drawable.extendX = value;
          this.skirt.drawable._extendX = value;
          
          // this.legL.x= -2-  value/4;
          this.legR.x= 2 + value/4;
        }
      },
      {
        name: "Legs",
        category: "body",
        options: skirtOptions,
        displayOffsetY: -80,
        index: 0,
        onChange: (value,i) => {
          this.skateBoardOn = value==skateBoardValue;
          this.skateBoard.hidden = !this.skateBoardOn;
          if(value&&value.isShoe) {
            this.shoeL.drawable.image = value;
            this.shoeR.drawable.image = value;

            value = null;
          } else {
            this.shoeL.drawable.image = null;
            this.shoeR.drawable.image = null;
          }
          if(value==wheelChairLegValue) {
            this.inWheelChair = true;
            this.wheelchair.hidden = false;
            this.wheelchair.wheel.hidden = false;
            this.legL.hidden=true;
            this.legR.hidden=true;
            value = 8;
            var db1 = 6
            this.body.y = -12-value*4+db1;
            this.skirtOn = false;
          } else {
            if(value<0)value=null;
            this.inWheelChair = false;
            this.wheelchair.hidden = true;
            this.wheelchair.wheel.hidden = true;
            this.legL.hidden=false;
            this.legR.hidden=false;
            this.skirt.drawable.image = value;
            this.skirtOn = value;

            var ll = this.legLength;
            var db1 = 6
            this.body.y = -12-ll*4+db1;
            this.legL2.y=ll;
            this.legR2.y=ll;
            this.legL.drawable.y2 = ll*.6;
            this.legR.drawable.y2 = ll*.6;
            this.legL2.drawable.y2 = ll;
            this.legR2.drawable.y2 = ll;
            this.shoeL.y = ll-4;
            this.shoeR.y = ll-4;
          }
          this.skirt.hidden = !this.wheelchair.hidden;
          if(value&&value.isWilliePants) {
            this.legL.drawable.color = "#000";
            this.legR.drawable.color = "#000";
            this.legL2.drawable.color = "#000";
            this.legR2.drawable.color = "#000";
            this.legL.drawable.width = 2;
            this.legR.drawable.width = 2;
            this.legL2.drawable.width = 2;
            this.legR2.drawable.width = 2;
          } else {
            this.legL.drawable.color = this.color;
            this.legR.drawable.color = this.color2;
            this.legL2.drawable.color = this.color;
            this.legR2.drawable.color = this.color2;
            this.legL.drawable.width = 6;
            this.legR.drawable.width = 6;
            this.legL2.drawable.width = 4;
            this.legR2.drawable.width = 4;
          }
          this.skirt.hidden = !this.wheelchair.hidden;
        }
      },
      {
        name: "height",
        category: "body",
        options: legOptions,
        // dontShowInOptions: true,
        displayOffsetY: -80,
        index: 0,
        onChange: (value,i) => {
          this.legLength = value;
          if(this.inWheelChair) {
            value = 8;
          }
          // if(value==wheelChairLegValue) {
          //   this.inWheelChair = true;
          //   this.wheelchair.hidden = false;
          //   this.wheelchair.wheel.hidden = false;
          //   this.legL.hidden=true;
          //   this.legR.hidden=true;
          //   value = 8;
          // } else {
          //   this.inWheelChair = false;
          //   this.wheelchair.hidden = true;
          //   this.wheelchair.wheel.hidden = true;
          //   this.legL.hidden=false;
          //   this.legR.hidden=false;
          // }
          // this.skirt.hidden = !this.wheelchair.hidden;
          var ll = value;
          var db1 = 6
          this.body.y = -12-ll*4+db1;
          this.legL2.y=ll;
          this.legR2.y=ll;
          this.legL.drawable.y2 = ll*.6;
          this.legR.drawable.y2 = ll*.6;
          this.legL2.drawable.y2 = ll;
          this.legR2.drawable.y2 = ll;
          this.shoeL.y = ll-4;
          this.shoeR.y = ll-4;
        }
      },
      // {
      //   name: "bodyWidth",
      //   options: [10,15,20],
      //   index: 0,
      //   onChange: (value) => {
      //     this.bwidth = value;
      //     this.body2.drawable.width = value;
      //     // this.body2.x =this.bwidth*0.1;
      //     this.body.drawable.width = value*0.8;
      //     this.arm1.x = -this.bwidth/2;
      //     this.arm2.x = this.bwidth/2;
      //   }
      // }
    ]
   
  }
  changeHairColor(i) {
    this.hair.changePalette('hair', i);
    this.glasses.changePalette('hair', i);
  }
  changeSkinColor(i) {
    var skinable = [this.arm1, this.arm2, this.headBase, this.body2]
    skinable.forEach(limb => {
      limb.changePalette('skin', i);
    })
  }
  createModel() {
// this.body = this.createLimb(0,0,10,h*.8,color);
    // this.head = this.body.createAfter(0,-10,20,20,color);
    // this.legL = this.body.createBefore(-5,h/2-4,8,8,color);
    // this.legR = this.body.createBefore(5,h/2-4,8,8,color);
    // this.arm1 = this.body.createBefore(-5,4,8,8,color);
    // this.arm2 = this.body.createBefore(5,4,8,8,color);
    // this.eye1 = this.head.createAfter(0,0,4,4,"white");

    // var ll = h/2-12;
    var ll = 6;
    this.ll=ll;
    var al = al||7;

    var lineCap = 'square';
    var bodyColor = "#6b6"
    var color = this.color;
    var color2 = this.color2;

    this.bwidth = 15;//+Math.random()*10;
    this.skateBoard = this.createLimb(0,0, new ImageDrawable(IMAGES.skateBoard))

    this.body = this.createLimb(0,-15-ll*3.5/*,new Line(0,-3,0,2,10,lineCap,color)*/);
    this.skateBoard.hidden = true;


    var db2 = 12
    this.body2 = this.body.createAfter(0,-3+db2,new ExtendableImageDrawable(IMAGES.torsoOptions[0],-2,5-db2,32,32, 14,0));
    this.arm2 = this.body2.createBefore(this.bwidth/2,-1-db2,new ImageDrawable(IMAGES.armSuit1,-1,8,16,24),-Math.PI/4);
    this.hips = this.body.createBefore(0,12);

    this.wheelchair = this.body2.createBefore(0,8, new ImageDrawable(IMAGES.wheelchairBack))
    var wheelPivot = {
      x: 32-27.5,
      y: 32-40.5,
    }

    this.wheelchair.wheel = this.wheelchair.createAfter(-wheelPivot.x,0-wheelPivot.y,new ImageDrawable(IMAGES.wheelchairWheelFront, wheelPivot.x,wheelPivot.y,))
    this.wheelchair.hidden = true;
    this.wheelchair.wheel.hidden = true;

    this.skirt = this.body2.createAfter(0,6+3,new ExtendableImageDrawable(IMAGES.skirt1,0,0,null,null,33))
    this.skirt.drawable.image = null;

    this.legR= this.hips.createBefore(2,0,new Line(0,0,0,ll,6,lineCap,color2),-Math.PI/10);
    this.legL= this.hips.createBefore(-2,0,new Line(0,0,0,ll,6,lineCap,color),Math.PI/10);
    this.legL2 = this.legL.createAfter(0,ll,new Line(0,0,0,ll,4,lineCap,color),-Math.PI/10);
    this.legR2 = this.legR.createAfter(0,ll,new Line(0,0,0,ll,4,lineCap,color2),Math.PI/10);

    this.shoeL = this.legL2.createAfter(1,4, new ImageDrawable(IMAGES.boot1, 0,0));
    this.shoeR = this.legR2.createAfter(1,4, new ImageDrawable(IMAGES.boot1, 0,0));
    this.shoeL.drawable.image = null;
    this.shoeR.drawable.image = null;

    this.head = this.body2.createAfter(0,-6-db2);
    this.arm1 = this.body2.createAfter(-this.bwidth/2,-1-db2,new ImageDrawable(IMAGES.armSuit1,-1,8,16,24),Math.PI/4);

    this.headBase = this.head.createAfter(0,-10,new ImageDrawable(IMAGES.baseHead1, 0,0,27,25));
    this.mouth = this.headBase.createAfter(0,0,new ImageDrawable(IMAGES.mouthSmile, 0,0,27,25));
    // this.eyeBase = this.headBase.createAfter(0,0,new ImageDrawable(IMAGES.baseEyes1, 0,0,27,25));
    // this.head = this.body.createAfter(0,-5,new Circle(0,-10,10,color));
    // this.body.createAfter(-10,0,new CheeseburgerJohnsonModel(40,40,this));
    // this.face = this.head.createAfter(0,-7);
    this.face = this.headBase.createAfter(0,0,new ImageDrawable(IMAGES.pupils1, 0,0,27,25));
    // this.glasses = this.headBase.createAfter(0,0,new ImageDrawable(null, 0,0,27,25));
    // var hairtype = randomFromList(IMAGES.hairOptions);
    this.hair = this.headBase.createAfter(0,0,new ImageDrawable(null, 0,0,27,25));
    this.glasses = this.headBase.createAfter(0,0,new ImageDrawable(null, 0,0,27,25));
    // this.eye1 = this.face.createAfter(-3,0,new Circle(0,0,2,'white'));
    // this.eye2 = this.face.createAfter(3,0,new Circle(0,0,2,'white'));
    // var grd = canvas.createRadialGradient(0,0,0,0,0,50);
    // grd.addColorStop(0,"#00aadd55");
    // grd.addColorStop(1,"#00aadd00");
    // this.shoe1.createAfter(0,5,new Circle(0,0,50,grd),0,1);
    // this.shoe2.createAfter(0,5,new Circle(0,0,50,grd),0,1);
    this.attackSound = SOUNDS.attack;
    this.cooldownTimer = 0;
    this.cooldownTime = 15;
    this.body.scaleX = 2;
    this.body.scaleY = 2;
    this.skateBoard.scaleX=2;
    this.skateBoard.scaleY = 2;
    // this.head.scaleX = 1.2;
    // this.head.scaleY = 1.2;
    
  }
  addShoes() {
    if(this.shoe1)return;
    this.shoe1 = this.legL2.createAfter(0,this.ll,new ImageDrawable(IMAGES.boot,0,0,10));
    this.shoe2 = this.legR2.createAfter(0,this.ll,new ImageDrawable(IMAGES.boot,0,0,10));
  }
  crouch() {
    var dx = 1;//this.parent.dx;
    var d = 2;
    var br = Math.PI*.4;
    var l = this.legLength;
    this.body._rotation = br*dx;
    this.body._y += (Math.sin(br)*l+15-this.body._y);
    this.body._x += (Math.cos(br)*l+25-this.body._x);
    this.body._y = Math.sin(this.body.rotation)*l+15;
    this.legL._rotation = (-br+Math.PI/4)*dx-Math.PI/6;
    this.legR._rotation = (-br-Math.PI/4)*dx;

    // var frq = frameCount*Math.PI/12;
    // this.legL.rotation += Math.cos(frq)*Math.PI/4*this.parent.vx/this.parent.speed;
    // this.legR.rotation += -Math.cos(frq)*Math.PI/4*this.parent.vx/this.parent.speed;

    this.arm1._rotation = 0;//-Math.PI/4;
    this.arm2._rotation = -Math.PI*.6;
    this.arm1._x=0;
    this.arm2._x=0;
    this.head._rotation = -br*dx;
    this._rotation = 0;
    this.head._y += (2-this.head._y)/d;
    // this.head._x += (8*dx-this.head._x)/d;


    this.rotation += (this._rotation-this.rotation)/d;
    this.head.rotation += (this.head._rotation-this.head.rotation)/d;
    this.legL.rotation += (this.legL._rotation-this.legL.rotation)/d;
    this.legR.rotation += (this.legR._rotation-this.legR.rotation)/d;
    this.arm1.rotation += (this.arm1._rotation-this.arm1.rotation)/d;
    this.arm2.rotation += (this.arm2._rotation-this.arm2.rotation)/d;
    this.body.rotation += (this.body._rotation-this.body.rotation)/d;
    this.body2.rotation += (this.body2._rotation-this.body2.rotation)/d;

    this.legR2.rotation = Math.PI*.5;
    this.legL2.rotation = Math.PI*.25;

    this.legL._x = 3;
    this.legL._y = 3;
    // this.idle();
    // this.rotation = 0;
    // this.legL.rotation = Math.PI/10;
    // this.legR.rotation=-Math.PI/10;
    // this.arm1.rotation = Math.PI/10;
    // this.arm2.rotation=-Math.PI/10;
    // this.head._y = Math.cos(frameCount*Math.PI/40)*2;
    // this.body.rotation = 0;
    // this.head.rotation = 0;
    
    // // this.body._y += (this.h/2-2-this.body._y)/2;
    this.scaleY += (1-this.scaleY)/2;
    this.scaleX += (1-this.scaleX)/2;
    // this.body._y = (1-this.scaleY)*this.h;
  }
  highFive(count) {
    if(!this.highFiving) {
      this.highFiveCount = count||((this.highFiveCount+1)%4);
    }
    this.highFiving = true;
    this.cooldownTimer = this.highFiveTime;
    this.face._x=1
  }
  highFiveUpdate() {
    // var a = Math.floor(this.highFiveCount/2)?-Math.PI*0.8:-Math.PI/4;
    var a = this.highFiveCount%2==0?-Math.PI*0.8:-Math.PI/3;
    if(Math.floor(this.highFiveCount/2)==0 || true)
      this.arm2.rotation = a;
    else {
      this.arm1.rotation = a;
      this.arm1._x += (this.bwidth-this.arm1._x)/2;
      this.arm2._x += (-7-this.arm2._x)/2;
      this.legL._x += ( 7-this.legL._x)/2;
      this.legR._x += (-7-this.legR._x)/2;
      this.legL.rotation = -Math.PI/10;
      this.legL2.rotation = Math.PI/10;
      this.legR.rotation = Math.PI/10;
    }
    if(this.cooldownTimer--<0) {
      this.highFiving = false;
      this.arm1._x = 0;
      this.arm2._x =0;
      this.legL._x =0
      this.legR._x =0
    }
  }
  throw() {
    if(this.unInteruptable)return;
    if(this.cooldownTimer>0)return;
    this.startAnim(anims.throw);
    this.attackTimer = 15;
  }
  attack() {
    // if(this.attacking)return;
    if(this.unInteruptable)return;
    if(this.cooldownTimer>0)return;
    if(this.crouching)return this.slide();
    // if(this.anims.flipKick && this.parent.vz <-this.parent.jumpStrength*.9) {
    //   this.startAnim(this.anims.flipKick);
    // } else 
    {
      var attack = this.attackCombo[this.attackComboIndex];
      this.attackComboIndex += 1;
      if(this.attackComboIndex>=this.attackCombo.length)this.attackComboIndex=0;
      if(attack==-1) {
        return this.slide();
      }
      this.startAnim(attack);
    }
    this.attackSound.play();
    // this.attacking = true;
    // this.startAnim(this.attackAnim);
    this.attackTimer = 15;

  }
  slide() {
    if(this.attacking)return;
    if(this.cooldownTimer>0)return;
    this.endAnim();

    this.attackSound.play();
    this.sliding = true;
    this.doubleJumping=false;
    this.parent.wallColliding = false;
    this.attacking = true;
    this.parent.attackHitbox = this.parent.defaultAttackHitbox;
    var dx = this.parent.dx;
    this.idle();
    this.rotation = 0;
    this.body.rotation = -Math.PI/3*1;
    this.body._y = 20;
    this.body2.rotation = 0;
    this.head.rotation = -this.body.rotation/2;
    this.arm1.rotation = Math.PI/2;
    this.legL.rotation = -Math.PI/2*1-this.body.rotation;
    this.legR.rotation = -Math.PI/2*1-this.body.rotation;
    this.legL2.rotation = 0;
    this.legR2.rotation = Math.PI/2;
    this.legL.scaleY = 1.5;
    this.legR.scaleY = 1.5;
    // if(dx>0) {
      // this.legL._y=5;
    // } else {
    this.legL._y=5;
    // }
    this.attackTimer = 15;
  }
  attackEnd() {
    this.attacking =false;
    this.sliding = false;
    this.legL.scaleY = 1;
    this.legR.scaleY = 1;
    this.legL._y=0;
    this.legR._y=0;
    this.body._y=0;
  }
  attackUpdate() {
    this.attackTimer --;
    if(this.attackTimer<=0) {
      this.attackEnd();
    }
    this.scaleX=1;
    this.scaleY=1;
    var t = this.attackTimer/15;
    if(this.attackTimer<14&&this.attackTimer>1) {
      this.parent.vx = this.parent.dx*40*t;
      // this.parent.vy = 1;
      this.parent.vz = 2;
    } else {
      this.parent.vx = 0;
      this.parent.vy = 0;
      this.parent.vz = 0;
    }
  }
  idle() {
    this.rotation = 0;
    if(this.wallColliding) {
      this.body._x = (1-this.scaleX)*this.w/2;
    } else {
      this.body._x=0;
    }
    if(this.grounded) {
      this.body._y = (1-this.scaleY)*this.h/2;
    } else {
      this.body._y=0;
    }
    if(this.skateBoardOn) {
      this.skateBoard.rotation = 0;
    }
    this.scaleY += (1-this.scaleY)/7;
    this.scaleX += (1-this.scaleX)/7;
    this.legL.rotation = Math.PI/10;
    this.legR.rotation=-Math.PI/10;
    this.hips.rotation = 0;
    this.arm1._x=0;
    this.arm2._x=0;

    this.legL2.rotation= -this.legL.rotation;
    this.legR2.rotation= -this.legR.rotation;
    
    this.arm1.rotation = Math.PI/10-Math.cos(frameCount*Math.PI/40)*Math.PI/40;
    this.arm2.rotation=-Math.PI/10+Math.cos(frameCount*Math.PI/40)*Math.PI/40;
    this.head._y = Math.cos(frameCount*Math.PI/40)*0.5;
    this.body.rotation = 0;
    this.body2.rotation = 0;
    this.head.rotation = 0;
    var bd = Math.cos(frameCount*Math.PI/40+0.1);
    this.body._y += bd;
    this.legL._y =-bd/2;
    this.legR._y =-bd/2;

    if(this.wallColliding) {
      var dx = this.parent.dx;
      var arm = this.arm1;
      if(dx>0)arm=this.arm2;
      arm.rotation = -dx*Math.PI*.9;
    }
    this.legL._x = 0;
    this.legL.scaleY = 1;
    this.legR.scaleY = 1;
    this.legL._y=0;
    this.legR._y=0;
    this.body._y=0;
    this.body2._y=0;
  }
  walk(noArms = false) {
    if(!noArms)
      this.idle();
    // this.scaleX = 1+Math.sin(frameCount*Math.PI/10)*.1;
    // this.scaleY = 1-Math.sin(frameCount*Math.PI/10)*.1;
    var dv = Math.min(1,Math.abs(this.parent.vx/this.parent.speed)+Math.abs(this.parent.vy/this.parent.speed));
    this.frameCount += dv;
    this.wheelchair.wheel.rotation += dv*Math.PI/20;
    var frq = this.frameCount*Math.PI/10;
    var angle = Math.PI/4*(dv);

    if(this.skirtOn)angle *= 0.6;
    var cos = Math.cos(frq);
    if(this.skateBoardOn) {
      // frq = frq/2;
      if(Math.cos(frq/4)<0.7) {
        this.rotation = Math.cos(this.frameCount*Math.PI/10)*Math.PI/30*dv/10;
        return;
      }
      cos = Math.cos(frq);
    }
    var bodyRot = Math.cos(frq)*Math.PI/30*dv;
    // this.rotation = Math.cos(this.frameCount*Math.PI/10)*Math.PI/30*dv;
    this.rotation = bodyRot;
    // this.body.rotation = bodyRot;

    this.legL.rotation = cos*angle;
    this.legR.rotation = -cos*angle;
    this.legL2.rotation= this.legL.rotation + angle;
    this.legR2.rotation= this.legR.rotation + angle;
    if(!noArms) {
      this.arm1.rotation = -cos*angle;
      this.arm2.rotation = cos*angle;
      this.body2.rotation = 0;
    }
    // this.body.rotation = Math.PI/100*Math.abs(this.parent.vx);
    // this.head.rotation = -this.body.rotation;
    // this.body._y = -Math.cos(Math.cos(frq)*Math.PI/2)*10;
    // this.body._y = -(Math.sin(bodyRot))*50;

    if(this.skateBoardOn) {
      this.body2._y = Math.sin(frq)*5
      this.legR._y = this.body2._y;
      this.legL.rotation = 0
      this.legL2.rotation=0;
    }
  }
  airborn() {
    if(this.ceilingCollide){
      this.body._y = -(1-this.scaleY)*this.h/2;
    } else {
      this.body._y=0;
    }
    // this.idle();
    // this.rotation = this.parent.vy/20;
    var ds = Math.abs(this.parent.vy)/40/2;
    this.scaleY += (1+ds-this.scaleY)/10;
    this.scaleX += (1-ds-this.scaleX)/10;
    // var angle = Math.atan2(Math.abs(this.parent.vy),this.parent.vx/2)+Math.PI/2;
    // if(this.parent.vy<10)
      this._rotation = this.parent.vx/20*this.parent.vy/10;
    // else
      // this._rotation = 0;
    this.legL._rotation = Math.PI/3-this.parent.vy/30;
    if(this.skirtOn)this.legL._rotation *= 0.5;
    this.legR._rotation = -this.legL._rotation;
    this.arm1._rotation = Math.min(this.parent.vy/20,Math.PI*.4)+Math.PI/3;
    this.arm2._rotation = -this.arm1._rotation;
    this.head._rotation = 0;
    this.body.rotation = 0;
    this.body2.rotation = 0;

    if(this.wallColliding) {
      var dx = this.parent.dx;
      var arm = this.arm1;
      if(dx>0)arm=this.arm2;
      arm._rotation = -dx*Math.PI*.9;
      this.head._rotation += -Math.PI/8*dx;
    }

    var d = 2;
    this.rotation += (this._rotation-this.rotation)/d;
    this.head.rotation += (this.head._rotation-this.head.rotation)/d;
    this.legL.rotation += (this.legL._rotation-this.legL.rotation)/d;
    this.legR.rotation += (this.legR._rotation-this.legR.rotation)/d;
    this.arm1.rotation += (this.arm1._rotation-this.arm1.rotation)/d;
    this.arm2.rotation += (this.arm2._rotation-this.arm2.rotation)/d;
    this.legL._x=0;
    this.legL._y=0;
  }
  land() {
    if(this.parent.passedOut) {
      SOUNDS.pop.play();
    }
    if(!this.dodging) {
      this.doubleJumpTimer = 0;
      this.scaleY = .8;
      this.scaleX = 1.2+Math.abs(this.parent.vy)/20;
    }
    this.doubleJumping = false;
  }
  impactStop(amount) {
    this.impactStopTimer = amount;
  }
  wallCollide() {
    this.doubleJumping = false;
    var d = Math.abs(this.parent.vx)/30;
    if(this.attacking) {
      this.parent.vy = -4;
      this.parent.vx += -this.parent.dx*10;
      this.parent.wallColliding = false;
      if(this.parent.jumpCount==0) {
        this.parent.jumpCount = 1;
      }
      this.cooldownTimer = this.attackTimer+3;
    }
    this.attackEnd();
    this.scaleX = 1-d;
    this.scaleY = 1+d;
  }
  jump() {
    this.doubleJumpTimer = 0;
    this.scaleY = 2;
    this.scaleX = .5;
  }
  doubleJumpUpdate() {
    this.doubleJumpTimer--;
    if(this.doubleJumpTimer<=0) {
      this.doubleJumping = false;
    }
    
    var dx = 1;//this.parent.dx;
    var t = this.doubleJumpTimer/20;
    if(this.skateBoardOn) {
      this.skateBoard.rotation = -t*Math.PI*2*dx;
      // return
    } 
    this.arm1.rotation = 0;
    this.arm2.rotation = 0;
    this.body2.rotation = Math.PI/4;
    this.legL.rotation = -Math.PI/2;
    this.legR.rotation = -Math.PI/2;
    this.head.rotation = Math.PI/2;
    t = t*t;
    
    this.body.rotation = -t*Math.PI*2*dx;
  }
  doubleJump() {
    this.doubleJumping = true;
    this.doubleJumpTimer = 30;
    this.scaleX = 1;
    this.scaleY = 1;
  }
  passedOut() {
    this.body.rotation = -Math.PI*.3;
      this.body._y = 20;
      this.head.rotation = -Math.PI/20;
      // this.arm1.rotation = Math.PI;
  }
  neutralFace() {
    // if(this.impactStopTimer>=0)return;
    if(this.mouthType)
    this.mouth.drawable.image = this.mouthType;

  }
  fear() {
    if(this.mouth.drawable.image!=IMAGES.mouthOpenDistress && this.mouth.drawable.image){
      this.mouthType = this.mouth.drawable.image;
      this.mouth.drawable.image = IMAGES.mouthOpenDistress;
    }
    this.hitRotation = Math.PI/10;//(Math.random()*2-1) * Math.PI/5;
    this.rotation = 0;
    this.body.rotation = -this.hitRotation;
    this.body2.rotation = -this.hitRotation;
    this.head.rotation = -this.hitRotation;
    // this.arm1.rotation = -Math.PI*1.2;
    // this.arm2.rotation = -Math.PI*0.5;
    this.legL.rotation = Math.PI/4;
    this.legR.rotation = -Math.PI/4;
    this.arm1.rotation = Math.PI;
    this.arm2.rotation = Math.PI;
    this.isHit = true;
}
  getHit(init) {
    if(init || !this.hitRotation) { 
      if(this.mouth.drawable.image!=IMAGES.mouthOpenDistress && this.mouth.drawable.image){
        this.mouthType = this.mouth.drawable.image;
        this.mouth.drawable.image = IMAGES.mouthOpenDistress;
      }
      this.hitRotation = Math.PI/5;//(Math.random()*2-1) * Math.PI/5;
      this.rotation = 0;
      this.scaleX = 1.2;
      this.scaleY = 1.2;
      this.head.scaleX = 2;
      this.head.scaleY = 2;
      this.endAnim();
    }
    this.scaleY += (1-this.scaleY)/2;
    this.scaleX += (1-this.scaleX)/2;
    this.rotation = Math.PI/4;
    this.isHit = true;
    this.body.rotation = -this.hitRotation;
    this.body2.rotation = -this.hitRotation;
    this.head.rotation = -this.hitRotation;
    this.arm1.rotation = -Math.PI*1.2;
    this.arm2.rotation = -Math.PI*0.5;
    this.legL.rotation = Math.PI/4;
    this.legR.rotation = -Math.PI/4;
  }
  update() {
    // this.wheelchair.rotation = this.hips.rotation+this.legL.rotation-this.body.rotation;
    // this.skirt.rotation = (this.legL.rotation + this.legR.rotation)/2
    if(this.skirtOn) {
      // console.log(this.legR.rotation, this.legL.rotation);
      // console.log(Math.sin(this.legL.rotation)-Math.sin(this.legR.rotation));
      var sx= Math.max((Math.sin(this.legL.rotation)-Math.sin(this.legR.rotation)+1)/1.6180339887498948,1);
      this.skirt.scaleX = sx;
      // this.skirt.drawable.extendX = this.skirt.drawable._extendX + (sx-1)*4;
    }
    if(this.impactStopTimer>0) {
      this.impactStopTimer--;
      if(this.isHit) {
        this.getHit();
      }
      if(this.impactStopTimer<=0) {
        this.wallCollide();
        if(this.isHit) {
          this.mouth.drawable.image = this.mouthType;
        }
        this.isHit = false;
      }
      return;
    }

    this.head.scaleX += (1-this.head.scaleX)*0.9;
    this.head.scaleY += (1-this.head.scaleY)*0.9;
    this.moveLocked = this.attacking||this.highFiving;
    if(this.cooldownTimer>0) this.cooldownTimer--;
    if(this.parent.passedOut) {
      this.passedOut();
      return;
    }
    if(this.anim) {
      this.flip = this.parent.dx<0;
      this.animProcessor();
      return;
    }
    if(this.attacking) {
      this.attackUpdate();
      return;
    }
    if(this.dodging) {
      this.doubleJumpUpdate();
    }
    else if(!this.grounded) {
      if(this.doubleJumping) {
        this.doubleJumpUpdate();
      } else {
        this.airborn();
      }
    }
    else if(this.crouching) {
      this.crouch();
    }
    else if(this.moving&&!this.wallColliding) {
      this.highFiveCount = 0;
      if(this.lastDX!=this.parent.dx) {
        this.frameCount = 0;
      }
      this.lastDX = this.parent.dx;
      if(this.lastDY!=this.parent.dy) {
        this.frameCount = 0;
      }
      this.lastDY = this.parent.dy;
      this.walk();
    } else {
      this.idle();
      this.frameCount = 0;
    }
    if(this.highFiving) {
      this.highFiveUpdate();
    }
    this.faceUpdate();
    if(this.shoe1) {
      this.shoe1.rotation = -this.legL.rotation/2;
      this.shoe2.rotation = -this.legR.rotation/2;
    }
    // this.scaleX = Math.sign(this.parent.dx);
    this.flip = this.parent.dx<0;
  }
  faceUpdate() {
    // this.face._x += Math.round((this.parent.dx*5-this.face._x)/3);
    // this.face._x = Math.abs(this.parent.dx);
    if(this.moving)this.face._x = 1
    else if(Math.random()>.98) {
      this.face._x=0;
    }
  }
  startAnim(anim) {
    this.unInteruptable = false;
    this.anim = anim;
    this.animIndex = 0;
    this.animFrameCount = -1;
    this.animKeyFrame = this.anim[this.animIndex];
    this.legL.scaleY = 1;
    this.legR.scaleY = 1;
    this.animStartFrame(this.animKeyFrame);
  }
  endAnim() {
    this.anim = null;
    if(this.attacking) {
      this.attacking = false;
    }
    this.unInteruptable = false;
    this.parent.telegraphProjectile= false;
    this.wheelchair.rotation = 0;
  }
  animStartFrame(keyFrame) {
    var t = keyFrame.time;
    this.damage = keyFrame.damage;
    keyFrame.limbs.forEach(limbData => {
      var limb = this[limbData.limb];
      var dr = (limbData.rotation-limb.rotation) || 0
      while(dr>Math.PI*2)dr-=Math.PI*2;
      while(dr<-Math.PI*2)dr+=Math.PI*2;
      // dr -= Math.floor(dr/(Math.PI*2))*Math.PI*2;
      limb.drotation = dr/t||0;
      limb.dx = (limbData.x-limb.x)/t || 0
      limb.d_x = (limbData._x-limb._x)/t || 0
      limb.dy = (limbData.y-limb.y)/t || 0
      limb.d_y = (limbData._y-limb._y)/t || 0
    })
    if(keyFrame.onStart) {
      keyFrame.onStart(this);
    }
    if(keyFrame.unInteruptable) this.unInteruptable = true;
    if(keyFrame.interuptable)this.unInteruptable = false;
  }
  animProcessor() {
    this.scaleY += (1-this.scaleY)/2;
    this.scaleX += (1-this.scaleX)/2;
    this.animFrameCount += 1;
    // this.animKeyFrame = this.anim[this.animIndex]
    if(this.animFrameCount>=this.animKeyFrame.time) {
      this.animIndex += 1;
      if(this.animIndex>=this.anim.length) {
        //finish anim
        this.anim = null;
        this.endAnim();
        return;
      }
      this.animKeyFrame = this.anim[this.animIndex];
      this.animStartFrame(this.animKeyFrame);
      this.animFrameCount=0;
    }
    var time = this.animKeyFrame.time;
    // var t = this.animFrameCount/time;
    this.animKeyFrame.limbs.forEach(limbData => {
      var limb = this[limbData.limb]
      // if(limbData.rotation) limb.rotation = limbData.rotation*t;
      // if(limbData.x) limb.x = limbData.x*t;
      // if(limbData._x) limb._x = limbData._x*t;
      // if(limbData.y) limb.y = limbData.y*t;
      // if(limbData._y) limb._y = limbData._y*t;
      limb.rotation += limb.drotation;
      limb.x += limb.dx;
      limb._x += limb.d_x;
      limb.y += limb.dy;
      limb._y += limb.d_y;
    })
    if(this.animKeyFrame.dx) {
      this.parent.vx += this.animKeyFrame.dx/time*this.parent.dx;
    }
    if(this.animKeyFrame.customUpdate) {
      this.animKeyFrame.customUpdate(this);
    }
    if(this.animKeyFrame.doLegWalk&&this.moving) {
      this.walk(true);
    }
    // this.wheelchair.rotation = this.hips.rotation+this.legL.rotation-this.body.rotation;
  }
  draw(canvas, x,y) {
    if(this.hidden)return;
    // canvas.strokeRect(x-this.w/2,y-this.h/2,this.w,this.h);
    this.drawOutline(canvas, x,y);
    super.draw(canvas, x,y);
  }
  
}

var anims = {
  punch1: [
    { limbs: 
      [
        {limb: 'arm1', rotation: 0},
        {limb: 'arm2', rotation: 0},
        {limb: 'body2', rotation: 0},
        // {limb: 'hips', rotation: Math.PI/4},
      ],
      time: 0, //dx: -6
    },
    { limbs: 
      [
        {limb: 'arm2', rotation: -Math.PI/2, _x: 2},
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
        self.parent.attackHitbox = self.parent.defaultAttackHitbox;
        var p = self.parent;
        if(!p.grounded && p.mx || p.isBot) {
          p.vx = (p.dx*p.jumpSpeedBoost)
        }
      },
      time: 1, dx:5
    },
    {
      limbs:[
        {limb: 'arm2', rotation: -Math.PI/20, _x: 0},
        {limb: 'body2', rotation: Math.PI/20, _x: 0},
      ],
      time: 8
    }
  ],
  punch2: [
    { limbs: 
      [
        {limb: 'arm1', rotation: 0},
        {limb: 'arm2', rotation: 0},
        {limb: 'body2', rotation: 0},
        // {limb: 'hips', rotation: Math.PI/4},
      ],
      time: 0,// dx: -6
    },
    { limbs: 
      [
        {limb: 'arm1', rotation: -Math.PI/2, _x: 10},
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
        var p = self.parent;
        if(!p.grounded && p.mx || p.isBot) {
          p.vx = (p.dx*p.jumpSpeedBoost)
        }
      },
      time: 2, dx:5
    },
    {
      limbs:[
        {limb: 'arm1', rotation: -Math.PI/20, _x: 0},
        {limb: 'arm2', rotation: -Math.PI/20, _x: 0},
        {limb: 'body2', rotation: Math.PI/20, _x: 0},
      ],
      time: 8
    }
  ],
  strike: [
    { limbs: 
      [
        {limb: 'arm1', rotation: Math.PI},
        {limb: 'arm2', rotation: Math.PI},
        {limb: 'body2', rotation: -Math.PI/4},
        // {limb: 'hips', rotation: Math.PI/4},
      ],
      time: 5, dx: -6
    },
    {limbs:[],time: 3, dx: 12},
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
        if(!p.grounded && p.mx || p.isBot) {
          p.vx = (p.dx*p.jumpSpeedBoost)
        }
      },
      time: 3, dx:12
    },
    {
      limbs:[],
      time: 12
    }
  ],
  flipKick: [
    {
      limbs: 
      [
        {limb: 'arm1', rotation: Math.PI*1.2},
        {limb: 'arm2', rotation: Math.PI*1.2},
        {limb: 'body2', rotation: Math.PI/4},
        {limb: 'body', rotation: Math.PI/4},
        {limb: 'head', rotation: -Math.PI/8},
        {limb: 'legL', rotation: Math.PI/4},
        {limb: 'legL2', rotation: Math.PI/4},
        // {limb: 'hips', rotation: -Math.PI/2},
      ], time: 1,
    },
    {
      limbs: 
      [
        {limb: 'body2', rotation: -Math.PI/4},
        {limb: 'body', rotation: -Math.PI/4},
        {limb: 'head', rotation: -Math.PI/8},
        {limb: 'legL', rotation: Math.PI/2},
        {limb: 'legR', rotation: 0},
        {limb: 'legL2', rotation: Math.PI/2},
        {limb: 'legR2', rotation: Math.PI/2},
        // {limb: 'hips', rotation: -Math.PI/2},
      ], time: 5,
      onStart: self=> {
        self.attacking = true;
        self.parent.attackHitbox = self.parent.defaultAttackHitbox;
        self.knockbackUp = -10;
      },
    },
    {
      limbs:[
        {limb: 'legR', rotation: -Math.PI/2},
        {limb: 'legR2', rotation: 0},
        {limb: 'body', rotation: -Math.PI/2},
        {limb: 'arm1', rotation: -Math.PI/3},
        {limb: 'arm2', rotation: -Math.PI/3},

      ],time: 7,
      onStart: self=>self.parent.vz -= 8,
    },
    {
      limbs: 
      [
        {limb: 'body2', rotation: 0},
        {limb: 'body', rotation: -Math.PI*2},
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
  ],
  groundSlam: [
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
      customUpdate: self => {
        self.parent.vz= -10;
      },
      time: 8
    },
    {
      limbs:[],
      time:8
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
      time: 8
    },
    {
      limbs: [
        {limb: 'body2', rotation: 0},
        {limb: 'body', rotation: Math.PI/2},
        {limb: 'head', rotation: 0},
        {limb: 'arm1', rotation: -Math.PI},
        {limb: 'arm2', rotation: -Math.PI},
      ],
      customUpdate: self => {
        self.parent.vz= 40;
      },
      onStart: self => {
        self.parent.vz = 30;
        self.attacking = true
        self.parent.attackHitbox = self.parent.largeHitbox;
        self.knockbackUp = 20;
      },
      time: 20
    },
    {
      unInteruptable: false,
      interuptable: true,
      limbs: 
      [
        {limb: 'body2', rotation: 0},
        {limb: 'body', rotation: 0},
        {limb: 'head', rotation: 0},
        {limb: 'legL', rotation: 0},
        {limb: 'legL2', rotation: 0},
        {limb: 'arm1', rotation: 0},
        {limb: 'arm2', rotation: 0},
        // {limb: 'hips', rotation: -Math.PI/2},
      ], time: 10, onStart: self=>{
        self.attacking=false;
        self.knockbackUp = 0;
      }
    }
  ],
  armSpinny: [
    {
      limbs: [],
      damage: 5,
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
    }
  ],
  throw: [
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
      time: 2,
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
      time: 10,
    }
  ]
}

anims.dodge = {

}