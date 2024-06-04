

class CharacterCustomizerScene extends Scene{
    constructor() {
        super();
        this.useTouchAsMouse = true;
        this.backButton = this.addSelectableButton(new ButtonUI("BACK", 0.15,0.1,0.25,0.1,0.05,() => {
            this.driver.setScene(new MenuScene(this))
        }).center())
        this.optionsGroup = this.addEntity(new Group(0,0));
        
        this.loadModel(new PlayerModel());
        var s = 0.05
        this.playButton = this.addSelectableButton(new ButtonUI("PLAY", 0.5,0.85,0.3,0.1,s,() => {
            this.model.scaleBoth=1;
            this.model.modelOptions = this.model.getModelOptions();
            this.driver.setScene(new GameSceneBasic(this.model))
        }).center())

        // this.addEntity(new ButtonUI("⚙️", 0.1,0.1,0.1,0.1,0.05,() => {
        //     this.driver.setScene(new OptionsScene(this))
        // }).center())
       
    }
    update() {
        super.update();
        
        this.model.update();
        if(getButtonDown(Buttons.pause)) {
            this.driver.setScene(new MenuScene(this));
        }
    }
    draw(canvas) {
        var x = CE.width*.3;
        canvas.save();
        canvas.translate(x,CE.height*.6+45);
        canvas.scale(2,1);
        canvas.fillStyle = shadow;
        canvas.fillRect(-30,-30,60,60);
        canvas.restore();
        // canvas.fillStyle = 'black';
        // canvas.fillRect(CE.width/4,CE.height*.6+45, CE.width/2,10);
        this.model.draw(canvas, x, CE.height*.6);
        super.draw(canvas);

    }
    loadModel(model) {
        // if(this.model&&this.model!=model) {
        //     this.model.shouldDelete = true;
        // }
        this.model = model;
        model.x = CE.width/2;
        model.y = CE.height/2;
        model.scaleBoth = 2
        this.optionsGroup.entities = []
        var size = 0.05;
        var plb;// = this.backButton;
        var prb;// = this.backButton;

        
        model.customizableOptions.forEach((customizableOption,i) => {
            var x = 0.75;
            var y = 0.1+0.1*i;
            var btn = this.addSelectableButton(new BackAndForther(
                customizableOption.name.toUpperCase(), x,y,0.3,0.08,value=>{
                    customizableOption.index = value;
                    customizableOption.onChange(customizableOption.options[customizableOption.index],customizableOption.index );
                },
                () => {
                    this.driver.setScene(new ModelOptionSelectorScene(this, this.model, customizableOption));
                }
            ).setBounds(0,customizableOption.options.length-1).setValue(customizableOption.index)
            );
            if(i==0)btn.setSelected();
            // this.optionsGroup.addEntity(
            //     new DrawableText(customizableOption.name, x,y,0.4,0.1,size)
            //     .setTrueCoords(false)
            //     .center()
            // )
            // var lb = this.optionsGroup.addEntity(
            //     new ButtonUI('<', x-0.1,y,0.1,0.1,size, () => {
            //         customizableOption.index -= 1
            //         if(customizableOption.index<0) {
            //             customizableOption.index = customizableOption.options.length-1;
            //         }
            //         customizableOption.onChange(customizableOption.options[customizableOption.index],customizableOption.index );
            //     }).center()
            // )
            // var rb = this.optionsGroup.addEntity(
            //     new ButtonUI('>', x+0.1,y,0.1,0.1,size, () => {
            //         customizableOption.index += 1
            //         if(customizableOption.index>=customizableOption.options.length) {
            //             customizableOption.index = 0;
            //         }
            //         customizableOption.onChange(customizableOption.options[customizableOption.index],customizableOption.index);
            //     }).center()
            // )
            // lb.linkButton(rb, DIRECTION.right);
            // rb.linkButton(lb, DIRECTION.left);
            // if(plb) {
            //     lb.linkButton(plb, DIRECTION.up);
            //     plb.linkButton(lb, DIRECTION.down);
            // }
            // lb.linkButton(this.backButton, DIRECTION.left);
            // if(prb) {
            //     rb.linkButton(prb, DIRECTION.up);
            //     prb.linkButton(rb, DIRECTION.down);
            // } else {
            //     rb.setSelected();
            // }
            // plb = lb;
            // prb = rb;
        })
        // plb.linkButton(this.playButton, DIRECTION.down);
        // prb.linkButton(this.playButton, DIRECTION.down);
        // this.playButton.linkButton(plb, DIRECTION.up);
    }
}