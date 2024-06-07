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
    this.networkedState = {};
    this.networkedStateDiff = {};
    this.attackHitbox = {width: 80, height: 70};
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
    this.networkedStateDiff = {};
    // this.needsNetworkUpdate = false;
    this.model.outlineColor = this.outlineColor;
    if(this.inputBlocked) {
      this.setNetworkedStateAttr('mx', this.mx);
      this.setNetworkedStateAttr('my', this.my);
      // if(this.needsNetworkUpdate) {
      //   this.sendNetworkedState();
      // }
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
    if(this.crouching = getButton(this.buttons.crouch)) {
      this.crouch();
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
    if(this.shouldDelete)return;
    super.die();
    SOUNDS.blowImpact.play();
    setTimeout(e=>
      this.scene.respawn(), 1000);
  }
}