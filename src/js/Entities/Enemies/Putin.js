// class Putin extends Bot {
class Putin extends Bot {
    constructor(x,y) {
        super(x,y);
        this.health = this.maxHealth = 60;
        this.hitResistence = 100;
    }
    initModel(w, h, color,color2) {
        this.model = new PutinModel(w, h,"#f6e1c5", "#d3a684", this);
    }
}