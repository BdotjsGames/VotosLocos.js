class BackAndForther extends ButtonUI {
    constructor(text, x, y, w, h, onValueChanged, onTextClicked) {
        super(text, x, y, w, h, h*.6, onTextClicked);
        // this.callback = this.increment.bind(this);
        this.center();
        x = this.x;
        y=this.y;
        this.minValue = 0;
        this.maxValue = 1;
        this.value = 0;
        this.onValueChanged = onValueChanged;
        this.wraps = true;
        this.drawBallotMark = false;
        this.textPosition = 10
        // this.knob = new CircleDrawable(0,0,h);//.setTrueCoords(false);
        // this.knob = new KnobUI(0,h/2,h).setTrueCoords(true);
        // x - 0.1, y, 0.1, 0.1
        var bw = 0.05;
        var size = 0.05;
        this.trueCoords=false;
        this.leftButton  = new ButtonUI("<", x-bw, y+h/2, bw, h, size, this.decrement.bind(this)).center()
        this.rightButton = new ButtonUI(">", x+w+bw, y+h/2, bw, h, size, this.increment.bind(this)).center();
        this.leftButton.drawBallotMark = false;
        this.rightButton.drawBallotMark = false;
        this.leftButton.textPosition = 15;
        this.rightButton.textPosition = 15;
        // this.leftButton.setSelected = this.setSelected.bind(this);
        // this.rightButton.setSelected = this.setSelected.bind(this);
        // this.leftButton.shouldSetSelectOnHover = true;
        // this.leftButton.shouldSetSelectOnClick = true;
        // this.rightButton.shouldSetSelectOnHover = true;
        // this.rightButton.shouldSetSelectOnClick = true;
        // this.leftButton.outlineOnHover = false;
        // this.rightButton.outlineOnHover = false;
        // this.leftButton.onHover = this.onHover.bind(this);
        // this.rightButton.onHover = this.onHover.bind(this);
        // this.leftButton.offHover = this.offHover.bind(this);
        // this.rightButton.offHover = this.offHover.bind(this);
        // this.center();
    }

    setValue(value) {
        this.value = value;
        return this;
    }
    setBounds(min,max) {
        this.minValue = min;
        this.maxValue = max;
        return this;
    }
    increment() {
        this.value += 1;
        if(this.value>this.maxValue) {
            if(this.wraps)this.value=this.minValue;
            else this.value = this.maxValue;
        }
        this.onValueChanged(this.value);
    }
    decrement() {
        this.value -= 1;
        if(this.value<this.minValue) {
            if(this.wraps)this.value = this.maxValue;
            else this.value = this.minValue;
        }
        this.onValueChanged(this.value);
    }
    // mouseUpdate(){}
    update() {
        // super.super.update();
        super.update();
        if (this.selected && !this.justSelected) {
            //asdfjkl;
            var { inputX, inputY } = getAxesDown();
            if (inputX > 0) this.rightButton.click();
            else if (inputX < 0) this.leftButton.click();
            // else if (inputY > 0) this.tryMove(DIRECTION.down);
            // else if (inputY < 0) this.tryMove(DIRECTION.up);
            else if (getButtonDown(Buttons.Confirm)) {
                this.increment();
                // this.click();
            }
        }
        this.leftButton.update();
        this.rightButton.update();
    }
    // onHover() {
    //     // this.knob.onHover();
    //     // this.morphs['hoverOff'].deactivate();
    //     // this.morphs['hoverOn'].activate();
    //     // if(this.hoverSound)this.hoverSound.play();
    // }
    // offHover() {
    //     // this.knob.offHover();
    //     // this.morphs['heldOn'].deactivate();      
    //     // this.morphs['hoverOn'].deactivate();      
    //     // this.morphs['hoverOff'].activate();
    // }
    // onHeld() {
    //     // this.knob.onHeld();
    //     // this.morphs['heldOff'].deactivate();      
    //     // this.morphs['heldOn'].activate();
    //     // this.pressSound.play();
    // }
    // offHeld() {
    //     // this.knob.offHeld();
    //     // this.morphs['heldOn'].deactivate();      
    //     // this.morphs['heldOff'].activate();
    // }
    // click() {
    //     // this.selectSound.play();
    //     // if(this.callback)
    //     // this.callback(this);
    //     // this.knob.morphs['click'].activate();
    //     // // this.morphs['click'].activate();
    // }
    draw(canvas) {
        super.draw(canvas);
        this.leftButton.draw(canvas);
        this.rightButton.draw(canvas);
    }

}