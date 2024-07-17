shadow = canvas.createRadialGradient(0, 0, 5, 0, 0, 20);
shadow.addColorStop(0, "#000000aa");
shadow.addColorStop(1, "#00000000");
var showHitboxes = true;

class BeatEmUpper {
    constructor(x, y, w, h, color,color2,model) {
        this.x = x; this.y = y; this.w = w; this.h = h;
        this.z = 0;
        this.airPosition = 0;
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
        this.grav = 0.5;
        this.jumpStrength = 10;
        this.jumpCount = 0;
        this.numJumps = 2;
        this.dx = 1;
        this.dz = 1;
        this.dy = 1;
        this.speed = 5;
        this.grounded = true;
        this.terminalVelocity = 20;
        this.crouching = false;
        this.canUnJump = false;
        this.wallColliding = false;
        this.mx = 0;
        this.my = 0;
        this.wallSlide = true;
        this.wallJumps = true;
        this.wallCollidingWith = null;
        this.standingOn = null;
        this.canAttack = true;
        this.defaultAttackHitbox = {width: 70, height: 60};
        this.largeHitbox= { width: 200, height: 70, both:true};
        this.attackHitbox = this.defaultAttackHitbox;
        if(model) {
            this.model = model;
            model.parent = this;
        } else {
            this.initModel(w, h, color,color2);
        }
        this.health = this.maxHealth = 30;
        this.invul = 0;
        this.invulTime = 20;
        this.regen = 0;//0.05;
        this.color = color || 'darkgrey';
        this.color2 = color2 || 'black';
        this.knockBack = 3;
        this.getknockBack = 1;
        this.hitSound = SOUNDS.hit;
        this.friction = 0.5;
        this.shadow = shadow;
        this.canCrawl = false;
        this.crawlSpeedMultiplier = 0.6;
        this.crouchFallSpeed = 7;
        this.highFiveDistance = 40;
        this.groundAcceleration = 1;
        this.groundDeceleration = 1;
        this.contactDamage = 10;
        this.obj = this;
        this.talkSound = SOUNDS.johsonTalk;
        this.every = 2;
        this.jumpSpeedBoost = 0;
        this.shouldSceneCollide = true;

        this.attackRange = 100;
        this.enemySeekRange = 500;
        this.avoidRange = 300;
        this.attackSpeed = 100;
        this.attackTimer = 0;
        this.hitResistence = 5;
        this.item = {type:null, count: 0};
        this.attackerCount = 0;
        this.straffing = false;
        this.spamCounter=0;
    }
    lightDraw(ctx, cx, cy, zoom) {
        // var dx = this.x+cx;
        // var dy = this.y+cy;
        // var x = cx+dx/zoom-cx;
        // var y = cy+dy/zoom-cy;
        var x = this.x + cx;
        var y = this.y + cy + this.z - this.h;
        var dx = x - CE.width / 2;
        var dy = y - CE.height / 2;
        x = CE.width / 2 + dx * zoom;
        y = CE.height / 2 + dy * zoom;
        var grd = ctx.createRadialGradient(x, y, 10 * zoom, x, y, 100 * zoom);
        grd.addColorStop(0, "#ffffffff");
        grd.addColorStop(1, "#00000000");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, CE.width, CE.height);
    }
    dodge() {
        if(this.model.anim) {
            if(this.model.unInteruptable)return;
            this.model.endAnim();
        }
        if(this.dodging)return;
        this.vz = 5
        this.dodging = true;
        this.dodgeTimer = 20;
        this.model.doubleJump();
        this.model.dodging = true;
        this.dodgeMx = this.mx;
        this.dodgeMy = this.my;
        if(this.mx==0&&this.my==0) {
            this.dodgeMx = this.dx;
        }else {
            var r = Math.sqrt(this.mx*this.mx+this.my*this.my);
            this.dodgeMx = this.mx/r;
            this.dodgeMy = this.my/r;
        }
        this.vx = this.dodgeMx*this.speed*20;
        this.vy = this.dodgeMy*this.speed*20;

    }
    getHit(other) {
        if(this.dead)return;
        if(this.dodging)return;
        var damage = other.contactDamage;
        if(other.model)
        if(other.model.anim&&other.model.damage) {
            damage= other.model.damage;
        }
        if(!damage)return;
        if (this.invul > 0) return;
        if(other.model)
            other.model.impactStop(6);
        this.dx = this.x<other.x?1:-1;
        // console.log(this.hitResistence,damage)
        // console.log(this.hitResistence, damage);
        if(this.hitResistence>=damage) {
            // this.outlineColor = 'yellow'
        } else {
            this.model.impactStop(25);
            this.model.getHit(true);
            this.vz = -1;
        }

        // createFadingParticleCluster(this.scene,(other.x+this.x)/2,(this.y+other.y + this.z+other.z)/2,50, 15)
        spawnHitParticles(this.scene,(other.x+this.x)/2,(this.y+other.y)/2-10, (this.z+other.z)/2-30)
        var k = 1;
        if (other.knockBack) k = other.knockBack;
        k = k * this.getknockBack;
        var dx = other.x - this.x > 0 ? 1 : -1;
        if(dx==undefined) console.log('dx is undefined');
        if(k==undefined) console.log('k is undefined');
        this.vx = -dx * k * 10;
        this.x += this.vx;
        this.health -= damage;
        this.invul = this.invulTime;
        if(other.model)
        if(other.model.knockbackUp) {
            this.vz = other.model.knockbackUp;
            other.vz = other.model.knockbackUp;
        }
        // this.vz += other.vz*2;
        // this.vz = -20;
        this.z+=this.vz;
        if (this.health < 0) {
            this.hitSound.play(-0.1);
            SOUNDS.hitSoundthing.play(-0.5);
            this.die();
            this.vz -= 10;
            this.vx += -dx;
        } else {
            this.hitSound.play();
            SOUNDS.hitSoundthing.play();
            for (var i = 0; i < 7; i++) {
                var vx = (Math.random() - 0.5) * 2 + this.vx / 5;
                var vy = (Math.random() - 0.5) * 2;
                this.scene.addEntity(new Particle(this.x + this.vx, this.y, 10, 10, this.color, vx, vy, 40, 0));
            }
        }
    }
    enemyAvoidUpdate() {
        this.running = false;
        for(var i=0;i<this.enemies.length;i++) {
            var enemy = this.enemies[i];
            if(enemy.shouldDelete||enemy.dead)continue;

            var {dx,dy,dz} = vector3Diff(enemy, this);
            var drr = diffSqrd(dx,dy,dz);
            if(drr<this.avoidRange*this.avoidRange) {
                var r = Math.sqrt(dx*dx+dy*dy);
                if(r==0) {
                    dx=1;
                    dy=0;
                    r=1;
                }
                this.mx = -dx/r;
                this.my = -dy/r;
                this.running=true;
                return;
            }
        }
    }
    enemySearchUpdate() {
        this.seeking = false;
        this.attackTimer += 1;
        var closest = null;
        var minDist = this.enemySeekRange*this.enemySeekRange;
        for(var i=0;i<this.enemies.length;i++) {
            var enemy = this.enemies[i];
            if(enemy.shouldDelete||enemy.dead||enemy.dodging)continue;

            var {dx,dy,dz} = vector3Diff(enemy, this);
            var drr = diffSqrd(dx,dy,dz);
            if(this.attackTimer>this.attackSpeed)
            if(drr< this.attackRange*this.attackRange) {

                this.attackTimer = 0;
                // var r = Math.sqrt(dx*dx+dy*dy);
                // if(r==0) {
                //     dx=1;
                //     dy=0;
                //     r=1;
                // }
                // this.mx = dx/r;
                // this.my = dy/r;
                // this.mx = 0;
                // this.my = 0;
                if(dy>20)this.my = 1;
                else if(dy<-20)this.my = -1;
                else this.my = 0;
                this.mx = 0;
                if(this.model.anim) {
                    this.mx=0;this.my=0;
                }
                if(!this.model.anim)
                    this.attack();
                this.attacking = true;
                this.seeking = true;
                enemy.attackerCount += 1;
                return;
            }
            if(drr< minDist) {
                minDist = drr + enemy.attackerCount * 1000;
                closest = enemy;
            }
            
        }
        if(closest) {
            var dx = closest.x - this.x;
            var dy = closest.y - this.y;
            var r = Math.sqrt(dx*dx+dy*dy);
            if(r==0) {
                dx=1;
                dy=0;
                r=1;
            }
            this.mx = dx/r;
            this.my = dy/r;
            this.seeking=true;
            closest.attackerCount += 1;
            return;
        }
        this.attacking = false;
    }
    collide(other) {
        if (this.model.attacking) {
            this.vx = 0;
            other.getHit(this);
            
            // this.model.wallCollide();
            this.jumpCount = 0;
        } else {
            this.getHit(other);
        }
    }
    initModel(w, h, color,color2) {
        this.model = new PlatformerModel(w, h, color,color2, this);
        // this.model = new CheeseburgerJohnsonModel(this);
    }
    getInputs() { }
    attack() {
        if (this.canAttack) {
            var anim = null;
            this.model.attack(anim);
        }
    }
    throwProjectile() {
        if(this.item.count <=0 )return;
        this.item.count -= 1;
        var data = this.item.type;
        var z = this.z + (-this.model.legLength-20)*2;
        var vx = this.dx*10 + this.vx/2;
        var proj = this.scene.addEntity(new LaserBeam(this.x+30*this.dx+this.vx,this.y,z,vx,5, 100,this.enemies));
        if(data.drawShape)
            proj.drawShape = data.drawShape;
        if(data.damage)
            proj.contactDamage = data.damage;
        SOUNDS.throw.play();
    }
    useItem() {
        this.model.throw();
        if(this.item.count>0){
            this.model.attackSound.play();
        }
    }
    crouch() {
        if (!this.grounded) {
            this.vz += this.crouchFallSpeed;
            // if(this.canAttack) {
            //     this.model.slide();
            // }
        }
    }
    heal(amount) {
        this.health += amount;
        if(this.health>this.maxHealth)this.health = this.maxHealth;
    }
    update() {
        this.attackerCount = 0;
        if(isNaN(this.x))this.x = 0, console.log('NaN X');
        if(isNaN(this.y))this.y = 0;
        if(isNaN(this.z))this.z = 0;
        if(isNaN(this.vx))this.vx = 0;
        if(isNaN(this.vy))this.vy = 0;
        if(isNaN(this.vz))this.vz = 0;
        // if(this.dead) {
        //     this.model.update();
        //     return;
        // }
        if(this.dx==0) {
            console.log("WTF")
        }
        // if(this.scene.dialogueBlocking)return;
        if(!this.dead) {
            if (this.health < 0) {
                this.die();
            }
            if (this.invul > 0) {
                // if(!this.model.impactStopTimer>0)
                    this.invul--;
            } else {
                if (this.health < this.maxHealth) {
                    this.health += this.regen;
                }
            }
            this.getInputs();
            if(this.model.moveLocked) {
                this.mx = 0;
                this.my = 0;
            }
            if(this.dodgeTimer>0) {
                this.dodgeTimer--;
                this.mx = this.dodgeMx;
                this.my = this.dodgeMy;
            } else {
                this.model.dodging = false;
                this.dodging = false;
            }
        } else {
            this.mx = 0;
            this.my = 0;
        }

        var terminalSideVelocity = this.speed*2;
        var speed = this.speed;
        if(this.crouching && !this.model.attacking) {
            if(this.canCrawl)
                speed *= this.crawlSpeedMultiplier;
            else 
                speed = 0;
        }
        if(this.model.impactStopTimer<10) {

            // this.vx += (this.mx * speed - this.vx) * this.friction;
            // this.vy += (this.my * speed - this.vy) * this.friction;
            
            var accel = this.groundAcceleration;
            if(this.mx==0&&this.my==0) accel = this.groundDeceleration;
            if(!this.grounded)accel *=0.2;
            else if(this.model.skateBoardOn||this.model.inWheelChair)accel *= 0.5;
            if(this.dodging) {
                // accel = 1;
                speed = this.speed*2;
            }
            this.vx = linearMove(this.vx, this.mx*speed, accel);
            this.vy = linearMove(this.vy, this.my*speed, accel);
            

            this.vx = clamp(this.vx, -terminalSideVelocity, terminalSideVelocity);
            this.vy = clamp(this.vy, -terminalSideVelocity, terminalSideVelocity);

            if(this.model.doubleJumping) {
                // this.vx = this.dx*this.model.doubleJumpTimer/2;
            }

            this.x += this.vx;
            this.y += this.vy;

        

            this.model.moving = this.mx != 0 || this.my != 0;
            this.model.rotation = 0;
            // this.grounded = true;
            if (this.mx != 0) {
                var dx = this.mx > 0 ? 1 : -1;
                if(!this.straffing)
                    this.dx = dx;
                if(frameCount-this.jumpTimeStamp<5) {
                    this.vx = (this.dx*this.jumpSpeedBoost)
                }
            }
            if(this.my !=0) {
                this.dy = this.my>0?1:-1;
            }

            if (this.vz < 0) {
                this.grounded = false;
            }
            this.vz += this.grav;
            this.z += this.vz;
        }
        if (this.z >= 0) {
            this.vz = 0;
            this.z = 0;
            this.jumpCount = 0;
            if (!this.grounded) {
                this.model.land();
            }
            this.grounded = true;
        }
        if(this.shouldSceneCollide)
        this.scene.collideCheck(this);
        //   var grav = this.grav * 0.4;
        //   // if(this.wallColliding&&this.vy>0) {
        //   //   grav *= this.wallSlide;
        //   // }
        //   this.vy += grav;
        //   if(this.wallSlide&&this.wallColliding&&this.vy>0&&!this.crouching) {
        //     this.vy *=0.8;
        //   }
        //   if(this.vy>this.terminalVelocity)this.vy = this.terminalVelocity;
        //   var tvx = 44;
        //   if(this.vx>tvx)this.vx = tvx;
        //   if(this.vx<-tvx)this.vx = -tvx;
        //   if(this.vz>tvx)this.vz = tvx;
        //   if(this.vz<-tvx)this.vz = -tvx;
        //   if(this.model.moveLocked) {
        //     this.mx = 0;
        //     this.mz = 0;
        //   }
        //   var friction = 1/2;
        //   if(this.crouching&&this.grounded) {
        //     this.mx = 0;
        //     this.mz = 0;
        //     friction = 1/5;
        //   }
        //   // this.vx += (this.mx*this.speed-this.vx)*friction;
        //   this.vx = linearMove(this.vx, this.mx*this.speed, friction);
        //   this.vz = linearMove(this.vz, this.mz*this.speed, friction);
        //   // if(this.vx) {
        //   //   this.dx=this.mx>0?1:-1;
        //   // }
        //   if(this.mx) {
        //     this.dx=this.mx>0?1:-1;
        //     this.model.moving = true;
        //   } else {
        //     this.model.moving = this.mz!=0;
        //   }
        //   if(this.vy)this.dy=this.vy>0?1:-1;
        //   var dx = this.vx==0?this.dx:this.vx>0?1:-1;
        //   var dz = this.vz==0?this.dz:this.vz>0?1:-1;
        //   var dw = dx*this.w/2;
        //   var dh = this.dy*this.h/2;
        //   this.wallCollidingWith=this.scene.collides(this.x+dw+this.vx,this.y,this)||
        //     this.scene.collides(this.x+dw+this.vx,this.y+this.h/2-1,this)||
        //     this.scene.collides(this.x+dw+this.vx,this.y-this.h/2+1,this);
        //   if(this.wallCollidingWith&&this.scene.wallCollideWith(this.wallCollidingWith,this)) {
        //       // var tx = this.wallCollidingWith.x;
        //       var tx = Math.floor((this.x+dw+this.vx)/this.scene.level.cellWidth);
        //       var mx = (tx+0.5)*this.scene.level.cellWidth;
        //       this.x = mx - dx * (this.w/2+this.scene.level.cellWidth/2-1);
        //       this.vx = 0;
        //       if(this.wallJumps) {
        //         this.jumpCount = 0;
        //       }
        //       if(!this.wallColliding) {
        //         this.model.wallCollide();
        //         this.wallColliding = true;
        //       }
        //     // this.x=(Math.floor((this.x+dw+this.vx)/this.scene.level.cellWidth)+0.5)*this.scene.level.cellWidth-(dw+this.scene.level.cellWidth/2);        
        //   } else {
        //     this.x += this.vx;
        //     this.wallColliding=false;
        //   }
        //   this.standingOn = this.scene.collides(this.x,this.y+dh+this.vy,this)||
        //   this.scene.collides(this.x+this.w/2-2,this.y+dh+this.vy,this)||
        //   this.scene.collides(this.x-this.w/2+2,this.y+dh+this.vy,this);
        //   this.ceilingCollide =false;
        //   if(this.standingOn&&this.scene.standOn(this.standingOn,this)) {
        //     if(this.standingOn == 2) {
        //       this.die();
        //     }
        // if(!this.grounded) {
        //   this.model.land();
        // }
        //     var ty = this.standingOn.y;
        //     // var ty = Math.floor((this.y+dh+this.vy)/this.scene.level.cellHeight);
        //     var my = (ty+0.5)*this.scene.level.cellHeight;
        //     this.y = my - this.dy * (this.h/2+this.scene.level.cellHeight/2);
        //     // this.y=Math.floor((this.y+dh+this.vy)/this.scene.level.cellHeight)*this.scene.level.cellHeight-(dh+1);

        //     if(this.vy>0) {
        //       this.grounded = true;
        //       this.jumpCount = 0;
        //       this.vy = 0;
        //     } else {
        //       this.vy *= 0.9;
        //       this.ceilingCollide = true;
        //     }
        //   } else {
        //     this.y += this.vy;
        //     this.grounded = false;
        //     if(this.jumpCount==0&&(this.vy>2||this.vy<0))this.jumpCount = 1;
        //   }
        //   this.z += this.vz;


        this.model.grounded = this.grounded;
        this.model.wallColliding = this.wallColliding;
        this.model.ceilingCollide = this.ceilingCollide;
        this.model.crouching = this.crouching;
        this.model.update();


        if(this.model.highFiving&&this.highFiveTarget) {
            var closest = this.highFiveTarget;
            this.y += ((closest.y+this.y)/2-this.y)*0.4;
            // closest.y = this.y;
            var mx = (this.x+closest.x)/2;
            var space = 38;
            this.x += (mx-this.dx*space - this.x) * 0.4;
            // if(this.model.cooldownTimer<2) {
            //     var pow = this.scene.addEntity(new ImageParticle(IMAGES.highFivePow, mx-32, this.y+10, 64,128,0,0,20,-0.01));
            // }
            // closest.x = mx + this.dx * space;
          }
        if(this.model.attacking) {
            this.attackCollisionCheck();
        }
        if(this.setNetworkedStateAttr) {
            this.setNetworkedStateAttr('mx', this.mx);
            this.setNetworkedStateAttr('my', this.my);
            if(this.needsNetworkUpdate) {
                this.sendNetworkedState();
            }
        }
    }
    attackCollisionCheckEntity(enemy) {
        if(enemy.invul>0)return;
        var dx = enemy.x - this.x;
        var dy = enemy.y - this.y;
        var dz = enemy.z - this.z;
        var adx = Math.abs(dx);
        var ady = Math.abs(dy);
        var adz = Math.abs(dz);
        if(this.attackHitbox.both||dx*this.dx>=0)
        if(adx<this.attackHitbox.width && ady<this.attackHitbox.height&&adz<100) {
            enemy.getHit(this);
            // this.vx = 0;
            if(this.jumpCount !=0) this.jumpCount = 1
        }
    }
    attackCollisionCheck() {
        this.enemies.forEach(enemy => {
            this.attackCollisionCheckEntity(enemy);
            if(enemy.followersList) {
                enemy.followersList.forEach(enemy => this.attackCollisionCheckEntity(enemy))
            }
        })
        this.scene.hitables.forEach(enemy => {
            this.attackCollisionCheckEntity(enemy);
           
        })
    }
    canJump() {
        return this.jumpCount < this.numJumps;
    }
    onJump() { }
    onDoubleJump() {
        // this.vx += this.dx*50;
    }
    highFive(){
        this.model.highFive();
    }
    beHighFived() {
        this.highFive();
    }
    attemptHighFive() {
        this.highFive();
        var minDist = Number.MAX_SAFE_INTEGER;
        var closest;
        this.highFiveTarget = null;
        highFivers.forEach(h=> {
            if(h.shouldDelete||h.dead)return;
            if(h.following)return;
            if(!h.canHighFive)return;
            if(Math.sign(h.x-this.x) != this.dx)return;
            if(h.dx==this.dx)return;
            var p = {
                x: h.x + h.dx*40,
                y: h.y,
                z: h.z,
            }
            var dist = sqrDist3(p,this);
            if(dist<minDist) {
                minDist = dist;
                closest = h;
            }
        })
        if(!closest)return;
        var r = this.highFiveDistance+closest.highFiveDistance;
        if(minDist<r*r) {
            closest.highFiveTarget = this;
            this.highFiveTarget = closest;
            closest.beHighFived(this);
            // if(this.model.cooldownTimer<2) {
            // var pow = this.scene.addEntity(new ImageParticle(IMAGES.highFivePow, (this.x+closest.x)/2-32, this.y-128, 64,128,0,0,50,-0.00));
            var pow = this.scene.addEntity(new ImageParticle(IMAGES.pow, (this.x+closest.x)/2-32, this.y-128, 64,64,0,0,50,-0.00));
            pow.addMorph("pow",new Morph(null, {scaleW: 0.5, scaleH: 0.5, alpha: 0.5}, {scaleW: 1.5, scaleH: 1.5, alpha: 1}, 5, MorphType.easeOutQuad), true)
            pow.setSortOffset(100);
            SOUNDS.attack.play();
            SOUNDS.clap.play();
            // pow.scaleW = 2;
            // pow.scaleH = 2;
            // }
        }
    }
    jump() {
        if (!this.canJump()) return;
        if (this.model.attacking) return;
        this.grounded = false;
        this.dodgeTimer = 0;
        this.dodging=false;
        this.model.dodging = false;
        if (this.wallColliding && this.wallJumps) {
            this.vx = -this.dx * 4;
        }
        this.canUnJump = true;
        this.vz = -this.jumpStrength;
        this.model.jump();
        this.jumpCount++;
        this.jumpSpeedBoost = this.speed*1.4;
        if (this.jumpCount > 1) {
            this.model.doubleJump();
            this.onDoubleJump();
            this.jumpSpeedBoost = this.speed*2;
        } else {
            this.onJump();
        }
        this.jumpTimeStamp = frameCount;
        if(this.mx!=0) {
            this.vx = (this.dx*this.jumpSpeedBoost)
        }
       
    }
    unjump() {
        if (!this.canUnJump) return;
        if (this.grounded) return;
        if (this.vy > 0) return;
        this.canUnJump = false;
        this.vy = this.vy / 2;
    }
    draw(canvas) {
        if(this.hidden)return;
        // canvas.fillStyle = 'red';
        // canvas.fillRect(this.x,this.y,10,10);
        if(DEV&&showHitboxes&&this.model.attacking){
            canvas.strokeStyle = "red";
            canvas.strokeRect(
                this.x+this.attackHitbox.width*(this.dx-1)/2,
                this.y-this.attackHitbox.height,
                this.attackHitbox.width,
                this.attackHitbox.height*2,
            )
        }
        canvas.save();
        canvas.translate(this.x,this.y);
        if(this.telegraphProjectile) {
            canvas.lineWidth = 4;
            canvas.strokeStyle = '#f00a';
            canvas.fillStyle = '#d003';
            var z = 0;//(-this.model.legLength-20)*2
            var telegraphHeight = 40;
            canvas.fillRect(0,-telegraphHeight/2+z,this.dx*1000,telegraphHeight)
            canvas.strokeRect(0,-telegraphHeight/2+z,this.dx*1000,telegraphHeight)
            canvas.fillStyle = '#f00a';
            canvas.font= '20px' + FONT_FAMILY.default;
            canvas.textAlign = 'center';
            canvas.textBaseline = 'middle';
            canvas.fillText('!',0+this.dx*500, 0);
        }
        var sx = 1;
        if(this.model.sliding) sx =2;
        canvas.scale(sx,0.5);
        canvas.fillStyle = this.shadow;
        canvas.fillRect(-30,-30,60,60);
        canvas.restore();
            this.model.draw(canvas, this.x, this.y + this.z - this.h / 2);
        if (this.health < this.maxHealth - 1&&!this.dead) {
            var y = this.y + 20;
            canvas.fillStyle = "black";
            canvas.fillRect(this.x - 32, y - 2, 64, 14);
            canvas.fillStyle = "green";
            canvas.fillRect(this.x - 30, y - 0, 60 * this.health / this.maxHealth, 10);
        }
        // canvas.fillStyle = 'red';
        // canvas.fillRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h);
    }
    spawnTextParticle(text,size=30) {
    // constructor(text,x,y,w,h,size) {
        var textParticle = new DrawableText(text, this.x, this.y+10,100,30,size)
            .center().setZ(-100);
        textParticle.addMorph('fade',new Morph(
            null, {}, {
                dz: -10, alpha: 0
            }, 30, MorphType.easeInOutCubic, m=>{
                m.obj.shouldDelete = true;
            }
        ), true)
        this.scene.addEntity(textParticle)
            .color(0,250,250)
        return textParticle;
    }
    respawn() {
        this.dead = false;
        this.model.undie();
        this.followersList = [];
        this.followerCount = 0;
    }
    die() {
        spawnDeathParticles(this.scene,this.x,this.y-20, this.z);
        this.dead = true;
        this.model.die();
        // this.shouldDelete = true;
        var g = 0.2;
        var x = this.x;
        var y = this.y;
        // createFadingParticleCluster(this.scene,x,y-20,this.z,10,100)
        
        // createFadingParticle(this.scene,x,y-20,this.z,100)
        // var pow = this.scene.addEntity(new ImageParticle(IMAGES.pow, (this.x+closest.x)/2-32, this.y-128, 64,64,0,0,50,-0.00));
        //     pow.addMorph("pow",new Morph(null, {scaleW: 0.5, scaleH: 0.5, alpha: 0.5}, {scaleW: 1.5, scaleH: 1.5, alpha: 1}, 5, MorphType.easeOutQuad), true)
        for (var i = 0; i < 9; i++) {
            var vx = (Math.random() - 0.5) * 4;
            var vy = (Math.random() - 0.5) * 4 - 5;
            this.scene.addEntity(new Particle(x, y, 15, 15, this.color, vx, vy, 40, g));
        }
        if(this.allies) {
            var myIndex = this.allies.indexOf(this);
            if(myIndex!=-1)this.allies.splice(myIndex,1);
        }
    }
}

