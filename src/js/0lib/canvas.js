//  Copyright Brian Dizon 2019

var CE = document.getElementById('gc');
var canvas = CE.getContext('2d');
var canvasPercent = "100%";

var canvasWrapper = document.getElementById('canvas-wrapper');
CE.style.width = "100%";

var SCREEN_CANVASES = [];


function createScreenCanvas() {
  var C = document.createElement('canvas');
  C.width = CE.width;
  C.height = CE.height;
  var ctx = C.getContext('2d');
  SCREEN_CANVASES.push(ctx);
  return {
    CE: C,
    canvas: ctx
  }
}


canvas.fillRectFloor = function(x,y,w,h){
  this.fillRect(Math.floor(x),Math.floor(y),Math.floor(w),Math.floor(h));
}

function onresize(e){
  var W = CE.width;
  var H = CE.height+43;
  var iW = window.innerWidth;
  var iH = window.innerHeight;
  var rw = iW/iH;
  var rc = W/H;
  if(rw >= rc) {
    canvasWrapper.style.height = iH+'px';
    canvasWrapper.style.width = Math.floor(iH * W/H)+'px';
  } else {
    canvasWrapper.style.width = iW + 'px';
    canvasWrapper.style.height = Math.floor(iW * H/W) + 'px';
  }
  
  canvas.imageSmoothingEnabled = false;
  canvas.mozImageSmoothingEnabled=false;
  canvas.msImageSmoothingEnabled = false;
  canvas.oImageSmoothingEnabled=false;
  canvas.webkitImageSmoothingEnabled=false;

  SCREEN_CANVASES.forEach(function(canvas) {
    canvas.imageSmoothingEnabled = false;
    canvas.mozImageSmoothingEnabled=false;
    canvas.msImageSmoothingEnabled = false;
    canvas.oImageSmoothingEnabled=false;
    canvas.webkitImageSmoothingEnabled=false;
  })
}

window.addEventListener('resize', onresize);
window.addEventListener('load', onresize);


// canvas.fillText(text, x,y, maxwidth)
canvas.fillTextPerLetter = function(text, centerX, centerY, maxWidth, callback, textVertSpacing=0.9) {
  let line = text.split('\n');
  // this.font = fontSize + 'px ' + 'TimesNewRoman';
  // this.textBaseline = 'middle';
  // this.textAlign = 'center';
  // to count each character 
  var charIndex = 0;
  // find the top ypos and then move down half a char space
  var fontSize = 20;
  var yPos = centerY - fontSize * line.length * 0.5 * textVertSpacing + fontSize * textVertSpacing / 2;
  canvas.save();
  var centered = this.textAlign == 'center';
  this.textAlign = 'center';
  for (var i = 0; i < line.length; i++) {
    // get the width of the whole line
    var width = this.measureText(line[i]).width;
    var scaling = maxWidth/width;
    // use the width to find start
    var textPosX = centerX;
    if(centered)textPosX -= width / 2;
    for (var j = 0; j < line[i].length; j++) {
      // get char
      var char = line[i][j];
      // get its width
      var cWidth = this.measureText(char).width;
      var textData = {char, x: textPosX+cWidth/2, y: yPos,lineIndex:j};
      if(callback)textData = callback(textData);
      // draw the char offset by half its width (center)
      this.fillTextOrigin(textData.char, textData.x,textData.y);
      // move too the next pos
      textPosX += cWidth;
      // count the char
      charIndex += 1
    }
    // move down one line
    yPos += fontSize * textVertSpacing;
  }
  canvas.restore();
}
// canvas.tagEffects = {
//   wiggle: data=>{data.y += Math.cos((frameCount + data.lineIndex)*Math.PI/30)*10}
// }
canvas.colorStack = [];
canvas.processTag = function(tag, i) {
  var args = tag.split(' ');
  switch(args[0]) {
    case '/':
      this.letterProcessor = null;
      break;
    case 'wiggle':
      this.letterProcessor = data=>{data.y += Math.cos((frameCount + data.lineIndex*3)*Math.PI/30)*(args[1]||10)}
      break;
    case 'color':
      this.colorStack.push(this.fillStyle);
      this.fillStyle = args[1];
      break;
    case '/color':
      this.fillStyle = this.colorStack.pop();
      break;
    case 'bam':
      var bamId = this.currentRichText;
      if(this.bamId!=bamId) {
        this.bamId = bamId;
        this.bamValue = frameCount;
      }
      this.letterProcessor = data=>{
        var t = (frameCount - this.bamValue)/15
        var bv = 1-t*t;
        bv = 1+Math.max(bv,0);
        data.scale = [bv,bv];

      }

  }
}
canvas.fillRichText = function(text, x,y,maxWidth, textVertSpacing=0) {
  this.currentRichText = text;
  let lines = text.split('\n');
  var charIndex = 0;
  var fontSize = 20; // TODO 
  var yPos = y - fontSize * lines.length * 0.5 * textVertSpacing + fontSize * textVertSpacing / 2;
  canvas.save();
  canvas.colorStack = [];
  var centered = this.textAlign == 'center';
  this.textAlign = 'center';
  this.letterProcessor = null;
  lines: for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    // get the width of the whole line
    var width = this.measureText(line).width;
    var scaling = maxWidth/width;
    // use the width to find start
    var textPosX = x;
    if(centered)textPosX -= width / 2;
    for (var j = 0; j < line.length; j++) {
      // get char
      var char = line[j];
      if(char == '<') {
        var tag = ''; var c;
        for (var k=j+1;k<line.length;k++) {
          c = line[k];
          if(c=='>') {
              j = k+1;
              this.processTag(tag, j);
              if(j>=line.length) continue lines
              char = line[j];
            break;
          }
          tag += c;
        }
      }
      // get its width
      var cWidth = this.measureText(char).width;
      var textData = {char, x: textPosX+cWidth/2, y: yPos,lineIndex:j};
      if(this.letterProcessor) {
        this.letterProcessor(textData);
        
      }
      if(textData.scale) {
        canvas.save();
        canvas.translate(textData.x,textData.y);
        canvas.scale(textData.scale[0],textData.scale[1])
        this.fillTextOrigin(textData.char, 0,0);
        canvas.restore();

      } else
      this.fillTextOrigin(textData.char, textData.x,textData.y);
      // move too the next pos
      textPosX += cWidth;
      // count the char
      charIndex += 1
    }
    // move down one line
    yPos += fontSize * textVertSpacing;
  }
  canvas.restore();
}
// canvas.fillTextWithSpacing = function(text, x, y, maxWidth,spacing=0)
// {
//     //Start at position (X, Y).
//     //Measure wAll, the width of the entire string using measureText()
//     wAll = this.measureText(text).width;

//     do
//     {
//     //Remove the first character from the string
//     char = text.substr(0, 1);
//     text = text.substr(1);

//     //Print the first character at position (X, Y) using fillText()
//     this.fillTextOrigin(char, x, y);

//     //Measure wShorter, the width of the resulting shorter string using measureText().
//     if (text == "")
//         wShorter = 0;
//     else
//         wShorter = this.measureText(text).width;

//     //Subtract the width of the shorter string from the width of the entire string, giving the kerned width of the character, wChar = wAll - wShorter
//     wChar = wAll - wShorter;

//     //Increment X by wChar + spacing
//     x += wChar + spacing;

//     //wAll = wShorter
//     wAll = wShorter;

//     //Repeat from step 3
//     } while (text != "");
// }
canvas.fillTextOrigin = canvas.fillText;
// canvas.fillText = function(...args) {
//   this.fillTextPerLetter(...args)
// }