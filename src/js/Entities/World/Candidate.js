class Candidate extends HighFiver {
    constructor(x,y,model) {
        if(!model)model = loadCandidateModel();
        super(x,y,model);
        this.dialogue = [
            {person: this, text: "Lets get the word out!"},
            {person: this, text: "Thanks for helping!"},
        ]
        this.onAfterDialogue = () => {}
    }
}

function loadCandidateModel() {
    var savedString = localStorage.getItem("candidateModel");
    if(!savedString)return null;
    console.log(savedString);
    var data = JSON.parse(savedString)
    var model = new PlatformerModel(20,40,'#bbb', '#666',null, data);
    return model;
  }

function saveCandidate(model) {
    console.log('saving candidate');
    var data = model.getModelOptions();
    localStorage.setItem('candidateModel', JSON.stringify(data));
}