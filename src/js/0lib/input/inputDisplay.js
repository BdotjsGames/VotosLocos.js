function gamepadButtonToString(button) {
    return [
        '[A]',
        '[B]',
        '[X]',
        '[Y]',
        '[L1]',
        '[R1]',
        '[L2]',
        '[R2]',
        '[start]',
        '[select]',
    ][button]
    // return [
    //     '[B]',
    //     '[X]',
    //     '[A]',
    //     '[Y]',
    //     '[L1]',
    //     '[R1]',
    //     '[L2]',
    //     '[R2]',
    //     '[start]',
    //     '[select]',
    // ][button]
}

function buttonConfigToString(button) {
    var text = ''
    button.keys.forEach(key=> text+=key.keyDisplay+',')
    button.buttons.forEach(button=>text+=gamepadButtonToString(button))
    return text;
}