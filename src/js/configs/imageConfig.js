IMAGES.VotosLocosLogo = ImageLoader.loadImage('VotosLocosLogo.png');

IMAGES.backgroundImage = ImageLoader.loadImage('backgroundSky.png');
canvas.backgroundImage = IMAGES.backgroundImage;

IMAGES.cloud = ImageLoader.loadImage('cloud2.png');

IMAGES.LouChalibre = ImageLoader.loadImage('Luchador1.png');
IMAGES.ChomperTop = ImageLoader.loadImage('ChomperTop.png');
IMAGES.drone = ImageLoader.loadImage('drone.png');

IMAGES.wheelchairBack = ImageLoader.loadImage('wheelchairBack.png');
IMAGES.wheelchairWheelFront = ImageLoader.loadImage('wheelchairWheelFront.png');

IMAGES.ballotItem = ImageLoader.loadImage('ballotItem.png')
IMAGES.registrarOffice = ImageLoader.loadImage('registrarOffice.png')
IMAGES.lowrider = ImageLoader.loadImage('lowrider.png')

var rgb = hexToRGB;
function rainbowFunction(data, index, width,height) {
    var x = index/4%width;
    var y = Math.floor(index/4/width);
    var dx = (width/2+2-x);
    var dy = (height/2-y);
    // var rr = dx*dx+dy*dy;
    // var r = Math.sqrt(rr);
    // var darken = r/(width/2);
    var hueQuantize = 12;
    var quantize = 4;
    var h = (x/width*(2-y/20));
    var s = 1;
    var v = 1;//-darken*.3;
    h = Math.floor(h*hueQuantize)/hueQuantize;
    v = Math.floor(v*quantize)/quantize;
    
    return hsvToRgb(h,s,v);
    return rainbowColors[Math.floor((x)/(4+y/20))%rainbowColors.length]
}
rainbowFunction.callable = true;
function rainbowFunction2(data, index, width,height) {
    var x = index/4%width;
    var y = Math.floor(index/4/width);
    var dx = (width/2-x);
    var dy = (height/2-y);
    // var rr = dx*dx+dy*dy;
    // var r = Math.sqrt(rr);
    // var darken = r/(width/2);
    var hueQuantize = 12;
    var quantize = 4;
    // var h = (x/width*(2-y/height));
    var h = (x+y/height*5)/width*2.5;
    var s = 1;
    var v = 1;//-darken*.3;
    h = Math.floor(h*hueQuantize)/hueQuantize;
    v = Math.floor(v*quantize)/quantize;
    
    return hsvToRgb(h,s,v);
    return rainbowColors[Math.floor((x)/(4+y/20))%rainbowColors.length]
}
rainbowFunction2.callable = true;
var hairColors = [

]
function shadingFunction(rgb, data, index,width,height, mappingIndex) {
    var r = rgb.r;
    var g = rgb.g;
    var b = rgb.b;
    var x = index/4%width;
    var y = Math.floor(index/4/width);
    var dx = (width/2+2-x);
    var dy = (25/2-y);
    var rr = dx*dx+dy*dy;
    var radius = Math.sqrt(rr);
    var darken = radius/(width/2);
    // var hueQuantize = 12;
    var quantize = 2;
    // var h = (x/width*(2-y/20));
    // var s = 1;
    var v = 1-darken*.3;
    // h = Math.floor(h*hueQuantize)/hueQuantize;
    v = 1- Math.floor(darken*quantize)/quantize*.3;
    // if(v>0.9)return rgb;
    var bv = (1+v)/2;
    return {
        r: Math.floor(r*v),
        g: Math.floor(g*v),
        b: Math.floor(b*bv),
    };
}

