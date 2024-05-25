//  Copyright Brian Dizon 2019

var keys = [];
var anyKey = 0;
var anyKeyDown = 0;
function resetKeys() {
  for(var i=0;i<255;++i)keys[i]=0;
  anyKey = 0;
}
var keyLogging = false;

function onkeydown(e) {
  var k = e.keyCode;
  if(keyLogging)console.log(e);
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