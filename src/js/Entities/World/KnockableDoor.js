var openedDoors = 0;
class KnockableDoor extends DrawableImage {
    constructor(x,y) {
        super(x,y,IMAGES.door,3.5);
        this.pivotX -= 60;
        this.pivotY -= 160;
        this.z = 24;
        this.addMorph('knock', new MorphGroup(null, [
            [{
              scaleW: 1.01,
              scaleH: 1.01,
              angle: .05
            }, 1],
            [{
              // scaleW: 1.23, scaleH:1.23, dy: -.01, 
              angle: -.05}, 2],
            this.endFrame = [{scaleW: 1, scaleH:1, dy: 0,angle:0}, 5, null, this.onKnock.bind(this)],
          ]));
        

        this.interactable = true;

        this.isInteractable = true;
        this.interactablesRange = 100;
        this.knocksRequired = 3;
        this.knocks = 0;
        this.onOpen = this.createFollower;
    }
    onKnock() {
      if(this.knocks>=this.knocksRequired) {
        this.image = IMAGES.doorOpen;
        this.isInteractable = false;
        openedDoors += 1;
        this.onOpen();
        // this.createEnemies();
        // this.createFollower();
      }
      this.knocking = false;
    }
    setTrap() {
      this.onOpen = this.createEnemies;
      this.endFrame[1]= 20
    }
    createEnemies() {
      var enemies = []
      var enemyType = randomFromList([
        [Troll,3], [LizardPerson,1], [QAnonShamon, 1]
      ])
      for(var i=0;i<enemyType[1];i++) {
        var troll =this.scene.addEntity(new enemyType[0](this.x+20+i*5,this.y-10))
        troll.inputBlocking = true;
        troll.my = .4
        troll.mx = (i-1)*.4
        enemies.push(troll);
      }
      this.player.model.getHit(1)
      this.player.model.impactStop(20)
      // this.player.mx = this.player.x>this.x+20?1:-1

      this.scene.playDialogue([
        {waitFor: 20},
        {onStart: () => enemies.forEach(enemy=>{
          enemy.mx=0
          enemy.my=0
        })},
        {waitFor: 10},
      ], true, () => {
        // this.image = IMAGES.door;
        enemies.forEach(enemy=>enemy.inputBlocking=false)
      })
    }
    createNpc() {
      var npc = new HighFiver(this.x+20,this.y-10);
      npc.shouldSceneCollide = false;
      npc.getInputs = () => {}
      this.scene.addEntity(npc);
      npc.obj = npc;
      npc.dx = this.player.x>npc.x?1:-1;
      npc.x -= npc.dx*20;
      return npc;
    }
    createRefuser() {
      var npc = this.createNpc();
      this.scene.playDialogue(
        dialogueIndexedByScene["refuser"],
      true, () => {
        npc.shouldDelete = true
        this.image = IMAGES.door;
      })
    }
    createFollower() {
      var npc = this.createNpc();
      this.scene.playDialogue(dialogueIndexedByScene['follower'], true, () => {
        npc.startFollow(this.player, 80);
        npc.shouldSceneCollide = true;
        this.image = IMAGES.door;
      })
    }
    onInteract(player) {
      // if(this.knocking)return;
      if(this.knocks>=this.knocksRequired) {
        return;
      }
      this.knocking = true;
      this.knocks++;

      this.player = player;
        SOUNDS.knockSound.play();
      this.morphs['knock'].activate();

    }
}