class Player extends BeatEmUpper {
  constructor(x,y,model) {
    super(x,y,20,40,'darkgray','black',model);
    // this.canAttack = false;
    this.outlineColor = "black";
    this.invulTime = 40;
    // window.player = this;
    this.highFiveDistance = 40;
    this.buttons={};
    this.buttons.B = Buttons.B;
    this.buttons.crouch = Buttons.crouch;
    this.buttons.highFive = Buttons.highFive;
    this.buttons.jump = Buttons.jump;
    this.buttons.useItem = Buttons.R;
    this.networkedState = {};
    this.networkedStateDiff = {};
    this.attackHitbox=
    this.defaultAttackHitbox = {width: 120, height: 60};
    this.interactablesRange = 200;
    // this.item.type = ITEMS.flag;
    // this.item.count = 10;
    this.isPlayer = true;
    this.health=this.maxHealth=100;
    this.indicatorAlpha = 1;
  }
  respawn() {
    super.respawn();
    this.indicatorAlpha = 1;
  }
  attack() {
    if (this.canAttack) {
      var anim = null;
      // if(this.model.attacking) {
      //     this.spamCounter += 1;
      //     if(this.spamCounter>1){
      //         anim = anims.armSpinny
      //     }
      // } else {
      //     this.spamCounter = 0;
      // }
      if(!this.grounded) {
          if(this.vz<-this.jumpStrength*.6){
              //&&this.canJump()) {
              anim=anims.flipKick
              // this.jumpCount++;

          }else if(this.my>0) anim = anims.groundSlam
      }
      if(this.dodging) {
          anim = anims.armSpinny;
      }
      this.model.attack(anim);
    }
  }
  
  addShoes() {
    this.model.addShoes();
    this.canAttack = true;
  }
  initModel() {
    this.model = new PlayerModel(this);
    // this.model = new CheeseburgerJohnsonModel(this);
  }
  onJump() {
    SOUNDS.jump.play();
  }
  onDoubleJump() {
    super.onDoubleJump();
    SOUNDS.jump2.play();
  }
  
