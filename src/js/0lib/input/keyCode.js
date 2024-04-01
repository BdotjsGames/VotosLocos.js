
function keyCode(string) {
    return string.charCodeAt(0);
}

String.prototype.getKeyCode = function() {
    return this.charCodeAt(0);
}

Object.defineProperty(String.prototype, 'keyCode', {get:function(){ return keyCode(this)}})