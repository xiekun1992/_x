'use strict';

var ColorParser=function(){

};
var parseHexToRgb=function(value){
	var hex, table = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
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


	return 'rgb(' + red + ',' + green + ',' + blue+')';
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
			rgb = parseHexToRgb(hex);
		}
	}else{
		if(hex.length !== 4 && hex.length !== 7){
			throw new Error('hexToRgb parameter `hex` string with `#`, the length must be 4 or 7.');
		}else{
			rgb = parseHexToRgb(hex.slice(1));
		}
	}

	return rgb;
};

// http://www.360doc.com/content/14/0814/15/1771496_401804348.shtml