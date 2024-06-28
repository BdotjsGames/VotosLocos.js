class AdditiveScene extends Scene {
    constructor(prevScene) {
        super();
        this.prevScene = prevScene;
        this.isAdditiveScene = true;
        this.drawsPrevscene = true;
        this.drawsPanel = true;
        this.updatesPrevious = false;
        this.panelColor = "#333e";
    }
    update() {
        if(this.updatesPrevious)this.prevScene.update();
        super.update();
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