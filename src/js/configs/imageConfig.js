IMAGES.VotosLocosLogo = ImageLoader.loadImage('VotosLocosLogo2.png');

IMAGES.backgroundSky = ImageLoader.loadImage('backgroundSky.png');
IMAGES.backgroundCity = ImageLoader.loadImage('skylines/cityBackground.png');
IMAGES.Purlsey1 = ImageLoader.loadImage('Pursley/VotosCover_04.png');
IMAGES.Purlsey1S = ImageLoader.loadImage('Pursley/Pursley1-sharp.png');
IMAGES.Purlsey2 = ImageLoader.loadImage('Pursley/Pursley2.png');
IMAGES.Purlsey2S = ImageLoader.loadImage('Pursley/Pursley2-sharp.png');
canvas.backgroundImage = IMAGES.Purlsey1;

IMAGES.cloud = ImageLoader.loadImage('cloud2.png');

IMAGES.LouChalibre = ImageLoader.loadImage('Luchador2.png');
IMAGES.ChomperTop = ImageLoader.loadImage('ChomperTop.png');
IMAGES.drone = ImageLoader.loadImage('drone.png');

IMAGES.wheelchairBack = ImageLoader.loadImage('wheelchairBack.png');
IMAGES.wheelchairWheelFront = ImageLoader.loadImage('wheelchairWheelFront.png');

IMAGES.skateBoard = ImageLoader.loadImage('skateBoard.png');

IMAGES.ballotItem = ImageLoader.loadImage('ballotItem.png')
// IMAGES.registrarOffice = ImageLoader.loadImage('RegistrarOffice.png')
IMAGES.rallyBackgroundEntrance = ImageLoader.loadImage('RallyBackgroundEntrance.png')
IMAGES.lowRider = ImageLoader.loadImage('lowRider2.png')

IMAGES.desk = ImageLoader.loadImage('desk.png')
IMAGES.deskFront = ImageLoader.loadImage('DeskFront.png')
IMAGES.rallyTableBase = ImageLoader.loadImage('rallyTableBase.png')
IMAGES.rallyTableBaseBack = ImageLoader.loadImage('rallyTableBaseBack.png')

var tablesNames = `AAPI, Lavender,
Able2Vote,           PoliceOversight,
AffordableHousing,   PunkTheVote,
ArabAmericans,       VietNow,
BlackVotesMatterv2,  VoteBlueDemon,
ClimateAction,       YoungAmericans,
GrrrlVote,           getOutTheVote,
KeepOnCrossin`

IMAGES.rallyTables = tablesNames.split(',').map(src=>src.trim()).map(src => IMAGES[src] = ImageLoader.loadImage('rallyTables/'+src+'.png'))
// IMAGES.rallyTables = [
//     IMAGES.rallyTableGetOutTheVote = ImageLoader.loadImage('rallyTables/getOutTheVote.png'),
    
// ]



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

function toRgbRecur(listOfHexString) {
    return listOfHexString.map(entry => {
        if(Array.isArray(entry)) {
            return toRgbRecur(entry)
        }
        return rgb(entry)
    })
}

