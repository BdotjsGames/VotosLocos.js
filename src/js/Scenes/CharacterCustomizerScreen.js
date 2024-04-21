

class CharacterCustomizerScene extends Scene{
    constructor() {
        super();
        this.backButton = this.addEntity(new ButtonUI("back", 0.1,0.1,0.1,0.1,0.05,() => {
            this.driver.setScene(new MenuScene(this))
        }).center())
        this.optionsGroup = this.addEntity(new Group(0,0));
        this.playButton = this.addEntity(new ButtonUI("play", 0.5,0.8,0.5,0.2,0.1,() => {
            this.model.scaleBoth=1;
            this.driver.setScene(new GameSceneBasic(this.model))
        }).center())
        this.loadModel(new PlayerModel());

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
    draw() {
        super.draw();
        this.model.draw(CE.width/2,CE.height*.6);
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
            this.optionsGroup.addEntity(
                new DrawableText(customizableOption.name, x,y,0.4,0.1,size)
                .setTrueCoords(false)
                .center()
            )
            var lb = this.optionsGroup.addEntity(
                new ButtonUI('<', x-0.1,y,0.1,0.1,size, () => {
                    customizableOption.index -= 1
                    if(customizableOption.index<0) {
                        customizableOption.index = customizableOption.options.length-1;
                    }
                    customizableOption.onChange(customizableOption.options[customizableOption.index],customizableOption.index );
                }).center()
            )
            var rb = this.optionsGroup.addEntity(
                new ButtonUI('>', x+0.1,y,0.1,0.1,size, () => {
                    customizableOption.index += 1
                    if(customizableOption.index>=customizableOption.options.length) {
                        customizableOption.index = 0;
                    }
                    customizableOption.onChange(customizableOption.options[customizableOption.index],customizableOption.index);
                }).center()
            )
            lb.linkButton(rb, DIRECTION.right);
            rb.linkButton(lb, DIRECTION.left);
            if(plb) {
                lb.linkButton(plb, DIRECTION.up);
                plb.linkButton(lb, DIRECTION.down);
            }
            lb.linkButton(this.backButton, DIRECTION.left);
            if(prb) {
                rb.linkButton(prb, DIRECTION.up);
                prb.linkButton(rb, DIRECTION.down);
            } else {
                rb.setSelected();
            }
            plb = lb;
            prb = rb;
        })
        plb.linkButton(this.playButton, DIRECTION.down);
        prb.linkButton(this.playButton, DIRECTION.down);
        this.playButton.linkButton(plb, DIRECTION.up);
    }
}