//  Copyright Brian Dizon 2019
var touchAsMouseEnabled = false;

var touchCE = document.getElementById("touch-canvas");
var touchCanvas = touchCE.getContext('2d');
touchCanvas.imageSmoothingEnabled = false;
touchCanvas.mozImageSmoothingEnabled=false;
touchCanvas.msImageSmoothingEnabled = false;
touchCanvas.oImageSmoothingEnabled=false;
touchCanvas.webkitImageSmoothingEnabled=false;
window.addEventListener('resize', function() {
  touchCanvas.imageSmoothingEnabled = false;
  touchCanvas.mozImageSmoothingEnabled=false;
  touchCanvas.msImageSmoothingEnabled = false;
  touchCanvas.oImageSmoothingEnabled=false;
  touchCanvas.webkitImageSmoothingEnabled=false;
})

window.addEventListener('load', function() {
  touchCE.width = CE.width;
  touchCE.height = CE.height;
  console.log(touchCE.width);
  touchCanvas.imageSmoothingEnabled = false;
  touchCanvas.mozImageSmoothingEnabled=false;
  touchCanvas.msImageSmoothingEnabled = false;
  touchCanvas.oImageSmoothingEnabled=false;
  touchCanvas.webkitImageSmoothingEnabled=false;
})

var touchOn = false;
touchStarts = [];
var touchDown = false;
var y = .4;
var touchJoySticks;
var touchButtons;
function setButtonsWithShrink(shrinkAmount) {
  y = .4;
  touchJoySticks = [
    {
      x: .25, y:y+.2, r: .25,
      area: {
        x: 0, y: 0.5, w: 0.5, h: 0.5
      },
      output: {x: 0, y: 0, angle: 0,r:0},
      held: false,
    },
    {
      x: -.85, y:y+.15, r: .2,
      area: {
        x: 0, y: 0, w: 0, h: 1
      },
      output: {x: 0, y: 0, angle: 0,r:0},
      held: false,
    }
  ];

  y= 0.5;
  touchButtons = [
    {
      name: 'A',
      x: .85, y:y+.25, r:.1,
      area: {
        // x: 0.75, y: 0, w: 0.25, h:1
        x: .85-.1, y:y+.25-.1, w: .2, h: .2
      },
      held: false,
    },
    {
      name: 'B',
      x: .65, y:y+.25, r:.1,
      area: {
        x: .65-.1, y:y+.25-.1, w: .2, h: .2
      },
      held: false,
    },
    {
      name: 'X',
      x: .75, y:y+.05, r:.1,
      area: {
        // x: 0.5, y: 0, w: 0.25, h:1
        x: .75-.1, y:y+.05-.1, w: .2, h: .2
      },
      held: false,
    },{
      name: 'Y',
      x: .95, y:y+.05, r:.1,
      area: {
        // x: 0.75, y: 0, w: 0.25, h:1
        x: .95-.1, y:y+.05-.1, w: .2, h: .2
      },
      held: false,
    },{
      name: 'R',
      x: .95, y:y-.15, r:.1,
      area: {
        // x: 0.75, y: 0, w: 0.25, h:1
        x: .95-.1, y:y+.05-.1, w: .2, h: .2
      },
      held: false,
    },
    {
      name: '||',
      x: .95, y:.05, r:.1,
      area: {
        // x: 0.75, y: 0, w: 0.25, h:1
        x: .95-.1, y:.05-.1, w: .2, h: .2
      },
      held: false,
    },
  ]

    this.touchJoySticks.forEach(j=> {
      j.r *= shrinkAmount
      j.y += (1-j.y)*(1-shrinkAmount)
      j.x += (0-j.x)*(1-shrinkAmount)
      j.area.y = j.y-j.r;
      j.area.h = j.r*2;
    })
    var w = .2*shrinkAmount
    this.touchButtons.forEach(b=> {
      // b.y += 0.25;
      // b.area.y+=0.25
      b.x += (1-b.x)*(1-shrinkAmount)
      b.y += (1-b.y)*(1-shrinkAmount);
      b.area.x = b.x - w/2;
      b.area.y = b.y - w/2;
      b.area.w = w;
      b.area.h=w;
    })
}
var shrink = localStorage.getItem('touchShrink')
if(shrink) shrink= parseFloat(shrink);
else shrink = 1;
setButtonsWithShrink(shrink);

function createTouchButton(name,position,rect) {
  var button = {
    name,
    x: position.x, y: position.y, r:.1,
    area: rect,
    held: false,
  }
  button.index = touchButtons.length;
  touchButtons.push(button);
  return button;
}

