class SliderOptionUI extends ButtonUI {
    constructor(text,x,y,w,h,onValueChanged) {
        super(text,x,y,w,h,h);
        this.minValue = 0;
        this.maxValue = 1;
        this.value = 0.5;
        this.sliderValue = 0.5;
        this.onValueChanged = onValueChanged;
        // this.knob = new CircleDrawable(0,0,h);//.setTrueCoords(false);
        this.knob = new KnobUI(0,h/2,h).setTrueCoords(true);
        this.savedValue = this.value;
    }
    setBounds(min,max) {
        this.minValue = min;
        this.maxValue = max;
        return this;
    }
    setValue(value) {
        this.value = value;
        this.sliderValue = (value-this.minValue) / (this.maxValue-this.minValue);
        return this;
    }
    updateSaved() {
      this.onValueChanged(this.value);
      this.savedValue = this.value;
    }
    setSliderValue(zeroToOne, updates=true) {
      zeroToOne = clamp(zeroToOne,0,1);
      this.sliderValue = zeroToOne;
      this.value = this.minValue + this.sliderValue * (this.maxValue-this.minValue);
      this.knob.x = this.sliderValue*this._w;
      if(updates || Math.abs(this.savedValue-this.value)>0.1) this.updateSaved();
    }
    update() {
        super.update();
        this.knob.update();
        this.knob.held = this.held;
        this.knob._w = this._h;
        this.knob.y = this._h/2;
        //this might be different depending on centering
        var p = this.pixelSpace();
        var left = p.x;
        var right = p.x+p.w;
        if(this.held) {
          this.needsUpdate = true;
            // this.knob.x = mouse.x-left;
            // console.log(this.knob.x);
            this.setSliderValue((mouse.x-left)/this._w, false);
            // this.sliderValue = clamp((mouse.x-left)/this._w, 0,1);
            // this.value = this.minValue + this.sliderValue * (this.maxValue-this.minValue);
            // this.knob.x = this.sliderValue*this._w;
            // this.value = (this.knob.x*p.W-left)/p.W;
            // this.onValueChanged(this.value);
        } else {
            this.knob.x =  p.w*this.sliderValue;
            if(this.needsUpdate) {
              this.updateSaved();
              this.needsUpdate = false;
            }
        }
        if(this.selected) {
          var {inputX} = getAxesDown();
          if(inputX) this.setSliderValue(this.sliderValue+inputX*.1);
        }
    }
    onHover() {
        this.knob.onHover();
        // this.morphs['hoverOff'].deactivate();
        // this.morphs['hoverOn'].activate();
        // if(this.hoverSound)this.hoverSound.play();
      }
      offHover() {
        this.knob.offHover();
        // this.morphs['heldOn'].deactivate();      
        // this.morphs['hoverOn'].deactivate();      
        // this.morphs['hoverOff'].activate();
      }
      onHeld() {
        this.knob.onHeld();
        // this.morphs['heldOff'].deactivate();      
        // this.morphs['heldOn'].activate();
        // this.pressSound.play();
      }
      offHeld() {
        this.knob.offHeld();
        // this.morphs['heldOn'].deactivate();      
        // this.morphs['heldOff'].activate();
      }
      click() {
        this.selectSound.play();
        if(this.callback)
        this.callback(this);
        this.knob.morphs['click'].activate();
        // this.morphs['click'].activate();
      }
    drawShape(canvas) {
        // canvas.strokeStyle = Color.darken(this, .8).color;
        // canvas.lineWidth = 10;
        // canvas.strokeRect(0,0,this._w,this._h);
        var w = this._w;
        var h = this._h;
        // canvas.fillStyle=Color.darken(this).color;
        // canvas.fillRect(0,0,w,h);
        canvas.fillStyle=this._color;
        var ps = this.pixelSpace();
        canvas.font = this.fontSize*ps.W +'px ' + this.fontFamily;
        canvas.textAlign = 'center';
        canvas.textBaseline='middle';
        canvas.fillText(this.text,w/2, -h/2,w);

        canvas.fillStyle = Color.darken(this, .8).color;
        canvas.fillRect(0,0,this._w,this._h);
        canvas.fillStyle = this._color;
        canvas.fillRect(0,0,this._w*this.sliderValue,this._h);
        this.knob.draw(canvas);
        // canvas.fillStyle = Color.darken(this).color;
        // canvas.fillRect(0,0,this._w/4,this._h);
        // canvas.fillStyle = Color.lighten(this).color;    
        // canvas.fillRect(this._w*.4,this._h/10,this._w/2,this._h/4);   
      }
      
}