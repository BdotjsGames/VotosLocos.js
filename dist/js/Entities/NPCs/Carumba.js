class Carumba extends HighFiver {
    constructor(x,y) {
        super(x,y);
        this.speed = 0;
        this.name = "Carumba";
        this.canHighFive = false;
        this.health = this.maxHealth = 100;
        
    }
    initModel(w, h, color,color2) {
        this.model = new PlatformerModel(w, h, "#3f3f74","#3f3f74", this, null, {
            headOptions: [IMAGES.CarumbaHead],
            hairOptions: [],
            torsoOptions: [IMAGES.CarumbaTorso],
            armOptions: [IMAGES.CarumbaArm],
            legOptions:[6],
            glassesOptions: [],
            widthOptions: [4],
            skinOptions: [],
            skirtOptions: [],
            canWheelchair: false,
        })

        this.model.face.drawable.image = null;
        this.model.mouth.hidden = true;
        this.model.face.hidden = true;
    }
}

