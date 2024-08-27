var skipItemPromptsFor = {}
class ItemPickup extends ImageDrawable {
    constructor(itemName, image, x,y,w,h) {
        if(!w)w=image.width;
        if(!h)h=image.height;
        super(image, x,y,w,h);
        this.z=0;
        this.itemName = itemName;
        this.image = image; this.interactable = true;
        this.isInteractable = true;
        this.interactablesRange = 100;
        this.promptOffsetY = -50;
        this.vx=0;
        this.frameCount = 0;
    }
    setScene(scene) {
        this.scene=scene;
        this.scene.interactables.push(this);
    }
    onInteract(player) {
        this.player = player;
        this.onPickup(player);
        if(!this.itemType) {
            this.removeSelf();
        }
    }
    removeSelf() {
        this.shouldDelete = true;
        var i = this.scene.interactables.indexOf(this);
        if(i>=0)
            this.scene.interactables.splice(i,1);
    }
    setItemType(type,count) {
        this.itemType = type;
        this.itemCount = count;
        this.drawShape = type.drawShape;
        this.itemName = type.name;
        if(type.image)this.image= type.image;
    }
    afterPickup(player) {
        if(this.itemType) {
            if(player.item.type==this.itemType) {
                player.item.count += this.itemCount;
                this.removeSelf();
                return;
            }
            var type = player.item.type;
            var count = player.item.count;
            player.item.type = this.itemType;
            player.item.count = this.itemCount;
            if(count>0&&type) {
                this.setItemType(type,count);
            } else {
                this.removeSelf();

            }
        }
    }
    onPickup(player) {
        var count = 'a';
        if(this.itemCount)count=this.itemCount;
        SOUNDS.powerup.play();
        if(skipItemPromptsFor[this.itemName]) {
            return this.afterPickup(player);
        }
        skipItemPromptsFor[this.itemName] = true;
        var itemName = itemPickupTranslations[this.itemName.toLowerCase()][languageString]
        var text = "<color red>" + itemPickupTranslations["itemspickup"][languageString].replace("${count}", count).replace("${this.itemName}", itemName)
        this.scene.playDialogue(
            [
                {text, zoom: 2},
                // {person: this, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in congue erat. Suspendisse nunc ligula, sollicitudin sit amet varius ut, laoreet nec eros. Sed nec leo rutrum, volutpat felis a, varius tellus. Vivamus eu facilisis quam. Nam laoreet sodales commodo. Nunc in semper odio. Ut auctor eros volutpat urna feugiat, tempus auctor urna bibendum. Cras sodales justo non volutpat vestibulum. Morbi vitae tincidunt odio. Curabitur gravida magna non dignissim mollis. Etiam blandit mauris ut sapien venenatis, quis ultrices diam tristique. Proin metus arcu, sagittis ac laoreet at, bibendum non odio."}
                // {person: this, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in congue erat. Suspendisse nunc ligula, sollicitudin sit amet varius ut, laoreet nec eros. Sed nec leo rutrum, volutpat felis a, varius tellus. Vivamus eu facilisis quam. Nam laoreet sodales commodo. Nunc in semper odio. Ut auctor eros volutpat urna feugiat, tempus auctor urna bibendum. Cras sodales justo non volutpat vestibulum. Morbi vitae tincidunt odio. Curabitur gravida magna non dignissim mollis. Etiam blandit mauris ut sapien venenatis, quis ultrices diam tristique. Proin metus arcu, sagittis ac laoreet at, bibendum non odio."}
            ],true, ()=>this.afterPickup(player)
        )

    }
    // update() {
    //     this.scene.players.forEach(p => {
    //         var dx = p.x - (this.x + this.w/2);
    //         var dy = p.y - (this.y + this.h/2);
    //         var adx = Math.abs(dx);
    //         var ady = Math.abs(dy);
    //         if(adx<this.w/2 && ady < this.h/2) {
    //             this.onPickup();
    //         }
    //     })
    // }
    drawShape(canvas) {
        canvas.drawImage(this.image,-this.w/2,-this.h,this.w,this.h);
    }
    draw(canvas) {
        if(this.hidden)return;
        if(!this.image)return;
        canvas.save();
        canvas.translate(this.x,this.y+this.z);
        this.drawShape(canvas, 0);
        canvas.restore();
      }
}