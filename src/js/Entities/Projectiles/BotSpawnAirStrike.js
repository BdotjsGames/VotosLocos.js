class BotSpawnAirStrike {
    constructor(x,y,z=0, enemyClass = Bot, timer = 30) {
        this.x=x;
        this.y=y;
        this.z=y;
        this.enemyClass = enemyClass;
        this.timer = 120;
        this.image = IMAGES.groundTarget;
        this.spawned =false;
    }
    update() {
        this.timer -= 1;
        if(!this.spawned&&this.timer<60) {
            this.spawned = true;
            var enemy = this.scene.addEntity(new this.enemyClass(this.x,this.y))
            enemy.z = -300;
            enemy.model.startAnim(putinSlam);
            enemy.health *= 0.5;
        }
        if(this.timer<-60) {
            this.shouldDelete = true;

        }
        if(Math.floor(this.timer)%10==0 && this.timer > 10) {
            SOUNDS.warningBlip.play();
        }
    }
    draw(canvas) {
        if(frameCount%4>1)return;
        canvas.save();
        canvas.translate(this.x,this.y)
        canvas.scale(2,2);
        canvas.drawImage(this.image,-this.image.width/2,-this.image.height/2,this.image.width,this.image.height);
        canvas.restore();
    }
}
IMAGES.groundTarget = ImageLoader.loadImage('enemies/groundTarget.png');