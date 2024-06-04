class ModelEditorScene extends Scene {
    constructor() {
        super();
        this.gui = [];

        this.loadModel(new PlatformerModel(20,40,"darkgrey","blue",{
            dx:1,vx:10,vy:0,
            mx: 0, 
            moving: true,
        }));
    }
    loadModel(model) {
        this.model = model;
        model.moving = true;
        model.grounded = true;
        this.entities = [];
        // this.addEntity(model);
        var i = 0;
        var s = 0.04;
        model.traverseLimbs(l=>{
            this.addEntity(new ButtonUI(i, 0,i*s,s,s,s,b=>{
                this.selectLimb(b.limb);
            })).limb = l;
            i++;
        })
    }
    selectLimb(l) {
        this.selectedLimb = l;
        window.selectedLimb = l;
    }
    update() {
        super.update();
        this.model.parent.vx = (mouse.x-CE.width/2)/(CE.width);
        this.model.parent.dx = Math.sign(this.model.parent.vx);
        this.model.update();
        var axes = getAxes();
        if(this.selectedLimb) {
            this.selectedLimb.x += axes.inputX;
            this.selectedLimb.y += axes.inputY;
        }
    }
    draw(canvas) {
        super.draw(canvas);
        this.model.draw(canvas, CE.width/2,CE.height/2);
    }
}