class DialogueOptionScene extends AdditiveScene {
    constructor(prevScene, options, dialogueController) {
        super(prevScene);

        var y = 0.35;
        this.useTouchAsMouse = true;
        this.drawsPanel = false;
        // this.addEntity(new DrawableText(title, 0.5,y, 1,0.5,0.1))
        //     .setTrueCoords(false)
        //     .center()
        //     .color(255,255,255)
        y+=.15;
        var buttonsPerRow = 1;
        var bw = 0.2;
        this.options = options;
        this.options.forEach((option,i) => {
            var buttonsPerThisRow = buttonsPerRow;
            if(Math.floor(i/buttonsPerRow)==Math.floor(this.options.length/buttonsPerRow)){
                buttonsPerThisRow = this.options.length % buttonsPerRow;
            }
            var x = 0.05
            var yy = y + (i-this.options.length+1) * .12;
            var btn = this.addSelectableButton(new ButtonUI(
                option.text, x, yy, 0.2,0.1,0.07,b=>{
                    dialogueController.selectOption(i,b);
                    // this.back();
                    this.driver.setScene(this.prevScene,0);
                }
            ))
            btn.backColor = "#0009";
            btn.optionIndex = i;
            if(!i)btn.setSelected();

        })
    }
    // draw(canvas){
    //     canvas.fillStyle = "#000a";
    //     canvas.fillRect(CE.width*0.18, CE.height*(.48-.15*this.options.length), CE.width/2, .15*CE.height*this.options.length)
    //     super.draw(canvas);
    // }
}