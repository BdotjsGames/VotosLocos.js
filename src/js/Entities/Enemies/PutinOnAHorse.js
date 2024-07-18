// class Putin extends Bot {
    class PutinOnAHorse extends BeatEmUpper {
        constructor(x,y) {
            super(x,y,20,40);
            this.shouldSceneCollide=false;
            this.model.fear();
            this.speed = 7;
            this.specialName = "Putin";
            this.name = "Putin";
            this.shouldStealCamera = true;
            this.grav = 1
        }
        moveRight() {
            this.mx = 1;
        }
        getOnHorse() {
            this.jump();
            this.unjump();
            setTimeout(() => {
                this.model.horse = this.model.legL.createBefore(3+2,0,new ImageDrawable(IMAGES.horse,3,3),0)
            }, 150);
        }
        initModel(w, h) {
            this.model = new PutinModel(w, h,"#f6e1c5", "#d3a684", this);
        }
        update() {
            // this.mx=1;
            super.update()
            if(this.model.horse) {
                this.model.body._y=-82/2;
                this.model.horse.rotation = Math.cos(this.x*Math.PI/100)*Math.PI/20;
                this.rotation = Math.cos(this.x*Math.PI/100)*Math.PI/20;
                this.model.legL.rotation = Math.PI/5;
                this.model.legR.rotation = Math.PI/5;
                this.model.arm1.rotation =-Math.PI/5;
                this.model.arm2.rotation =-Math.PI/5;
            }
        }
    }
    