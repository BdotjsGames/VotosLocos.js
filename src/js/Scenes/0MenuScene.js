class MenuScene extends Scene {
  constructor() {
    super();
    this.addEntity(new ButtonUI("Play", 0.5,0.5, 0.5,0.2,0.2,e=>{
      console.log('pressed');
      MainDriver.setScene(new GameSceneBasic());
    })).center().color(250,250,250);
  }
}