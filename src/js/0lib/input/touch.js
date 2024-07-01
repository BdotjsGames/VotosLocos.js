//  Copyright Brian Dizon 2019

var touchCE = document.getElementById("touch-canvas");
var touchCanvas = touchCE.getContext('2d');
window.addEventListener('load', function() {
  touchCE.width = CE.width;
  touchCE.height = CE.height;
})

var touchOn = false;
touchStarts = [];
var touchDown = false;
var y = .3;
var touchJoySticks = [
  {
    x: .15, y:y+.2, r: .2,
    area: {
      x: 0, y: 0, w: 0.5, h: 1
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

var touchButtons = [
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


function getTouchPosition(touch, e) {
  var ref = CE;
  if(!MainDriver.scene.useTouchAsMouse)ref = touchCE;
  var boundingClientRect = ref.getBoundingClientRect();    
  var x = touch.pageX-boundingClientRect.left;
  var y = touch.pageY-boundingClientRect.top - document.body.scrollTop;
  var W = this.canvas.canvas.offsetWidth;
  var H = this.canvas.canvas.offsetHeight;
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
  if(MainDriver.scene.useTouchAsMouse)return;
  for(var i=0;i<touchJoySticks.length;++i) {
    var joyStick = touchJoySticks[i];
    var angle = joyStick.output.angle;
    var w = joyStick.r*CE.height;
    var h = w*60/50;
    canvas.save();
    canvas.translate(joyStick.x*CE.width, joyStick.y*CE.height);
    canvas.rotate(angle+Math.PI/2);
    var color = 'rgba(255,255,255,0.5)';
    if(joyStick.held)color = 'rgba(255,0,0,0.5)';
    canvas.fillStyle = color;
    canvas.fillRect(-w/2,-h/2,w,h);
    canvas.restore();
  }
  for(var i=0;i<touchButtons.length;i++) {
    var button = touchButtons[i];
    var x = button.x * CE.width;
    var y = button.y * CE.height;
    var w = button.r * CE.width;
    var h = button.r * CE.height;
    var color = 'rgba(255,255,255,0.5)';
    if(button.held)color = 'rgba(255,0,0,0.5)';
    canvas.fillStyle = color
    canvas.fillRect(x-w/2,y-h/2,w,h);
    canvas.fillStyle = "#fff";
    canvas.textAlign = 'center';
    canvas.font = "20px Arial";
    canvas.fillText(button.name, x,y);
  }
}


function touchstart(e) {
  initializeSound();
  touchOn = true;
  // if(this.scene.startGame)this.scene.startGame();
  // if(this.scene.time)this.scene.time=0;
  var touches = e.changedTouches;
  e.preventDefault();
  e.stopImmediatePropagation();
  for(var i=0;i<touches.length;i++) {
    var touch = e.changedTouches[i];
    var {x, y} = this.getTouchPosition(touch, e);
    if(MainDriver.scene.useTouchAsMouse) {
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
      }
    }
    for(var j=0;j<touchButtons.length;j++) {
      var button = touchButtons[j];
      if(pointInRect(x,y,button.area)) {
        button.held = true;
      }
    }
  }
}
function touchend(e) {
  // if(this.scene.startGame)this.scene.startGame();
  // if(this.scene.time)this.scene.time=0;
  touchDown = false;
  var touches = e.changedTouches;
  e.preventDefault();
  e.stopImmediatePropagation();
  for(var i=0;i<touches.length;i++) {
    var touch = e.changedTouches[i];
    var {x, y} = this.getTouchPosition(touch, e);
    if(MainDriver.scene.useTouchAsMouse) {
      mouse.x = x*CE.width;
      mouse.y = y*CE.height;
      mouse.held = false;
      return;
    }
    for(var j=0;j<touchJoySticks.length;j++) {
      var joyStick = touchJoySticks[j];
      if(pointInRect(x,y,joyStick.area)) {
        joyStick.held = false;  
      }
    }
    for(var j=0;j<touchButtons.length;j++) {
      var button = touchButtons[j];
      if(pointInRect(x,y,button.area)) {
        button.held = false;
      }
    }
  }
}

function touchStartForMouse() {
  // touchDown = true;
  if(MainDriver.scene.useTouchAsMouse)
    mouse.down = true;
}

window.addEventListener('load', e=> {
  window.addEventListener('touchstart', touchstart,{ passive: false });
  window.addEventListener('touchstart', touchStartForMouse,{ passive: false });
  window.addEventListener('touchmove', touchstart,{ passive: false });
  window.addEventListener('touchend', touchend);
  window.addEventListener('touchcancel', touchend);
})