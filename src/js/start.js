
window.addEventListener('load', function(e) {
    function start() {
      MainDriver.startWithScene(new LoadingScene());
      ImageLoader.onComplete(function() {
        SOUNDS.onComplete(function() {
          setTimeout(function() {
            // MainDriver.setScene(new SplashScreen(MenuScene));
            MainDriver.setScene(new MenuScene());
            // MainDriver.setScene(new GameSceneBasic());
            // MainDriver.setScene(new ModelEditorScene());
            console.log('%c', devtools);
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