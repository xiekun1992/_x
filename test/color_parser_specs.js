'use strict';

describe('color_parser test, ',function(){

	var colorParser;
	beforeAll(function(){
		colorParser=new ColorParser();
	});

	describe('when hexadecimal ',function(){
		it('is white parsed to rgb',function(){
			expect(colorParser.hexToRgb("#ffffff")).toEqual('rgb(255,255,255)');
			expect(colorParser.hexToRgb("#fff")).toEqual('rgb(255,255,255)');
		});
		it('is `f00` parsed to rgb',function(){
			expect(colorParser.hexToRgb('f00')).toEqual('rgb(255,0,0)');
		});
		it('is `#f1e05a` parsed to rgb',function(){
			expect(colorParser.hexToRgb('#f1e05a')).toEqual('rgb(241,224,90)');
		});
		it('is `#569e3d` parsed to rgb',function(){
			expect(colorParser.hexToRgb('#569e3d')).toEqual('rgb(86,158,61)');
		});
		it('is a number, should throw an error',function(){
			expect(function(){
				colorParser.hexToRgb(121212);
			}).toThrowError(Error,'hexToRgb parameter `hex` must be a string.');
		});
		it('is a empty string, should throw an error',function(){
			expect(function(){
				colorParser.hexToRgb('');
			}).toThrowError(Error,'hexToRgb parameter `hex` string length must greater than 0.');
		});
		it('is a invalid value with `cfed`, should throw an error',function(){
			expect(function(){
				colorParser.hexToRgb('cfed');
			}).toThrowError(Error,'hexToRgb parameter `hex` string without `#`, the length must be 3 or 6.');
		});
		it('is a invalid value with `#cfed`, should throw an error',function(){
			expect(function(){
				colorParser.hexToRgb('#cfed');
			}).toThrowError(Error,'hexToRgb parameter `hex` string with `#`, the length must be 4 or 7.');
		});
		it('is a invalid value with `#jkehcr`, should throw an error',function(){
			expect(function(){
				colorParser.hexToRgb('#jkehcr');
			}).toThrowError(Error,'invalid hex value with `j`.');
		});
	});

	describe('when rgb ',function(){
		it('parsed to hexadecimal',function(){

		});
		it('parsed to hsl',function(){

		});
		it('parsed to hsv',function(){

		});
	});
});