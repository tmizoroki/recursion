// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var resultString = '';

  var wrapQuotes = function(item) {
  	return '\"' + item + '\"';
  };

  var findObjs = function(obj) {
  	if (typeof obj !== 'object' || obj === null) {
  		if (typeof obj === 'string') {
		  	resultString += wrapQuotes(obj);
  		} else {
	  		resultString += obj;
	  	}
  	}

  }(obj);

  return resultString;
};
