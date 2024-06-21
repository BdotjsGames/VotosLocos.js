class TrashCan extends EntityTwoPointFiveD {
    constructor(x,y,z=0) {
        var drawable = new ImageDrawable(IMAGES.trashCan, 0,0);
        drawable.w *= 3;
        drawable.h *= 3;
        drawable.y = -drawable.h;
        drawable.x-=drawable.w/2;
        super(x,y,z,drawable)
        this.dr = 0;
        this.invulTime = 20;
        this.health = 30;
        this.vx = 0
        this.vy = 0;
        this.vz = 0;
        this.grav = 1;
    }
    update() {
        // this.hitAmount -= 1;
        if(this.invul)
            this.invul -= 1;
        var dr = -this.rotation;
        this.dr += (dr-this.dr) * 0.3;
        this.rotation += this.dr;

        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;
        if(this.z<0) {
            this.vz += this.grav;
        } else {
            this.z = 0;
            this.vz =0;
            this.vx *= 0.5;
            this.vy *= 0.5;
        }
    }
    setScene(scene) {
        this.scene=scene;
        this.scene.enemies.push(this);
        this.enemies = this.scene.players;
    }
    getHit(other){
        this.invul = this.invulTime;
        this.rotation = other.dx*Math.PI/4;
        this.hitAmount = 30;
        other.model.impactStop(5);
        this.health -= other.contactDamage;
        if(this.health<0) {
            this.die();
            this.vx = (this.x - other.x)/10;
            this.vy = (this.y - other.y)/10;
        }
    }
    die() {
        this.drawable.image = IMAGES.trashCanSmashed
        this.vz = -10;
    }
}