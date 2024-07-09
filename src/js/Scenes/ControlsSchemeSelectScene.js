var SelectedSchemeIndex = 0;
var CONTROL_SCHEMES = {
    WASD: 0,
    ARROW: 1,
    GAMEPAD: 2,
    TOUCH: 3,
}
var btnImages = [];
function setControlsScheme(index) {
    SelectedSchemeIndex = index;
    switch(index) {
        case CONTROL_SCHEMES.WASD:
        case CONTROL_SCHEMES.ARROW:
            btnImages[0] =  getKenneyTileImageFromKeycode(Buttons.A.keys[index])
            btnImages[1] =  getKenneyTileImageFromKeycode(Buttons.B.keys[index])
            btnImages[2] =  getKenneyTileImageFromKeycode(Buttons.X.keys[index])
            btnImages[3] =  getKenneyTileImageFromKeycode(Buttons.Y.keys[index])
            break;
        case CONTROL_SCHEMES.GAMEPAD:
            btnImages[0] =  IMAGES.inputPromptButtonA
            btnImages[2] =  IMAGES.inputPromptButtonB
            btnImages[1] =  IMAGES.inputPromptButtonY
            btnImages[3] =  IMAGES.inputPromptButtonX
            break;
        case CONTROL_SCHEMES.TOUCH:
            btnImages[0] =  IMAGES.inputPromptButtonA
            btnImages[1] =  IMAGES.inputPromptButtonB
            btnImages[2] =  IMAGES.inputPromptButtonX
            btnImages[3] =  IMAGES.inputPromptButtonY
            break;
    }
}
class ControlsSchemeSelectScene extends ConfirmationSceneVertical {
    constructor(prevScene) {
        super(prevScene, "Select Controls Scheme", [
            {
                name: "WASD + E+JKL",
                callback: b=>b.scene.selectOption(0)
            },
            {
                name: "Arrow Keys + F+XCV",
                callback: b=>b.scene.selectOption(1)
            },
            {
                name: "Controller",
                callback: b=>b.scene.selectOption(2)
            },
            {
                name: "Touchscreen",
                callback: b=>b.scene.selectOption(3)
            },
        ])
    }
    selectOption(type) {
        setControlsScheme(type)
        localStorage.setItem('controlsScheme', type);
        if(!this.prevScene) {
            this.driver.setScene(new ConfirmationScene(new MenuScene,
                'controls can be customized in the options', [
                    {
                        name: 'ok',
                        callback: b=>b.scene.back()
                    }
                ]));
        }
        else super.back();
    }
}