class Morphable {
    constructor() {
        this.morphs = {};
    }
    update() {
        for(var i in this.morphs) {
          this.morphs[i].update();
          if(this.morphs[i].shouldDelete) {
            delete this.morphs[i];
          }
        }
    }
    addMorph(name, morph, activate, deletes) {
        morph.obj = this;
        morph.deletes = deletes;
        if(activate) morph.activate();
        this.morphs[name] = morph;
        return this;
    }
}