var UsingMouselessSelection = true;

class Scene {
  constructor() {
    this.entities = [];
    this.specialActors = {};
    this.buttonsDown = []
  }
  setSelected(btn){
    if(this.selectedButton && this.selectedButton != btn)this.selectedButton.deselect();
    this.selectedButton = btn;
  }
  addSelectableButton(btn, dir=DIRECTION.down) {
    btn = this.addEntity(btn);
    // btn.shouldSetSelectOnClick = true;
    // btn.shouldSetSelectOnHover = true;
    if(dir==DIRECTION.none) {
      this.buttonToLink = btn;
      return btn;
    }
    if(this.buttonToLink) {
      this.buttonToLink.linkButton(btn, dir)
      btn.linkButton(this.buttonToLink, DIRECTION.opposite(dir))
    }
    this.buttonToLink = btn;
    return btn;
  }
  addEntity (entity) {
    if(entity.setScene)entity.setScene(this);
    else {entity.scene = this};
    this.entities.push(entity);
    return entity;
  }
  init() {}
  update() {
    this.entities.forEach(function(e) {e.update()});
    this.entities = this.entities.filter(function(e){return !e.shouldDelete});
    this.buttonsDown.forEach(b=>{
      if(getButtonDown(b[0]))b[1]();
    })
  }
  draw(canvas) {
    this.entities.forEach(function(e) {if(e.draw)e.draw(canvas)});
  }
  onLeave() {}
  isActive() {
    return this.driver.isActive(this);
  }
}