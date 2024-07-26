//  Copyright Brian Dizon 2019

var keys = [];
var anyKey = 0;
var anyKeyDown = 0;
function resetKeys() {
  for(var i=0;i<255;++i)keys[i]=0;
  anyKey = 0;
}
var keyLogging = false;

listeningForNextKey = false;
listeningCallback = null;
function listenForNextKey(callback) {
  listeningCallback = callback;
  listeningForNextKey = true;
}

function onkeydown(e) {

  var k = e.keyCode;
  switch(k) {
    case 'W'.keyCode:
    case 'A'.keyCode:
    case 'S'.keyCode:
    case 'D'.keyCode:
      setControlsScheme(CONTROL_SCHEMES.WASD)
      break;
    case 37:
    case 38:
    case 39:
    case 40:
      setControlsScheme(CONTROL_SCHEMES.ARROW)
      break;
  }
  
  if(keyLogging)console.log(e);
  if(listeningForNextKey) {
    specialCharacterDisplays[e.keyCode] = e.code.replace('Key', '');
    listeningCallback(k);
    listeningForNextKey = false;
    return;
  }
  // e.code
  //e.code is a readable name of the key for special characters like space, shift, enter
  // and it displays keys as KeyJ etc
  // could be usefull for input customization displays
  if(!e.metaKey&&!e.ctrlKey) {
    if(!keys[k]) {
      anyKey += 1;
      anyKeyDown = true;
    }
    keys[k]=true;
    e.preventDefault();
  }
}

function onkeyup(e) {
  anyKey -= 1;
  var k = e.keyCode;
  keys[k]=false;
}


window.addEventListener('keydown', onkeydown);
window.addEventListener('keyup', onkeyup);
window.addEventListener('load', resetKeys);
window.addEventListener('blur', resetKeys);
window.addEventListener('focus', resetKeys);
window.addEventListener('contextmenu', resetKeys);