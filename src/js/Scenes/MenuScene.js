class MenuScene extends Scene {
  constructor() {
    super();
    canvas.backgroundImage = IMAGES.Purlsey1
    this.useTouchAsMouse = true;
    MusicHandler.playMusic(SOUNDS.norteno);
    // for(var i=0;i<10;i++) {
    //   var x = CE.width*Math.random();
    //   var y = CE.height*Math.random()/4;
    //   var cloud = this.addEntity(new ImageDrawable(IMAGES.cloud, x,y))
    //   cloud.vx = Math.random();
    //   cloud.update = function() {
    //     this.x += this.vx;
    //     if(this.x-this.w>CE.width) this.x=-this.w*2;
    //   }
    // }
    // this.addEntity(new DrawableText("VOTOS LOCOS", 0.5,0.1,0.8,0.3,0.2))
    //   .setTrueCoords(false)
    //   // .center()
    //   .color(0,255,0)
    //   .Stroke(20,'#000');
    this.addEntity(new DrawableImage(0.5,0.35, IMAGES.VotosLocosLogo,4))
      .setTrueCoords(false)
    var x = 0.3
    var savedGame = localStorage.getItem('savedGame') 
    if(savedGame){
      
      this.addSelectableButton(new ButtonUI("CONTINUE", x,0.6, 0.4,0.1,0.05,e=>{
        // console.log('pressed');
        var {model, levelNumber} = loadGameData(savedGame);
        MainDriver.setScene(new GameSceneBasic(model, levelNumber));
        // MainDriver.setScene(new GameSceneBasic());
      })).center().color(250,250,250)
    }
    this.addSelectableButton(new ButtonUI("PLAY", x,0.7, 0.4,0.1,0.05,e=>{
      // console.log('pressed');
      MainDriver.setScene(new CharacterCustomizerScene());
      // MainDriver.setScene(new GameSceneBasic());
    })).center().color(250,250,250)
    // .Stroke(20,"#000")
    this.addSelectableButton(new ButtonUI("OPTIONS", x,0.8, 0.4,0.1,0.05,e=>{
      MainDriver.setScene(new OptionsScene(this));
      // MainDriver.setScene(new GameSceneBasic());
    })).center().color(250,250,250)
    // .Stroke(20,"#000")
    this.buttonsDown.push(
      [Buttons.pause, b=>this.driver.setScene(new OptionsScene(this))],
      [Buttons.start, b=>this.driver.setScene(new CharacterCustomizerScene())],
      [Buttons.cheatForward, b=>this.driver.setScene(new CharacterCustomizerScene())],
    )

    
  }
}