var ITEMS = {};
function drawImage(canvas) {
    var s = this.scale || 1;
    var w = this.image.width*s;
    var h = this.image.height*s;
    canvas.drawImage(this.image,-w/2,-h/2,w,h);
}
window.addEventListener('load', function() {
    IMAGES.thrownFlag = ImageLoader.loadImage('Items/flag.png')
    ITEMS.flag = {
        damage: 5,
        throwable: true,
        frameCount:0,
        drawShape: (canvas, speed=1) => {
            var sx = 1;
            var sy = 1;
            if(this.vx<0) sx=-1;
            var f = Math.floor(this.frameCount*speed/4);
            if(f%4>1)sy=-1;
            canvas.scale(sx,sy)
            var frame = f%2;
            var w = 32*2;
            var h = 32*2;
            canvas.drawImage(IMAGES.thrownFlag, 32*frame,0,32,32,-w/2,-h/2,w,h);
        }
    }
    ITEMS.taco = {
        throwable: false,
        onUse: player => {
            player.heal(15)
        },
        image: IMAGES.taco = ImageLoader.loadImage('Items/Taco3.png'),
        drawShape: drawImage
    }
})