'use strict';

var fs = require('fs');

/**
 * Simple service for fetching HAControl status.
 *
 * @constructor
 *
 * @author Ulrik Augustsson
 * @author Anton Johansson
 */
var HAControl = function(localPath, globalPath)
{
	if (!(this instanceof HAControl))
	{
		return new HAControl(localPath, globalPath);
	}

	this.localHa = true;
	this.globalHa = true;

	this.localPath = localPath;
	this.globalPath = globalPath;
};

module.exports = HAControl;

/**
 * Initializes the HAControl instance.
 */
HAControl.prototype.initialize = function()
{
	var localPath = this.localPath;
	var globalPath = this.globalPath;

	var localCallback = function(active)
	{
		this.localHa = active;
	};
	localCallback.bind(this);

	var globalCallback = function(active)
	{
		this.globalHa = active;
	};
	globalCallback.bind(this);

	if (localPath)
	{
		checkHa(localPath, true, localCallback);
		fs.watchFile(localPath, {persistent: true, interval: 1000}, function (current, previous)
		{
			if (current.mtime !== previous.mtime)
			{
				checkHa(localPath, false, localCallback);
			}
		}.bind(this));
	}

	if (globalPath)
	{
		checkHa(globalPath, false, globalCallback);
		fs.watchFile(globalPath, {persistent: true, interval: 1000}, function (current, previous)
		{
			if (current.mtime !== previous.mtime)
			{
				checkHa(globalPath, false, globalCallback);
			}
		}.bind(this));
	}
}

/**
 * Gets whether or not the service is active in HAControl.
 *
 * @return {bool} Returns true if the service is active in HAControl.
 */
HAControl.prototype.isActive = function()
{
	return this.localHa
		&& this.globalHa;
}

function checkHa(path, writeIfMissing, callback)
{
	fs.readFile(path, function(error, data)
	{
		if (error)
		{
			if (writeIfMissing)
			{
				fs.writeFileSync(path, '0', {encoding: null});
			}
			callback(false);
		}
		else
		{
			var newValue = parseInt(data.toString(), 10);
			callback(newValue === 1);
		}
	});
}