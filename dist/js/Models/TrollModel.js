class TrollModel extends PlatformerModel {
    constructor(...args) {
        super(...args);
        // this.face.hidden = true;
        this.mouth.hidden = true;
        this.anims = botanims;
        this.attackAnim = this.anims.armSpinny;
        this.attackCombo = [this.anims.armSpinny];
        this.shootTimer = 200;
        this.speed = 6;
    }
    createOptions(){
        super.createOptions({
            headOptions: IMAGES.trollHeadOptions,
            hairOptions: [],
            torsoOptions: IMAGES.trollTorsoOptions,
            armOptions: IMAGES.trollArmOptions,
            legOptions:[2],
            glassesOptions: [],
            skinOptions: [],
            skirtOptions: [],
            canWheelchair: false,
        });
    }
}