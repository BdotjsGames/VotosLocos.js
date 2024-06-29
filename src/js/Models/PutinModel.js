class PutinModel extends PlatformerModel {
    constructor(...args) {
        super(...args);
        // this.face.hidden = true;
        this.mouth.hidden = true;
        this.anims = botanims;
        // this.attackAnim = this.anims.punch1;
        this.attackCombo = [anims.punch1, anims.punch2, botanims.punch1];
    }
    createOptions(){
        super.createOptions({
            headOptions: [IMAGES.putinHeadOptions[0]],
            hairOptions: [],
            torsoOptions: [IMAGES.putinTorsoOptions[0]],
            armOptions: [IMAGES.armBare],
            legOptions:[10],
            glassesOptions: [],
            widthOptions: [0],
            skinOptions: [5],
            skirtOptions: [IMAGES.putinSkirtOptions[0]],
            canWheelchair: false,
        });
    }
}