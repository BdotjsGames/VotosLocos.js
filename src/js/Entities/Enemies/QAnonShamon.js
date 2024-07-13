class QAnonShamon extends Bot {
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
        this.model.attackCombo = [enemyThrowAnim,enemyThrowAnim,enemyThrowAnim, anims.groundSlam];
        this.item.type = ITEMS.beerBottle;
    }
    initModel(w, h, color,color2) {
        this.model = new PlatformerModel(w, h, "#cf5c26","#cf5c26", this, null, {
            headOptions: [IMAGES.QAnonHead],
            hairOptions: [],
            torsoOptions: [IMAGES.torsoMilitary],
            armOptions: [IMAGES.armBare],
            legOptions:[6],
            glassesOptions: [],
            skinOptions: [],
            skirtOptions: [],
            canWheelchair: false,
        })
    }
}
