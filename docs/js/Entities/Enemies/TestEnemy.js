class TestEnemy extends BeatEmUpper {
    constructor(x,y) {
        super(x,y,20,40,"#666","#444")
        // this.model.face.drawable.image = IMAGES.botHead;

        this.speed = 1;
        this.grav = 0.25;
        this.shootTime = 60*2;
        this.shootTimer = 0;
        this.heal = 0.01;
        this.contactDamage = 0;
        this.health = this.maxHealth = 15;
        this.contactDamage = 3;
        this.name = 'bot';
        this.talkSound = SOUNDS.botTalk;
        this.every = 3;
    }
    initModel(w, h, color,color2) {
        this.model = new BotModel(w, h, color,color2, this);
    }
    getInputs() {
        if(this.scene.dialogueBlocking) {
            this.mx = 0;
            this.my = 0;
            return;
        }
        var player = this.scene.player;
        if(!player)return;
        var dx = player.x-this.x;
        var dy = player.y-this.y;
        var dz = player.z-this.z;
        // var ds = Math.abs(dx)+Math.abs(dy)+Math.abs(dz);
        if(this.invul<=0&&Math.abs(dx)<45 && Math.abs(dy)<20+player.h/2&&Math.abs(dz)<100){
        // if(ds<50&&this.invul<=0) {
            player.collide(this);
            this.invul = this.invulTime;
            if(!this.collidedWith) {
                var text = "fake news";
                this.scene.playDialogue(
                    [
                        {person: this, text, zoom: 2},
                        // {person: this, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in congue erat. Suspendisse nunc ligula, sollicitudin sit amet varius ut, laoreet nec eros. Sed nec leo rutrum, volutpat felis a, varius tellus. Vivamus eu facilisis quam. Nam laoreet sodales commodo. Nunc in semper odio. Ut auctor eros volutpat urna feugiat, tempus auctor urna bibendum. Cras sodales justo non volutpat vestibulum. Morbi vitae tincidunt odio. Curabitur gravida magna non dignissim mollis. Etiam blandit mauris ut sapien venenatis, quis ultrices diam tristique. Proin metus arcu, sagittis ac laoreet at, bibendum non odio."}
                        // {person: this, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in congue erat. Suspendisse nunc ligula, sollicitudin sit amet varius ut, laoreet nec eros. Sed nec leo rutrum, volutpat felis a, varius tellus. Vivamus eu facilisis quam. Nam laoreet sodales commodo. Nunc in semper odio. Ut auctor eros volutpat urna feugiat, tempus auctor urna bibendum. Cras sodales justo non volutpat vestibulum. Morbi vitae tincidunt odio. Curabitur gravida magna non dignissim mollis. Etiam blandit mauris ut sapien venenatis, quis ultrices diam tristique. Proin metus arcu, sagittis ac laoreet at, bibendum non odio."}
                    ], true, e=> {
                        // this.startFollow(player, 80);
                    }
                )
            }
        }
        this.dx = dx>0?1:-1;
        // this.vy += Math.cos(frameCount*Math.PI/10)*.1;
        // this.vz += ((player.z - 50 - this.z)/50-this.vz)/10

        if(Math.abs(dx) < 500) {
        this.shootTimer++;
        if(this.shootTimer >= this.shootTime) {
            this.shootTimer = 0;
            // this.scene.addEntity(new LaserBeam(this.x,this.y,this.z-20,this.dx*5, 100));
            // SOUNDS.laser.play();
        }
        }
        if(dy>50)this.my=1;
        if(dy<-50)this.my=-1;
        if(dx<-10) this.mx = -1;
        if(dx>10) this.mx = 1;
    }
}