var PALLETE_KEY = {
    skin: {
        label: 'skin', 
        inputHexes: [rgb("#ffe0b7"), rgb("#fca570")],
        //creates 3 alternatives with default skin replaced with the following colors:
        mapping: toRgbRecur([
            // ['#e88a36','#b05b2c'],
            // ['#673931', '#271f1b'],
            // ['#ffe0b7', "#fca570"],
            ['#fbf236', "#222034"],

            ["#f8d262", "#c5802f"],
            ["#59483e", "#342821"],
            ["#986b47", "#613d28"],
            ["#dec3a1", "#c0916b"],
            ["#f6e1c5", "#d3a684"],
            ["#639bff", "#5b6ee1"],
            // ["#ffffff", "#000000"],
        ])
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


IMAGES.trollHeadOptions = [
    IMAGES.trollHead1 = ImageLoader.loadImage('TrollHead2.png'),
]

IMAGES.trollTorsoOptions = [
    IMAGES.trollTorso1 = ImageLoader.loadImage('TrollTorso1.png'),
]


IMAGES.trollArmOptions = [
    IMAGES.trollArm1 = ImageLoader.loadImage('TrollArm3.png'),
]

IMAGES.putinHeadOptions = [
    IMAGES.putinHead1 = ImageLoader.loadImage('PutinHead1.png'),
]

IMAGES.putinTorsoOptions = [
    IMAGES.putinTorso1 = ImageLoader.loadImage('PutinTorso1.png'),
]

IMAGES.putinSkirtOptions = [
    IMAGES.putinShorts1 = ImageLoader.loadImage('PutinShorts1.png'),
    IMAGES.putinShorts2 = ImageLoader.loadImage('PutinShorts2.png'),
]


// IMAGES.drone = ImageLoader.loadImage('drone.png');
IMAGES.drone = ImageLoader.loadImage('RussianBot1.png');
IMAGES.GoArrow = ImageLoader.loadImage('GoArrow.png');


IMAGES.highFivePow = ImageLoader.loadImage('highFivePow.png');
IMAGES.pow = ImageLoader.loadImage('pow.png');
IMAGES.whiteFlash = ImageLoader.loadImage('flashExplosion.png');
IMAGES.redFlash = ImageLoader.loadImage('redFlash.png');


IMAGES.headOptions = [
    IMAGES.baseHead1    = ImageLoader.loadImage("baseHead3.png", PALLETE_KEY.skin),
    IMAGES.baseHead2    = ImageLoader.loadImage("baseHead4.png", PALLETE_KEY.skin),
    IMAGES.baseHead3    = ImageLoader.loadImage("baseHead5.png", PALLETE_KEY.skin),
    IMAGES.baseHead4    = ImageLoader.loadImage("baseHead6.png", PALLETE_KEY.skin),
    IMAGES.baseHead7    = ImageLoader.loadImage("baseHead7.png", PALLETE_KEY.skin),
    IMAGES.baseHead8    = ImageLoader.loadImage("baseHead8.png", PALLETE_KEY.skin),
    IMAGES.baseHead9    = ImageLoader.loadImage("baseHead9.png", PALLETE_KEY.skin),
    IMAGES.baseHead10   = ImageLoader.loadImage("baseHead10.png", PALLETE_KEY.skin),
    IMAGES.baseHead11   = ImageLoader.loadImage("baseHead11.png", PALLETE_KEY.skin),
    IMAGES.baseHead12   = ImageLoader.loadImage("baseHead12.png", PALLETE_KEY.skin),
    // IMAGES.baseHead13   = ImageLoader.loadImage("baseHeadOld.png", PALLETE_KEY.skin),
    IMAGES.wrestlerHead1    = ImageLoader.loadImage("baseHeadWrestler.png", PALLETE_KEY.skin),
    IMAGES.wrestlerHead2    = ImageLoader.loadImage("baseHeadWrestler2.png", PALLETE_KEY.skin),
    // IMAGES.baseHead2    = ImageLoader.loadImage("baseHead2.png"),
    // IMAGES.baseHead3    = ImageLoader.loadImage("baseHead3.png")
]
IMAGES.baseEyes1    = ImageLoader.loadImage("baseEyes1.png")
IMAGES.pupils1      = ImageLoader.loadImage("pupils1.png")
IMAGES.hairOptions = [
    null,
    IMAGES.hairWillie         = ImageLoader.loadImage("hairWillie.png"),
    IMAGES.hair1         = ImageLoader.loadImage("hair1.png", PALLETE_KEY.hair),
    IMAGES.hair2         = ImageLoader.loadImage("hair2.png", PALLETE_KEY.hair),
    IMAGES.hair3         = ImageLoader.loadImage("hair3.png", PALLETE_KEY.hair),
    IMAGES.hair4         = ImageLoader.loadImage("hair4.png", PALLETE_KEY.hair),
    IMAGES.hair5         = ImageLoader.loadImage("hair5.png", PALLETE_KEY.hair),
    IMAGES.hair6         = ImageLoader.loadImage("hair6.png", PALLETE_KEY.hair),
    IMAGES.hair7         = ImageLoader.loadImage("hair7.png", PALLETE_KEY.hair),
    IMAGES.hair8         = ImageLoader.loadImage("hair8.png", PALLETE_KEY.hair),
    IMAGES.hair9         = ImageLoader.loadImage("hair9.png", PALLETE_KEY.hair),
    IMAGES.hairMed         = ImageLoader.loadImage("hairMed.png", PALLETE_KEY.hair),
    IMAGES.hairLong         = ImageLoader.loadImage("hairLong.png", PALLETE_KEY.hair),
    IMAGES.hairLong2         = ImageLoader.loadImage("hairLong2.png", PALLETE_KEY.hair),
    // IMAGES.hair1Y        = ImageLoader.loadImage("hair1Y.png"),
    // IMAGES.hair2Y        = ImageLoader.loadImage("hair2Y.png"),
    // IMAGES.hair3Y        = ImageLoader.loadImage("hair3Y.png"),
    IMAGES.hairMohawk    = ImageLoader.loadImage("hairMohawk.png", PALLETE_KEY.hair),
    IMAGES.hairAfro      = ImageLoader.loadImage("hairAfro.png", PALLETE_KEY.hair),
    IMAGES.hairCholo      = ImageLoader.loadImage("hairCholo2.png", PALLETE_KEY.hair),
    IMAGES.hijab         = ImageLoader.loadImage("hijab.png", PALLETE_KEY.hair),
    // IMAGES.sombrero         = ImageLoader.loadImage("sombrero.png", PALLETE_KEY.hair),
    // IMAGES.hairEars2         = ImageLoader.loadImage("hairAnimalEars2.png", PALLETE_KEY.hair),
]

IMAGES.glassesOptions = [
    null,
    IMAGES.sunglasses      = ImageLoader.loadImage("sunglasses.png"),
    IMAGES.glasses1      = ImageLoader.loadImage("glasses1.png"),
    IMAGES.glassesFrames      = ImageLoader.loadImage("glassesFrames.png"),
    IMAGES.glassesCatsEye1      = ImageLoader.loadImage("glassesCatsEye1.png"),
    IMAGES.glassesCatsEye2      = ImageLoader.loadImage("glassesCatsEye2.png"),
    IMAGES.glassesRose1      = ImageLoader.loadImage("glassesRose1.png"),
    IMAGES.glassesRose2      = ImageLoader.loadImage("glassesRose2.png"),
    IMAGES.glassesCrescent1      = ImageLoader.loadImage("glassesCrescent1.png"),
    IMAGES.glassesGoatee      = ImageLoader.loadImage("glassesGoatee.png", PALLETE_KEY.hair),
    IMAGES.hairEars1         = ImageLoader.loadImage("hairAnimalEars1.png", PALLETE_KEY.hair),
    // IMAGES.animalEars3         = ImageLoader.loadImage("animalEars3.png", PALLETE_KEY.hair),
    IMAGES.animalEars4         = ImageLoader.loadImage("animalEars4.png", PALLETE_KEY.hair),

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
    IMAGES.armWillie = ImageLoader.loadImage('armWillie.png'),
    IMAGES.armBare = ImageLoader.loadImage('armBare.png', PALLETE_KEY.skin),
    IMAGES.armPlaidJacket = ImageLoader.loadImage("armPlaidJacket.png", PALLETE_KEY.skin),
    IMAGES.armLeatherJacket = ImageLoader.loadImage("armLeatherJacket.png", PALLETE_KEY.skin),
    IMAGES.armMilitary = ImageLoader.loadImage("armMilitary.png", PALLETE_KEY.skin),
    IMAGES.armBlouse = ImageLoader.loadImage('armBlouse.png', PALLETE_KEY.skin),
    IMAGES.armBare,
    IMAGES.armBare,
    IMAGES.armBare,
]
IMAGES.torsoOptions = [
    IMAGES.torsoTie        = ImageLoader.loadImage("torsoTie.png"),
    IMAGES.torsoVLTee        = ImageLoader.loadImage("torsoVLTee.png"),
    IMAGES.torsoVLTeeF        = ImageLoader.loadImage("torsoVLTeeF.png"),
    IMAGES.torsoPlaid        = ImageLoader.loadImage("tosoPlaid.png"),
    IMAGES.torsoWillie        = ImageLoader.loadImage("torsoWillie.png"),
    IMAGES.torsoTankF        = ImageLoader.loadImage("torsoTankF.png", PALLETE_KEY.skin),
    IMAGES.torsoPlaidJacket        = ImageLoader.loadImage("torsoPlaidJacket.png", PALLETE_KEY.skin),
    IMAGES.torsoLeatherJacket        = ImageLoader.loadImage("torsoLeatherJacket.png", PALLETE_KEY.skin),
    IMAGES.torsoMilitary        = ImageLoader.loadImage("torsoMilitary.png", PALLETE_KEY.skin),
    IMAGES.torso2        = ImageLoader.loadImage("torso2.png"),
    // IMAGES.torso2Sk        = ImageLoader.loadImage("torso2Sk.png"),
    IMAGES.torso3        = ImageLoader.loadImage("torso3.png"),
    IMAGES.torso3        = ImageLoader.loadImage("torso4.png"),
    // createTorso(4),
    // createTorso(8),
    // createTorso(12),
]


IMAGES.buildings = [
    IMAGES.buildingBrickWall = ImageLoader.loadImage("buildingBrickWall.png"),
    IMAGES.buildingBrickWall2 = ImageLoader.loadImage("buildingBrickWall2.png"),
    IMAGES.buildingBlock = ImageLoader.loadImage("buildingBlock.png"),
    IMAGES.buildingBlock2 = ImageLoader.loadImage("buildingBlock2.png"),
    IMAGES.buildingBlock3 = ImageLoader.loadImage("buildingBlock3.png"),
    IMAGES.tree1 = ImageLoader.loadImage("Tree/Tree2.png"),
    IMAGES.tree1 = ImageLoader.loadImage("Tree/Tree3.png"),
    IMAGES.downB = ImageLoader.loadImage("Buildings/DownB.png"),
    IMAGES.downB2 = ImageLoader.loadImage("Buildings/DownB2.png"),
    IMAGES.Building1 = ImageLoader.loadImage("Buildings/Building.png"),
    IMAGES.Building2 = ImageLoader.loadImage("Buildings/Building2.png"),
    IMAGES.Building3 = ImageLoader.loadImage("Buildings/Building3.png"),
    IMAGES.Building4 = ImageLoader.loadImage("Buildings/Building4.png"),
    // createHouse(),
]
// IMAGES.backgroundTileStreetSidewalk    = ImageLoader.loadImage("backgroundTileStreetSidewalk.png")
IMAGES.backgroundTileStreetSidewalk    = ImageLoader.loadImage("backgroundTileStreetSidewalk2.png")
IMAGES.backgroundTileOfficeInterior    = ImageLoader.loadImage("backgroundTileOfficeInterror.png")
IMAGES.backgroundTileGrass    = ImageLoader.loadImage("backgroundTileGrass.png")


IMAGES.trashCan = ImageLoader.loadImage("trashCan.png")
IMAGES.trashCanSmashed = ImageLoader.loadImage("trashCanSmashed.png")



IMAGES.skirts = [
    null,
    IMAGES.skirt1 = ImageLoader.loadImage("skirt.png"),
    IMAGES.skirt2 = ImageLoader.loadImage("skirtSk.png"),
    IMAGES.williePants = ImageLoader.loadImage("williePants.png"),
    IMAGES.boot1 = ImageLoader.loadImage('boot1.png'),
    
]
IMAGES.boot1.isShoe = true;

IMAGES.williePants.isWilliePants = true;
IMAGES.tutu = ImageLoader.loadImage('tutu2.png', PALLETE_KEY.skirt, swaps => {
    // IMAGES.skirts.push(IMAGES.rainbowSkirt = swaps[0])
    IMAGES.skirts=IMAGES.skirts.concat(swaps);
})

IMAGES.customOutfits = [
    {
        name: "Willie",
        options: [
            {
                name: 'face',
                value: IMAGES.willieMask = ImageLoader.loadImage("willieMask.png"),
            }
        ]
    }
]

IMAGES.boot = ImageLoader.loadImage('fist.png')
// IMAGES.tilesetPortalRoom    = ImageLoader.loadImage("tilesetPortalRoom.png")
// IMAGES.tilesetCurleys       = ImageLoader.loadImage("tilesetCurleys.png")
// IMAGES.tilesetVents         = ImageLoader.loadImage("tilesetVents.png")
// IMAGES.tilesetOutside       = ImageLoader.loadImage("tilesetOutside.png")
// IMAGES.tilesetLab           = ImageLoader.loadImage("tileSetLab.png")

IMAGES.projectiles = [
    IMAGES.redKunai = ImageLoader.loadImage('redKunai.png'),
    IMAGES.redNinjaStar = ImageLoader.loadImage('redNinjaStar.png'),
]


IMAGES.house1 = ImageLoader.loadImage('house/house.png')
IMAGES.houseBackground = ImageLoader.loadImage('house/houseBackground.png')
IMAGES.house1Open = ImageLoader.loadImage('house/houseOpenDoor.png')

IMAGES.door = ImageLoader.loadImage('house/door.png');
IMAGES.doorOpen = ImageLoader.loadImage('house/doorOpen.png');


IMAGES.waterBottle = ImageLoader.loadImage('Items/WaterBottle.png');

IMAGES.touchDpad = ImageLoader.loadImage('touchUI/dpad.png');
IMAGES.touchDpadRed = ImageLoader.loadImage('touchUI/dpadRed.png');

IMAGES.QAnonHead = ImageLoader.loadImage('enemies/QAnonShamon/head1.png');

IMAGES.MagaMargeHead = ImageLoader.loadImage('enemies/MagaMarge/head1.png');
IMAGES.MagaMargeTorso = ImageLoader.loadImage('enemies/MagaMarge/torso1.png');
IMAGES.MagaMargeArm = ImageLoader.loadImage('enemies/MagaMarge/arm1.png');


IMAGES.LizardPeopleHead = ImageLoader.loadImage('enemies/LizardPeople/head1.png');
IMAGES.LizardPeopleTorso = ImageLoader.loadImage('enemies/LizardPeople/torso1.png');
IMAGES.LizardPeopleArm = ImageLoader.loadImage('enemies/LizardPeople/arm1.png');

IMAGES.hitEffect1 = ImageLoader.loadImage('effects/hitEffect1.png')
IMAGES.hitEffect2 = ImageLoader.loadImage('effects/hitEffect2.png')


IMAGES.stars = ImageLoader.loadImage('effects/stars.png');

IMAGES.horse = ImageLoader.loadImage('horse/horse.png');


IMAGES.tacosLocos = ImageLoader.loadImage('rallyTables/TacosLocos.png');
IMAGES.tacosLocosBack = ImageLoader.loadImage('rallyTables/TacosLocosBack.png');
IMAGES.tacosLocosBack = ImageLoader.loadImage('rallyTables/TacosLocosBack.png');
IMAGES.CarumbaHead = ImageLoader.loadImage('CarumbaHead.png');


IMAGES.parkStage = ImageLoader.loadImage('parkStage.png');

