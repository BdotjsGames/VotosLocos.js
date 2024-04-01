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