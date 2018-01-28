# ShortcutsJS 
[![GitHub license](https://img.shields.io/github/license/arjndr/shortcuts.js.svg)](https://github.com/arjndr/shortcuts.js/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/arjndr/shortcuts.js.svg)](https://github.com/arjndr/shortcuts.js/issues)

ShortcutsJS is a keyboard shortcut library that triggers [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) based on keys pressed. You can listen to these events on any specific element you want.

## Demo

Check out the demo [here](https://arjndr.github.io/ShortcutsJS)

## Usage

1. [Download](https://github.com/arjndr/shortcuts.js/releases) the library

2. Add the library to your project
  ```html
  <script src="path/to/shortcuts.min.js"></script>
  ```

3. Create a ShortcutsJS element
  ```javascript
  var ShortcutElement = new Shortcuts(document.getElementById('element'));
  ```

4. Listen to **specific** shortcut events on the element
    ```javascript
    // Triggered whenever Ctrl+M is pressed on the element
    document.getElementById('element').addEventListener('Ctrl+M', function(){
      DoSomething();
    });
    ```

    You can also listen to `Shortcut` event triggered **only** on `document`

    `e.detail` returns 
      + `shortcut` - This is the event being triggered
      + `onElement` - This is the element on which the event is being triggered
    
    ```javascript
    document.addEventListener('Shortcut', function (e) {
      console.log(e.detail)
    });
    ```

5. Functions you can call on any ShortcutsJS element
    + `update()` - This only prevents bubbling up on elements that were dynamically added since the last `.update()` was called, I haven't tested this though
    + `destroy()` - This destroys the shortcut listener

## Browser Compatibility

This library is confirmed to be working on the following browsers and above:

1. Google Chrome 16+
2. Mozilla Firefox 11+

Can someone test this on IE please?

## Keys and their names in ShortcutsJS

Keys A-Z, 0-9, Insert, Home, PageUp, PageDown, Delete, Backspace, End, CapsLock, NumLock, ScrollLock, Pause, Space, Escape, Ctrl, Alt, Shift, Menu and Function keys (F1-F12) are named respectively. Numpad numbers are named with prefix `Numpad`. e.g: `Numpad0` for Numpad 0

| Key                        | Name                          |
| -------------------------- | ----------------------------- |
| \`                         | GraveAccent                   |
| -                          | Minus                         |
| =                          | Equal                         |
| \[                         | BracketLeft                   |
| \]                         | BracketRight                  |
| Enter                      | Enter                         |
| ;                          | Semicolon                     |
| '                          | SingleQuote                   |
| \\                         | Backslash                     |
| ,                          | Comma                         |
| .                          | Period                        |
| /                          | Slash                         |
| Numpad /                   | Divide                        |
| Numpad *                   | Multiply                      |
| Numpad -                   | Subtract                      |
| Numpad +                   | Add                           |
| Numpad .                   | DecimalPoint                  |
| Numpad Enter               | Enter                         |
| &#x2191;                   | UpArrow                       |
| &#x2190;                   | LeftArrow                     |
| &#x2193;                   | DownArrow                     |
| &#x2192;                   | RightArrow                    |
| *&#8862;* (Windows key)    | WindowsLeft or WindowsRight   |

Thanks to wesbos' [keycodes](https://github.com/wesbos/keycodes/)

## License

[MIT](http://opensource.org/licenses/MIT) Copyright &copy; 2018 Akash Rajendra
