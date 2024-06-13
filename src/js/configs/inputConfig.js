//  Copyright Brian Dizon 2019

var gamepadConfig = {
  leftBumper: 4,
  A: 0,
  B: 1,
  X: 2, //untested
  Y: 3, //untested
  start: 8,
  select: 9,
}

var gamepadConfig2 = {
  leftBumper: 4,
  A: 3,
  B: 2,
  X: 1, //untested
  Y: 0, //untested
  start: 8,
  select: 9,
}

gamepadConfig = gamepadConfig2

function addInputToButton(buttonName, keys = [], buttons = []) {
  var button = Buttons[buttonName];
  if (!button) {
    button = createButton({ name: buttonName, keys, buttons, touchButtons: [] })
    return button;
  }
  button.keys.push(...keys);
  button.buttons.push(...keys);
}

function configureABXY(keys, buttons) {
  buttonNames = 'ABXY';
  buttonNames.forEach((buttonName, i) => {
    var button = addInputToButton(buttonName, [keys[i]], [buttons[i]])
  })
}

function configureButtonList(buttonNamesList, attributeName, valuesList) {
  buttonNamesList.forEach((buttonName, i) => {
    var button = Buttons[buttonName];
    if (!button) button = createButton({
      name: buttonName,
      // keys:[],buttons:[], touchButtons:[],
    })
    var attribute = button[attributeName];
    if (!attribute) attribute = button[attributeName] = [valuesList[i]]
    else attribute.push(valuesList[i]);
  })
}

window.addEventListener('load', function (e) {
  var buttonNames = ['A', 'B', 'X', 'Y'];
  configureButtonList(buttonNames, 'keys', 'JKLI'.keyCodes);
  configureButtonList(buttonNames, 'keys', 'XCVB'.keyCodes); //Z is skipped for azerty
  configureButtonList(buttonNames, 'buttons', [2, 0, 1, 3]);
  configureButtonList(buttonNames, 'touchButtons', [0, 1, 2, 3]);

  // configureABXY('JKLI'.keyCodes, [gamepadConfig.A,gamepadConfig.B,gamepadConfig.X,gamepadConfig.Y]);

  // createButton({
  //   name: 'menuSelect',
  //   keys: (' J'+enterKey).keyCodes,
  //   buttons: [gamepadConfig.A]
  // })
  // Buttons.menuSelect = {
  //   keys: [32,74,13],
  //   buttons: [gamepadConfig.A],
  // }
  Buttons.menuSElect = Buttons.A;
  // Buttons.jump = {
  //   keys: ['J'.keyCode,32,'Z'.keyCode],
  //   buttons: [0],
  //   touchButtons: [0],
  // }
  Buttons.jump = Buttons.A;
  Buttons.crouch = Buttons.X;
  Buttons.jump.keys.push(' '.keyCode);
  Buttons.crouch.keys.push(16)
  Buttons.Confirm = {
    keys: ['J'.keyCode, 'X'.keyCode],
    buttons: [...Buttons.jump.buttons]
  }
  // Buttons.Confirm.keys.push(13);

  // Buttons.A = {
  //   keys: 'JZ'.keyCodes,
  //   buttons: [0],
  //   touchButtons: [0],
  // }
  // Buttons.B = {
  //   keys: [16,75,88],
  //   buttons: [gamepadConfig.B],
  //   touchButtons: [1],
  // }
  Buttons.highFive = Buttons.Y;
  Buttons.pause = {
    keys: [27],
    buttons: [gamepadConfig.select],
    touchButtons: [4]
  }
  Buttons.start = {
    keys: [13],
    buttons: [gamepadConfig.start]
  }
  Buttons.select = {
    keys: [79],
    buttons: [gamepadConfig.select]
  }
  Buttons.cheatForward = {
    keys: [67, 78],
    allKeys: true,
  }
  Buttons.cheatDialogueOff = {
    keys: ['C'.keyCode, 'D'.keyCode],
    allKeys: true,
  }
  Buttons.cheatBackward = {
    keys: [67, 66],
    allKeys: true,
  }
  Buttons.chapterSkip = {
    keys: [67, 77],
    allKeys: true,
  }
})
