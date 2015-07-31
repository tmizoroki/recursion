// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var char; //current character
  var chIndex; //current index

  var error = function() {

  };

  var nextChar = function() {
    chIndex++;
    char = json.charAt(chIndex);
  };
  
  var goBack = function() {
    chIndex--;
    char = json.charAt(chIndex);
  };

  var whiteSpace = function() {
    while (/\s/.test(char)) {
      nextChar();
    }
  };

  var escapeChars = {
    '\\': '\\',
    '"': '"',
    'n': '\n',
    'r': '\r',
    't': '\t',
    'f': '\f'
  };

  var string = function() {
    var strHolder = "";
    nextChar();
    while (char !== '"' && chIndex < json.length) {
      if (char === '\\') {
        nextChar();
        if (char in escapeChars) {
          strHolder += escapeChars[char]; 
        }
      } else {
        strHolder += char;
      }
      nextChar();
    }
    return strHolder;
  };

  var number = function() {
    var numString = "";
    var numericChars = /[-\.\de]/;
    while (numericChars.test(char)) {
      numString += char;
      nextChar();
    }
    goBack();

    return Number(numString);
  };

  var word = function() {
    if (json.slice(chIndex, chIndex + 4) === 'null') {
      chIndex += 3;
      char = json.charAt(chIndex);
      return null;
    } else if (json.slice(chIndex, chIndex + 4) === 'true') {
      chIndex += 3;
      char = json.charAt(chIndex);
      return true;
    } else if (json.slice(chIndex, chIndex + 5) === 'false') {
      chIndex += 4;
      char = json.charAt(chIndex);
      return false;
    }
  };

  var array = function() {
    var arrayHolder  = [];
    nextChar();
    var arrayInner = function() {    
      if (char === ']') {
        return arrayHolder;
      } else {
        arrayHolder.push(value());
        nextChar();
        if (char === ',') {
          nextChar();
          whiteSpace();
          arrayInner();
        }
      }
    };
    arrayInner();
    return arrayHolder;
  };

  var object = function() {
    var objHolder = {};
    nextChar();
    var objInner = function() {
      if (char === '}') {
        return objHolder;
      } else {
        var key = string();
        nextChar();
        nextChar();
        whiteSpace();
        var val = value();
        objHolder[key] = val;
        nextChar();
        if (char === ',') {
          nextChar();
          whiteSpace();
          objInner();
        }
      } 
    };
    objInner();
    return objHolder;
  };

  var value = function() {
    if (char === '[') {
      return array();
    } else if (char === '\"' || char === '\'') {
      return string();
    } else if (char === '{') {
      return object();
    } else if (char === '-' || /\d/.test(char)){
      return  number();
    } else {
      return word();
    }
  };

  return function(text) {
    json = text;
    chIndex = 0;
    char = json[chIndex];
    return value();
  };
}();

console.log(parseJSON('{"foo": null, "num": true, "empty": null}'));
console.log(JSON.parse('{"foo": null, "num": true, "empty": null}'));
console.log(parseJSON('[true,false,null]'));