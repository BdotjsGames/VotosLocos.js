class Pocha extends HighFiver {
    constructor(x,y) {
        super(x,y);
        this.speed = 0;
        this.name = "Pocha";
        this.obj = this;
        this.dialogue = dialogueIndexedByScene["pocha"];
    }
    initModel(w, h, color,color2) {
        this.model = new PlatformerModel(w, h, "#222","#000", this, null, IMAGES.PochaOptions)
    }
}

