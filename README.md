# Ember Test Opener

## Installation

1. Make sure testem isn't launching browsers.  Use your main browser by editing testem config and setting `launch_in_dev` to an empty list 
[as seen here](https://embermap.com/notes/64-our-testem-config)
1. If you want to use the tamper monkey script, [install tamper monkey browser extension](http://tampermonkey.net/)
1. Add the tamper monkey script or make `tamper-monkey-script.js` a bookmarklet if you want.

## Usage

1. Run `node /path/to/server.js` in your ember app directory. (It assumes the `tests` directory is in the current directory.)
1. Open ember tests in your main browser [http://localhost:7357/](http://localhost:7357/)
1. Command + Click the test your want to open (the red bar or inside the red box).
1. The server should open the test module in your text editor and go to the first line of the test.
