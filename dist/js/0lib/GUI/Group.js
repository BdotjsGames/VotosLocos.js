class Group extends Drawable {
    constructor(x,y) {
        super(x,y,0,0);
        this.entities = []
    }
    addEntity(entity) {
        this.entities.push(entity);
        return entity;
    }
    drawShape(canvas) {
        this.entities.forEach(e=>e.draw(canvas));
    }
    update() {
        // this.entities.forEach(e=>e.update());
        for(var i=0;i<this.entities.length;i++){
            var e = this.entities[i];
            e.update();
            if(e.shouldDelete) {
                this.entities.splice(i);
                i--;
            }
        }
    }
}