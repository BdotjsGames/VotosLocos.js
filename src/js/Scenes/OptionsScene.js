class OptionsScene extends AdditiveScene {
    constructor(prevScene) {
        super(prevScene);
        this.isOptionsScene = true;
        var x = 0.5
        this.addEntity(
            new SliderOptionUI('volume',0.5,0.1,0.3,0.05,value=>{
                localStorage.setItem("mainVolume", value);
                setVolume(value);
            }).setTrueCoords(false).setBounds(0,1).setValue(VOLUME)
        )
        this.addEntity(
            new ButtonUI("back",0.05,0.05,0.1,0.05,0.05,e=>{
                this.driver.setScene(this.prevScene);
            })
        )
    }
    update() {
        super.update();
        if(getButtonDown(Buttons.start)) {
            this.back();
        }
    }
}