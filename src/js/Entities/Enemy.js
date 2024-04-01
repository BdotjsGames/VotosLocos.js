var highFivers = [];
class Enemy extends BeatEmUpper {
    constructor(x, y) {
        super(x, y, 20, 40, '#00b', '#006');
        // this.canAttack = false;
        this.isEnemy = true;
        this.outlineColor = "black";
        this.invulTime = 40;
        this.speed = 2;
        this.isHighFiver = true;
        highFivers.push(this);
    }
    addShoes() {
        this.model.addShoes();
        this.canAttack = true;
    }
    onJump() {
        SOUNDS.jump.play();
    }
    onDoubleJump() {
        SOUNDS.jump2.play();
    }

    setScene(scene) {
        scene.specialActors.kwak = this;
        this.scene = scene;
    }
    getInputs() {
        if(Math.random()>.99) {
            this.mx = 0;
            this.my = 0;
            if(Math.random()>.9) {
                this.mx = (Math.random()-0.5)*2;
                this.my = (Math.random()-0.5)*2;
            }
        }
    }
    die() {
        if (this.shouldDelete) return;
        super.die();
        SOUNDS.blowImpact.play();
        setTimeout(e =>
            this.scene.respawn(), 1000);
    }
}