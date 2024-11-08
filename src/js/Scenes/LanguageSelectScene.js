var LANGUANGES = {
    English: 0,
}
var language = LANGUANGES.English;
var languageString = localStorage.getItem("language") || "English";
var languageOptions = ["English", "Spanish", "Vietnamese"];//"Vietnamese"
function setLanguage(type) {
    languageString = type;
    localStorage.setItem('language', type);
}
function getTranslatedMenuText(text) {
    if(languageString&& menuItemsTranslations[text.toLowerCase()]) text = menuItemsTranslations[text.toLowerCase()][languageString]
    return text;
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
            {
                name: "Vietnamese",
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
        this.back();
    }
}