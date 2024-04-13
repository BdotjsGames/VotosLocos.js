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
        this.grounded = false;
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
        if(model) {
            this.model = model;
            model.parent = this;
        } else {
            this.initModel(w, h, color,color2);
        }
        this.health = 30;
        this.maxHealth = 30;
        this.invul = 0;
        this.invulTime = 20;
        this.heal = 0.05;
        this.color = color || 'darkgrey';
        this.color2 = color2 || 'black';
        this.knockBack = 1;
        this.getknockBack = 1;
        this.hitSound = SOUNDS.hit;
        this.friction = 0.5;
        this.shadow = canvas.createRadialGradient(0, 0, 5, 0, 0, 15);
        this.shadow.addColorStop(0, "#000000aa");
        this.shadow.addColorStop(1, "#00000000");
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
    }
    lightDraw(ctx, cx, cy, zoom) {
        // var dx = this.x+cx;
        // var dy = this.y+cy;
        // var x = cx+dx/zoom-cx;
        // var y = cy+dy/zoom-cy;
        var x = this.x + cx;
        var y = this.y + cy + this.z;
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
    getHit(other) {
        if(!other.contactDamage)return;
        if (this.invul > 0) return;
        var k = 1;
        if (other.knockBack) k = other.knockBack;
        k = k * this.getknockBack;
        var dx = other.x - this.x > 0 ? 1 : -1;
        this.vx = -dx * k * 10;
        this.vy = -5;
        this.health -= other.contactDamage;
        this.invul = this.invulTime;
        if (this.health < 0) {
            this.hitSound.play(-0.1);
            SOUNDS.hitSoundthing.play(-0.5);
            this.die();
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
    collide(other) {
        if (this.model.attacking) {
            this.vx = 0;
            other.getHit(this);
            this.model.wallCollide();
            this.jumpCount = 0;
        } else {
            this.getHit(other);
        }
    }
    initModel(w, h, color,color2) {
        this.model = new PlatformerModel(w, h, color,color2, this);
    }
    getInputs() { }
    attack() {
        if (this.canAttack)
            this.model.attack();
    }
    crouch() {
        if (!this.grounded) {
            this.vz += this.crouchFallSpeed;
        }
    }
    update() {
        if (this.health < 0) {
            this.die();
        }
        if (this.invul > 0) {
            this.invul--;
        } else {
            if (this.health < this.maxHealth) {
                this.health += this.heal;
            }
        }
        this.getInputs();
        if(this.model.moveLocked) {
            this.mx = 0;
            this.my = 0;
        }

        var terminalSideVelocity = 44;
        var speed = this.speed;
        if(this.crouching) {
            if(this.canCrawl)
                speed *= this.crawlSpeedMultiplier;
            else 
                speed = 0;
        }
        // this.vx += (this.mx * speed - this.vx) * this.friction;
        // this.vy += (this.my * speed - this.vy) * this.friction;
        var accel = this.groundAcceleration;
        if(this.mx==0&&this.my==0) accel = this.groundDeceleration;
        this.vx = linearMove(this.vx, this.mx*speed, accel);
        this.vy = linearMove(this.vy, this.my*speed, accel);
        

        this.vx = clamp(this.vx, -terminalSideVelocity, terminalSideVelocity);
        this.vy = clamp(this.vy, -terminalSideVelocity, terminalSideVelocity);

        if(this.model.doubleJumping) {
            this.vx = this.dx*this.model.doubleJumpTimer/2;
        }

        this.x += this.vx;
        this.y += this.vy;

       

        this.model.moving = this.mx != 0 || this.my != 0;
        this.model.rotation = 0;
        // this.grounded = true;
        if (this.mx != 0) {
            this.dx = this.dx = this.mx > 0 ? 1 : -1;
        }

        if (this.vz < 0) {
            this.grounded = false;
        }
        this.vz += this.grav;
        this.z += this.vz;
        if (this.z >= 0) {
            this.vz = 0;
            this.z = 0;
            this.jumpCount = 0;
            if (!this.grounded) {
                this.model.land();
            }
            this.grounded = true;
        }

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
    }
    canJump() {
        return this.jumpCount < this.numJumps;
    }
    onJump() { }
    onDoubleJump() {
        this.vx += this.dx*50;
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
        if(minDist<this.highFiveDistance*this.highFiveDistance) {
            closest.highFiveTarget = this;
            this.highFiveTarget = closest;
            closest.beHighFived();
            // if(this.model.cooldownTimer<2) {
            var pow = this.scene.addEntity(new ImageParticle(IMAGES.highFivePow, (this.x+closest.x)/2-32, this.y-128, 64,128,0,0,50,-0.00));
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
        if (this.wallColliding && this.wallJumps) {
            this.vx = -this.dx * 4;
        }
        this.canUnJump = true;
        this.vz = -this.jumpStrength;
        this.model.jump();
        this.jumpCount++;
        if (this.jumpCount > 1) {
            this.model.doubleJump();
            this.onDoubleJump();
        } else {
            this.onJump();
        }
        this.grounded = false;
    }
    unjump() {
        if (!this.canUnJump) return;
        if (this.grounded) return;
        if (this.vy > 0) return;
        this.canUnJump = false;
        this.vy = this.vy / 2;
    }
    draw() {
        // canvas.fillStyle = 'red';
        // canvas.fillRect(this.x,this.y,10,10);
        canvas.save();
        canvas.translate(this.x,this.y);
        canvas.scale(1,0.5);
        canvas.fillStyle = this.shadow;
        canvas.fillRect(-30,-30,60,60);
        canvas.restore();
            this.model.draw(this.x, this.y + this.z - this.h / 2);
        if (this.health < this.maxHealth - 1) {
            canvas.fillStyle = "black";
            canvas.fillRect(this.x - 32, this.y - 2, 64, 14);
            canvas.fillStyle = "green";
            canvas.fillRect(this.x - 30, this.y - 0, 60 * this.health / this.maxHealth, 10);
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
    die() {
        this.shouldDelete = true;
        var g = 0.2;
        var x = this.x;
        var y = this.y;
        for (var i = 0; i < 9; i++) {
            var vx = (Math.random() - 0.5) * 4;
            var vy = (Math.random() - 0.5) * 4 - 5;
            this.scene.addEntity(new Particle(x, y, 15, 15, this.color, vx, vy, 40, g));
        }
    }
}