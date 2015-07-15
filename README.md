# node-hacontrol [![Build Status](https://travis-ci.org/Viskan/node-hacontrol.svg?branch=master)](https://travis-ci.org/Viskan/node-hacontrol) [![NPM Version](https://img.shields.io/npm/v/node-hacontrol.svg)](https://www.npmjs.com/package/node-hacontrol)

> A simple module for checking if a service is active in HAControl.


## Install

```
$ npm install --save node-hacontrol
```


## Usage

```js
var HAControl = require('nodejs-hacontrol');
var hacontrol = new HAControl('./localHA', '/srv/globalHA');

hacontrol.initialize();

var isActive = hacontrol.isActive();
```

## License

Apache License © [Viskan Distanshandel System AB](http://viskan.se)
