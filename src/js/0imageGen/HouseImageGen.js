function drawPixel(canvas,x,y) {
    canvas.fillRect(x,y,1,1);
}

function pixelDiagonalLine(canvas,x1,y1,x2,y2) {
    var x = x1;
    var y = y1;
    var dx = x2-x1;
    var dy = y2-y1;
    var r = Math.sqrt(dx*dx+dy*dy);
    var fx = Math.floor(x);
    var fy = Math.floor(y);
    var maxIter = 100;
    for(var i =0;i<maxIter;i++) {
        if(fx==x2&&fy==y2)break;
        drawPixel(canvas, fx,fy);
        x += dx/r;
        y += dy/r;
        var fx = Math.floor(x);
        var fy = Math.floor(y);
    }
}

function isometricCubeDraw(canvas,x,y,z, fillColor,strokeColor) {
    canvas.fillStyle = fillColor;
    canvas.beginPath();
    canvas.moveTo(0,0);
    canvas.lineTo(x,0);
    canvas.lineTo(x+z,z);
    canvas.lineTo(x+z,y+z);
    canvas.lineTo(0+z,y+z);
    canvas.lineTo(0,y);
    canvas.lineTo(0,0);
    canvas.fill();

    canvas.fillStyle = strokeColor;
    canvas.strokeStyle = strokeColor;
    canvas.lineWidth = 1;
    canvas.fillRect(0,0,x,1);
    canvas.fillRect(0,0,1,y);
    pixelDiagonalLine(canvas,x,0,x+z,0+z);
    pixelDiagonalLine(canvas,0,y,0+z,y+z);
    pixelDiagonalLine(canvas,0,0,0+z,0+z);
    canvas.strokeRect(z-0.5,z-0.5,x,y);
}


function isometricCubeDraw2(canvas,x1,y1,z1,x,y,z, fillColor,strokeColor) {
    canvas.save();
    canvas.translate(x1,y1,z1);
    canvas.fillStyle = fillColor;
    canvas.beginPath();
    canvas.moveTo(0,0);
    canvas.lineTo(x,0);
    canvas.lineTo(x+z,z);
    canvas.lineTo(x+z,y+z);
    canvas.lineTo(0+z,y+z);
    canvas.lineTo(0,y);
    canvas.lineTo(0,0);
    canvas.fill();

    canvas.fillStyle = strokeColor;
    canvas.strokeStyle = strokeColor;
    canvas.lineWidth = 1;
    canvas.fillRect(0,0,x,1);
    canvas.fillRect(0,0,1,y);
    pixelDiagonalLine(canvas,x,0,x+z,0+z);
    pixelDiagonalLine(canvas,0,y,0+z,y+z);
    pixelDiagonalLine(canvas,0,0,0+z,0+z);
    canvas.strokeRect(z-0.5,z-0.5,x,y);
    canvas.restore();
}



function createHouse() {
    // 18 by 21
    var canvasElement = document.createElement('canvas');
    var canvas = canvasElement.getContext('2d');

    var x = 200;
    var y = 100;
    var z = 40;

    canvasElement.width = x+z+1;
    canvasElement.height = y+z+1;


    var doorW = 35
    var doorH = 60
    var doorD = 4;

    var sideX = 40;
    var sideY = 30
    var sideZ = 5;

    canvas.save();
    canvas.translate(sideX,0)
    isometricCubeDraw(canvas, x-sideX,y,z-doorD, 'white', 'black');
    canvas.translate(-sideX,sideY+sideZ)
    isometricCubeDraw(canvas, sideX,y-sideY,z-doorD-sideZ*2, 'white', 'black');
    canvas.restore();
    canvas.save();
    canvas.translate(z-doorD+sideX,z-doorD+y-3)
    isometricCubeDraw(canvas, x-sideX,3,doorD, 'white', 'black');
    canvas.restore();
    canvas.translate(z-doorD+Math.floor(x/2-doorW/2),z-doorD+y-doorH)
    isometricCubeDraw(canvas, doorW,doorH-3,doorD, 'white', 'black');

    return canvasElement
}

function createBox(sx,sy,sz) {
    // 18 by 21
    var canvasElement = document.createElement('canvas');
    var canvas = canvasElement.getContext('2d');

    var x = sx;
    var y = sy;
    var z = sz;

    canvasElement.width = x+z+1;
    canvasElement.height = y+z+1;

    canvas.strokeStyle='black';
    isometricCubeDraw(canvas, x,y,z, 'white', 'black');

    return canvasElement
}