var highFivers = [];
class HighFiver extends BeatEmUpper {
    constructor(x, y) {
        super(x, y, 20, 40, '#00b', '#006');
        // this.model.mouth.drawable.image = IMAGES.mouthFrown;
        // this.model.face._y=1;
        // this.canAttack = false;
        this.isEnemy = true;
        this.outlineColor = "black";
        this.invulTime = 40;
        this.speed = 2;
        this.isHighFiver = true;
        this.canHighFive = true;
        highFivers.push(this);
        this.grav*=0.8;
        // this.friction = 0.1;
        this.groundAcceleration = 0.2;
        this.groundAcceleration = 0.5;
        this.highFivesNeeded = randomFromList([1,3,5])
        this.name = 'citizen';
        this.talkSound = SOUNDS.citizenTalk;
        this.onAfterDialogue = e=> {
            this.startFollow(player, 80);
            this.jump();
        }
        this.shouldStartDiaolgueOnProximity = false;
        this.lookingAt = null;
        this.interactable = true;
        this.isInteractable = true;
        this.interactablesRange = 100;
        this.promptOffsetY = -100;
        this.attackRange = 100;
        this.enemySeekRange = 500;
    }
    startFollow(target, distance) {
        this.playerTarget = target;
        this.isInteractable = false;
        this.following = true;
        this.followDistance = distance;
        this.followMoving = false;
        this.followDistanceDetectionOffset = 5;
        if(this.followTarget == target) return;
        this.followTarget = target;
        target.followersCount = (target.followersCount||0)+1
        if(!target.followersList) target.followersList = [];
        target.followersList.push(this);
        this.followCountIndex = target.followersCount;
        this.followOffset = {
            dx: 0,//this.followCountIndex * 40
        }
        this.speed = target.speed;
    }
    stopFollow(){
        this.following = false;
        if(!this.followTarget) return;
        this.followTarget.followersCount -= 1;
        var index = arrayRemoveItem(target.followersList, this);
        for(var i =index;i<target.followersList;i++) {
            target.followersList[i].followCountIndex -= 1;
        }
    }
    //actually this is very dumb
    followUpdate2() {
        var minSqrDist = Number.MAX_SAFE_INTEGER;
        // minSqrDist=minSqrDist*minSqrDist;
        var closest;
        var out;
        for(var i = this.followCountIndex; i<this.followTarget.followersList.length;i++) {
            // if(i==this.followCountIndex-1)continue;
            var other = this.followTarget.followersList[i];
            if(out = sqrDistCheckSqrd(this, other, minSqrDist)){
                minSqrDist = out.sqrDistance;
                closest = out;
            }
        }
        if(out = sqrDistCheckSqrd(this, this.followTarget, minSqrDist)){
            minSqrDist = out.sqrDistance;
            closest = out;
        }
        if(closest && minSqrDist > this.followDistance*this.followDistance) {
            var dist = Math.sqrt(closest.sqrDistance);
            this.mx = -closest.dx/dist;
            this.my = -closest.dy/dist;
        } else {
            this.mx = 0;
            this.my = 0;
        }
    }
   
