class MagaMarge extends Bot {
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
        this.model = new PlatformerModel(w, h, "#3f3f74","#3f3f74", this, null, {
            headOptions: [IMAGES.MagaMargeHead],
            hairOptions: [],
            torsoOptions: [IMAGES.MagaMargeTorso],
            armOptions: [IMAGES.MagaMargeArm],
            legOptions:[6],
            glassesOptions: [],
            skinOptions: [],
            skirtOptions: [],
            canWheelchair: false,
        })
    }
}