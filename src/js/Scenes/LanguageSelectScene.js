var LANGUANGES = {
    English: 0,
}
var language = LANGUANGES.English;
var languageString = "English";
function setLanguage(type) {
    language = type;
}

class LanguageSelectScene extends ConfirmationSceneVertical {
    constructor(prevScene) {
        super(prevScene, "Select Language Scheme", [
            {
                name: "English",
                callback: b=>setLanguage(b.text)
            },
            {
                name: "Spanish",
                callback: b=>setLanguage(b.text)
            },
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