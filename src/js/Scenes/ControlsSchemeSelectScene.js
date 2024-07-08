var SelectedSchemeIndex = 0;
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
        SelectedSchemeIndex = type;
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