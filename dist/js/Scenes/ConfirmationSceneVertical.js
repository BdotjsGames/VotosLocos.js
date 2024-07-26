class ConfirmationSceneVertical extends AdditiveScene {
    constructor(prevScene, title, options) {
        super(prevScene);
        var y = 0.15;
        this.useTouchAsMouse = true;
        this.addEntity(this.titleText = new DrawableText(title, 0.5,y, 1,0.5,0.1))
            .setTrueCoords(false)
            .center()
            .color(255,255,255)
        this.titleText.textAlign = 'left';
        y+=.15;
        var buttonsPerRow = 2;
        var bw = 0.85;
        var x = 0.5;
        this.options = options;
        this.options.forEach((option,i) => {
            var buttonsPerThisRow = buttonsPerRow;
            if(Math.floor(i/buttonsPerRow)==Math.floor(this.options.length/buttonsPerRow)){
                buttonsPerThisRow = this.options.length % buttonsPerRow;
            }
            var btn = this.addSelectableButton(new ButtonUI(
                option.name, x, y, bw,0.1,0.07,option.callback
            ), DIRECTION.down).center()
            if(!i)btn.setSelected();
            y+= .15;
        })
    }
}