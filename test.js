var HAControl = require('./index.js');

var hacontrol = new HAControl();
hacontrol.initialize();

console.log(hacontrol.isActive('./localha'));