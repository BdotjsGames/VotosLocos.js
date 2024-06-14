class EnterableDoor {
    constructor(x,y,z) {
        this.x=x;this.y=y;this.z=z;
        this.showGo = true;
        this.w = 100;
        this.h = 100;
    }
    update() {
        this.scene.players.forEach(p => {
            var dx = p.x - (this.x);
            var dy = p.y - (this.y);
            var adx = Math.abs(dx);
            var ady = Math.abs(dy);
            if(adx<this.w/2 && ady < this.h/2) {
                // this.onPickup();
                this.scene.loadNextLevel();
            }
        })
    }
    draw(canvas) {
        if(this.showGo && frameCount%60<30) {
            canvas.save();
            canvas.translate(this.x,this.y+this.z);
            canvas.rotate(-Math.PI/2)
            canvas.drawImage(IMAGES.GoArrow, -IMAGES.GoArrow.width/2,-IMAGES.GoArrow.height/2);
            canvas.restore();
        }
    }
}