function createFadingParticleCluster(scene,x,y,z,size,variance) {
    for(var i=0;i<6;i++ ) {
        var a = Math.random()*Math.PI*2;
        var r = Math.random()*variance;

        createFadingParticle(scene,
            x + Math.cos(a)*r,
            y + Math.sin(a)*r,
            z,
            size+Math.random()*variance/2
        );
    }
}

function createFadingParticle(scene,x,y,z,size){
    var p = scene.addEntity(new Particle(x,y+z,size,size,"#ffffff", 0,0, 30,0))
    p.colorValue = 1;
    p.customUpdate = fadingParticleUpdate;
    p.vy = Math.random()*-3;
    p.t=-Math.random()*10;
    return p;
    // var p2 = scene.addEntity(new Particle(x,y-50,size*.9,size*.9,"#ffffff", 0,0, 15,0))
    // p2.colorValue = 1;
    // p2.customUpdate = fadingParticleUpdate;
}

function fadingParticleUpdate() {
    this.t+= 0.5;
    if(this.t<0)return;
    // this.colorValue = (0.5-this.colorValue)*0.8;
    // var v = Math.floor(this.colorValue*255);
    var colors = this.colorsOverride||['#fff',"#fff", '#f00', "#fa0", "#ff0","a70", "#120", "#000"]
    var i = Math.min(Math.floor(this.t),colors.length-1);
    this.color = colors[i];
    this.y += this.vy;
    this.x += Math.cos(this.t*Math.PI/2)*4;
    this.w*=0.95;
    // this.color = `rgb(${v},${v/2},${v/2})`
    // this.alpha = clamp((this.life/this.maxLife)*2,0,1);
    // console.log(this);
}


