class AdditiveScene extends Scene {
    constructor(prevScene) {
        super();
        this.prevScene = prevScene;
        this.isAdditiveScene = true;
        this.drawsPrevscene = true;
        this.drawsPanel = true;
        this.panelColor = "#333e";
    }
    back() {
        this.driver.setScene(this.prevScene);
    }
    draw(canvas) {
        if(this.drawsPrevscene) {
            this.prevScene.draw(canvas);
        }
        if(this.drawsPanel) {
            canvas.fillStyle = this.panelColor;
            canvas.fillRect(0,0,CE.width,CE.height);
        }
        super.draw(canvas);
    }
}