class PauseScene extends AdditiveScene {
    constructor(prevsScene) {
        super(prevsScene)
        this.useTouchAsMouse = true;
        var h = 0.1;
        var fontSize = 0.07;
        var spacing = .05;
        var y = 0.3;
        var w  = 0.6;
        this.addSelectableButton(
            new ButtonUI("back",0.05,0.05,0.14,0.08,0.05,e=>{
                this.back();
            })
        )
        this.addSelectableButton(
            new ButtonUI("Resume",0.5,y,w,h,fontSize,e=>{
                this.back();
            }).center().setSelected()
        )
        y+= h+spacing;
        this.addSelectableButton(
            new ButtonUI("Options",0.5,y,w,h,fontSize,e=>{
                this.driver.setScene(new OptionsScene(this));
            }).center()
        )
        y+= h+spacing;
        this.addSelectableButton(
            new ButtonUI("Quit to Menu",0.5,y,w,h,fontSize,e=>{
                this.driver.setScene(new ConfirmationScene(this,
                    "Quit to Menu?",
                    [
                        {
                            name: "yes",
                            callback: b=>this.driver.setScene(new MenuScene())
                        },
                        {
                            name: "no",
                            callback: b=>b.scene.back()
                        },
                    ]
                ))
                // this.driver.setScene(new MenuScene());
            }).center()
        )
        
    }
    update() {
        super.update();
        if(getButtonDown(Buttons.pause)) {
            this.back();
        }
    }
}