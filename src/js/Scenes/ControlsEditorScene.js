class ControlsEditorScene extends AdditiveScene {
    constructor(prevScene, button) {
        super(prevScene);
        this.button = button;
        this.useTouchAsMouse = true;
        var x = 0.4
        var y = 0.12;
        var spacing = 0.1;
        var w = 0.3;
        var fontSize = 0.04;
        var h = 0.07;
        var text = buttonConfigToString(button.buttons);

        this.addSelectableButton(
            new ButtonUI("back",0.05,0.05,0.25,0.07,0.05,e=>{
                this.driver.setScene(new ControlsScene(this.prevScene.prevScene));
                // this.driver.setScene(this.prevScene);
            }).setSelected()
        )

        this.addEntity(
            new DrawableText('edit' + button.name,x,y,w,h,fontSize)
                    .setTrueCoords(false)
        );
        y+=spacing;
        this.inputDisplay = this.addEntity(
            new DrawableText(text,x,y,1,h,fontSize)
                    .setTrueCoords(false)
        );
        y+=spacing;
        var options = [
            {
                name: 'clear', 
                callback: () => {}
            },{
                name: 'add Key', 
                callback: () => {
                    listenForNextKey(k=>{
                        if(this.button.buttons.keys.indexOf(k)!=-1)return;
                        if([37,38,39,40,65,87,81,90,68,83].indexOf(k)!=-1)return;
                        this.button.buttons.keys.push(k);
                        this.inputDisplay.text = buttonConfigToString(button.buttons);
                    })
                }
            }, {
                name: 'add Gamepad Button', 
                callback: () => {
                    listenForNextGamepadButton(b=>{
                        if(this.button.buttons.buttons.indexOf(b)!=-1)return;
                        this.button.buttons.buttons.push(b);
                        this.inputDisplay.text = buttonConfigToString(button.buttons);
                    })
                }
            // }, {
            //     name: 'add Mouse Button', 
            //     callback: () => {}
            }
        ]
        options.forEach(option => {
            this.addSelectableButton(
                new ButtonUI(option.name, x,y,w,h,fontSize, option.callback)
            )
            y+=spacing;
        })
    }
}