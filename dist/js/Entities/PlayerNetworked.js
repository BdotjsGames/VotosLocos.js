class PlayerNetworked extends Player {
    constructor(x,y,modelOptions){
        var model = new PlayerModel(null, modelOptions);
        super(x,y, model);
        this.networkedState = {};
    }
    getInputs() {
        this.model.outlineColor = this.outlineColor;
        if(this.crouching = this.networkedState.crouch) this.crouch();
        if(this.networkedState.attemptHighFive) {
            this.highFiving = true;
        }
        if(this.networkedState.unHighFive) {
            this.highFiving = false;
        }
        if(this.highFiving) {
            this.model.highFive();
        }
    }
    receiveNetworkedState(state) {
        this.networkedState = state;
        var inputs = ['x','y','z','vx','vy','vz','mx','my',]
        inputs.forEach(input => {
            if(state[input]!==undefined) this[input] = state[input]
        })
        var actions = ['jump', 'unjump', 'crouch', 'attemptHighFive', 'attack']
        actions.forEach(action => {
            if(state[action]) this[action]();
        })
        this.x -= 20;
    }
}