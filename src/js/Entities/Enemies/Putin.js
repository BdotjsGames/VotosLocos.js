// class Putin extends Bot {
class Putin extends Bot {
    constructor(x,y) {
        super(x,y);
        
    }
    initModel(w, h, color,color2) {
        this.model = new PutinModel(w, h,"#f6e1c5", "#d3a684", this);
    }
}