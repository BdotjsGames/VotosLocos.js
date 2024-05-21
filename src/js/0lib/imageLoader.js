var IMAGES = {};

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
var hexRegex = new RegExp(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
function hexToRGB(hex) {
    var result = hexRegex.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

var ImageLoader = {
  imagesToLoad: 0,
  loaded: 0,
  onCompleteEvents: [],
  directory: './Assets/images/',
  getLoaded() {
    return ImageLoader.loaded/ImageLoader.imagesToLoad;
  },
  loadImageWithPalleteSwaps(src, pallete_key) {
    var img = new Image();
    img.src=this.directory+src;
    this.imagesToLoad += 1; 
    img.onload = () => {
      this.onLoad(); 
      var palletSwaps = [];
      for(var k=0;k<pallete_key.mapping.length;k++) {
        var mapping = pallete_key.mapping[k];
        var ce = document.createElement('canvas');
        ce.width = img.width;
        ce.height= img.height;
        var ctx = ce.getContext('2d');
        ctx.drawImage(img, 0,0);
        var imageData = ctx.getImageData(0,0,img.width,img.height);
        var data = imageData.data;
        for(var i=0;i<data.length;i+=4) {
          pallete_key.inputHexes.forEach((input,j) => {
            if(input==-1||data[i]==input.r&&data[i+1]==input.g&&data[i+2]==input.b) {
              var rgb = mapping[j];
              if(rgb.callable) {
                rgb = rgb(data, i, img.width,img.height, k,j)
              }
              if(pallete_key.post) {
                rgb = pallete_key.post(rgb, data, i, img.width,img.height,k,j);
              }
              data[i]   = rgb.r;
              data[i+1] = rgb.g;
              data[i+2] = rgb.b;
              

            }
          })
        }
        ctx.putImageData(imageData, 0, 0);
        palletSwaps.push(ce);
      }
      (img.palletSwaps=(img.palletSwaps||{}))[pallete_key.label] = palletSwaps;
      
    }
    return img;
  },
  loadImage(src, pallete_key=null) {
    if(pallete_key)return this.loadImageWithPalleteSwaps(src, pallete_key);
    var img = new Image();
    img.src=this.directory+src;
    this.imagesToLoad += 1; 
    img.onload = this.onLoad; 
    return img;
  }, 
  onLoad() {
    ImageLoader.loaded++;
    if(ImageLoader.loaded>=ImageLoader.imagesToLoad) {
      ImageLoader.onCompleteEvents.forEach(function(f){f()});
      ImageLoader.onCompleteEvents = [];
    }
  },
  onComplete(callback) {
    if(this.loaded>=this.imagesToLoad && this.imagesToLoad!=0) {
      callback();
    } else {
      this.onCompleteEvents.push(callback);
    }
  }
}
