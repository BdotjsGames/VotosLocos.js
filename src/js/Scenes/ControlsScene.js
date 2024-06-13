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
        ]
        buttons.forEach(button => {
            this.addSelectableButton(
                new ButtonUI(button.name,x-.3,y,w,h,fontSize,b=>{
                    this.driver.setScene(new ControlsEditorScene(this, button))
                })
            )
            var text = buttonConfigToString(button.buttons);
            this.addEntity(
                new DrawableText(text,0.4,y,0.6,h,fontSize)
                .setTrueCoords(false)
                .setAttr('textAlign', 'left')
            )
            y+=spacing
        })
    }
}