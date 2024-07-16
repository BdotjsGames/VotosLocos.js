class LizardPerson extends Bot {
    constructor(x,y) {
        super(x,y);
        this.shootTime = 10;
        this.speed = 4;
        this.noticeDistance = 300;
        this.followY = true;
        this.followX = false;
        this.attackX = 500;
        this.attackY = 60;
        this.noticed = true;
        
    }
    initModel(w, h, color,color2) {
        this.model = new PlatformerModel(w, h, "#111","#000", this, null, {
            headOptions: [IMAGES.LizardPeopleHead],
            hairOptions: [],
            torsoOptions: [IMAGES.LizardPeopleTorso],
            armOptions: [IMAGES.LizardPeopleArm],
            legOptions:[6],
            glassesOptions: [],
            skinOptions: [],
            skirtOptions: [],
            canWheelchair: false,
        })
    }
}