var World = {
  index: 0,
  levelList: [],
  getNextLevel(level) {
    var ind;
    if(level) {
      if(level.level.index == undefined) return null;
      ind = level.level.index +1;
      if(ind == this.levelList.length){
        MainDriver.setScene(new JsScene(new BDScene(new MenuScene)));
      }
    } else {
      ind = this.index;
    }
    var level = LEVELS.getLevelByName(this.levelList[ind]);
    if(level) {
      level.index = ind;
    }
    return level;
  },
  getPrevLevel(level) {
    var ind;
    if(level) {
      ind = level.level.index -1;
    } else {
      ind = this.index;
    }
    var level = LEVELS.getLevelByName(this.levelList[ind]);
    level.index = ind;
    return level;
  }
}

function addLevelList(name,list) {
  World.levelList.push(...list);
}

addLevelList("AnityEntrance", [
]);