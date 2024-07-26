class Victor extends HighFiver {
    constructor(x,y) {
        super(x,y);
        this.speed = 0;
        this.name = "Victor";
        this.dialogue = dialogueIndexedByScene["victor"];
    }
    initModel(w, h, color,color2) {
        this.model = new PlatformerModel(w, h, "#222","#000", this, null, IMAGES.VictorOptions)
        this.model.mouth.hidden = true;
    }
}

