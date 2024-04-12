class AdditiveScene extends Scene {
    constructor(prevScene) {
        super();
        this.prevScene = prevScene;
        this.isAdditiveScene = true;
        this.drawsPrevscene = true;
        this.drawsPanel = true;
        this.panelColor = "#aaae";
    }
    back() {
        this.driver.setScene(this.prevScene);
    }
    draw() {
        if(this.drawsPrevscene) {
            this.prevScene.draw();
        }
        if(this.drawsPanel) {
            canvas.fillStyle = this.panelColor;
            canvas.fillRect(0,0,CE.width,CE.height);
        }
        super.draw();
    }
}