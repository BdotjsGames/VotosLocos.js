class OptionsScene extends Scene {
    constructor(prevScene) {
        super();
        this.prevScene = prevScene;
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
    back() {
        this.driver.setScene(this.prevScene);
    }
    draw() {
        this.prevScene.draw();
        canvas.fillStyle = "#666";
        canvas.globalAlpha = 0.75;
        canvas.fillRect(0,0,CE.width,CE.height);
        canvas.globalAlpha = 1;
        super.draw();
    }
}