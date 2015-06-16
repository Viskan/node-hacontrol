/*global after,beforeEach,describe,it*/
'use strict';

// Unit test dependencies
var assert = require('assert');
var expect = require('expect');
var fs = require('fs');
var HAControl = require('..');

// Constants
var localPath = __dirname + '/localHa';
var globalPath = __dirname + '/globalHa';

beforeEach(function()
{
    cleanUp();
});

after(function()
{
    cleanUp();
});

var cleanUp = function()
{
    if (fs.existsSync(localPath))
    {
        fs.unlinkSync(localPath);
    }

    if (fs.existsSync(globalPath))
    {
        fs.unlinkSync(globalPath);
    }
}

// Describe behaviour
describe('index.js', function()
{
	it('should work always be active without paths', function(done)
	{
        var hacontrol = new HAControl();

        assert(hacontrol.isActive());
        assert(!fs.existsSync(localPath));
        assert(!fs.existsSync(globalPath));

        hacontrol.initialize();

        setTimeout(function()
        {
            expect(hacontrol.isActive()).toEqual(true);
            assert(!fs.existsSync(localPath));
            assert(!fs.existsSync(globalPath));

    		done();
        }, 10);
	});

	it('should work even without proper constructor', function(done)
	{
        var hacontrol = HAControl(); // Note the missing 'new' keyword

        assert(hacontrol.isActive());
        assert(!fs.existsSync(localPath));
        assert(!fs.existsSync(globalPath));

        hacontrol.initialize();

        setTimeout(function()
        {
            expect(hacontrol.isActive()).toEqual(true);
            assert(!fs.existsSync(localPath));
            assert(!fs.existsSync(globalPath));

    		done();
        }, 10);
	});

	it('should be active if local is active and global is unspecified', function(done)
	{
	    fs.writeFileSync(localPath, '1', {encoding: null});

        var hacontrol = new HAControl(localPath);
        hacontrol.initialize();

        setTimeout(function()
        {
            expect(hacontrol.isActive()).toEqual(true);
            assert(fs.existsSync(localPath));
            assert(!fs.existsSync(globalPath));

    		done();
        }, 10);
	});

	it('should be inactive if local is inactive and global is unspecified', function(done)
	{
	    fs.writeFileSync(localPath, '0', {encoding: null});

        var hacontrol = new HAControl(localPath);
        hacontrol.initialize();

        setTimeout(function()
        {
            expect(hacontrol.isActive()).toEqual(false);
            assert(fs.existsSync(localPath));
            assert(!fs.existsSync(globalPath));

    		done();
        }, 20);
	});

	it('should be active if global is active and local is unspecified', function(done)
	{
	    fs.writeFileSync(globalPath, '1', {encoding: null});

        var hacontrol = new HAControl(null, globalPath);
        hacontrol.initialize();

        setTimeout(function()
        {
            expect(hacontrol.isActive()).toEqual(true);
            assert(!fs.existsSync(localPath));
            assert(fs.existsSync(globalPath));

    		done();
        }, 20);
	});

	it('should be inactive if global is inactive and local is unspecified', function(done)
	{
	    fs.writeFileSync(globalPath, '0', {encoding: null});

        var hacontrol = new HAControl(null, globalPath);
        hacontrol.initialize();

        setTimeout(function()
        {
            expect(hacontrol.isActive()).toEqual(false);
            assert(!fs.existsSync(localPath));
            assert(fs.existsSync(globalPath));

    		done();
        }, 20);
	});

	it('should be active if both are active', function(done)
	{
	    fs.writeFileSync(localPath, '1', {encoding: null});
	    fs.writeFileSync(globalPath, '1', {encoding: null});

        var hacontrol = new HAControl(localPath, globalPath);
        hacontrol.initialize();

        setTimeout(function()
        {
            expect(hacontrol.isActive()).toEqual(true);
            assert(fs.existsSync(localPath));
            assert(fs.existsSync(globalPath));

    		done();
        }, 20);
	});

	it('should be inactive if both are inactive', function(done)
	{
	    fs.writeFileSync(localPath, '0', {encoding: null});
	    fs.writeFileSync(globalPath, '0', {encoding: null});

        var hacontrol = new HAControl(localPath, globalPath);
        hacontrol.initialize();

        setTimeout(function()
        {
            expect(hacontrol.isActive()).toEqual(false);
            assert(fs.existsSync(localPath));
            assert(fs.existsSync(globalPath));

    		done();
        }, 20);
	});

	it('should be inactive if local is active and global is inactive', function(done)
	{
	    fs.writeFileSync(localPath, '1', {encoding: null});
	    fs.writeFileSync(globalPath, '0', {encoding: null});

        var hacontrol = new HAControl(localPath, globalPath);
        hacontrol.initialize();

        setTimeout(function()
        {
            expect(hacontrol.isActive()).toEqual(false);
            assert(fs.existsSync(localPath));
            assert(fs.existsSync(globalPath));

    		done();
        }, 20);
	});

	it('should be inactive if local is inactive and global is active', function(done)
	{
	    fs.writeFileSync(localPath, '0', {encoding: null});
	    fs.writeFileSync(globalPath, '1', {encoding: null});

        var hacontrol = new HAControl(localPath, globalPath);
        hacontrol.initialize();

        setTimeout(function()
        {
            expect(hacontrol.isActive()).toEqual(false);
            assert(fs.existsSync(localPath));
            assert(fs.existsSync(globalPath));

    		done();
        }, 20);
	});

	it('should create localHa if it is specified, but missing', function(done)
	{
        var hacontrol = new HAControl(localPath);
        hacontrol.initialize();

        setTimeout(function()
        {
            expect(hacontrol.isActive()).toEqual(false);
            assert(fs.existsSync(localPath));
            assert(!fs.existsSync(globalPath));

    		done();
        }, 20);
	});

	it('should change to active if statuses are changed', function(done)
	{
	    fs.writeFileSync(localPath, '0', {encoding: null});
	    fs.writeFileSync(globalPath, '0', {encoding: null});

        var hacontrol = new HAControl(localPath, globalPath);
        hacontrol.initialize();

        setTimeout(function()
        {
            expect(hacontrol.isActive()).toEqual(false);
            assert(fs.existsSync(localPath));
            assert(fs.existsSync(globalPath));

    	    fs.writeFileSync(localPath, '1', {encoding: null});
    	    fs.writeFileSync(globalPath, '1', {encoding: null});
            setTimeout(function()
            {
                expect(hacontrol.isActive()).toEqual(true);
                assert(fs.existsSync(localPath));
                assert(fs.existsSync(globalPath));

    		    done();
            }, 1010);
        }, 20);
	});
});
