class Sorter {
    constructor() {
        this.entities = [];
    }
    update(){
        this.entities.forEach(e=>e.update())
        for(var i=0;i<this.entities.length;i++){
            var e = this.entities[i];
            e.update();
            if(e.shouldDelete) {
                this.entities.splice(i);
                i--;
            }
        }
    }
    draw(canvas) {
        this.entities = this.entities.sort((a,b) => b.y-a.y);
        this.entities.forEach(draw);
    }
}