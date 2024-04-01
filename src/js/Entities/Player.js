class Player extends BeatEmUpper {
  constructor(x,y) {
    super(x,y,20,40,'darkgray');
    // this.canAttack = false;
    this.outlineColor = "black";
    this.invulTime = 40;
    window.parent.player = this;
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
    if(getButtonDown(Buttons.jump)) {
      this.jump();
    }
    if(!getButton(Buttons.jump)) {
      this.unjump();
    }
    if(getButtonDown(Buttons.crouch)) {
      this.crouch();
    }
    // if(this.grounded&&getButton(Buttons.B))this.model.highFive();
    if(getButtonDown(Buttons.highFive)&&this.model.cooldownTimer<2) {
      this.highFive();
    }
    if(this.model.highFiving&&getButton(Buttons.highFive))this.model.highFive();
    if(getButtonDown(Buttons.B)) {
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
  highFive() {
    this.model.highFive();
    var minDist = Number.MAX_SAFE_INTEGER;
    var closest;
    this.highFiveTarget = null;
    highFivers.forEach(h=> {
      if(Math.sign(h.x-this.x) != this.dx)return;
      if(h.dx==this.dx)return;
      var p = {
        x: h.x + h.dx*10,
        y: h.y
      }
      var dist = sqrDist(h,this);
      if(dist<minDist) {
        minDist = dist;
        closest = h;
      }
    })
    if(minDist<100*100) {
      closest.highFiveTarget = this;
      this.highFiveTarget = closest;
      closest.highFive();
      // if(this.model.cooldownTimer<2) {
      var pow = this.scene.addEntity(new ImageParticle(IMAGES.highFivePow, (this.x+closest.x)/2-32, this.y-128, 64,128,0,0,50,-0.00));
      pow.addMorph("pow",new Morph(null, {scaleW: 0.5, scaleH: 0.5, alpha: 0.5}, {scaleW: 1.5, scaleH: 1.5, alpha: 1}, 5, MorphType.easeOutQuad), true)
      pow.setSortOffset(100);
      SOUNDS.attack.play();
      SOUNDS.clap.play();
      // pow.scaleW = 2;
      // pow.scaleH = 2;
      // }
    }
  }
}