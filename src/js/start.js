
window.addEventListener('load', function(e) {
    function start() {
      MainDriver.startWithScene(new LoadingScene());
      ImageLoader.onComplete(function() {
        SOUNDS.onComplete(function() {
          setTimeout(function() {
            // MainDriver.setScene(new SplashScreen(MenuScene));
            if(DEV)
              for(var i=0;i<GameSequence.length;i++) {
                var level = GameSequence[i];
                if(level.debugStartWithThisOne) {
                  MainDriver.setScene(new GameSceneBasic(null,i ))
                  return;
                }
              }
            var controlsScheme = localStorage.getItem('controlsScheme')
            if(!controlsScheme)
              MainDriver.setScene(new ControlsSchemeSelectScene());
            else {
              SelectedSchemeIndex = parseInt(controlsScheme)
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