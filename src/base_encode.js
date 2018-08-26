// https://tools.ietf.org/html/rfc4648
'use strict';
function BaseEncode() {
  var base64Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var base64SafeAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  var base32Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  var base32hexAlphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUV';
  var base16Alphabet = '0123456789ABCDEF';

  function inputToBinary(input) {
    var str = input.toString();
    var binary = '';
    for (var i = 0; i < str.length; i++) {
      var code = str.charCodeAt(i);
      binary += padStart(code.toString(2), 8, '0');
    }
    return binary;
  }
  function padStart(str, targetLength, padString) {
    if (str.length < targetLength) {
      for (var i = str.length; i < targetLength; i++) {
        str = padString + str;
      }
    }
    return str;
  }
  function padEnd(str, targetLength, padString) {
    if (str.length < targetLength) {
      for (var i = str.length; i < targetLength; i++) {
        str += padString;
      }
    }
    return str;
  }
  function divideBinary(binaryStr, bitPerGroup, padAtEnd) {
    var arr = [];
    var rounds = Math.ceil(binaryStr.length / bitPerGroup);
    for (var i = 0, j = bitPerGroup; 0 < rounds--; i += bitPerGroup) {
      var substr = binaryStr.slice(i, i + j);
      // console.log(substr, i, i + j);
      if (padAtEnd) {
        substr = padEnd(substr, bitPerGroup, '0')
      }
      arr.push(substr);
    }
    return arr;
  }
  return {
    base64: function(input) {
      var binaryStr = inputToBinary(input);
      var binaryGroupBefore = divideBinary(binaryStr, 3 * 8);
      var binaryGroupAfter = [];
      for (var i = 0; i < binaryGroupBefore.length; i++) {
        var g = divideBinary(binaryGroupBefore[i], 6, true);
        binaryGroupAfter.push(g);
      }
      var res = '';
      for (var i = 0; i < binaryGroupAfter.length; i++) {
        if (binaryGroupAfter[i]) {
          for (var j = 0; j < 4; j++) {
            var binaryS = binaryGroupAfter[i][j];
            if (binaryS) {
              res += base64Alphabet[parseInt(binaryS, 2)];
            } else {
              res += '=';
            }
          }
        }
      }
      return res;  
    },
    base32: function(input) {
      var binaryStr = inputToBinary(input);
      var binaryGroupBefore = divideBinary(binaryStr, 5 * 8);
      var binaryGroupAfter = [];
      for (var i = 0; i < binaryGroupBefore.length; i++) {
        var g = divideBinary(binaryGroupBefore[i], 5, true);
        binaryGroupAfter.push(g);
      }
      var res = '';
      for (var i = 0; i < binaryGroupAfter.length; i++) {
        if (binaryGroupAfter[i]) {
          for (var j = 0; j < 8; j++) {
            var binaryS = binaryGroupAfter[i][j];
            if (binaryS) {
              res += base32Alphabet[parseInt(binaryS, 2)];
            } else {
              res += '=';
            }
          }
        }
      }
      return res;
    },
    base32hex: function(input) {
      var binaryStr = inputToBinary(input);
      var binaryGroupBefore = divideBinary(binaryStr, 5 * 8);
      var binaryGroupAfter = [];
      for (var i = 0; i < binaryGroupBefore.length; i++) {
        var g = divideBinary(binaryGroupBefore[i], 5, true);
        binaryGroupAfter.push(g);
      }
      var res = '';
      for (var i = 0; i < binaryGroupAfter.length; i++) {
        if (binaryGroupAfter[i]) {
          for (var j = 0; j < 8; j++) {
            var binaryS = binaryGroupAfter[i][j];
            if (binaryS) {
              res += base32hexAlphabet[parseInt(binaryS, 2)];
            } else {
              res += '=';
            }
          }
        }
      }
      return res;
    },
    base16: function(input) {
      var binaryStr = inputToBinary(input);
      var binaryGroup = divideBinary(binaryStr, 4);
      var res = '';
      for (var i = 0; i < binaryGroup.length; i++) {
        res += base16Alphabet[parseInt(binaryGroup[i], 2)];
      }
      return res;
    }
  }
}