    followUpdate() {
        this.enemySearchUpdate();
        if(this.seeking)return;
        if(this.model.attacking)return;
        var target = this.followTarget;
        if(this.followCountIndex>1) {
            target = this.followTarget.followersList[this.followCountIndex-2]
        }
        var targetX = target.x - this.followOffset.dx * target.dx;
        var dx = targetX - this.x;
        var dy = target.y - this.y;
        var sqd = dx*dx+dy*dy;
        var followDistance = this.followDistance;
        // var followDistance = this.followDistance + this.followCountIndex * 20;
        var startFollowDist = followDistance + this.followDistanceDetectionOffset;
        var stopFollowDist = followDistance;
        if(this.followColliding) {
            // this.mx *= 0.8;
            // this.my *= 0.8;
        } else {
            if(this.followMoving && sqd < stopFollowDist*stopFollowDist) {
                this.mx = 0;
                this.my = 0;
                this.followMoving = false;
            }
            else if(sqd > startFollowDist*startFollowDist) {
                var dist = Math.sqrt(sqd);
                this.mx = dx/dist;
                this.my = dy/dist;
                this.followMoving = true;
            }
        }
        if(!this.pushSpeed)this.pushSpeed = 5;
        if(!this.pushRadius)this.pushRadius = 30;
        if(!this.followMoving) {
            this.mx=0;
            this.my=0;
        }
        this.followColliding = false;
        for(var i = this.followCountIndex; i<this.followTarget.followersList.length;i++) {
            var other = this.followTarget.followersList[i];
            var out;
            if(out = sqrDistCheck(this, other, this.pushRadius)){
                if(out.sqrDistance==0) {
                    out.dy=1;
                    out.sqrDistance = 1;
                }
                var distance = Math.sqrt(out.sqrDistance);
                // this.mx = out.dx/distance;
                // this.my = out.dy/distance;
                other.followColliding = true;
                this.followColliding = true;
                this.vx += out.dx/distance*this.pushSpeed;
                this.vy += out.dy/distance*this.pushSpeed;

                other.vx -= out.dx/distance*this.pushSpeed;
                other.vy -= out.dy/distance*this.pushSpeed;
            }
        }
        this.dx = (target.x>this.x)?1:-1
    }
    update(){
        super.update();
        if(this.following)this.followUpdate();
        if(this.shouldStartDiaolgueOnProximity) {
            this.scene.players.forEach(p=>{
                var w = 100
                if(distABSz(this,p, w,w,w )) {
                    if(!this.inProxy) {
                        this.startDialogueToPlayer(p);
                    }
                    this.inProxy = true;
                    return;
                } else {
                    this.inProxy = false;
                }
            })
        }
        if(this.lookingAt) {
            this.dx = (this.lookingAt.x>this.x)?1:-1
        }
    }
    onJump() {
        SOUNDS.jump.play();
    }
    onDoubleJump() {
        SOUNDS.jump2.play();
    }

    setScene(scene) {
        this.scene=scene;
        this.scene.interactables.push(this);
        this.enemies = this.scene.enemies;
    }
    getInputs() {
        if(this.inputBlocking)return;
        if(Math.random()>.99) {
            this.mx = 0;
            this.my = 0;
            if(Math.random()>.9) {
                this.mx = (Math.random()-0.5)*2;
                this.my = (Math.random()-0.5)*2;
            }
        }
    }
    onInteract(player) {
        this.startDialogueToPlayer(player);
    }
    startDialogueToPlayer(player){
        this.mx = 0;
        this.my = 0;
        this.lookingAt = player;
        this.dx = (player.x>this.x)?1:-1;
        this.inputBlocking = true;
        var texts = this.scene.npcTexts || [
            "Alright! I'll follow you!",
            "Woo! Lets go!",
            "Yeah!|| Where are we going?",
        ]
        var text = this.text || randomFromList(texts);
        var dialogue = this.dialogue || [
            {person: this, text, zoom:2}
        ]

        this.scene.playDialogue(
            dialogue, true, this.onAfterDialogue
        )
    }
    beHighFived(by) {
        this.highFive();
        // if(Math.random()>.8)this.jump();
        this.highFivesNeeded-=1;
        if(this.highFivesNeeded<=0) {
            this.spawnTextParticle(":)")
            this.beHappy();
            this.mx = 0;
            this.my = 0;
            this.startDialogueToPlayer(by);
        }
    }
    beHappy() {
        this.model.mouth.drawable.image = IMAGES.mouthSmile;
        this.model.face._y=0;
    }
    beSad() {
        this.model.mouth.drawable.image = IMAGES.mouthFrown;
        this.model.face._y=1;
    }
    die() {
        if (this.shouldDelete) return;
        super.die();
        // SOUNDS.blowImpact.play();
    }
}