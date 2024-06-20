class ControlsScene extends AdditiveScene {
    constructor(prevScene) {
        super(prevScene);
        this.useTouchAsMouse = true;
        var x = 0.4
        var y = 0.2;
        var spacing = 0.1;
        var w = 0.3;
        var fontSize = 0.04;
        var h = 0.07;
        this.addSelectableButton(
            new ButtonUI("back",0.05,0.05,0.25,0.07,0.05,e=>{
                this.driver.setScene(this.prevScene);
            }).setSelected()
        )
       
        var buttons = [
            {name: 'Jump', buttons: Buttons.A},
            {name: 'Attack', buttons: Buttons.B},
            {name: 'Crouch', buttons: Buttons.X},
            {name: 'Interact', buttons: Buttons.Y},
            {name: '[UI] Confirm', buttons: Buttons.Confirm},
        ]
        buttons.forEach(button => {
            
            var text = buttonConfigToString(button.buttons);
            text.split(',').forEach((t,i)=>{
                this.addEntity(
                    new DrawableText(t,0.4+.15*i,y,0.15,h,fontSize)
                    .setTrueCoords(false)
                    .setAttr('textAlign', 'left')
                )
            })
            this.addSelectableButton(
                new ButtonUI(button.name,x-.3,y,w,h,fontSize,b=>{
                    this.driver.setScene(new ControlsEditorScene(this, button))
                })
            )
            y+=spacing
            // this.addEntity(
            //     new DrawableText(text,0.4,y,0.6,h,fontSize)
            //     .setTrueCoords(false)
            //     .setAttr('textAlign', 'left')
            // )
            // y+=spacing
        })
        this.addSelectableButton(
            new ButtonUI('save',x-.3,y,w,h,fontSize,b=>{
                saveControls();
            })
        )
        y+=spacing
    }
    
}

function saveControls() {
    var buttons = [
        Buttons.A,
        Buttons.B,
        Buttons.X,
        Buttons.Y,
        Buttons.Confirm,
    ]
    localStorage.setItem("controls1", JSON.stringify(buttons));
    localStorage.setItem("specialCharacterDisplays", JSON.stringify(specialCharacterDisplays));
    loadControls();
}

function setButton(a,b) {
    a.keys= b.keys;
    a.buttons = b.buttons;
}

function loadControls() {
    var buttons = JSON.parse(localStorage.getItem('controls1'));
    specialCharacterDisplays = JSON.parse(localStorage.getItem('specialCharacterDisplays'))
    var i =0;
    setButton(Buttons.A, buttons[i++]);
    setButton(Buttons.B, buttons[i++]);
    setButton(Buttons.X, buttons[i++]);
    setButton(Buttons.Y, buttons[i++]);
    setButton(Buttons.Confirm, buttons[i++]);
}
