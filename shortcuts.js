"use strict"
// ShortcutsJS Event
var ShortcutsJSE = null;
// The following part was stolen from https://github.com/wesbos/keycodes/ and modified
var keyCodes = {
  0: "That key has no keycode",
  3: "Break",
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Ctrl",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  21: "Hangul",
  25: "Hanja",
  27: "Escape",
  28: "Conversion",
  29: "NonConversion",
  32: "Space",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "LeftArrow",
  38: "UpArrow",
  39: "RightArrow",
  40: "DownArrow",
  41: "Select",
  42: "Print",
  43: "Execute",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  47: "Help",
  48: "0",
  49: "1",
  50: "2",
  51: "3",
  52: "4",
  53: "5",
  54: "6",
  55: "7",
  56: "8",
  57: "9",
  58: ":",
  60: "<",
  65: "A",
  66: "B",
  67: "C",
  68: "D",
  69: "E",
  70: "F",
  71: "G",
  72: "H",
  73: "I",
  74: "J",
  75: "K",
  76: "L",
  77: "M",
  78: "N",
  79: "O",
  80: "P",
  81: "Q",
  82: "R",
  83: "S",
  84: "T",
  85: "U",
  86: "V",
  87: "W",
  88: "X",
  89: "Y",
  90: "Z",
  91: "WindowsLeft",
  92: "WindowsRight",
  93: "Menu",
  95: "Sleep",
  96: "Numpad0",
  97: "Numpad1",
  98: "Numpad2",
  99: "Numpad3",
  100: "Numpad4",
  101: "Numpad5",
  102: "Numpad6",
  103: "Numpad7",
  104: "Numpad8",
  105: "Numpad9",
  106: "Multiply",
  107: "Add",
  109: "Subtract",
  110: "DecimalPoint",
  111: "Divide",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  124: "F13",
  125: "F14",
  126: "F15",
  127: "F16",
  128: "F17",
  129: "F18",
  130: "F19",
  131: "F20",
  132: "F21",
  133: "F22",
  134: "F23",
  135: "F24",
  144: "NumLock",
  145: "ScrollLock",
  186: "Semicolon",
  187: "Equal",
  188: "Comma",
  189: "Minus",
  190: "Period",
  191: "Slash",
  192: "GraveAccent",
  219: "BracketLeft",
  220: "Backslash",
  221: "BracketRight",
  222: "SingleQuote"
};

// Main ShortcutsJS function
function Shortcuts(element) {
  // set ShortcutElement to passed argument
  this.ShortcutElement = element;
  // Function to destroy the constructor
  this.destroy = function () {
    this.ShortcutElement.removeEventListener('keydown', keyDownFunction);
  };
  // Function attached onkeydown
  var keyDownFunction = function (event) {
    // Event name
    var eventName = "";
    // If event is undefined it is assigned the value of window.event
    event = event || window.event;
    // Stop default action
    if (this.nodeName !== '#document') {
      event.preventDefault();
    }
    // If ctrlKey is pressed, append it to eventName variable
    if (event.ctrlKey) {
      eventName += "Ctrl+";
    }
    // If altKey is pressed, append it to eventName variable
    if (event.altKey) {
      eventName += "Alt+";
    }
    // If shiftKey is pressed, append it to eventName variable
    if (event.shiftKey) {
      eventName += "Shift+";
    }
    // This prevents appending of pre-existing keys in the eventName variable
    if (keyCodes[event.keyCode] == "Ctrl" || keyCodes[event.keyCode] == "Shift" || keyCodes[event.keyCode] == "Alt") {
      var keyPressed = eventName;
    } else {
      var keyPressed = eventName += keyCodes[event.keyCode];
    }
    // Delete the last character, if the last character from eventName variable is '+'
    eventName = eventName.replace(/\+$/, "");
    // Create CustomEvent
    ShortcutsJSE = createCustomEvent(keyPressed, "");
    var SJSEvent = createCustomEvent("Shortcut", {
      shortcut: eventName,
      onElement: this
    });
    // Trigger event on the element and document
    element.dispatchEvent(ShortcutsJSE);
    document.dispatchEvent(SJSEvent);
  };
  // Attach keydown event to element and call keyDownFunction
  element.addEventListener('keydown', keyDownFunction);
  // To update, but this only prevents bubbling up on elements
  // that were dynamically added since the last .update() was called
  this.update = function() {
    var allElements = document.body.getElementsByTagName("*");
    forEach(allElements, function (element, index) {
      element.addEventListener('keydown', function (e) {
        e.stopPropagation();
      });
    });
  }
  this.update(); // To prevent bubbling, called when constructed
  console.log('ShortcutsJS Initialized');
};

// forEach function
var forEach = function (_a, callback) {
  for (var _i = 0; _i < _a.length; _i++) {
    callback(_a[_i], _i);
  }
};

// Creating CustomEvent on both modern and older browsers
function createCustomEvent(name, details) {
  if (typeof window.CustomEvent == "function") {
    return new CustomEvent(name, { detail: details});
  } else {
    console.warn('Please use a modern browser.')
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(name, false, false, { detail: details });
    return evt;
  }
}
