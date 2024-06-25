class LowRider {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.scale=3;
        this.back = (ImageLoader.loadImage('lowRiderBack.png'));
        this.wheel = (ImageLoader.loadImage('lowRiderWheel.png'));
        this.front = (ImageLoader.loadImage('lowRiderFront.png'));
        this.frontOffset = 0;
        this.flip=false;
    }
    update() {
        // if(this.bouncing) {
        //     this.frontOffset = Math.sin(framecount * Math.PI/20);
        //     this.frontOffset = this.frontOffset*this.frontOffset*2;
        // }
    }
    drawWheel(canvas,x,y,angle) {
        angle = -this.x
        canvas.save();
        canvas.translate(x+this.wheel.width/2,y+this.wheel.height/2);
        canvas.rotate(angle);
        canvas.drawImage(this.wheel,-this.wheel.width/2,-this.wheel.height/2);
        canvas.restore();
    }
    draw(canvas) {
        canvas.save();
        canvas.translate(this.x,this.y);
        var s = this.scale;
        if(this.flip)s=-s;
        canvas.scale(s,this.scale);
        // canvas.fillStyle = 'red';
        // canvas.fillRect(0,0,100,100);
        canvas.drawImage(this.back,0,0);
        this.drawWheel(canvas,37,48)
        this.drawWheel(canvas,116,50)
        canvas.drawImage(this.front,0,this.frontOffset);
        // this.back.draw(canvas);
        // this.front.draw(canvas);
        canvas.restore();
    }
}