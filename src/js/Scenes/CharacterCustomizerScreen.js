

class CharacterCustomizerScene extends Scene{
    constructor() {
        super();
        this.optionsGroup = this.addEntity(new Group(0,0));
        this.loadModel(new PlayerModel());
        this.addEntity(new ButtonUI("play", 0.5,0.8,0.5,0.2,0.1,() => {
            this.model.scaleBoth=1;
            this.driver.setScene(new GameSceneBasic(this.model))
        }).center())
        this.addEntity(new ButtonUI("⚙️", 0.1,0.1,0.1,0.1,0.05,() => {
            this.driver.setScene(new OptionsScene(this))
        }).center())
    }
    update() {
        super.update();
        this.model.update();
        if(getButtonDown(Buttons.pause)) {
            this.driver.setScene(new OptionsScene(this));
        }
    }
    draw() {
        super.draw();
        this.model.draw(CE.width/2,CE.height/2);
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
        model.customizableOptions.forEach((customizableOption,i) => {
            var x = 0.75;
            var y = 0.1+0.1*i;
            this.optionsGroup.addEntity(
                new DrawableText(customizableOption.name, x,y,0.4,0.1,size)
                .setTrueCoords(false)
                .center()
            )
            this.optionsGroup.addEntity(
                new ButtonUI('<', x-0.1,y,0.1,0.1,size, () => {
                    customizableOption.index -= 1
                    if(customizableOption.index<0) {
                        customizableOption.index = customizableOption.options.length-1;
                    }
                    customizableOption.onChange(customizableOption.options[customizableOption.index],customizableOption.index );
                }).center()
            )
            this.optionsGroup.addEntity(
                new ButtonUI('>', x+0.1,y,0.1,0.1,size, () => {
                    customizableOption.index += 1
                    if(customizableOption.index>=customizableOption.options.length) {
                        customizableOption.index = 0;
                    }
                    customizableOption.onChange(customizableOption.options[customizableOption.index],customizableOption.index);
                }).center()
            )
        })
    }
}