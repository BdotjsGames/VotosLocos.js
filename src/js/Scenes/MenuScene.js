class MenuScene extends Scene {
  constructor() {
    super();
    this.addEntity(new ButtonUI("Play", 0.5,0.5, 0.5,0.2,0.2,e=>{
      console.log('pressed');
      MainDriver.setScene(new CharacterCustomizerScene());
      // MainDriver.setScene(new GameSceneBasic());
    })).center().color(250,250,250);
    this.addEntity(new ButtonUI("Options", 0.5,0.7, 0.5,0.1,0.05,e=>{
      MainDriver.setScene(new OptionsScene(this));
      // MainDriver.setScene(new GameSceneBasic());
    })).center().color(250,250,250);
    this.buttonsDown.push([
      Buttons.start, b=>this.driver.setScene(new OptionsScene(this))
    ])
  }
}