var PALLETE_KEY = {
    skin: {
        label: 'skin', 
        inputHexes: [rgb("#ffe0b7")],
        //creates 3 alternatives with default skin replaced with the following colors:
        mapping: [[rgb('#e88a36')], [rgb('#673931')],[rgb('#ffe0b7')]]
    },
    hair: {
        label: 'hair',
        inputHexes: [rgb("#271f1b")],
        // inputHexes: [-1],
        mapping: [[rgb('#612721')],[rgb('#5b3138')],[rgb('#333333')],[rgb('#666666')],[rgb('#999999')],[rgb('#ffffff')],[rgb('#b9451d')],[rgb('#f8c53a')],[rgb('#d21f0c')],[rgb('#e27285')],[rgb('#4572e3')],[rainbowFunction]],
        post: shadingFunction,
    },
    skirt: {
        label: 'skirt',
        inputHexes: [rgb("#d77bba")],
        // inputHexes: [-1],
        mapping: [[rainbowFunction2],[rgb("#d77bba")]],
        post: shadingFunction,
    }
}

IMAGES.botHeadOptions = [
    IMAGES.botHead = ImageLoader.loadImage('BotHead1.png'),
    IMAGES.botHead2 = ImageLoader.loadImage('BotHead2.png'),
]

IMAGES.botTorsoOptions = [
    IMAGES.botTorso1 = ImageLoader.loadImage('botTorso1.png'),
    IMAGES.botTorso2 = ImageLoader.loadImage('botTorso2.png'),
    IMAGES.botTorso2 = ImageLoader.loadImage('botTorso3.png'),
    IMAGES.botTorso2 = ImageLoader.loadImage('botTorso4.png'),
]


IMAGES.ninjaHeadOptions = [
    IMAGES.ninjaHead1 = ImageLoader.loadImage('NinjaHead1.png'),
]

IMAGES.ninjaTorsoOptions = [
    IMAGES.ninjaTorso1 = ImageLoader.loadImage('NinjaTorso1.png'),
]


// IMAGES.drone = ImageLoader.loadImage('drone.png');
IMAGES.drone = ImageLoader.loadImage('RussianBot1.png');
IMAGES.GoArrow = ImageLoader.loadImage('GoArrow.png');


IMAGES.highFivePow = ImageLoader.loadImage('highFivePow.png');
IMAGES.pow = ImageLoader.loadImage('pow.png');

IMAGES.headOptions = [
    IMAGES.baseHead1    = ImageLoader.loadImage("baseHead1.png"),
    IMAGES.baseHead2    = ImageLoader.loadImage("baseHead2.png"),
    IMAGES.baseHead3    = ImageLoader.loadImage("baseHead3.png")
]
IMAGES.baseEyes1    = ImageLoader.loadImage("baseEyes1.png")
IMAGES.pupils1      = ImageLoader.loadImage("pupils1.png")
IMAGES.hairOptions = [
    IMAGES.hair1         = ImageLoader.loadImage("hair1.png", PALLETE_KEY.hair),
    IMAGES.hair2         = ImageLoader.loadImage("hair2.png", PALLETE_KEY.hair),
    IMAGES.hair3         = ImageLoader.loadImage("hair3.png", PALLETE_KEY.hair),
    IMAGES.hair4         = ImageLoader.loadImage("hair4.png", PALLETE_KEY.hair),
    IMAGES.hair5         = ImageLoader.loadImage("hair5.png", PALLETE_KEY.hair),
    IMAGES.hair6         = ImageLoader.loadImage("hair6.png", PALLETE_KEY.hair),
    IMAGES.hairLong         = ImageLoader.loadImage("hairLong.png", PALLETE_KEY.hair),
    // IMAGES.hair1Y        = ImageLoader.loadImage("hair1Y.png"),
    // IMAGES.hair2Y        = ImageLoader.loadImage("hair2Y.png"),
    // IMAGES.hair3Y        = ImageLoader.loadImage("hair3Y.png"),
    IMAGES.hairMohawk    = ImageLoader.loadImage("hairMohawk.png", PALLETE_KEY.hair),
    IMAGES.hairAfro      = ImageLoader.loadImage("hairAfro.png", PALLETE_KEY.hair),
    IMAGES.hairCholo      = ImageLoader.loadImage("hairCholo2.png", PALLETE_KEY.hair),
    IMAGES.hijab         = ImageLoader.loadImage("hijab.png", PALLETE_KEY.hair),
    null,
]

