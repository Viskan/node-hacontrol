node-hacontrol
==============

A simple module for checking if a service is active in HAControl.

[![Build Status](https://travis-ci.org/Viskan/node-hacontrol.svg?branch=master)](https://travis-ci.org/Viskan/node-hacontrol)


Where can I find the releases?
------------------------------
You can install it using npm. Exampel package.json file:

```js
{
  "dependencies": {
    "node-hacontrol": "1.0.0"
  }
}
```


Usage:
-----------------------------

```js
var HAControl = require('nodejs-hacontrol');
var hacontrol = new HAControl('./localHA', '/srv/globalHA');
hacontrol.initialize();
...

var isActive = hacontrol.isActive();

```
