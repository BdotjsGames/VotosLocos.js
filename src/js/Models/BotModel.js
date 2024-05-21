class BotModel extends PlatformerModel {
    constructor(...args) {
        super(...args);
        this.face.hidden = true;
        this.mouth.hidden = true;
    }
    createOptions(){
        super.createOptions({
            headOptions: IMAGES.botHeadOptions,
            hairOptions: [],
            bodyOptions: IMAGES.botTorsoOptions,
            glassesOptions: [],
            skinOptions: [],
            armOptions: [],
            canWheelchair: false,
        });
    }
}