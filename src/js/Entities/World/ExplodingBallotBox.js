class ExplodingBallotBox extends DrawableImage {
    constructor(x,y) {
        super(x,y,IMAGES.ballotBox2, 2);
        this.z=0;
        this.isExploding = true;
        this.pivotX = 0;
        this.pivotY = -50;
    }
    update() {
        if(this.isExploding) {
            var osc = Math.cos(frameCount*Math.PI/20);
            this.scaleW = 1 + osc*0.1;
            this.scaleH = 1 - osc*0.1;
            if(Math.floor(frameCount/2)%2){
                var angle = (Math.random()*2-1)
                this.scene.addEntity(new Paper(this.x-32,this.y,this.z-this.h*this.scaleH*.9,angle * 5,0,-10,angle*Math.PI/4,20+Math.random()*10))
            }
        }
    }
}

class Paper extends DrawableImage {
    constructor(x,y,z,vx,vy,vz,rotation,life) {
        super(x,y,IMAGES.paper, 2);
        this.z = z;
        this.vx = vx;
        this.vy = vy;
        this.vz = vz;
        this.grav = 0;
        this.angle = rotation;
        this.life=life
        // this.pivotX = 0;
        // this.pivotY = 0;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vz += this.grav;
        this.z += this.vz;
        this.scaleW = (Math.floor(frameCount/3)%2)*2-1
        if(this.life--<0) {
            this.shouldDelete = true;
        }
    }
    drawShape(canvas) {
        canvas.scale(this.scale,this.scale);
        // canvas.fillStyle = "#f00a";
        // canvas.fillRect(-this.image.width/2,-this.image.height,this.image.width,this.image.height);
        canvas.drawImage(this.image,0,0)
        // canvas.drawImage(this.image,0,0)
    }
}