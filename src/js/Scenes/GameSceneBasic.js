
class GameSceneBasic extends Scene {
    constructor(model,levelNumber=0, prev) {
      super();
      this.levelNumber = levelNumber;
      this.startingY = 100;
      this.groundHeight = 400;
      this.sorters = [];
      this.minY = this.startingY - this.groundHeight/2;
      this.maxY = this.startingY + this.groundHeight/2;
      for(var i=0;i<10;i++) {
        var x = 1500*Math.random();
        var y = 300*Math.random()/3+this.startingY-this.groundHeight-300;
        var cloud = this.addEntity(new ImageDrawable(IMAGES.cloud, x,y))
        cloud.vx = Math.random();
        cloud.update = function() {
          this.x += this.vx;
          if(this.x-this.w>1500) this.x=-this.w*2;
        }
      }
      this.backgrounds = [];
      this.backgrounds.push(this.ground=new Ground(0,this.startingY-this.groundHeight/2,2000,this.groundHeight));
      // for(var i=0;i<10;i++) {
      //   var x = Math.random()*this.ground.w;
      //   var y = Math.random()*this.groundHeight + this.startingY - this.groundHeight/2;
      //   var z = 0;
      //   var w = 30;
      //   var h = 15;
      //   var d = 30;
      //   this.addEntity(new Block(x,y,z,w,h,d)); 
      // }
      // for(var i=0;i<10;i++) {
      //   var x = Math.random()*this.ground.w;
      //   var y = Math.random()*this.groundHeight + this.startingY - this.groundHeight/2;
      //   this.addEntity(new HighFiver(x,y)); 
      // }
      // if(this.levelNumber>0)
      // for(var i=0;i<10;i++) {
      //   var x = Math.random()*this.ground.w;
      //   var y = Math.random()*this.groundHeight + this.startingY - this.groundHeight/2;
      //   this.addEntity(new Drone(x,y)); 
      // }
      this.showGo = false;
      for(var i=0;i<17;i++) {
        var x = Math.random()*this.ground.w;
        var y = this.startingY - this.groundHeight/2-75-Math.random()*100;
        var w = 100 + Math.random()*100;
        var h = 50+200*Math.random();
        this.backgrounds.push(new BackgroundBuilding(x,y, w,h,'white')); 
      }
      var wx = this.ground.w;
      for(var x=wx;x>-300;) {
        var x = wx;
        var y = this.startingY - this.groundHeight/2;
        // var h = 50+200*Math.random();
        // this.addEntity(new BackgroundBuilding(x,y, 100,h,'white')); 
        var buildingImage = randomFromList(IMAGES.buildings);
        var w = buildingImage.width*2;
        var h = buildingImage.height*2;
        wx -= w;///2+Math.random()*w;
        // wx -= Math.random()*200;
        this.backgrounds.push(new ImageDrawable(buildingImage, x,y-h/2, w,h));
      }
      this.addEntity(this.player = new Player(100,this.startingY,model));
      // this.addEntity(new Knight(100,-100));
      // this.addEntity(new NPC(2100,0, CurleyModel));
      // this.addEntity(new Curley(2100,0));
      // this.addEntity(new Chomper(2200,0));
      this.camera = {
        x:this.player.x,y:this.player.y,
        target: this.player,
        zoom:1,
      };
      this.defaultZoom = this.camera.zoom;
      this.camera.targetZoom = this.camera.zoom;
      this.doLighting = false;
      this.screenShake = 0;
      this.LightMask = createScreenCanvas();
      this.level = {
        width: 1500,
        height: this.startingY + this.groundHeight/2+42
      }
      this.dialogueController = new DialogueController(null,this);

      // switch(this.levelNumber) {
      //   case 0:
      //     this.playDialogue([
      //       {text:"Go Register to vote!", person:{name: "Lou Chalibre"}, speakerImage:IMAGES.LouChalibre},
      //     ],true,b=>{
      //       this.showGo = true;
      //     })
      //     break;
      //   case 1:
      //     this.spawnRandom(HighFiver, 10);
      //     break;
      //   case 2:
      //     this.spawnRandom(Drone, 10);
      //     break;
      // }
      this.ui = [];
      if(this.levelNumber<GameSequence.length) {
        this.processLevelData(GameSequence[this.levelNumber]);
      }
    }
    addUI(ui) {
      this.ui.push(ui);
      return ui;
    }
    setGoal(goal) {
      if(!this.goalText) {
        this.goalText = this.addUI(new DrawableText(goal, -0.45,0.05,1,.1,.03)
        .setTrueCoords(false)
        .setAttr('textAlign', 'left')
        .color(0,0,0)
        .setAttr('pivotX', 0)
        .addMorph("comin", new MorphGroup(null,
          [{dx: -1},1],
          [{dx: 0},30],
          // [{dx: 0},30],
          // [{dx: -1},30,null, m=>m.obj.shouldDelete=true],
        ), true));
      } else {
        this.goalText.text = goal;
      }
    }
    processLevelData(data) {
      this.levelName = data.name;
      this.addUI(new DrawableText(data.name, -0.45,0,1,.1,.03)
        .setTrueCoords(false)
        .setAttr('textAlign', 'left')
        .color(0,0,0)
        .addMorph("comin", new MorphGroup(null,
          [{dx: -1},1],
          [{dx: 0},30],
          [{dx: 0},30],
          [{dx: -1},30,null, m=>m.obj.shouldDelete=true],
        ), true)
      );
      this.goal = data.Goal;
      
      if(data.DialogueData && data.DialogueData.length>0) {
        this.playDialogue(data.DialogueData, true, b=>{
          if(data.continueOnDialogueFinish) {
            this.loadNextLevel();
          } else {
            this.showGo = true;
            if(data.Goal) {
              this.setGoal(data.Goal);
            }
          }
        });
      } else {
        if(data.Goal) {
          this.setGoal(data.Goal);
        }
      }
      if(data.spawnRandom) {
        data.spawnRandom.forEach(s=>{
          this.spawnRandom(s[0],s[1])
        })
      }
      this.encounters = data.encounters;
      if(data.night) {
        this.doLighting = true;
        CE.style.background = 'none';
        CE.style.backgroundColor = "#000";
      }
    }
    spawnRandom(className, num) {
      for(var i=0;i<num;i++) {
        var x = 200+Math.random()*(this.ground.w-200);
        var y = Math.random()*this.groundHeight + this.startingY - this.groundHeight/2;
        this.addEntity(new className(x,y)); 
      }
    }
    dialogueProcess(name) {
      var dialogue = GetDialogueData(this,name);
      if(dialogue) {
        this.dialogueController.setSequence(dialogue);
      } else {
        this.dialogueController.setSequence([{}]);
      }
    }
    playDialogue(sequence, blocking=true, callback) {
      this.dialogueBlocking = blocking;
      this.player.mx = 0;
      this.player.my = 0;
      this.player.inputBlocked = true;
      this.dialogueController.setSequence(sequence,callback);
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
      if(DEV) {
        if(getButtonDown(Buttons.cheatForward)) {
          this.loadNextLevel(true);
        }
        if(getButtonDown(Buttons.cheatBackward)) {
          this.loadPrevLevel(true);
        }
      }
      
      this.ui.forEach(u=>u.update());
      this.ui = this.ui.filter(u=>!u.shouldDelete);
      if(getButtonDown(Buttons.pause)) {
        this.driver.setScene(new PauseScene(this));
      }
      if(this.dialogueController.done) {
        this.camera.target = this.player;
        this.camera.zoom = this.defaultZoom;
        this.player.inputBlocked = false;
        this.dialogueBlocking = false;
      }
      var target = this.camera.target;
      if(target != this.player) {
        target = {
          x: (target.x + this.player.x)/2,
          y: (target.y + this.player.y)/2,
          z: (target.z + this.player.z)/2,
          h: target.h,
        }
      }
      var tvx = target.vx||0;
      var tx = target.x + tvx*5;
      var ty = target.y - target.h+target.z;
      if(!this.dialogueController.done) {
        ty += CE.height/40;
      }
      this.camera.x += Math.floor((tx-this.camera.x)/10);
      this.camera.y += Math.floor((ty-this.camera.y)/10);
      
      // var targetZoom = 1/(1+Math.abs(this.player.vx)/100);
      this.camera.zoom += (this.camera.targetZoom-this.camera.zoom)/10;
  
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
    loadLevel(levelNumber,skipTransition) {
      console.log(levelNumber);
      if(this.transitioningOut)return;
      this.transitioningOut = true;
      highFivers = [];
      if(levelNumber<0)levelNumber=0;
      if(levelNumber>=GameSequence.length) {
        this.driver.transitionToScene(new MenuScene());
        return;
      }
      if(skipTransition)
      this.driver.setScene(new GameSceneBasic(this.player.model, levelNumber));
      else
      this.driver.transitionToScene(new GameSceneBasic(this.player.model, levelNumber));
      
    }
    loadNextLevel(skipTransition) {
      this.loadLevel(this.levelNumber+1,skipTransition);
    }
    loadPrevLevel(skipTransition) {
      // var nextLevel = World.getPrevLevel(this.level);
      this.loadLevel(this.levelNumber-1,skipTransition);
    }
    draw() {
      this.entities = this.entities.sort((a,b) => a.y-b.y)
      var ctx = this.LightMask.canvas;
      if(this.doLighting) {
        ctx.clearRect(0,0,CE.width,CE.height);
        ctx.fillStyle = "#0003";
        ctx.fillRect(0,0,CE.width,CE.height);
      }
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
        var ambient = "#ffffff33";    
        // var ambient = this.ambient;
        ctx.fillStyle = ambient;
        ctx.fillRect(0,0,CE.width,CE.height)
        canvas.globalCompositeOperation = "destination-in";
        // canvas.globalCompositeOperation = "multiply";
        canvas.drawImage(this.LightMask.CE, 0,0);
        canvas.globalCompositeOperation = "source-over";
      }
      this.dialogueController.draw();

      if(this.showGo && frameCount%60<30) {
        canvas.drawImage(IMAGES.GoArrow, CE.width-IMAGES.GoArrow.width,CE.height*.3-IMAGES.GoArrow.height/2);
      }
      this.ui.forEach(u=>u.draw());
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