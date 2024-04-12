class ConfirmationScene extends AdditiveScene {
    constructor(prevScene, title, options) {
        super(prevScene);
        var y = 0.35;
        this.addEntity(new DrawableText(title, 0.5,y, 0.5,0.5,0.1))
            .setTrueCoords(false)
            .center()
            .color(255,255,255)
        y+=.15;
        var buttonsPerRow = 2;
        var bw = 0.2;
        this.options = options;
        this.options.forEach((option,i) => {
            var buttonsPerThisRow = buttonsPerRow;
            if(Math.floor(i/buttonsPerRow)==Math.floor(this.options.length/buttonsPerRow)){
                buttonsPerThisRow = this.options.length % buttonsPerRow;
            }
            var x = 0.5-buttonsPerThisRow*bw/2 + bw*i%buttonsPerRow;
            this.addEntity(new ButtonUI(
                option.name, x, y, 0.2,0.1,0.07,option.callback
            ))
        })
    }
}