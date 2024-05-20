class Player extends BeatEmUpper {
  constructor(x,y,model) {
    super(x,y,20,40,'darkgray','black',model);
    // this.canAttack = false;
    this.outlineColor = "black";
    this.invulTime = 40;
    window.player = this;
    this.highFiveDistance = 40;
    this.buttons={};
    this.buttons.B = Buttons.B;
    this.buttons.crouch = Buttons.crouch;
    this.buttons.highFive = Buttons.highFive;
    this.buttons.jump = Buttons.jump;
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
    scene.specialActors.kwak = this;
    this.scene=scene;
  }
  getInputs() {
    this.model.outlineColor = this.outlineColor;
    if(this.inputBlocked)return;
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
    }
    if(!getButton(this.buttons.jump)) {
      this.unjump();
    }
    if(this.crouching = getButton(this.buttons.crouch)) {
      this.crouch();
    }
    // if(this.grounded&&getButton(this.buttons.B))this.model.highFive();
    if(getButtonDown(this.buttons.highFive)&&this.model.cooldownTimer<2) {
      this.attemptHighFive();
    }
    if(this.model.highFiving&&getButton(this.buttons.highFive))this.model.highFive();
    if(getButtonDown(this.buttons.B)) {
      // if(this.grounded&&!this.crouching) {
      //   this.jump();
      //   this.jump();
      // } else 
        this.attack();
      // else
        // this.model.highFive();
    }
    if(keys[82]) {
      this.die();
    }
    
  }
  die() {
    if(this.shouldDelete)return;
    super.die();
    SOUNDS.blowImpact.play();
    setTimeout(e=>
      this.scene.respawn(), 1000);
  }
}