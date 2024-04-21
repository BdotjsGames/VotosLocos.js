class ButtonUI extends DrawableText{
    constructor(text, x,y,w,h,size, callback, callback2) {
      super(text, x,y,w,h,size);
      this.trueCoords=false;
      this.addMorph('hoverOn', new Morph(null, {}, {scaleW: 1.2, scaleH:1.2}, 5, MorphType.easeOutQuad));
      this.addMorph('hoverOff', new Morph(null, {}, {scaleW: 1, scaleH: 1}, 5));
      this.addMorph('heldOn', new Morph(null, {}, {alpha: 0.5, scaleW: 1.1, scaleH: 1.1}, 10));    
      this.addMorph('heldOff', new Morph(null, {}, {alpha: 1}, 10)); 
      this.addMorph('click', new MorphGroup(null, [
        [{alpha: 0.5, scaleW: 1.1, scaleH: 1.1}, 1],
        [{scaleW: 1.23, scaleH:1.23, alpha: 1, dy: -.01}, 10],
        [{scaleW: 1.2, scaleH:1.2, alpha: 1, dy: 0}, 5, null, this.onClick.bind(this)],
      ]));
      this.red = 250;
      this.green = 250;
      this.blue = 250;
      this.callback = callback;
      this.callback2 = callback2;
      this.hoverSound = SOUNDS.hover;
      this.pressSound = SOUNDS.press;
      this.selectSound = SOUNDS.select;
      this.alpha = 1;
      this.outlineOnHover = true;
      this.selected = false;
      this.directionallyLinkedButtons = [];
    }
    linkButton(btn, dir) {
      var prev = this.directionallyLinkedButtons[dir]
      if(prev) {
        // prev.
      }
      this.directionallyLinkedButtons[dir] = btn;
    }
    tryMove(direction) {
      var next = this.directionallyLinkedButtons[direction];
      if(next) {
        this.deselect();
        next.linkButton(this, DIRECTION.opposite(direction))
        next.setSelected();
      } else {
        //TODO play error sound effect
      }
    }
    setSelected() {
      this.onHover();
      this.selected = true;
      this.justSelected = true;
      return this;
    }
    deselect() {
      this.selected = false;
      this.offHover();
    }
    onClick() {
      if(!this.hover)this.offHover();
      if(this.callback2)this.callback2(this);
    }
    update() {
      super.update();
      if(this.contains(mouse.x,mouse.y)) {
        if(!this.hover) {
          this.hover = true;        
          this.onHover();
        }
      } else if(this.hover){
        this.hover = false;
        this.offHover();
      }
      if(mouse.down && this.hover) {
        this.held = true;
        this.onHeld();
        this.click();
      }
      if(mouse.up&&this.held) {
        // if(this.held&&this.hover)this.click();
        this.held = false;
        this.offHeld();
      }
      if(this.selected&&!this.justSelected) {
        //asdfjkl;
        var {inputX, inputY} = getAxesDown();
        if(inputX>0)this.tryMove(DIRECTION.right);
        else if(inputX<0)this.tryMove(DIRECTION.left);
        else if(inputY>0)this.tryMove(DIRECTION.down);
        else if(inputY<0)this.tryMove(DIRECTION.up);
        else if(getButtonDown(Buttons.Confirm)) {
          this.click();
        }
      }
      this.justSelected = false;
      this.alpha = 1;
    }
    onHover() {
      this.morphs['hoverOff'].deactivate();
      this.morphs['hoverOn'].activate();
      if(!this.held)
        if(this.hoverSound)this.hoverSound.play();
    }
    offHover() {
      this.morphs['heldOn'].deactivate();      
      this.morphs['hoverOn'].deactivate();      
      this.morphs['hoverOff'].activate();
    }
    onHeld() {
      this.morphs['heldOff'].deactivate();      
      this.morphs['heldOn'].activate();
      this.pressSound.play();
    }
    offHeld() {
      this.morphs['heldOn'].deactivate();      
      this.morphs['heldOff'].activate();
    }
    click() {
      this.selectSound.play();
      if(this.callback)
      this.callback(this);
      this.morphs['click'].activate();
    }
    drawShape() {
      // canvas.globalAlpha = this.alpha;
      if((this.hover||this.selected) && this.outlineOnHover) {
        canvas.strokeStyle = 'white';
        // canvas.lineWidth = .001;      
        canvas.strokeRect(0,0,this._w,this._h);
      }
      super.drawShape();
      // if(this.alpha>0)this.alpha -= 0.1;
    }
  }
  