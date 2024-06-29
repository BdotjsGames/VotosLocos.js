class OptionsScene extends AdditiveScene {
    constructor(prevScene) {
        super(prevScene);
        this.useTouchAsMouse = true;
        this.isOptionsScene = true;
        var x = 0.4
        var y = 0.2;
        var spacing = 0.1;
        var w = 0.3;
        var fontSize = 0.04;
        var h = 0.07;
        this.addSelectableButton(
            new ButtonUI("back",0.05,0.05,0.25,0.07,0.05,e=>{
                this.driver.setScene(this.prevScene);
            }).setSelected()
        )
        this.addSelectableButton(
            new SliderOptionUI('volume',x,y,0.3,0.05,(value,self)=>{
                if(VOLUME!=value) SOUNDS.select.play();
                localStorage.setItem("mainVolume", value);
                setVolume(value);
            }).setTrueCoords(false).setBounds(0,1).setValue(VOLUME)
        )
        y+=spacing;
        this.addSelectableButton(
            new SliderOptionUI('sound effects',x,y,0.3,0.05,(value,self)=>{
                if(VOLUME_SOUND_EFFECTS!=value) SOUNDS.select.play();
                localStorage.setItem("volume_sound_effects", value);
                VOLUME_SOUND_EFFECTS = value;
                DESTINATION_SOUND_EFFECTS.gain.setValueAtTime(value, 0); 
            }).setTrueCoords(false).setBounds(0,1).setValue(VOLUME_SOUND_EFFECTS)
        )
        y+=spacing;
        this.addSelectableButton(
            new SliderOptionUI('music',x,y,0.3,0.05,(value,self)=>{
                if(VOLUME_MUSIC!=value) SOUNDS.select.play();
                localStorage.setItem("volume_music", value);
                VOLUME_MUSIC = value;
                DESTINATION_MUSIC.gain.setValueAtTime(value, 0); 
            }).setTrueCoords(false).setBounds(0,1).setValue(VOLUME_MUSIC)
        )
        y+=spacing;
        var toggles = [
            {
                text: 'Auto Pause ' ,
                startingValue: AUTOPAUSE,
                callback: b=>{
                    AUTOPAUSE = !AUTOPAUSE;
                    // b.text = 'Auto Pause ' + (AUTOPAUSE?'☑':'☐');
                    b.value = AUTOPAUSE;
                    b.ballotMarkFilled = AUTOPAUSE
                    localStorage.setItem("autopause", AUTOPAUSE);
                }
            }
        ]
        toggles.forEach((toggle,i) => {
            // var check = this.addEntity(
            //     new DrawableText(toggle.startingValue?'☑':'☐',x-0.05,y,0.05,h,fontSize*1.2,b=>{
            //         toggle.callback(b);
            //         b.text = b.value?'☑':'☐'
            //     })
            //     .setTrueCoords(false)
            //     .color(255,255,255)
            //     .setAttr("outlineOnHover", false)
            // )
            this.addSelectableButton(
                new ButtonUI("  "+toggle.text,x,y,w,h,fontSize,b=>{
                    toggle.callback(b);
                    // check.text = check.value?'☑':'☐'
                })
                .setTrueCoords(false)
                // .setAttr("outlineOnHover", false)
                .setAttr("pivotX", 0)
                .setAttr("ballotMarkFilled", AUTOPAUSE)
                .color(255,255,255)
            )
            y+=spacing;
        })
        this.addSelectableButton(
            new ButtonUI('controls',x,y,w,h,fontSize,(b)=>{
                this.driver.setScene(new ControlsScene(this))
            })
        )
        y+=spacing;
    }
    update() {
        super.update();
        if(getButtonDown(Buttons.pause)) {
            this.back();
        }
    }
}