

class CreditsScene extends Scene {
    constructor() {
      super();
      canvas.backgroundImage = IMAGES.Purlsey1
      this.useTouchAsMouse = true;
      MusicHandler.resume();
      MusicHandler.playMusic(SOUNDS.cumbia2);
     
  
      if(localStorage.getItem("difficultyCompleted1")) {
        var sticker = this.addEntity(new DrawableImage(520,70,IMAGES.IVotedSticker, 1.5)).addMorph('bam', new MorphGroup(null, [
          [{alpha: 0.5, scaleW: 3, scaleH: 3, dy: 50}, 1],
          [{scaleW: 1, scaleH:1, alpha: 1, dy: 0}, 100, MorphType.easeInQuart],
          [{scaleW: 1.1, scaleH:1.1, alpha: 1, dy: 0}, 2],
          [{scaleW: 1, scaleH:1, alpha: 1, dy: 0}, 2],
          [{scaleW: 1.1, scaleH:1.1, alpha: 1, dy: 0}, 2],
          [{scaleW: 1, scaleH:1, alpha: 1, dy: 0}, 2],
        ]), true)
        sticker.pivotX = 0;
        sticker.pivotY = 0;
      }    

      var creditsLines = [
        "CONTRATULATIONS",
      ]

      this.addEntity(new DrawableText("CONGRATULATIONS", 0.5,1.2,0.8,0.3,0.1))
      .setTrueCoords(false)
      // .center()
      .color(255,255,2555)
      .Stroke(20,'#000').addMorph("", new Morph(null, {}, {y: 0.3}, 400, MorphType.linear), true)

      frameCount = 0;
    }
    update() {
        super.update();
        if(frameCount==600) {
            this.driver.fadeToBlack(120, () => {
                MusicHandler.stop();
                this.draw = canvas => {
                    canvas.fillStyle = "#000";
                    canvas.fillRect(0,0,CE.width,CE.height)
                }
                setTimeout( () => {
                    this.driver.transitionToScene(new MenuScene(), 90, 240)
                }, 1000)
            });
            // this.driver.transitionToScene(new MenuScene(), 120)
        }
    }
    addSelectableButton(b) {
      b.backColor = "#bbb6";
      return super.addSelectableButton(b);
    }
  }