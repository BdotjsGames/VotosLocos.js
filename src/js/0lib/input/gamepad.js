//  Copyright Brian Dizon 2019

var gamepadOn = false;
var gamepadAnyButton = 0;
var gamepadAnyButtonDown = 0;

var gamepadJoysticks = [
  {held:false, output: {x: 0, y: 0, angle: 0 }},
  {held:false, output: {x: 0, y: 0, angle: 0 }},
]
var gamepadButtons = [];
// for(var i=0;i<255;i++) gamepadButtons[i]=0;

function pressed(b) {
  return b && (b==1 || b.pressed);
}

var activeGamepads = [];
var activeGamepadsMap = {};

var isListeningForNextGamepadButton = false;
var listenForNextGamepadButtonCallback = null;
function listenForNextGamepadButton(callback) {
  listenForNextGamepadButtonCallback = callback;
  isListeningForNextGamepadButton = true;
}

function handleGamePad() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  // if(gamepads2.length>0)
  for(var i=0;i<gamepads.length;i++) {
    var gp = gamepads[i];
    if(!gp || gp.buttons.length <= 0)continue;
    if(gp.axes) {
      var x1 = gp.axes[0];
      var y1 = gp.axes[1];
      if(Math.abs(x1)<.25)x1=0;
      if(Math.abs(y1)<.25)y1=0;

      var angle = Math.atan2(y1,x1);
      gamepadJoysticks[0].output = {x:x1,y:y1,angle};
      if(x1!=0||y1!=0) {
        gamepadJoysticks[0].held = true;
        // gamepadOn = true;
      } else {
        gamepadJoysticks[0].held = false;
      }

      var x2 = gp.axes[3];
      var y2 = gp.axes[4];
      if(Math.abs(x2)<.25)x2=0;
      if(Math.abs(y2)<.25)y2=0;
      angle = Math.atan2(y2,x2);
      gamepadJoysticks[1].output = {x:x2,y:y2,angle};
      gamepadJoysticks[1].held = x2!=0||y2!=0;
    }
    if(gp.buttons) {
      gamepadAnyButton = 0;
      gp.buttons.forEach((b,i) => {
        var p = pressed(b);
        if(p) {
          gamepadOn = true;
          gamepadAnyButton+=1;
          // console.log(gp);
          if(!gamepadButtons[i]) {
            gamepadAnyButtonDown = true;
            if(isListeningForNextGamepadButton) {
              listenForNextGamepadButtonCallback(i)
              isListeningForNextGamepadButton = false;
              return;
            }
          }
          
        }
        gamepadButtons[i] = p;
      });
    }
  }
}

function isGamepadActive(gamepad) {
  var activated = activeGamepadsMap[gamepad.id];
  return activated;
}

function activateGamepad(gamepad) {
  var activated = activeGamepadsMap[gamepad.id];
  if(activated) {
    console.log('already activated', gamepad);
    return;
  }
  activeGamepadsMap[gamepad.id] = {};
  activeGamepads.push(gamepad.id);
}

function createActiveGamepad() {
  return {};
}

function getActiveGamepad(gamepad) {
  var activated = activeGamepadsMap[gamepad.id];
  if(activated) return activated;
  var activeGamepad = createActiveGamepad();
  activeGamepadsMap[gamepad.id] = activeGamepad;
  activeGamepads.push(activeGamepad);
  return activeGamepad;
}

function rumbleGamepad(gamepad) {
  gamepad.vibrationActuator.playEffect("dual-rumble", {
    startDelay: 0,
    duration: 200,
    weakMagnitude: 1.0,
    strongMagnitude: 1.0,
  });
}


