

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

function getKenneyTileImage(char) {
    var tn = getTileNumber(char)
    if(!tn)return;
    tn=""+tn;
    tn = tn.padStart(4,'0')
    return IMAGES["kenney_"+tn] || (IMAGES["kenney_"+tn] = ImageLoader.loadImage(`kenney_inputPromptsPixel16/Tiles/tile_${tn}.png`))
}

function getKenneyTileImageFromKeycode(code) {
    return getKenneyTileImage(keyDisplay(code).toLowerCase());
}