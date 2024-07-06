
class CharacterCustomizerScene extends Scene{
    constructor(model, prevScene) {
        super();
        canvas.backgroundImage = IMAGES.backgroundSky
        this.useTouchAsMouse = true;
        this.prevScene = prevScene; 
        this.backButton = this.addSelectableButton(new ButtonUI("BACK", 0.15,0.1,0.25,0.1,0.05,() => {
            this.model.scaleBoth=1;
            if(this.prevScene) return this.driver.setScene(this.prevScene)
            this.driver.setScene(new MenuScene(this))
        }).center())
        this.optionsGroup = this.addEntity(new Group(0,0));
        
        this.loadModel(model||this.createModel());
        var s = 0.05
        this.playButton = this.addSelectableButton(new ButtonUI("PLAY", 0.5,0.9,0.3,0.1,s,() => {
            this.playGame()
        }).center())

        this.playButton = this.addSelectableButton(new ButtonUI("🎲", 0.2,0.9,0.2,0.1,s,() => {
            this.model.randomize();
        }).center(), DIRECTION.left)

        // this.addEntity(new ButtonUI("⚙️", 0.1,0.1,0.1,0.1,0.05,() => {
        //     this.driver.setScene(new OptionsScene(this))
        // }).center())
        this.buttonsDown.push(
            [Buttons.cheatForward, b=>this.playGame()],
            [Buttons.start, b=>this.playGame()],
        )
    }
    playGame() {
        this.model.scaleBoth=1;
        this.model.modelOptions = this.model.getModelOptions()
        if(this.prevScene) return this.driver.setScene(this.prevScene);
        this.driver.setScene(new GameSceneBasic(this.model))
    }
    update() {
        super.update();
        
        this.model.update();
        if(getButtonDown(Buttons.pause)) {
            this.driver.setScene(new MenuScene(this));
        }
    }
    draw(canvas) {
        var x = CE.width*.3;
        canvas.save();
        canvas.translate(x,CE.height*.6+45);
        canvas.scale(2,1);
        canvas.fillStyle = shadow;
        canvas.fillRect(-30,-30,60,60);
        canvas.restore();
        // canvas.fillStyle = 'black';
        // canvas.fillRect(CE.width/4,CE.height*.6+45, CE.width/2,10);
        this.model.draw(canvas, x, CE.height*.6);
        super.draw(canvas);

    }
    loadMainMenu(btn) {
        // i=0;
        this.entities.forEach(e=>{
            if(e.isButton) {
                if(e.category) {
                    e.hidden = true;
                    e.disabled = true;
                } else {

                    e.hidden = false;
                    e.disabled = false;
                    // if(i==0)e.setSelected();
                    // i++;
                }
            }
        })
        btn.setSelected();
    }
    loadSubMenu(subMenuData) {
        this.entities.forEach(e=>{
            if(e.isButton) {
                e.hidden = true;
                e.disabled = true;
            }
        })
        subMenuData.btns.forEach((btn,i)=>{
            if(i==0)btn.setSelected();
            btn.hidden = false;
            btn.disabled =false;
        })
        
    }
    generateSubMenus(categories) {
        var lastSubMenuData=null;
        categories.forEach(subMenuData => {
            if(lastSubMenuData) {
                lastSubMenuData.nextBtn.callback = b=>{
                    this.loadSubMenu(subMenuData)
                }
            }
            lastSubMenuData = subMenuData;
            this.buttonToLink = null;
            var x = 0.72;
            var y = 0.1;
            var backButton = this.addSelectableButton(new ButtonUI("BACK", x,y,0.25,0.1,0.05,() => {
                this.loadMainMenu(subMenuData.btn);
            }).center())
            backButton.disabled = true;
            backButton.hidden = true;
            backButton.category = subMenuData;
            subMenuData.btns = [backButton];
            y +=0.09;
            var btn;
            subMenuData.options.forEach(customizableOption => {
                    btn = this.addSelectableButton(new BackAndForther(
                    customizableOption.name.toUpperCase(), x,y,0.3,0.08,value=>{
                        customizableOption.index = value;
                        customizableOption.onChange(customizableOption.options[customizableOption.index],customizableOption.index );
                    },
                    (b) => {
                        b.increment();
                        // this.driver.setScene(new ModelOptionSelectorScene(this, this.model, customizableOption));
                    }
                ).setBounds(0,customizableOption.options.length-1).setValue(customizableOption.index)
                );
                btn.category = subMenuData;
                subMenuData.btns.push(btn);
                btn.hidden = true;
                btn.disabled = true;
                y +=0.09;
            })
            btn = this.addSelectableButton(new ButtonUI("next", x,y,0.25,0.1,0.05,() => {
                this.loadMainMenu(subMenuData.btn);
            }).center())
            btn.category = subMenuData;
            subMenuData.nextBtn = btn;
            subMenuData.btns.push(btn);
            btn.hidden = true;
            btn.disabled = true;
            btn.linkButton(backButton, DIRECTION.down);
        });
        lastSubMenuData.nextBtn.text = "PLAY";
        lastSubMenuData.nextBtn.callback = b=>{
            this.playGame();
        }
    }
    createModel() {
        this.model = new PlayerModel();
        this.model.customizableOptions.forEach(option => {
            // if(option.name=="hair") {
                option.index = 0;
                option.onChange(option.options[0], 0)
            // }
          });
          return this.model;
    }
    loadModel(model) {
        // if(this.model&&this.model!=model) {
        //     this.model.shouldDelete = true;
        // }
        this.model = model;
        model.x = CE.width/2;
        model.y = CE.height/2;
        model.scaleBoth = 2
        
        this.optionsGroup.entities = []
        var size = 0.05;
        var plb;// = this.backButton;
        var prb;// = this.backButton;

        i = 0;
        var categoriesList = [];
        var categories = {

        }
        var y = 0.2;
        var x = 0.72;
        var lastSubMenuData;
        model.customizableOptions.forEach((customizableOption) => {
            if(customizableOption.dontShowInOptions)return;
            if(customizableOption.category) {
                if(categories[customizableOption.category]) {
                    categories[customizableOption.category].options.push(customizableOption)
                } else {
                    var subMenuData = categories[customizableOption.category] = {
                        name: customizableOption.category,
                        options: [customizableOption]
                    }
                    categoriesList.push(subMenuData);
                    
                    var btn = this.addSelectableButton(new ButtonUI(customizableOption.category.toUpperCase(),x,y,0.3,0.08,.05, () => {
                        this.loadSubMenu(subMenuData)
                    })).center();
                    subMenuData.btn = btn;
                    
                    // var btn = this.addSelectableButton(new BackAndForther(
                    //     customizableOption.name.toUpperCase(), x,y,0.3,0.08,value=>{
                    //         customizableOption.index = value;
                    //         customizableOption.onChange(customizableOption.options[customizableOption.index],customizableOption.index );
                    //     },
                    //     () => {
                    //         // this.driver.setScene(new ModelOptionSelectorScene(this, this.model, customizableOption));
                    //     }
                    // ).setBounds(0,customizableOption.options.length-1).setValue(customizableOption.index)
                    // );
                    // if(i==0)btn.setSelected();
                    if(i==0)btn.setSelected();
                    y +=0.09;
                    i++
                }
                return;
            }
            var btn = this.addSelectableButton(new BackAndForther(
                customizableOption.name.toUpperCase(), x,y,0.3,0.08,value=>{
                    customizableOption.index = value;
                    customizableOption.onChange(customizableOption.options[customizableOption.index],customizableOption.index );
                },
                (b) => {
                    b.increment();
                    // this.driver.setScene(new ModelOptionSelectorScene(this, this.model, customizableOption));
                }
            ).setBounds(0,customizableOption.options.length-1).setValue(customizableOption.index)
            );
            if(i==0)btn.setSelected();
            y +=0.09;
            i++
            // this.optionsGroup.addEntity(
            //     new DrawableText(customizableOption.name, x,y,0.4,0.1,size)
            //     .setTrueCoords(false)
            //     .center()
            // )
            // var lb = this.optionsGroup.addEntity(
            //     new ButtonUI('<', x-0.1,y,0.1,0.1,size, () => {
            //         customizableOption.index -= 1
            //         if(customizableOption.index<0) {
            //             customizableOption.index = customizableOption.options.length-1;
            //         }
            //         customizableOption.onChange(customizableOption.options[customizableOption.index],customizableOption.index );
            //     }).center()
            // )
            // var rb = this.optionsGroup.addEntity(
            //     new ButtonUI('>', x+0.1,y,0.1,0.1,size, () => {
            //         customizableOption.index += 1
            //         if(customizableOption.index>=customizableOption.options.length) {
            //             customizableOption.index = 0;
            //         }
            //         customizableOption.onChange(customizableOption.options[customizableOption.index],customizableOption.index);
            //     }).center()
            // )
            // lb.linkButton(rb, DIRECTION.right);
            // rb.linkButton(lb, DIRECTION.left);
            // if(plb) {
            //     lb.linkButton(plb, DIRECTION.up);
            //     plb.linkButton(lb, DIRECTION.down);
            // }
            // lb.linkButton(this.backButton, DIRECTION.left);
            // if(prb) {
            //     rb.linkButton(prb, DIRECTION.up);
            //     prb.linkButton(rb, DIRECTION.down);
            // } else {
            //     rb.setSelected();
            // }
            // plb = lb;
            // prb = rb;
        })
        var lastButton = this.buttonToLink;
        this.generateSubMenus(categoriesList);
        this.buttonToLink = lastButton;
        // plb.linkButton(this.playButton, DIRECTION.down);
        // prb.linkButton(this.playButton, DIRECTION.down);
        // this.playButton.linkButton(plb, DIRECTION.up);
    }
}