function fadingParticleUpdate2() {
    this.colorValue += (0.7-this.colorValue)*0.8;
    var v = Math.floor(this.colorValue*255);
    this.color = `rgb(${v},${v},${v})`
    this.alpha = clamp((this.life/this.maxLife)*2,0,1);
    // console.log(this);
}

function spawnHitParticles(scene,x,y,z) {
    var p = scene.addEntity(new ImageParticle(IMAGES.whiteFlash, x,y, 32*6,32*6, 0,0,10,0))
    p.z = z;
}

function spawnDeathParticles(scene,x,y,z,radius=50,amount=12) {
    var f = scene.addEntity(new ImageParticle(IMAGES.whiteFlash, x,y, 32*10,32*10, 0,0,10,0))
    f.z= z;
        for(var i=0;i<amount;i++) {
            var a = Math.random()*Math.PI*2;
            var r= Math.random()*radius;
            var p  = createFadingParticle(scene,x+Math.cos(a)*r,y+Math.sin(a)*r,0,30)
            p.life+=Math.random()*10;
            p.z = z;

            var p2  = createFadingParticle(scene,x+Math.cos(a)*r,y+Math.sin(a)*r,0,30)
            p2.t = p.t - 50
            p2.y += p.vy*p.life;
            p2.life = 10;
            p2.alpha = 0.4;
            p2.color = "black";
            p2.colorsOverride = ["#ddd", "#555","#333","#000"]
            p2.z=z;
            p2.vy = 0;
        }
}