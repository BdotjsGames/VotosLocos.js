var selectedCandidate;
class VoterGuideScene extends AdditiveScene {
    constructor(prev) {
        super(prev);
        var numCandidates = 4;
        var x = 0.5;
        var y = 0.4;
        var dx = 0.5;
        var dy = 0;
        var w = 0.5;
        var h = 0.1
        var s = 0.05;
        this.pages = [];
        this.addEntity((new Drawable(0,0,100,100)
        .setTrueCoords(false).center().color(255,255,255)))
        for(var i=0;i<numCandidates;i++) {
            
            var btn = new ButtonUI('candidate '+(i+1), x,y,w,h,s, () =>{
                // this.back();
                this.driver.setScene(new ConfirmationScene(this,
                    "Select this Candidate?",
                    [
                        {
                            name: "yes",
                            callback: b=>{
                                this.back()
                                saveCandidate(btn.model);
                                
                            }
                        },
                        {
                            name: "no",
                            callback: b=>b.scene.back()
                        },
                    ]
                ))
            }).center();
            var model = new PlatformerModel(20, 40, '#bbb', '#666',null,null,{
                torsoOptions:[IMAGES.torsoTie],
                armOptions:[IMAGES.armSuit1],
                glassesOptions: []
            })
            btn.model = model;
            model.body.y = -50
            btn.children.push(model)
            
            this.addSelectableButton(btn, DIRECTION.right);
            x+=dx;
            y+= dy;
            this.pages.push(btn);   
            
            var description = randomFromList(dialogueIndexedByScene["candidates description"])[languageString];
            // var description = randomFromList([
            //     "This candidate likes cheese",
            //     "For America!",
            //     "Health care for all!",
            //     "Tacos for everyone!"
            // ])
            var yy = 0.2;
            btn.children.push(new Drawable(0,0,100,100)
                .setTrueCoords(false).center().color(255,255,255))
            
            description.split(',').forEach(line => {
                var text = new DrawableText(line, 0.6,yy,0.8,0.1,0.03)
                .setTrueCoords(false)
                .center()
                .color(0,0,0)
                text.update();
                btn.children.push(text);
                yy+=0.07;
            })
            
        }
        this.pages[0].setSelected()
    }
    setSelected(btn) {
        super.setSelected(btn);
        var x = btn.x;
        this.pages.forEach(page => {
            page.x += (0.25-x)
            page.model.body.x = 0.25 * CE.width
        })
    }
}