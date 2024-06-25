

function createTorso(width=4) {
    // 18 by 21
    var canvasElement = document.createElement('canvas');
    var canvas = canvasElement.getContext('2d');
    canvasElement.width = 32
    canvasElement.height = 32;

    var mx = 18;
    var w = width;
    var sy = 4;
    var ey = 24;
    for(var i=0;i<=32;i++) {
        for(var j=sy;j<=ey;j++) {
            w = width +3.9- (j-14)*(j-14)/20;
            if(j>14)w-=j/20;
            if(j>15)mx = 17;
            w = Math.floor(w);
            if(i<mx-w)continue
            if(i>mx+w)continue
            if(i==mx-w||i==mx+w||j==sy||j==ey) {
                canvas.fillStyle = '#000';
            } else {
                canvas.fillStyle = '#9badb7';
            }
            canvas.fillRect(i,j,1,1);
        }
    }
    return canvasElement
}