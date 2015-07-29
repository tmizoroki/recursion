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

  };

  var string = function() {

  };

  var number = function() {

  };

  var word = function() {

  };

  var array = function() {
    var arrayHolder  = [];
    nextChar();
    console.log(char);
    if (char === ']') {
      console.log('test3');
      return arrayHolder;
    } else {
      value();
    }


  };

  var object = function() {

  };

  var value = function() {
    if (char === '[') {
      console.log('test1');
      return array();
    } else if (char === '\"' || char === '\'') {
      console.log('test2');
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
    console.log(char);
    return value();
  };
}();

console.log(typeof parseJSON('[]'));
