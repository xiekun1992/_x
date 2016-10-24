'use strict';

function ColorParser(){
	var table = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];

	var parseHexToRgb=function(value){
		var hex;
		var valueCharArray = value.split('');
		for(var i = 0;i < valueCharArray.length;i++){
			if(table.indexOf(valueCharArray[i]) == -1){
				throw new Error('invalid hex value with `' + valueCharArray[i] + '`.');
			}
		}
		if(value.length == 3){
			hex = value[0] + value[0] + value[1] + value[1] + value[2] + value[2];
		}else{
			hex = value;
		}
		// ff,ff,ff => 255,255,255
		// 00,00,00 => 0,0,0
		var red = table.indexOf(hex[0]) * 16 + table.indexOf(hex[1]) * 1,
			green = table.indexOf(hex[2]) * 16 + table.indexOf(hex[3]) * 1,
			blue = table.indexOf(hex[4]) * 16 + table.indexOf(hex[5]) * 1;


		return 'rgb(' + red + ', ' + green + ', ' + blue+')';
	};

	var parseRgbToHex=function(value){
		// value is like `0,0,0` or `0, 0, 0`, received value may be `abc, def, ghi`, `abc, 213, dds` and so on
		var rgbArray=value.replace(/(,\s)|,/g,' ').split(' '), hex='#';
		for(var i = 0;i < rgbArray.length;i++){
			var rgbNumber = parseInt(rgbArray[i]);
			if(rgbNumber !== rgbNumber){
				// parsed to NAN, is not a number
				throw new Error('rgb value should be a unsigned integer number.');
			}else{
				// is a number, but exceed 0 ~ 255
				if(rgbNumber < 0 || rgbNumber > 255){
					throw new Error('rgb value should between 0 and 255.');
				}else{
					// regular rgb number 
					hex += table[(rgbNumber / 16) & ~0] + '' + table[rgbNumber % 16];
				}
			}
		}
		return hex;
	};

	ColorParser.prototype.hexToRgb=function(hex){
		var rgb;
		if(typeof hex !== 'string'){
			throw new TypeError('hexToRgb parameter `hex` must be a string.');
		}
		if(hex.length === 0){
			throw new Error('hexToRgb parameter `hex` string length must greater than 0.');
		}
		if(hex.charAt(0) !== '#'){//fff,ffffff
			if(hex.length !== 3 && hex.length !== 6){
				throw new Error('hexToRgb parameter `hex` string without `#`, the length must be 3 or 6.');
			}else{
				rgb = parseHexToRgb(hex.toLowerCase());
			}
		}else{
			if(hex.length !== 4 && hex.length !== 7){
				throw new Error('hexToRgb parameter `hex` string with `#`, the length must be 4 or 7.');
			}else{
				rgb = parseHexToRgb(hex.slice(1).toLowerCase());
			}
		}

		return rgb;
	};

	ColorParser.prototype.rgbToHsl=function(){

	};

	ColorParser.prototype.rgbToHex=function(){
		// allow rgb(61,107,167) or rgb(61, 107, 167) or 61, 107, 167 as parameter
		var params=[].slice.call(arguments), regx=/^rgb\(([\s\S]+)\)$/i, hex;
		if(params.length != 1 && params.length != 3){
			throw new Error('rgbToHex should be called like rgbToHex("rgb(0, 0, 0)") or rgbToHex(0, 0, 0).');
		}
		if(params.length == 1){
			if(typeof params[0] !== 'string'){
				throw new Error('rgbToHex parameter should be a string.');
			}
			var res=regx.exec(params[0]);
			if(res){
				// res[1] may be `[1,2], 2, 3` or any other 
				for(var i = 0;i < res[1].length;i++){
					if(res[1].charAt(i) != ' ' && res[1].charAt(i) != ',' && (res[1].charAt(i) < '0' || res[1].charAt(i) > '9')){
						throw new Error('rgb value should be a unsigned integer number.');
					}
				}
				hex=parseRgbToHex(res[1]);
			}else{
				throw new Error('rgbToHex should be called like rgbToHex("rgb(0, 0, 0)").');
			}
		}else{
			for(var i = 0;i < params.length;i++){
				if(typeof params[i] !== 'number'){
					throw new Error('rgb value should be a unsigned integer number.');
				}
			}
			hex=parseRgbToHex(params.join(','));
		}
		return hex;
	};

	ColorParser.prototype.rgbToHsv=function(){

	};
}
// http://www.360doc.com/content/14/0814/15/1771496_401804348.shtml