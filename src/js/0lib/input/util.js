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