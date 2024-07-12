
window.addEventListener('load', function(e) {
    function start() {
      MainDriver.startWithScene(new LoadingScene());
      ImageLoader.onComplete(function() {
        SOUNDS.onComplete(function() {
          setTimeout(function() {
            // MainDriver.setScene(new SplashScreen(MenuScene));
            // MainDriver.setScene(new CharacterCustomizerScene(new BotModel(20,40,"#666","#444")))
            // return;
            var controlsScheme = localStorage.getItem('controlsScheme')
            if(controlsScheme) {
              setControlsScheme(parseInt(controlsScheme))
            }
            if(DEV)
              for(var i=0;i<GameSequence.length;i++) {
                var level = GameSequence[i];
                if(level.debugStartWithThisOne) {
                  MainDriver.setScene(new GameSceneBasic(null,i ))
                  return;
                }
              }
            if(!controlsScheme)
              MainDriver.setScene(new ControlsSchemeSelectScene());
            else {
              MainDriver.setScene(new MenuScene());
            }
            // MainDriver.setScene(new GameSceneBasic());
            // MainDriver.setScene(new ModelEditorScene());
          },1000);
        })
      })
    }
    start();
    // window.addEventListener('mousedown', start);
    // setTimeout(function(){MainDriver.startWithScene(new OpeningScene())},0);
      // setTimeout(function(){MainDriver.startWithScene(new GameScene())},0);
    // MainDriver.startWithScene(new LoadingScene());
    // ImageLoader.onComplete(function(){
    //   setTimeout(function() {
    //     MainDriver.setScene(new SplashScreen(OpeningScene));
    //   },1000);
    // })
  })