var lastTouchPosition;
function getTouchPosition(touch, e, reff) {
  var ref = CE;
  if(!(MainDriver.scene.useTouchAsMouse&&touchAsMouseEnabled))ref = touchCE;
  if(reff)ref=reff;
  // ref= e.target;
  var boundingClientRect = ref.getBoundingClientRect();    
  var x = touch.pageX-boundingClientRect.left;
  var y = touch.pageY-boundingClientRect.top - document.body.scrollTop;
  var W = ref.offsetWidth;
  var H = ref.offsetHeight;
  lastTouchPosition = {x,y}

  x = x/W;
  y = y/H;
  return{x,y};
}

function pointInRect(x,y,rect) {
  return x >= rect.x && x<=rect.x+rect.w &&
    y >= rect.y && y <= rect.y+rect.h;
}

function touchdraw(canvas) {
  canvas = touchCanvas;
  canvas.clearRect(0,0,touchCE.width,touchCE.height);
  // if(MainDriver.scene.useTouchAsMouse&&touchAsMouseEnabled)return;
  for(var i=0;i<touchJoySticks.length;++i) {
    var joyStick = touchJoySticks[i];
    var angle = joyStick.output.angle;
    var w = joyStick.r*CE.height;
    var h = w*60/50;
    canvas.save();
    canvas.translate(joyStick.x*CE.width, joyStick.y*CE.height);
    var img = IMAGES.touchDpad;
    if(joyStick.held)img= IMAGES.touchDpadRed
    if(!MainDriver.scene.dialogueBlocking)
    canvas.drawImage(img, -w,-w,w*2,w*2);
    // canvas.rotate(angle+Math.PI/2);
    // var color = 'rgba(255,255,255,0.5)';
    // if(joyStick.held)color = 'rgba(255,0,0,0.5)';
    // canvas.fillStyle = color;
    // canvas.fillRect(-w/2,-h/2,w,h);
    canvas.restore();
  }
  for(var i=0;i<touchButtons.length;i++) {
    var button = touchButtons[i];
    var x = button.x * CE.width;
    var y = button.y * CE.height;
    var w = button.area.w * CE.width;
    var h = button.r * CE.height;
    var color = 'rgba(255,255,255,0.5)';
    if(button.held)color = 'rgba(255,0,0,0.5)';
    // if(pointInRect(mouse.x/CE.width,mouse.y/CE.height,button.area)) {
    //   color = 'rgba(255,0,0,0.5)';
    // }
    if(button.held)canvas.globalAlpha = 0.5;
    else canvas.globalAlpha = 1;

    if(i<btnImages.length)
      drawTileSprite(canvas, btnImages[i], x-w/2, y-w/2,w,w);
    else {
      canvas.fillStyle = color
      canvas.fillRect(x-w/2,y-w/2,w,w);
      canvas.fillStyle = "#fff";
      canvas.textAlign = 'center';
      canvas.font = "20px Arial";
      canvas.fillText(button.name, x,y);
    }

    // canvas.drawImage(img, x-w/2,y-h/2,w,h)
    // canvas.save();
    // // canvas.globalAlpha = 0.5;

    // canvas.globalCompositeOperation = 'source-in'
    // if(i<btnImages.length)
    // canvas.restore();
    // canvas.fillStyle = "#fff";
    // canvas.textAlign = 'center';
    // canvas.font = "20px Arial";
    // canvas.fillText(button.name, x,y);
  }
  // if(lastTouchPosition) {
  //   canvas.fillStyle = 'red';
  //   // canvas.fillRect(lastTouchPosition.x,lastTouchPosition.y,20,20)
  //   canvas.fillRect(lastTouchPosition.x*touchCE.width,lastTouchPosition.y*touchCE.height,20,20)
  // }
}

function touchDrawClear() {
  touchCanvas.clearRect(0,0,touchCE.width,touchCE.height);
}



