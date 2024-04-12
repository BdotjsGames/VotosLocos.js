
class GameSceneBasic extends Scene {
    constructor(model,levelNumber=0, prev) {
      super();
      this.levelNumber = levelNumber;
      var startingY = 100;
      var groundHeight = 400;
      this.sorters = [];
      this.minY = startingY - groundHeight/2;
      this.maxY = startingY + groundHeight/2;
      this.backgrounds = [];
      this.backgrounds.push(this.ground=new Ground(0,startingY-groundHeight/2,2000,groundHeight));
      for(var i=0;i<10;i++) {
        var x = Math.random()*this.ground.w;
        var y = Math.random()*groundHeight + startingY - groundHeight/2;
        var z = 0;
        var w = 30;
        var h = 15;
        var d = 30;
        this.addEntity(new Block(x,y,z,w,h,d)); 
      }
      for(var i=0;i<10;i++) {
        var x = Math.random()*this.ground.w;
        var y = Math.random()*groundHeight + startingY - groundHeight/2;
        this.addEntity(new HighFiver(x,y)); 
      }
      if(this.levelNumber>0)
      for(var i=0;i<10;i++) {
        var x = Math.random()*this.ground.w;
        var y = Math.random()*groundHeight + startingY - groundHeight/2;
        this.addEntity(new Drone(x,y)); 
      }
      for(var i=0;i<17;i++) {
        var x = Math.random()*this.ground.w;
        var y = startingY - groundHeight/2-75-Math.random()*100;
        var w = 100 + Math.random()*100;
        var h = 50+200*Math.random();
        this.backgrounds.push(new BackgroundBuilding(x,y, w,h,'white')); 
      }
      var wx = this.ground.w;
      for(var x=wx;x>-300;) {
        var x = wx;
        var y = startingY - groundHeight/2;
        // var h = 50+200*Math.random();
        // this.addEntity(new BackgroundBuilding(x,y, 100,h,'white')); 
        var buildingImage = randomFromList(IMAGES.buildings);
        var w = buildingImage.width*2;
        var h = buildingImage.height*2;
        wx -= w;///2+Math.random()*w;
        // wx -= Math.random()*200;
        this.backgrounds.push(new ImageDrawable(buildingImage, x,y-h/2, w,h));
      }
      this.addEntity(this.player = new Player(100,startingY,model));
      // this.addEntity(new Knight(100,-100));
      // this.addEntity(new NPC(2100,0, CurleyModel));
      // this.addEntity(new Curley(2100,0));
      // this.addEntity(new Chomper(2200,0));
      this.camera = {
        x:0,y:0,
        target: this.player,
        zoom:1.2,
      };
      this.defaultZoom = this.camera.zoom;
      this.doLighting = false;
      this.screenShake = 0;
      this.LightMask = createScreenCanvas();
      this.level = {
        width: 2000,
        height: startingY + groundHeight/2+300
      }
      this.dialogueController = new DialogueController(null,this);
    }
    dialogueProcess(name) {
      var dialogue = GetDialogueData(this,name);
      if(dialogue) {
        this.dialogueController.setSequence(dialogue);
      } else {
        this.dialogueController.setSequence([{}]);
      }
    }
    playDialogue(sequence, blocking=true) {
      this.dialogueBlocking = blocking;
      this.dialogueController.setSequence(sequence);
    }
    wallCollideWith(cell,entity) {
    //   return this.level.wallCollideWith(cell,entity);
    }
    standOn(cell,entity) {
    //   return this.level.standOn(cell,entity);
    }
    collides(...args) {
    //   return this.level.collides(...args);
    }
    collideCheck(e) {
      if(e.x<0)e.x=0;
        if(e.y<this.minY) e.y = this.minY;
        if(e.y>this.maxY) e.y = this.maxY;
    }
    update() {
      if(this.transitioningOut) return;
      super.update();
      if(getButtonDown(Buttons.start)) {
        this.driver.setScene(new PauseScene(this));
      }
      if(this.dialogueController.done) {
        this.camera.target = this.player;
        this.camera.zoom = this.defaultZoom;
        this.dialogueBlocking = false;
      }
      var target = this.camera.target;
      var tvx = target.vx||0;
      var tx = target.x + tvx*5;
      var ty = target.y - target.h+target.z;
      if(!this.dialogueController.done) {
        ty += CE.height/20;
      }
      this.camera.x += Math.floor((tx-this.camera.x)/10);
      this.camera.y += Math.floor((ty-this.camera.y)/10);
      
      // var targetZoom = 1/(1+Math.abs(this.player.vx)/100);
      // this.camera.zoom += (targetZoom-this.camera.zoom)/100;
  
      var screenw = CE.width/2/this.camera.zoom;
      var screenh = CE.height/2/this.camera.zoom;
      if(this.camera.x-screenw < 0) {
        this.camera.x = screenw;
      }
      // if(this.camera.y-screenh<-300) {
      //   this.camera.y = screenh-300;
      // }

      if(this.camera.x+screenw > this.level.width) {
        this.camera.x = this.level.width - screenw;
      }
      if(this.camera.y+screenh> this.level.height) {
        this.camera.y = this.level.height-screenh;
      }
  
    //   if(this.player.y>this.level.cellHeight*this.level.rows) {
    //     this.player.die();
    //   }
      if(this.screenShake>.001) {
        this.screenShake -= 0.1;
        var r = this.screenShake * 2;
        this.camera.x += Math.cos(frameCount*Math.PI/7)*r;
        this.camera.y += Math.cos(frameCount*Math.PI/13)*r;
        this.camera.rotation = Math.cos(frameCount*19)*Math.PI/200*this.screenShake;
      } else {
        this.camera.rotation = 0;
      }
      if(this.player.x>this.level.width) {
        this.loadNextLevel()
      }
      this.dialogueController.update(); 
      
    }
    loadLevel(level) {
    //   this.entities = [];
    //   // this.player.inputBlocked = false;
    //   var x = this.player.x;
    //   var y = this.player.y;
    //   this.addEntity(this.level = new Level(level));
    //   this.addEntity(this.player = new Player(x,y));
    //   this.camera.target = this.player;
    //   if(this.level.level.index>3) {
    //     this.player.addShoes();
    //   }
    //   this.preProcessLevel();
    }
    loadNextLevel() {
      this.transitioningOut = true;
      this.driver.transitionToScene(new GameSceneBasic(this.player.model, this.levelNumber+1));
      return;
      var nextLevel = World.getNextLevel(this.level);
      if(nextLevel) {
        this.loadLevel(nextLevel);
      }
    }
    loadPrevLevel() {
      var nextLevel = World.getPrevLevel(this.level);
      this.loadLevel(nextLevel);
    }
    draw() {
        this.entities = this.entities.sort((a,b) => a.y-b.y)
      var ctx = this.LightMask.canvas;
      ctx.clearRect(0,0,CE.width,CE.height);
      ctx.fillStyle = "#0003";
      ctx.fillRect(0,0,CE.width,CE.height);
      canvas.save();
        canvas.translate(CE.width/2,CE.height/2);
        canvas.rotate(this.camera.rotation);
        canvas.scale(this.camera.zoom,this.camera.zoom);
        canvas.translate(-this.camera.x,-this.camera.y);
        this.backgrounds.forEach(b=>b.draw())
        super.draw();
      canvas.restore();
      if(this.doLighting) {
        var zoom = this.camera.zoom;
        var cx =CE.width/2-this.camera.x;
        var cy =CE.height/2-this.camera.y;
        this.entities.forEach(function(e) {
          if(e.lightDraw) {
            e.lightDraw(ctx,cx,cy,zoom);
          }
        })
        // var ambient = "#ffffffaa";    
        var ambient = this.ambient;
        ctx.fillStyle = ambient;
        ctx.fillRect(0,0,CE.width,CE.height)
        canvas.globalCompositeOperation = "destination-in";
        canvas.drawImage(this.LightMask.CE, 0,0);
        canvas.globalCompositeOperation = "source-over";
      }
      this.dialogueController.draw();
    }
    respawn() {
      this.player.health = this.player.maxHealth;
      this.player.shouldDelete = false;
    //   this.loadLevel(this.level.level);
      // this.camera.target = this.player;
      // this.camera.x = this.player.x;
      // this.camera.y = this.player.y;
      this.transitioningOut = true;
      this.driver.transitionToScene(new GameSceneBasic(this.player.model, this.levelNumber));
    }
  }