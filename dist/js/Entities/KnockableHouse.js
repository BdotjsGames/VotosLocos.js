class KnockableHouse {
    constructor(x,y) {
        this.x=x;
        this.y=y;
        this.scale = 3.5;
        this.image = IMAGES.house1;
        // this.interactable = true;

        // this.isInteractable = true;
        // this.interactablesRange = 100;
        this.door = new KnockableDoor(this.x+3.5*16.5,this.y)
    }
    update() {}
    setScene(scene) {
        this.scene=scene;
        scene.addEntity(this.door)
        this.bg = scene.addEntity(new DrawableImage(this.x,this.y, IMAGES.houseBackground,3.5))
        this.bg.y-=50;
        this.bg.z+=50;
        this.y -= .01;
    }
    onInteract() {
        SOUNDS.knockSound.play();
    }
    draw() {
        canvas.save();
        canvas.translate(this.x,this.y);
        canvas.scale(this.scale,this.scale);
        // canvas.fillStyle = 'black';
        // canvas.fillRect(0,-this.image.height/2,this.image.width/4,this.image.height/2-4)
        canvas.drawImage(this.image, -this.image.width/2,-this.image.height);
        canvas.restore();
    }
}