function touchstart(e) {
  setControlsScheme(CONTROL_SCHEMES.TOUCH)
  initializeSound();
  touchOn = true;
  // if(this.scene.startGame)this.scene.startGame();
  // if(this.scene.time)this.scene.time=0;
  var touches = e.changedTouches;
  // e.stopImmediatePropagation();
  var touchingSomething = false;
  for(var i=0;i<touches.length;i++) {
    var touch = e.changedTouches[i];
    console.log(touch);
    var {x, y} = getTouchPosition(touch, e, touchCE);
    // if(MainDriver.scene.useTouchAsMouse&&touchAsMouseEnabled) {
    //   mouse.x = x*CE.width;
    //   mouse.y = y*CE.height;
    //   // mouse.down = true;
    //   if(!touchDown) {
    //     touchDown = true;
    //     mouse.down = true;
    //   }
    //   mouse.held = true;
    //   return;
    // }
    touchStarts.push({x,y});
    for(var j=0;j<touchJoySticks.length;j++) {
      var joyStick = touchJoySticks[j];
      if(pointInRect(x,y,joyStick.area)) {
        var dx = x - joyStick.x;
        var dy = y - joyStick.y;
        var r = Math.sqrt(dx*dx+dy*dy);
        // var magnitude = r/joyStick.r;
        // if(magnitude>1)magnitude=1;
        var magnitude=1;
        joyStick.output = {
          x: dx/r*magnitude,
          y: dy/r*magnitude,
          angle: Math.atan2(dy,dx),
          r: r,
        };
        joyStick.held = true;
        touchingSomething = true;
      }
    }
    for(var j=0;j<touchButtons.length;j++) {
      var button = touchButtons[j];
      if(pointInRect(x,y,button.area)) {
        button.held = true;
        touchingSomething = true
      }
    }
  }
  if(touchingSomething) {
    e.stopImmediatePropagation();
    e.preventDefault();
  } else {
    touchStartForMouse(e)
  }
}
function touchend(e) {
  // if(this.scene.startGame)this.scene.startGame();
  // if(this.scene.time)this.scene.time=0;
  touchDown = false;
  var touches = e.changedTouches;
  // e.preventDefault();
  // e.stopImmediatePropagation();
  var touchingSomething = false;
  for(var i=0;i<touches.length;i++) {
    var touch = e.changedTouches[i];
    var {x, y} = getTouchPosition(touch, e, touchCE);
    // if(MainDriver.scene.useTouchAsMouse&&touchAsMouseEnabled) {
    //   mouse.x = x*CE.width;
    //   mouse.y = y*CE.height;
    //   mouse.held = false;
    //   return;
    // }
    for(var j=0;j<touchJoySticks.length;j++) {
      var joyStick = touchJoySticks[j];
      if(pointInRect(x,y,joyStick.area)) {
        joyStick.held = false;  
        touchingSomething = true;
      }
    }
    for(var j=0;j<touchButtons.length;j++) {
      var button = touchButtons[j];
      if(pointInRect(x,y,button.area)) {
        button.held = false;
        touchingSomething = true;
      }
    }
  }
  if(touchingSomething) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
}


function touchendForMouse(e) {
  // if(this.scene.startGame)this.scene.startGame();
  // if(this.scene.time)this.scene.time=0;
  touchDown = false;
  var touches = e.changedTouches;
  e.preventDefault();
  e.stopImmediatePropagation();
  for(var i=0;i<touches.length;i++) {
    var touch = e.changedTouches[i];
    var {x, y} = getTouchPosition(touch, e, CE);
      mouse.x = x*CE.width;
      mouse.y = y*CE.height;
      mouse.held = false;
      mouse.up = true;
      return;
  }
}

function touchMoveForMouse(e) {
  setControlsScheme(CONTROL_SCHEMES.TOUCH)
  initializeSound();
  touchOn = true;
  // if(this.scene.startGame)this.scene.startGame();
  // if(this.scene.time)this.scene.time=0;
  var touches = e.changedTouches;
  e.preventDefault();
  e.stopImmediatePropagation();
  for(var i=0;i<touches.length;i++) {
    var touch = e.changedTouches[i];
    var {x, y} = getTouchPosition(touch, e, CE);
      mouse.x = x*CE.width;
      mouse.y = y*CE.height;
      return;
  }
}

function touchStartForMouse(e) {
  // touchDown = true;
  if(MainDriver.scene.useTouchAsMouse&&touchAsMouseEnabled)
    mouse.down = true;
  setControlsScheme(CONTROL_SCHEMES.TOUCH)
  initializeSound();
  touchOn = true;
  // if(this.scene.startGame)this.scene.startGame();
  // if(this.scene.time)this.scene.time=0;
  var touches = e.changedTouches;
  e.preventDefault();
  e.stopImmediatePropagation();
  for(var i=0;i<touches.length;i++) {
    var touch = e.changedTouches[i];
    var {x, y} = getTouchPosition(touch, e, CE);
      mouse.x = x*CE.width;
      mouse.y = y*CE.height;
      // mouse.down = true;
      if(!touchDown) {
        touchDown = true;
        mouse.down = true;
      }
      mouse.held = true;
      return;
  }
}

window.addEventListener('load', e=> {
  touchCE.addEventListener('touchstart', touchstart,{ passive: false });
  touchCE.addEventListener('touchmove', touchstart,{ passive: false });
  touchCE.addEventListener('touchend', touchend);
  touchCE.addEventListener('touchcancel', touchend);


  // canvas.addEventListener('touchstart', touchstart,{ passive: false });
  CE.addEventListener('touchstart', touchStartForMouse,{ passive: false });
  CE.addEventListener('touchend', touchendForMouse,{ passive: false });
  CE.addEventListener('touchcancel', touchendForMouse);
  CE.addEventListener('touchmove', touchMoveForMouse,{ passive: false });
  // canvas.addEventListener('touchend', touchend);
  // canvas.addEventListener('touchcancel', touchend);
})