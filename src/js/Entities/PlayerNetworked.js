class PlayerNetworked extends Player {
    constructor(x,y,modelOptions){
        var model = new PlayerModel(null, modelOptions);
        super(x,y, model);
        this.networkedState = {};
    }
    getInputs() {
        this.model.outlineColor = this.outlineColor;
    }
    receiveNetworkedState(state) {
        this.networkedState = state;
        var inputs = ['x','y','z','vx','vy','vz','mx','my',]
        inputs.forEach(input => {
            if(state[input]) this[input] = state[input]
        })
        var actions = ['jump', 'unjump', 'crouch', 'attemptHighFive', 'attack']
        actions.forEach(action => {
            if(state[action]) this[action]();
        })
        
    }
}