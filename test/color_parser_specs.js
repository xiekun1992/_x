'use strict';

describe('color_parser test, ',function(){

	var colorParser;
	beforeAll(function(){
		colorParser=new ColorParser();
	});
	// hex => rgb, hex => hsl
	describe('when hexadecimal ',function(){
		describe('parsed to rgb',function(){
			it('given white,should be parsed to `rgb(255, 255, 255)`',function(){
				expect(colorParser.hexToRgb("#ffffff")).toEqual('rgb(255, 255, 255)');
				expect(colorParser.hexToRgb("#fff")).toEqual('rgb(255, 255, 255)');
				expect(colorParser.hexToRgb("#FFF")).toEqual('rgb(255, 255, 255)');
			});
			it('given `f00`,should be parsed to `rgb(255, 0, 0)`',function(){
				expect(colorParser.hexToRgb('f00')).toEqual('rgb(255, 0, 0)');
			});
			it('given `#f1e05a`,should be parsed to `rgb(241, 224, 90)`',function(){
				expect(colorParser.hexToRgb('#f1e05a')).toEqual('rgb(241, 224, 90)');
			});
			it('given `#569e3d`,should be parsed to `rgb(86, 158, 61)`',function(){
				expect(colorParser.hexToRgb('#569e3d')).toEqual('rgb(86, 158, 61)');
			});
			it('given a number, should throw an error',function(){
				expect(function(){
					colorParser.hexToRgb(121212);
				}).toThrowError(Error,'hexToRgb parameter must be a string.');
			});
			it('given a empty string, should throw an error',function(){
				expect(function(){
					colorParser.hexToRgb('');
				}).toThrowError(Error,'hexToRgb should be call like hexToRgb("#fff").');
			});
			it('given a invalid value with `cfed`, should throw an error',function(){
				expect(function(){
					colorParser.hexToRgb('cfed');
				}).toThrowError(Error,'invalid hex value.');
			});
			it('given a invalid value with `#cfed`, should throw an error',function(){
				expect(function(){
					colorParser.hexToRgb('#cfed');
				}).toThrowError(Error,'invalid hex value.'); 
			});
			it('given a invalid value with `#jkehcr`, should throw an error',function(){
				expect(function(){
					colorParser.hexToRgb('#jkehcr');
				}).toThrowError(Error,'invalid hex value.');
			});
		});
		describe('parsed to hsl',function(){
			it('given `#fff`,should be parsed to `hsl(0, 0%, 100%)`',function(){
				expect(colorParser.hexToHsl('#fff')).toEqual('hsl(0, 0%, 100%)');
			});
			it('given `#000000`,should be parsed to `hsl(0, 0%, 0%)`',function(){
				expect(colorParser.hexToHsl('#000000')).toEqual('hsl(0, 0%, 0%)');
			});
			it('given `#052aa9`,should be parsed to `hsl(226, 94%, 34%)`',function(){
				expect(colorParser.hexToHsl('#052aa9')).toEqual('hsl(226, 94%, 34%)');
			});
		});
	});
	// rgb => hex, rgb => hsl
	describe('when rgb ',function(){
		describe('parsed to hexadecimal, ',function(){
			it('given `0, 0, 0`, should parsed to `#000000`',function(){
				expect(colorParser.rgbToHex(0, 0, 0)).toEqual('#000000');
			});
			it('given `228,182,110`, should parsed to `#e4b66e`',function(){
				expect(colorParser.rgbToHex(228,182,110)).toEqual('#e4b66e');
			});
			it('given `221,221,221`, should parsed to `#dddddd`',function(){
				expect(colorParser.rgbToHex(221,221,221)).toEqual('#dddddd');
			});
			it('given `255,0,0,255,255`, should parsed to `#ff0000`',function(){
				expect(colorParser.rgbToHex(255,0,0,255,255)).toEqual('#ff0000');
			});
			it('given `255,0`, should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex(255,0);
				}).toThrowError(Error,'invalid rgb value.');
			});
			it('given `255.1,2,2`, should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex(255.1,2,2);
				}).toThrowError(Error,'invalid rgb value.');
			});
			it('given `NaN,2,2`, should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex(255.1,2,2);
				}).toThrowError(Error,'invalid rgb value.');
			});
			it('given `255`, should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex(255);
				}).toThrowError(Error,'invalid rgb value.');
			});
			it('given `255` string, should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex('255');
				}).toThrowError(Error,'invalid rgb value.');
			});
			it('given `abc,220,255`, should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex('abc',220,255);
				}).toThrowError(Error,'invalid rgb value.');
			});
			it('given `"",220,255`, should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex("",220,255);
				}).toThrowError(Error,'invalid rgb value.');
			});
			it('given `-0,220,255`, should parsed to `#00dcff`',function(){
				expect(colorParser.rgbToHex(-0,220,255)).toEqual('#00dcff');
			});
			it('given `+0,220,255`, should parsed to `#00dcff`',function(){
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
				}).toThrowError(Error,'invalid rgb value.');
			});
			it('given `{a:1},233,2`,should throw an error',function(){
				expect(function(){
					colorParser.rgbToHex({a:1},233,2);
				}).toThrowError(Error,'invalid rgb value.');
			});
		});
		describe('parsed to hsl',function(){
			it('given `255, 255, 255`, should parsed to `hsl(0, 0%, 100%)`',function(){
				expect(colorParser.rgbToHsl(255, 255, 255)).toEqual('hsl(0, 0%, 100%)');
			});
			it('given `84, 88, 62`, should parsed to `hsl(69, 17%, 29%)`',function(){
				expect(colorParser.rgbToHsl(84, 88, 62)).toEqual('hsl(69, 17%, 29%)');
			});
			it('given `61, 107, 167`, should parsed to `hsl(214, 46%, 45%)`',function(){
				expect(colorParser.rgbToHsl(61, 107, 167)).toEqual('hsl(214, 46%, 45%)');
			});
			it('given `149, 98, 53`, should parsed to `hsl(28, 48%, 40%)`',function(){
				expect(colorParser.rgbToHsl(149, 98, 53)).toEqual('hsl(28, 48%, 40%)');
			});
			it('given `0, 0, 0`, should parsed to `hsl(0, 0%, 0%)`',function(){
				expect(colorParser.rgbToHsl(0, 0, 0)).toEqual('hsl(0, 0%, 0%)');
			});
			it('given `94, 106, 116`, should parsed to `hsl(207, 10%, 41%)`',function(){
				expect(colorParser.rgbToHsl(94, 106, 116)).toEqual('hsl(207, 10%, 41%)');
			});
			it('given `144, 97, 141`, should parsed to `hsl(304, 20%, 47%)`',function(){
				expect(colorParser.rgbToHsl(144, 97, 141)).toEqual('hsl(304, 20%, 47%)');
			});
			it('given `255, 0, 255`, should parsed to `hsl(300, 100%, 50%)`',function(){
				expect(colorParser.rgbToHsl(255, 0, 255)).toEqual('hsl(300, 100%, 50%)');
			});
			it('given `105, 89, 205`, should parsed to `hsl(300, 100%, 50%)`',function(){
				expect(colorParser.rgbToHsl(105, 89, 205)).toEqual('hsl(248, 54%, 58%)');
			});
		});
	});
	// hsl => rgb, hsl => hex
	describe('when hsl ',function(){
		describe('parsed to rgb',function(){
			it('given `105, 57, 53`,should be parsed to `rgb(102, 204, 68)`',function(){
				expect(colorParser.hslToRgb(105, 57, 53)).toEqual('rgb(101, 203, 67)');
			});
			it('given `357, 95, 78`,should be parsed to `rgb(252, 145, 150)`',function(){
				expect(colorParser.hslToRgb(357, 95, 78)).toEqual('rgb(252, 146, 151)');
			});
			it('given `357, 65, 30`,should be parsed to `rgb(128, 27, 32)`',function(){
				expect(colorParser.hslToRgb(357, 65, 30)).toEqual('rgb(126, 27, 32)');
			});
			it('given `356, 100, 6`,should be parsed to `rgb(31, 0, 2)`',function(){
				expect(colorParser.hslToRgb(356, 100, 6)).toEqual('rgb(31, 0, 2)');
			});
			it('given `2400, 100, 25`,should throw an error',function(){
				expect(function(){
					colorParser.hslToRgb(2400, 100, 25);
				}).toThrowError(Error,'invalid hsl value.');
			});
			it('given `240, 1000, 25`,should throw an error',function(){
				expect(function(){
					colorParser.hslToRgb(2400, 1000, 25);
				}).toThrowError(Error,'invalid hsl value.');
			});
			it('given `2400, 100, -25`,should throw an error',function(){
				expect(function(){
					colorParser.hslToRgb(2400, 100, -25);
				}).toThrowError(Error,'invalid hsl value.');
			});
			it('given `110.997, 0.5555, 73.599999999999999999999999999999999999999999999999999999999999999`,should be parsed to `rgb(255, 255, 255)`',function(){
				expect(colorParser.hslToRgb(110.997, 0.5555, 73.599999999999999999999999999999999999999999999999999999999999999)).toEqual('rgb(187, 188, 187)');
			});
			it('given `20, 20, 100`,should be parsed to `rgb(255, 255, 255)`',function(){
				expect(colorParser.hslToRgb(20, 20, 100)).toEqual('rgb(255, 255, 255)');
			});
			it('given no parameter, should throw an error',function(){
				expect(function(){
					colorParser.hslToRgb();
				}).toThrowError(Error, 'hslToRgb should be called like hslToRgb(h, s, l).');
			});
			it('given `"", 100%, 25%`, should throw an error',function(){
				expect(function(){
					colorParser.hslToRgb("", 100, 25);
				}).toThrowError(Error, 'invalid hsl value.');
			});

			it('given `null, 100, 25`, should throw an error',function(){
				expect(function(){
					colorParser.hslToRgb(null, 100, 25);
				}).toThrowError(Error, 'invalid hsl value.');
			});

			it('given `undefined, 100, 25`, should throw an error',function(){
				expect(function(){
					colorParser.hslToRgb(undefined, 100, 25);
				}).toThrowError(Error, 'invalid hsl value.');
			});

			it('given `{b:2}, 100, 25`, should throw an error',function(){
				expect(function(){
					colorParser.hslToRgb({b:2}, 100, 25);
				}).toThrowError(Error, 'invalid hsl value.');
			});

			it('given `[1,2], 100, 25`, should throw an error',function(){
				expect(function(){
					colorParser.hslToRgb([1,2], 100, 25);
				}).toThrowError(Error, 'invalid hsl value.');
			});

			it('given `funciton(){}, 100, 25`, should throw an error',function(){
				expect(function(){
					colorParser.hslToRgb(function(){}, 100, 25);
				}).toThrowError(Error, 'invalid hsl value.');
			});
		});
		describe('parsed to hexadecimal',function(){
			it('given `214, 50, 50`,should be parsed to `#4077bf`',function(){
				expect(colorParser.hslToHex(214, 50, 50)).toEqual('#4077bf');
			});
			it('given `0, 0, 100`,should be parsed to `#ffffff`',function(){
				expect(colorParser.hslToHex(0, 0, 100)).toEqual('#ffffff');
			});
			it('given `0, 0, 0`,should be parsed to `#000000`',function(){
				expect(colorParser.hslToHex(0, 0, 0)).toEqual('#000000');
			});
			it('given `110.997, 0.5555, 73.599999999999999999999999999999999999999999999999999999999999999`,should be parsed to `#bbbcbb`',function(){
				expect(colorParser.hslToHex(110.997, 0.5555, 73.599999999999999999999999999999999999999999999999999999999999999)).toEqual('#bbbcbb');
			});
		});
	});
});