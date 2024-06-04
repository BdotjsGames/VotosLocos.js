var mocScale = 2;

function createCanvas(w,h) {
    var modelOptionsCanvasElement = document.createElement('canvas');
    modelOptionsCanvasElement.width = w;
    modelOptionsCanvasElement.height = h;
    var modelOptionsCanvas = modelOptionsCanvasElement.getContext('2d');
    modelOptionsCanvas.scale(1/mocScale,1/mocScale);
    modelOptionsCanvas.imageSmoothingEnabled = false;
    modelOptionsCanvas.mozImageSmoothingEnabled=false;
    modelOptionsCanvas.msImageSmoothingEnabled = false;
    modelOptionsCanvas.oImageSmoothingEnabled=false;
    modelOptionsCanvas.webkitImageSmoothingEnabled=false;
    return {modelOptionsCanvasElement, modelOptionsCanvas}
}

var bufferWidth = 128;
var {canvasBufferElement, canvasBuffer} = createCanvas(bufferWidth,bufferWidth);
var optionsMax = 24;
var {modelOptionsCanvasElement, modelOptionsCanvas} = createCanvas(bufferWidth*optionsMax,128);

class ModelOptionSelectorScene extends AdditiveScene {
    constructor(prevScene, model, option) {
        super(prevScene);
        this.model = model;
        this.option = option;

        this.offsetY = option.displayOffsetY||0;
        this.addSelectableButton(
            new ButtonUI("back",0.05,0.05,0.25,0.07,0.05,e=>{
                this.driver.setScene(this.prevScene);
            }).setSelected()
        )
        this.drawAllOptions();
    }
    drawAllOptions() {
        modelOptionsCanvas.clearRect(0,0,modelOptionsCanvasElement.width*mocScale, modelOptionsCanvasElement.height * mocScale);
        //save the current model option 
        var currentOption = this.option.index;
        // loop through all options
        // draw model with that specific option
        //   set model option
        //   draw to offset canvas (to have border)
        //   draw from offset canvas to saved canvas
        this.option.options.forEach((option, i) => {
            this.option.onChange(option,i);
            this.drawToOtherCanvas((i+0.5)*bufferWidth*mocScale);
        });
        this.option.onChange(this.option.options[currentOption], currentOption);
    }
    drawToOtherCanvas(x) {
        // TODO: yeah we should really be passing the canvas in draw functions
        // var ctx = canvas;
        // canvas = modelOptionsCanvas
        // canvas.fillRect(0,0,modelOptionsCanvasElement.width*mocScale,modelOptionsCanvasElement.height*mocScale);
        this.model.draw(modelOptionsCanvas, x, modelOptionsCanvasElement.height*mocScale+this.offsetY);
        // canvas = ctx;
    }
    draw(canvas) {
        super.draw(canvas);
        // this.drawToOtherCanvas();
        this.option.options.forEach((option,i) => {
            var x = i%4 * bufferWidth;
            var y = 20 + bufferWidth * (i>>2);
            canvas.drawImage(modelOptionsCanvasElement, bufferWidth*i, 0, bufferWidth, bufferWidth,  x,y, bufferWidth, bufferWidth);

        });
    }
}