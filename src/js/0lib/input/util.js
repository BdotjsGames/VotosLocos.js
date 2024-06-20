function linearMove(start,target,step) {
  var diff = target-start;
  if(Math.abs(diff)<step)return target;
  if(diff>0) return start + step;
  return start - step;
}

function clamp(value, min,max) {
  if(value<min)return min;
  if(value>max)return max;
  return value;
}

function randomFromList(list) {
  return list[Math.floor(Math.random()*list.length)]
}

function sqrDist(a,b) {
  var dx = a.x-b.x;
  var dy = a.y-b.y;
  return dx*dx+dy*dy;
}

function vector3Diff(a,b) {
  return {
    dx: a.x-b.x,
    dy: a.y-b.y,
    dz: a.z-b.z,
  }
}
function diffSqrd(dx,dy=0,dz=0) {
  return dx*dx+dy*dy+dz*dz;
}

function sqrDistCheck(a,b,r) {
  var dx = a.x-b.x;
  var dy = a.y-b.y;
  var sqrd = dx*dx+dy*dy
  if(dx*dx+dy*dy<=r*r) {
    return {
      sqrDistance: sqrd,
      dx,dy
    }
  }
}


function sqrDistCheckSqrd(a,b,r) {
  var dx = a.x-b.x;
  var dy = a.y-b.y;
  var sqrd = dx*dx+dy*dy
  if(dx*dx+dy*dy<=r) {
    return {
      sqrDistance: sqrd,
      dx,dy
    }
  }
}


function sqrDist3(a,b) {
  var dx = a.x-b.x;
  var dy = a.y-b.y;
  var dz = a.z-b.z;
  return dx*dx+dy*dy+dz*dz;
}

function boxCollideTL(a,b) {
  return a.x + a.w >= b.x && a.x<=b.x+b.w&&
    a.y + a.h >= b.y && a.y<=b.y+b.h
}

function boxCollideM(a,b) {
  return a.x + a.w/2 >= b.x-b.w/2 && a.x-a.w/2<=b.x+b.w/2 && 
    a.y + a.h/2 >= b.y-b.h/2 && a.y-a.h/2<=b.y+b.h/2
}


function boxCollideMB(a,b) {
  return a.x + a.w/2 >= b.x-b.w/2 && a.x-a.w/2<=b.x+b.w/2 && 
    a.y - a.h >= b.y-b.h && a.y<=b.y
}


function distABS(a,b,w,h) {
  var dx = a.x-b.x;
  var dy = a.y-b.y;
  return Math.abs(dx)<w && Math.abs(dy)<h ;
}

function distABSz(a,b,w,h,d) {
  var dx = a.x-b.x;
  var dy = a.y-b.y;
  var dz = a.z-b.z;
  return Math.abs(dx)<w && Math.abs(dy)<h &&Math.abs(dz)<d

}

function arrayRemoveItem(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return index;
}
//fast inver square root, doesnt actually work faster in js
// https://gist.github.com/starfys/aaaee80838d0e013c27d
// var buf = new ArrayBuffer(4),
//     f32=new Float32Array(buf),
//     u32=new Uint32Array(buf);
// function q2(x) {
//   var x2 = 0.5 * (f32[0] = x);
//   u32[0] = (0x5f3759df - (u32[0] >> 1));
//   var y = f32[0];
//   y  = y * ( 1.5 - ( x2 * y * y ) );   // 1st iteration
//   return y;
// }


/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, l ];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [ r * 255, g * 255, b * 255 ];
}

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
function rgbToHsv(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, v = max;

  var d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, v ];
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsvToRgb(h, s, v) {
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  // return [ r * 255, g * 255, b * 255 ];
  return {
    r:r*255,
    g:g*255,
    b:b*255,
  }
}