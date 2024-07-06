var frameCount = 0;
var dialogueSkip = false;
var AUTOPAUSE = (localStorage.getItem("autopause")=='true')||false;
var MainDriver = {
  scene: null,
  started: false,
  FPS: 60,
  paused: false,
  pausesOnClickOff: false,
  deltaTime: 1,
  lastUpdate: Date.now(),
  fadeToBlack(time,callback) {
    this.fadeTime = time;
    this.fadeTimer = time;
    this.fadeDir=1;
    this.fadeCallback = callback;
  },
  fadeIn(time,callback) {
    this.fadeTime = time;
    this.fadeTimer = time;
    this.fadeDir=0;
    this.fadeCallback = callback;
  },
  transitionToScene(scene) {
    if(this.fadeTimer>0) {
      console.log("already transitioning");
      // return;
    }
    this.fadeToBlack(30, e => {
      this.setScene(scene)
      this.fadeIn(30);
    })
  },
  startWithScene(scene) {
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    this.setScene(scene);
    this.start();
  },
  isActive(scene) {
    return this.scene = scene;
  },
  setScene(scene, fadeIn=10) {
    scene.driver = this;
    if(this.scene) {
      this.scene.onLeave();
    }
    this.scene = scene;
    scene.init();
    if(fadeIn)
      this.fadeIn(fadeIn);
  },
  start() {
    if(this.started) {
      console.log('main driver already started');
      return;
    }
    setInterval(this.update, 1000/this.FPS);
    this.draw();
    this.started = true;
    window.addEventListener('blur', this.onBlur.bind(this));
    window.addEventListener('focus', this.onFocus.bind(this));    
  },
  onFocus() {
    this.unPause();
  },
  onBlur() {
    if(AUTOPAUSE) this.pause()
  },
  pause() {
    this.paused = true;
    canvas.fillStyle = "white";
    canvas.strokeStyle = "black";
    canvas.font = '40px ' + FONT_FAMILY.default;
    canvas.textAlign = 'center';
    canvas.lineWidth = 5;
    canvas.miterLimit = 2;
    canvas.strokeText("click to resume", CE.width/2,CE.height/2);
    // canvas.fillStyle = "white";
    canvas.fillText("click to resume", CE.width/2,CE.height/2);
    MusicHandler.pause();
  },
  unPause() {
    MusicHandler.resume();
    this.paused = false;
  },
  update() {
    var now = Date.now();
    var msPerFrame = 1000/this.FPS;
    if(now-this.lastUpdate>msPerFrame) {
      this.updateStep();
      this.lastUpdate += msPerFrame;
    }
    if(now-this.lastUpdate>msPerFrame) {
      this.updateStep();
      this.lastUpdate += msPerFrame;
      this.lastUpdate = now;
    }
    // if(this.lastTime) {
    //   var dt = now-this.lastTime;
      // var msPerFrame = 1000/this.FPS;
    //   this.deltaTime = dt;
    //   if(dt>msPerFrame*1.5) {
    //     this.updateStep();
    //   }
    // }
    // this.updateStep();

    // this.lastTime = now;

  },
  updateStep() {
    frameCount += 1;
    if(this.paused)return inputUpdate();
    try {
      this.scene.update();
    } catch (error) {
      console.log(error);
      // var localServerURL = "http://127.0.0.1:3000/";
      // var localFilePath = "file://~/Desktop/Coding/VotosLocos.js/"
      // console.log(""+error.stack.replaceAll(localServerURL, localFilePath));
    }
    inputUpdate();
    if(this.fadeTimer>0) {
      this.fadeTimer--;
    }
    if(this.fadeTimer<3&&this.fadeCallback){
      this.fadeCallback();
      this.fadeCallback = null;
    }
    if(devtools.opened == true) {
      alert('detected');
    }
    if(getButtonDown(Buttons.cheatDialogueOff)) {
      dialogueSkip = !dialogueSkip
    }
    // if(getButtonDown(Buttons.pause)) {
    //   if(!this.scene.isOptionsScene) {
    //     this.setScene(new OptionsScene(this.scene))
    //   } else {
    //     this.scene.back();
    //   }
    // }
    
  },
  draw() {
    window.requestAnimationFrame(this.draw);
    if(this.paused)return;
    if(canvas.backgroundImage && !this.scene.doLighting) {
      canvas.drawImage(canvas.backgroundImage,0,0, CE.width,CE.height);
    } else {
      canvas.clearRect(0,0,CE.width,CE.height);
    }
    this.scene.draw(canvas);
    if(this.fadeTimer>0) {
      canvas.fillStyle = 'black';
      var t = this.fadeTimer/this.fadeTime;
      if(this.fadeDir) t=1-t;
      canvas.globalAlpha = t;
      canvas.fillRect(0,0,CE.width,CE.height);
      canvas.globalAlpha=1;
    }
    if(touchOn && !this.scene.dialogueBlocking) {
      touchdraw(canvas);
    }
    else touchDrawClear();

    if(ImageLoader.isLoading()) {
      canvas.fillStyle = "white";
      canvas.strokeStyle = "black";
      canvas.font = '40px ' + FONT_FAMILY.default;
      canvas.textAlign = 'center';
      canvas.lineWidth = 5;
      canvas.miterLimit = 2;
      canvas.strokeText("loading", CE.width/2,CE.height/2);
      canvas.fillText("loading", CE.width/2,CE.height/2);
    }
  }
}

devtools = /./;
devtools.toString = function() {
  // this.opened = true;
  // alert('hi');
}

var p = window.parent;
// while(p.parent != p) {
//   console.log(p)
//   p=window.parent;
// }

// window.addEventListener('load', function(e) {
//   function start() {
//     // window.removeEventListener('mousedown', start);

//     // MainDriver.startWithScene(new GameScene());
//     // return;

//     MainDriver.startWithScene(new LoadingScene());
//     ImageLoader.onComplete(function() {
//       SOUNDS.onComplete(function() {
//         setTimeout(function() {
//           // MainDriver.setScene(new SplashScreen(MenuScene));
//           // MainDriver.setScene(new MenuScene());
//           MainDriver.setScene(new GameSceneBasic());
//           // MainDriver.setScene(new ModelEditorScene());
//           console.log('%c', devtools);
//         },1000);
//       })
//     })
//   }
//   start();
//   // window.addEventListener('mousedown', start);
//   // setTimeout(function(){MainDriver.startWithScene(new OpeningScene())},0);
//     // setTimeout(function(){MainDriver.startWithScene(new GameScene())},0);
//   // MainDriver.startWithScene(new LoadingScene());
//   // ImageLoader.onComplete(function(){
//   //   setTimeout(function() {
//   //     MainDriver.setScene(new SplashScreen(OpeningScene));
//   //   },1000);
//   // })
// })