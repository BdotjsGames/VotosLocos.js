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
      this.drawBallotMark = true;
      this.ballotMarkFilled = false;

      if(w>.1) {
        this.textAlign = 'left';
        this.textPosition = 40;
      }
      this.children = [];
    }
    addChild(child) {
      child.parent = this;
      this.children.push(child);
    }
    linkButton(btn, dir) {
      var prev = this.directionallyLinkedButtons[dir]
      if(prev) {
        // prev.
      }
      this.directionallyLinkedButtons[dir] = btn;
    }
    tryMove(direction) {
      UsingMouselessSelection = true;
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
      this.selected = true;
      this.justSelected = true;
      if(UsingMouselessSelection) {
        this.onHover();
      }
      if(this.scene) {
        this.scene.setSelected(this);
      }
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
    mouseUpdate() {
      if(this.contains(mouse.x,mouse.y)) {
        if(!this.hover) {
          this.hover = true;        
          this.onHover();
          if(this.shouldSetSelectOnHover) {
            UsingMouselessSelection = false;
            this.setSelected();
          }
        }
      } else if(this.hover){
        this.hover = false;
        this.offHover();
      }
      if(mouse.down && this.hover) {
        this.held = true;
        this.onHeld();
        this.click();
        if(this.shouldSetSelectOnClick) {
          UsingMouselessSelection = false;
          this.setSelected();
        }
      }
      if(mouse.up&&this.held) {
        // if(this.held&&this.hover)this.click();
        this.held = false;
        this.offHeld();
      }
    }
    selectedUpdate() {
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
    }
    update() {
      super.update();
      this.mouseUpdate();
      this.selectedUpdate();
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
    drawShape(canvas) {
      // canvas.globalAlpha = this.alpha;
      if(this.backColor) {
        canvas.fillStyle = this.backColor;
        canvas.fillRect(0,0,this._w, this._h);
      }
      if(this.selected) {
        canvas.fillStyle = "#999a";
        canvas.fillRect(0,0,this._w, this._h);
      }
      if((this.hover) && this.outlineOnHover) {
        canvas.strokeStyle = 'white';
        // canvas.lineWidth = .001;      
        canvas.strokeRect(0,0,this._w,this._h);
      }
      canvas.fillstyle = this._color;
      super.drawShape(canvas);
      this.children.forEach(child => child.draw(canvas))
      if(this.drawBallotMark){
        if(this.hover)
          canvas.strokeStyle = '#f55';
        else
          canvas.strokeStyle = "#000";
        drawBallotMark(20, this._h*.5);
        if(this.ballotMarkFilled || this.held) {
          canvas.fillStyle = canvas.strokeStyle;
          canvas.fill();
        }
      }

      // drawBallotMark(this._w*.9, this._h*.5);
      // if(this.alpha>0)this.alpha -= 0.1;
    }
  }
  
  function drawBallotMark(x,y) {
    canvas.lineWidth = 3;
    canvas.beginPath();
    canvas.ellipse(x,y,7,12, Math.PI/2,0,Math.PI*2)
    canvas.stroke();
  }