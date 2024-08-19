var LANGUANGES = {
    English: 0,
}
var language = LANGUANGES.English;
var languageString = localStorage.getItem("language") || "English";
function setLanguage(type) {
    languageString = type;
}

class LanguageSelectScene extends ConfirmationSceneVertical {
    constructor(prevScene) {
        super(prevScene, "Select Language", [
            {
                name: "English",
                callback: b=>this.selectOption(b.text)
            },
            {
                name: "Spanish",
                callback: b=>this.selectOption(b.text)
            },
            DEV&&{
                name: "l33t",
                callback: b=>this.selectOption(b.text)
            }
            // {
            //     name: "Arrow Keys + F+XCV",
            //     callback: b=>b.scene.selectOption(1)
            // },
            // {
            //     name: "Controller",
            //     callback: b=>b.scene.selectOption(2)
            // },
            // {
            //     name: "Touchscreen",
            //     callback: b=>b.scene.selectOption(3)
            // },
        ])
    }
    selectOption(type) {
        setLanguage(type)
        localStorage.setItem('language', type);
        this.back();
    }
}