  setScene(scene) {
    this.scene=scene;
    this.scene.players.push(this);
    this.enemies = this.scene.enemies;
    this.allies = this.scene.players;
  }
  getInputs() {
    if(this.indicatorAlpha>0) {
      this.indicatorAlpha-=.01;
    } else {
      this.indicatorAlpha = 0;
    }
    this.networkedStateDiff = {};
    // this.needsNetworkUpdate = false;
    this.model.outlineColor = this.outlineColor;
    if(this.inputBlocked) {
      this.setNetworkedStateAttr('mx', this.mx);
      this.setNetworkedStateAttr('my', this.my);
      // if(this.needsNetworkUpdate) {
      //   this.sendNetworkedState();
      // }
      this.closestInteractable = null;
      return;
    }
    // if(this.scene.dialogueController.simpleDialogue.text&&!this.scene.dialogueController.current.done) {
      // this.mx = 0;return;
    // }
    var axes = getAxes();
    this.mx = axes.inputX;
    this.my = axes.inputY;
    // var axesDown = getAxesDown();
    // if(axesDown.inputY<0) {
    //   this.jump();
    // }
    // if(axesDown.inputY>0) {
    //   this.crouch();
    // }
    // if(axes.inputY >= 0) {
    //   this.unjump();
    // }
    // this.crouching = axes.inputY > 0;
    if(getButtonDown(this.buttons.jump)) {
      this.jump();
      this.setNetworkedStateAttr('jump', false);
      this.setNetworkedStateAttr('jump', true);
      this.setNetworkedStateAttr('unjump', false);
    }
    if(!getButton(this.buttons.jump)) {
      this.unjump();
      this.setNetworkedStateAttr('unjump', true);

    }
    if(getButtonDown(this.buttons.useItem)) {
      this.useItem();
    }
    if(this.crouching = getButtonDown(this.buttons.crouch)) {
      // this.crouch();
      // this.useItem();
      this.dodge();
      this.setNetworkedStateAttr('crouch', true);
    } else {
      this.setNetworkedStateAttr('crouch', false);
    }
    // if(this.grounded&&getButton(this.buttons.B))this.model.highFive();
    if(getButtonDown(this.buttons.highFive)&&this.model.cooldownTimer<2) {
      this.attemptHighFive();
      this.setNetworkedStateAttr('attemptHighFive', false);
      this.setNetworkedStateAttr('attemptHighFive', true);
      this.setNetworkedStateAttr('unHighFive', false);
    } else {
      this.setNetworkedStateAttr('attemptHighFive', false);
    }
    if(this.model.highFiving&&getButton(this.buttons.highFive)) {
      this.model.highFive();
    } else if(this.model.highFiving) {
      this.setNetworkedStateAttr('unHighFive', true);
    }
    if(getButtonDown(this.buttons.B)) {
      // if(this.grounded&&!this.crouching) {
      //   this.jump();
      //   this.jump();
      // } else 
        this.attack();
        this.setNetworkedStateAttr('attack', false);
        this.setNetworkedStateAttr('attack', true);
      // else
        // this.model.highFive();
    }
    if(keys[82]) {
      this.die();
    }
    this.setNetworkedStateAttr('mx', this.mx);
    this.setNetworkedStateAttr('my', this.my);
    // if(this.needsNetworkUpdate) {
    //   this.sendNetworkedState();
    // }
    this.updateClosestInteractable();
    if(this.closestInteractable) {
      if(getButtonDown(this.buttons.highFive)) {
        this.closestInteractable.onInteract(this);
      }
    }
  }
  updateClosestInteractable() {
    var rr = this.interactablesRange*this.interactablesRange;
    var minDist = rr;
    var closest = null;
    this.scene.interactables.forEach(interactable => {
      if(!interactable.isInteractable)return;
      if(interactable.shouldDelete)return;
      const {dx,dy,dz} = vector3Diff(interactable, this);
      var sqrDiff = diffSqrd(dx,dy,dz);
      if(sqrDiff<minDist) {
        closest = interactable;
        minDist = sqrDiff;
      }
    })
    this.closestInteractable = closest;
  }
  setNetworkedStateAttr(attr, value) {
    if(this.networkedState[attr] != value) {
      this.needsNetworkUpdate = true;
      this.networkedState[attr] = value;
      this.networkedStateDiff[attr]= value;
    }
  }
  sendNetworkedState() {
    this.needsNetworkUpdate = false;
    var state = this.networkedStateDiff;
    var inputs = ['x','y','z','vx','vy','vz','mx','my']
    inputs.forEach(input => {
      state[input] = this[input]
    })
    if(this.networkTester) {
      this.networkTester.receiveNetworkedState(state);
    }
    // console.log(this.networkedStateDiff) 
  }
  die() {
    if(this.shouldDelete||this.dead)return;
    super.die();
    SOUNDS.blowImpact.play();
    setTimeout(e=>
      this.scene.toDeathScene(), 1000);
  }
  draw(canvas) {
    if(this.indicatorAlpha>.01) {
      canvas.strokeStyle = 'white';
      var w = 50;
      var h = 30;
      canvas.lineWidth = 5;
      canvas.save();
      canvas.globalAlpha = this.indicatorAlpha;
      canvas.translate(this.x,this.y);
      canvas.scale(1,0.5);
      canvas.beginPath();
      canvas.arc(0,0,20,0,Math.PI*2);
      canvas.stroke();
      canvas.restore();
    }
    // canvas.strokeRect(this.x-w/2,this.y-h/2,w,h)
    super.draw(canvas);
    if(this.closestInteractable)this.drawInteractPrompt(canvas, this.closestInteractable)
  }
  drawInteractPrompt(canvas,obj) {
    canvas.font = '40px' + FONT_FAMILY.default;
    canvas.fillStyle = 'white';
    canvas.textAlign='center';
    var interactPrompt = [
      `[${Buttons.Y.keys[0].keyDisplay}]`,
      `[${Buttons.Y.keys[1].keyDisplay}]`,
      '(Y)','[Y]'][SelectedSchemeIndex]
    // var interactPromptImage = [
    //   IMAGES.inputPromptKeyE,
    //   IMAGES.inputPromptKeyF,
    //   IMAGES.inputPromptButtonX,
    //   IMAGES.inputPromptButtonY,
    // ][SelectedSchemeIndex];
    var interactPromptImage = btnImages[3];
    var w = interactPromptImage.width;
    var h = interactPromptImage.height;
    w*=3;
    h*=3;
    canvas.drawImage(interactPromptImage, obj.x-w/2,-h/2+obj.y+obj.z-obj.h+(obj.promptOffsetY||0),w,h);
    // canvas.lineWidth = 2;
    // canvas.strokeStyle = 'black';
    // canvas.strokeText(interactPrompt, obj.x,obj.y+obj.z-obj.h+(obj.promptOffsetY||0))
    // canvas.fillText(interactPrompt, obj.x,obj.y+obj.z-obj.h+(obj.promptOffsetY||0))
  }
}