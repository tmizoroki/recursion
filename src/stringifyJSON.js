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
			} else if (typeof obj === 'undefined' || typeof obj === 'function') {
				resultString = undefined;
			} else {
				resultString += obj;
			}
		}
		if (Array.isArray(obj)) {
			resultString += '[';
			_.each(obj, function(item, i) {
				findObjs(item);
				if (i !== obj.length - 1) {
					resultString += ',';
				}
			});
			resultString += ']';
		} else if (Object.prototype.toString.call(obj) === '[object Object]') {
			resultString += '{';
			_.each(obj, function(item, i) {
				if (!(item === undefined || typeof item === 'function')) {
					resultString += wrapQuotes(i) + ':';
					findObjs(item);
					if (i !== Object.keys(obj)[Object.keys(obj).length - 1]) {
						resultString += ',';
					}
				}
			});
			resultString += '}';
		}
	};
	findObjs(obj);
	return resultString;
};
