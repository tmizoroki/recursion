// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
	
	var element = document.body;
	var elementList = [];

	var searchElements = function(element) {
		//action
		_.each(element.classList, function(foundClass) {
		if (foundClass === className) {
				elementList.push(element);
			}
		});

		//base case
		if (!element.childNodes.length) {
			return ;
		}

		//recursive call
		_.each(element.childNodes, function(child) {
			searchElements(child);
		});
	};

	searchElements(element);

	return elementList;
};