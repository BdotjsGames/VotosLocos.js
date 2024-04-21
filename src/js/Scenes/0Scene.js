
class Scene {
  constructor() {
    this.entities = [];
    this.specialActors = {};
    this.buttonsDown = []
  }
  addSelectableButton(btn, dir=DIRECTION.down) {
    btn = this.addEntity(btn);
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
  draw() {
    this.entities.forEach(function(e) {if(e.draw)e.draw()});
  }
  onLeave() {}
  isActive() {
    return this.driver.isActive(this);
  }
}