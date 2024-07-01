class KnockableDoor extends DrawableImage {
    constructor(x,y) {
        super(x,y,IMAGES.door,3.5);
        this.pivotX -= 60;
        this.pivotY -= 160;
        this.z = 12;
        this.addMorph('knock', new MorphGroup(null, [
            [{
              scaleW: 1.01,
              scaleH: 1.01,
              angle: .05
            }, 1],
            [{
              // scaleW: 1.23, scaleH:1.23, dy: -.01, 
              angle: -.05}, 2],
            [{scaleW: 1, scaleH:1, dy: 0,angle:0}, 5, null, this.onKnock.bind(this)],
          ]));
        

        this.interactable = true;

        this.isInteractable = true;
        this.interactablesRange = 100;
        this.knocksRequired = 3;
        this.knocks = 0;
    }
    onKnock() {
      this.knocks++;
      if(this.knocks>=this.knocksRequired) {
        this.image = IMAGES.doorOpen;
        this.isInteractable = false;
        this.createFollower();
      }
    }
    createRefuser() {
      var npc = new HighFiver(this.x,this.y-10);
      npc.shouldSceneCollide = false;
      npc.getInputs = () => {}
      this.scene.addEntity(npc);



      this.scene.playDialogue([
        {person: npc, text: 'hi'},
        {person: npc, text: 'no thanks'},
        {onStart: ()=>npc.shouldDelete = true}
      ], true, () => {
        this.image = IMAGES.door;
      })
    }
    createFollower() {
      var npc = new HighFiver(this.x,this.y-10);
      npc.shouldSceneCollide = false;
      npc.getInputs = () => {}
      this.scene.addEntity(npc);


      npc.obj = npc;
      this.scene.playDialogue([
        {person: npc, text: 'hi'},
        {person: npc, text: 'lets go!'},
        {person: npc, set: {my: 1}, waitFor: 20},
        {onStart: ()=>npc.startFollow(this.player, 80)}
      ], true, () => {
        this.image = IMAGES.door;
      })
    }
    onInteract(player) {
      this.player = player;
        SOUNDS.knockSound.play();
      this.morphs['knock'].activate();

    }
}