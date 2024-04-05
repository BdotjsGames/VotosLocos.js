var shiftKey = (16).char;
var enterKey = (13).char;

var specialCharacters = {
    '⏎': 13,
    '↵': 13,
    '⇧': 16
}

var specialCharacterDisplays = {
    13: "Enter",
    16: "Left Shift",
}

function keyCode(string) {

    return string.charCodeAt(0);
}

String.prototype.getKeyCode = function() {
    var s = specialCharacters[this];
    if(s)return s;
    return this.charCodeAt(0);
}


Object.defineProperty(String.prototype, 'keyCode', {get:function(){ return keyCode(this)}})
Object.defineProperty(String.prototype, 'keyCodes', {get:function(){ return this.split('').map(c=>keyCode(c))}})
Object.defineProperty(Number.prototype, 'char', {get:function(){ return String.fromCharCode(this)}})

