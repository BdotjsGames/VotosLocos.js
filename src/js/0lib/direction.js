var DIRECTION = {
    down: 0,
    left: 1,
    up: 2,
    right: 3,
    none: -1,
    opposite: d=> (d+2)%4
  }