

// IMAGES.inputTileMap = ImageLoader.loadImage('kenney_inputPromptsPixel16x/Tilemap/tilemap_packed.png')
// x: 272, y:0 esc
// tile number 17-33
//       +34   51-67
function getTileNumber(char) {
    var map = {
        ESC: 'P',
        CapsLock: 'C',
        UpArrow: 'U',
        RightArrow: 'R',
        DownArrow: 'D',
        LeftArrow: 'L',
        Windows: 'W', //or meta
    }
    var order=[
        'PXXXXXXXXXXXX~!@#',
        '1234567890-+=_:',
        'qwertyuiop[]{}\\',
        'Casdfghjkl\'\":;*',
        ' Wzxcvbnm<>?/URDL',
    ]
    for(var j=0;j<order.length;j++) {
        for(var i=0;i<order[j].length;i++) {
            if(order[j][i] == char ) {
                return 17+j*34 + i;
            }
        }
    }
    return 0;
}

IMAGES.inputTileMap = ImageLoader.loadImage('kenney_tiles/tilemap_packed.png')

var KeyTiles = {}

KeyTiles.inputPromptButtonA = getKenneyTileSprite(  4);
KeyTiles.inputPromptButtonB = getKenneyTileSprite(  5);
KeyTiles.inputPromptButtonX = getKenneyTileSprite(  6);
KeyTiles.inputPromptButtonY = getKenneyTileSprite(  7);
KeyTiles.inputPromptButtonR = getKenneyTileSprite(628);
KeyTiles.inputPromptKeyE    = getKenneyTileSprite( 87);
KeyTiles.inputPromptKeyF    = getKenneyTileSprite(123);



function drawTileSprite(canvas, tile, x,y,w,h) {
    canvas.drawImage(tile.image, tile.x,tile.y,tile.w,tile.h,x,y,w,h);
}

function getKenneyTileSprite(index) {
    var tn = index;
    var x = (tn%34)*16;
    var y = Math.floor(tn/34)*16;
    return {
        x,y,w:16,h:16,image:IMAGES.inputTileMap,
    }
}

function getKeyboardKenneyTileSprite(char) {
    var tn = getTileNumber(char)
    var x = (tn%34)*16;
    var y = Math.floor(tn/34)*16;
    return {
        x,y,w:16,h:16,image:IMAGES.inputTileMap,
    }
}


function getKenneyTileImage(char) {
    var tn = getTileNumber(char)
    if(!tn)return;
    tn=""+tn;
    tn = tn.padStart(4,'0')
    return IMAGES["kenney_"+tn] || (IMAGES["kenney_"+tn] = ImageLoader.loadImage(`kenney_inputPromptsPixel16/Tiles/tile_${tn}.png`))
}

function getKeyboardKenneyTileSpriteFromKeycode(code) {
    return getKeyboardKenneyTileSprite(keyDisplay(code).toLowerCase());
}