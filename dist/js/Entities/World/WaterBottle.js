class WaterBottle extends ItemPickup{
    constructor(x,y) {
        super('Water Bottle',IMAGES.waterBottle,x,y,32*2,32*2)
        this.healAmount = 30;

    }
    onPickup(player) {
        this.player = player;
        if(skipItemPromptsFor[this.itemName]) {
            return this.afterPickup(player);
        }
        SOUNDS.powerup.play();
        skipItemPromptsFor[this.itemName] = true;
        var itemName = itemPickupTranslations[this.itemName.toLowerCase()][languageString]

        var text1 = "<color red>" + itemPickupTranslations["itempickup"][languageString].replace("${this.itemName}", itemName)
        var text2 = "<color red>" + itemPickupTranslations["fullhealth"][languageString]
        var text3 = "<color red>" + itemPickupTranslations["amounthealed"][languageString].replace("${this.healAmount}", this.healAmount)


        this.scene.playDialogue(
            [
                {text: text1, zoom: 2},
                {text: player.health>=player.maxHealth?text2:text3, zoom: 2},
                // {person: this, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in congue erat. Suspendisse nunc ligula, sollicitudin sit amet varius ut, laoreet nec eros. Sed nec leo rutrum, volutpat felis a, varius tellus. Vivamus eu facilisis quam. Nam laoreet sodales commodo. Nunc in semper odio. Ut auctor eros volutpat urna feugiat, tempus auctor urna bibendum. Cras sodales justo non volutpat vestibulum. Morbi vitae tincidunt odio. Curabitur gravida magna non dignissim mollis. Etiam blandit mauris ut sapien venenatis, quis ultrices diam tristique. Proin metus arcu, sagittis ac laoreet at, bibendum non odio."}
                // {person: this, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in congue erat. Suspendisse nunc ligula, sollicitudin sit amet varius ut, laoreet nec eros. Sed nec leo rutrum, volutpat felis a, varius tellus. Vivamus eu facilisis quam. Nam laoreet sodales commodo. Nunc in semper odio. Ut auctor eros volutpat urna feugiat, tempus auctor urna bibendum. Cras sodales justo non volutpat vestibulum. Morbi vitae tincidunt odio. Curabitur gravida magna non dignissim mollis. Etiam blandit mauris ut sapien venenatis, quis ultrices diam tristique. Proin metus arcu, sagittis ac laoreet at, bibendum non odio."}
            ],true, () => this.afterPickup(player)
        )
    }
    afterPickup(player) {
        player.heal(this.healAmount);
    }
}