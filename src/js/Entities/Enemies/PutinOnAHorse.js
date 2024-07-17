// class Putin extends Bot {
    class PutinOnAHorse extends BeatEmUpper {
        constructor(x,y) {
            super(x,y,20,40);
            this.shouldSceneCollide=false;
            this.model.fear();
            this.speed = 7;
        }
        initModel(w, h) {
            this.model = new PutinModel(w, h,"#f6e1c5", "#d3a684", this);
            this.model.horse = this.model.hips.createBefore(3,0,new ImageDrawable(IMAGES.horse,3,3),0)
        }
        update() {
            // this.mx=1;
            super.update()
            this.model.body._y=-82/2;
            this.model.horse.rotation = Math.cos(this.x*Math.PI/100)*Math.PI/20;
            this.rotation = Math.cos(this.x*Math.PI/100)*Math.PI/20;
            this.model.legL.rotation = Math.PI/5;
            this.model.legR.rotation = Math.PI/5;
            this.model.arm1.rotation =-Math.PI/5;
            this.model.arm2.rotation =-Math.PI/5;
        }
    }
    