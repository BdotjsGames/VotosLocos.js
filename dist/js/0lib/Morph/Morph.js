class Morph {
    constructor(obj, start, end, time, type, callback) {
      this.obj = obj;
      this.start = start;
      this.end = end;
      this.time = time;
      this.timer = 0;
      this.active = false;
      this._start = {};
      this.morphType = type || MorphType.easeInOutCubic;
      this.update = this.inactiveUpdate;
      this.loops = false;
      this.callback = callback;
      this.deletes = false;    
    }
    activate() {
      this.active = true;
      this.setStartAttributes();
      this.update = this.activeUpdate;
      this.timer=0;
    }
    deactivate() {
      if(this.deletes) this.shouldDelete = true;
      if(this.loops) return this.activate();
      this.active = false;
      this.update = this.inactiveUpdate;
      if(this.callback)
      this.callback(this);
    }
    inactiveUpdate () {}
    activeUpdate() {
      this.timer += 1;    
      if(this.timer>this.time) return this.deactivate();
      this.morphAttributes();
    }
    setStartAttributes() {
      for(var i in this.end) {
        var s = this.start[i];
        if(s==undefined) s = this.obj[i];
        this._start[i] = s;
      }
    }
    morphAttributes() {
      var t = this.morphType(this.timer/this.time);
      for(var i in this.end) {
        var e = this.end[i];
        var s = this._start[i];
        this.obj[i] = s + (e-s)*t;      
      }
    }
  }
  
  class MorphGroup extends Morph {
    constructor(obj, frames) {
      super(obj, {}, {}, 0, 0);
      this.obj = obj;
      this.frames = frames;
      this.timer = 0;
      this.frameIndex = 0;
      this.update = this.inactiveUpdate;
    }
    activate() {
      this.frameIndex = 0;
      this.startFrame();
      super.activate();
    }
    startFrame() {
      this.frame = this.frames[this.frameIndex];
      if(this.frame[2]) this.morphType = this.frame[2];
      else this.morphType = MorphType.easeInOutCubic;
      this.timer = 0;
      this.time = this.frame[1];
      this.end = this.frame[0];    
      this.setStartAttributes();
    }
    activeUpdate() {
      this.timer += 1;    
      if(this.timer>this.time) {
        this.frameIndex += 1;
        if(this.frame[3])this.frame[3](this.obj);
        if(this.frameIndex >= this.frames.length) return this.deactivate();
        this.startFrame();
      }
      this.morphAttributes();
    }
  }