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

  var whiteSpace = function() {
    while (char === " ") {
      nextChar();
    }
  };

  var string = function() {
    var strHolder = "";
    nextChar();
    while (char !== '"') {
      strHolder += char;
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
    console.log(typeof Number(numString));
    return Number(numString);
  };

  var word = function() {

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
    if (char === '}') {
      return objHolder;
    } else {
      value();
    }

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

console.log(parseJSON('["Hi", 8]'));
console.log(JSON.parse('["Hi", 8]'));