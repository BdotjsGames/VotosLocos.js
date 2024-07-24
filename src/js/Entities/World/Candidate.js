class Candidate extends HighFiver {
    constructor(x,y,model) {
        if(!model)model = loadCandidateModel();
        super(x,y,model);
        this.name = "Candidate";
        this.specialName = "Candidate";
        
        this.dialogue = [
            {person: this, text: "Lets get the word out!"},
            {person: this, text: "Thanks for helping!"},
        ]
        this.shouldSceneCollide = false
        this.onAfterDialogue = () => {}
    }
    getInputs() {
       
    }
}

function loadCandidateModel() {
    var savedString = localStorage.getItem("candidateModel");
    if(!savedString)return null;
    // console.log(savedString);
    var data = JSON.parse(savedString)
    var model = new PlatformerModel(20,40,'#bbb', '#666',null, data);
    return model;
  }

function saveCandidate(model) {
    var data = model.getModelOptions();
    localStorage.setItem('candidateModel', JSON.stringify(data));
}