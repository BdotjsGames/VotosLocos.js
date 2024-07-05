class NinjaModel extends PlatformerModel {
    constructor(...args) {
        super(...args);
        // this.face.hidden = true;
        this.mouth.hidden = true;
        this.anims = botanims;
        this.attackAnim = this.anims.punch1;
        this.attackCombo = [this.anims.punch1];
    }
    update() {
        super.update();
        if(this.attacking) {
          this.outlineColor = 'red';
        }else {
          this.outlineColor = 'black';
        }
      }
    createOptions(){
        super.createOptions({
            headOptions: [IMAGES.ninjaHeadOptions[0]],
            hairOptions: [],
            torsoOptions: [IMAGES.ninjaTorsoOptions[0]],
            armOptions: [IMAGES.armOptions[0]],
            legOptions:[5],
            glassesOptions: [],
            skinOptions: [],
            skirtOptions: [],
            canWheelchair: false,
        });
    }
}