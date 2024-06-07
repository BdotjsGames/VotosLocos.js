class KnockableDoor extends Drawable {
    constructor(x,y) {
        super(x,0,60,120);
        highFivers.push(this);

        this.addMorph('knock', new MorphGroup(null, [
            [{alpha: 0.5, scaleW: 1.1, scaleH: 1.1}, 1],
            [{scaleW: 1.23, scaleH:1.23, alpha: 1, dy: -.01}, 10],
            [{scaleW: 1, scaleH:1, alpha: 1, dy: 0}, 5, null, this.onKnock.bind(this)],
          ]));
        this.highFiveDistance = 200;
    }
    onKnock() {

    }
    beHighFived() {
        SOUNDS.knockSound.play();
      this.morphs['knock'].activate();

    }
    drawShape(canvas) {
      canvas.strokeStyle = Color.darken(this, .8).color;
      canvas.lineWidth = 10;
      canvas.strokeRect(0,-this._h,this._w,this._h);
      canvas.fillRect(0,-this._h,this._w,this._h);
      canvas.fillStyle = Color.darken(this).color;
      canvas.fillRect(0,-this._h,this._w/4,this._h);
      canvas.fillStyle = Color.lighten(this).color;    
      canvas.fillRect(this._w*.4,this._h/10-this._h,this._w/2,this._h/4);   
    }
}