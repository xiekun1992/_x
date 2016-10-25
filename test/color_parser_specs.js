'use strict';

describe('color_parser test, ',function(){

	var colorParser;
	beforeAll(function(){
		colorParser=new ColorParser();
	});

	describe('when hexadecimal ',function(){
		it('is white parsed to `rgb(255, 255, 255)`',function(){
			expect(colorParser.hexToRgb("#ffffff")).toEqual('rgb(255, 255, 255)');
			expect(colorParser.hexToRgb("#fff")).toEqual('rgb(255, 255, 255)');
			expect(colorParser.hexToRgb("#FFF")).toEqual('rgb(255, 255, 255)');
		});
		it('is `f00` parsed to `rgb(255, 0, 0)`',function(){
			expect(colorParser.hexToRgb('f00')).toEqual('rgb(255, 0, 0)');
		});
		it('is `#f1e05a` parsed to `rgb(241, 224, 90)`',function(){
			expect(colorParser.hexToRgb('#f1e05a')).toEqual('rgb(241, 224, 90)');
		});
		it('is `#569e3d` parsed to `rgb(86, 158, 61)`',function(){
			expect(colorParser.hexToRgb('#569e3d')).toEqual('rgb(86, 158, 61)');
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
		describe('parsed to hexadecimal, ',function(){
			it('given `rgb(61, 107, 167)`, should parsed to `#3d6ba7`',function(){
				expect(colorParser.rgbToHex('rgb(61, 107, 167)')).toEqual('#3d6ba7');
			});
			it('given `rgb(228,182,110)`, should parsed to `#e4b66e`',function(){
				expect(colorParser.rgbToHex('rgb(228,182,110)')).toEqual('#e4b66e');
			});
			it('given `RGB(228,182,110)`, should parsed to `#e4b66e`',function(){
				expect(colorParser.rgbToHex('rgb(228,182,110)')).toEqual('#e4b66e');
			});
			it('given `RgB(228,182,110)`, should parsed to `#e4b66e`',function(){
				expect(colorParser.rgbToHex('rgb(228,182,110)')).toEqual('#e4b66e');
			});
			it('given `221,221,221`, should parsed to `#dddddd`',function(){
				expect(colorParser.rgbToHex(221,221,221)).toEqual('#dddddd');
			});
			it('given `255,0,0,255,255`, should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex(255,0,0,255,255);
				}).toThrowError(Error,'rgbToHex should be called like rgbToHex("rgb(0, 0, 0)") or rgbToHex(0, 0, 0).');
			});
			it('given `255,0`, should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex(255,0);
				}).toThrowError(Error,'rgbToHex should be called like rgbToHex("rgb(0, 0, 0)") or rgbToHex(0, 0, 0).');
			});
			it('given `255.1,2,2`, should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex(255.1,2,2);
				}).toThrowError(Error,'rgb value should be a unsigned integer number.');
			});
			it('given `NaN,2,2`, should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex(255.1,2,2);
				}).toThrowError(Error,'rgb value should be a unsigned integer number.');
			});
			it('given `255`, should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex(255);
				}).toThrowError(Error,'rgbToHex parameter should be a string.');
			});
			it('given `255` string, should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex('255');
				}).toThrowError(Error,'rgbToHex should be called like rgbToHex("rgb(0, 0, 0)").');
			});
			it('given `abc,220,255`, should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex('abc',220,255);
				}).toThrowError(Error,'rgb value should be a unsigned integer number.');
			});
			it('given `"",220,255`, should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex("",220,255);
				}).toThrowError(Error,'rgb value should be a unsigned integer number.');
			});
			it('given `-0,220,255`, should throw an error',function(){
				expect(colorParser.rgbToHex(-0,220,255)).toEqual('#00dcff');
			});
			it('given `+0,220,255`, should throw an error',function(){
				expect(colorParser.rgbToHex(+0,220,255)).toEqual('#00dcff');
			});
			it('given `360,220,255`, should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex(360,220,255);
				}).toThrowError(Error,'rgb value should between 0 and 255.');
			});
			it('given `[1,2,3],233,2`,should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex([1,2,3],233,2);
				}).toThrowError(Error,'rgb value should be a unsigned integer number.');
			});
			it('given `{a:1},233,2`,should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex({a:1},233,2);
				}).toThrowError(Error,'rgb value should be a unsigned integer number.');
			});
			it('given `RGB({a:1},233,2)`,should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex('RGB({a:1},233,2)');
				}).toThrowError(Error,'rgbToHex should be called like rgbToHex("rgb(0, 0, 0)").');
			});
			it('given `RGB(,233,2)`,should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex('RGB(,233,2)');
				}).toThrowError(Error,'rgbToHex should be called like rgbToHex("rgb(0, 0, 0)").');
			});
			it('given `RGB(400,233,2)`,should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex('RGB(400,233,2)');
				}).toThrowError(Error,'rgb value should between 0 and 255.');
			});
			it('given `RGB(-1,233,2)`,should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex('RGB(-1,233,2)');
				}).toThrowError(Error,'rgbToHex should be called like rgbToHex("rgb(0, 0, 0)").');
			});
			it('given `RGB(+1,233,2)`,should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex('RGB(+1,233,2)');
				}).toThrowError(Error,'rgbToHex should be called like rgbToHex("rgb(0, 0, 0)").');
			});
			it('given `RGB(x,233,2)`,should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex('RGB(x,233,2)');
				}).toThrowError(Error,'rgbToHex should be called like rgbToHex("rgb(0, 0, 0)").');
			});
			it('given `RGB(-,233,2)`,should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex('RGB(-,233,2)');
				}).toThrowError(Error,'rgbToHex should be called like rgbToHex("rgb(0, 0, 0)").');
			});
			it('given `RGB(1.1,233,2)`,should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex('RGB(1.1,233,2)');
				}).toThrowError(Error,'rgbToHex should be called like rgbToHex("rgb(0, 0, 0)").');
			});
			it('given `RGB(NaN,233,2)`,should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex('RGB(NaN,233,2)');
				}).toThrowError(Error,'rgbToHex should be called like rgbToHex("rgb(0, 0, 0)").');
			});
			it('given `RGB("",233,2)`,should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex('RGB("",233,2)');
				}).toThrowError(Error,'rgbToHex should be called like rgbToHex("rgb(0, 0, 0)").');
			});
		});
		it('parsed to hsl',function(){

		});
		it('parsed to hsv',function(){

		});
	});
});