IMAGES.glassesOptions = [
    null,
    IMAGES.sunglasses      = ImageLoader.loadImage("sunglasses.png"),
    IMAGES.glasses1      = ImageLoader.loadImage("glasses1.png"),
    IMAGES.glassesFrames      = ImageLoader.loadImage("glassesFrames.png"),
    IMAGES.glassesGoatee      = ImageLoader.loadImage("glassesGoatee.png", PALLETE_KEY.hair),
]

IMAGES.mouthSmile        = ImageLoader.loadImage("mouthSmile.png")
IMAGES.mouthFrown        = ImageLoader.loadImage("mouthFrown.png")
IMAGES.mouthOpenDistress = ImageLoader.loadImage("mouthOpenDistress.png");
IMAGES.fist        = ImageLoader.loadImage("fist.png")

IMAGES.armOptions = [
    IMAGES.armSuit1 = ImageLoader.loadImage("armSuit1.png", PALLETE_KEY.skin),
    IMAGES.armVLTee = ImageLoader.loadImage("armVLTee.png", PALLETE_KEY.skin),
    IMAGES.armVLTee,
    IMAGES.armPlaid = ImageLoader.loadImage("armPlaid.png", PALLETE_KEY.skin),
]
IMAGES.bodyOptions = [
    IMAGES.torsoTie        = ImageLoader.loadImage("torsoTie.png"),
    IMAGES.torsoVLTee        = ImageLoader.loadImage("torsoVLTee.png"),
    IMAGES.torsoVLTeeF        = ImageLoader.loadImage("torsoVLTeeF.png"),
    IMAGES.torsoPlaid        = ImageLoader.loadImage("tosoPlaid.png"),
]

IMAGES.buildings = [
    // IMAGES.buildingBrickWall = ImageLoader.loadImage("buildingBrickWall.png"),
    IMAGES.buildingBrickWall2 = ImageLoader.loadImage("buildingBrickWall2.png"),
    IMAGES.buildingBlock = ImageLoader.loadImage("buildingBlock.png"),
    IMAGES.buildingBlock2 = ImageLoader.loadImage("buildingBlock2.png"),
    IMAGES.buildingBlock3 = ImageLoader.loadImage("buildingBlock3.png"),
]
// IMAGES.backgroundTileStreetSidewalk    = ImageLoader.loadImage("backgroundTileStreetSidewalk.png")
IMAGES.backgroundTileStreetSidewalk    = ImageLoader.loadImage("backgroundTileStreetSidewalk2.png")

IMAGES.skirts = [
    null,
    IMAGES.skirt1 = ImageLoader.loadImage("skirt.png"),
    
]
IMAGES.tutu = ImageLoader.loadImage('tutu.png', PALLETE_KEY.skirt, swaps => {
    // IMAGES.skirts.push(IMAGES.rainbowSkirt = swaps[0])
    IMAGES.skirts=IMAGES.skirts.concat(swaps);
})

IMAGES.boot = ImageLoader.loadImage('fist.png')
// IMAGES.tilesetPortalRoom    = ImageLoader.loadImage("tilesetPortalRoom.png")
// IMAGES.tilesetCurleys       = ImageLoader.loadImage("tilesetCurleys.png")
// IMAGES.tilesetVents         = ImageLoader.loadImage("tilesetVents.png")
// IMAGES.tilesetOutside       = ImageLoader.loadImage("tilesetOutside.png")
// IMAGES.tilesetLab           = ImageLoader.loadImage("tileSetLab.png")