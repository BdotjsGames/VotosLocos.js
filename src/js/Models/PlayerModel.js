class PlayerModel extends PlatformerModel {
  constructor(parent) {
    super(20,40,"#5b6ee1","#693bff",parent,12);
    // super(20,40,"#e88a36","#b05b2c",parent,12);
    // this.arm1.createAfter(-2,2,new Line(0,0,0,5,"round",5,"black"));
  }
  createOptions(){
    super.createOptions({
        canWheelchair: true,
    });
}
  draw(x,y){
    super.draw(x,y);
  }
}