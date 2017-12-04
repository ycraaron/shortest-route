function RoutesFinder(routes) {
	var arrRoutes = routes.split(',');
	var objDicRoutes = {}
	arrRoutes.forEach(function(route) {
		var splitted = route.split('-');
		var node1 = splitted[0];
		var node2 = splitted[1];
		if(objDicRoutes[node1]) {
			objDicRoutes[node1].push(node2);
		} else {
			objDicRoutes[node1] = [];
			objDicRoutes[node1].push(node2);
		}
		if(objDicRoutes[node2]) {
			objDicRoutes[node2].push(node1);
		} else {
			objDicRoutes[node2] = [];
			objDicRoutes[node2].push(node1);
		}

	});
	this.dicRoutes = objDicRoutes;
	console.log(this.dicRoutes);
}
RoutesFinder.prototype.findRoutes = function(_start, _finish, _visitedNodes) {

	var start = _start;
	var finish = _finish;
	var visitedNodes = _visitedNodes;
	console.log('start looking for routes between ', start, finish);

	if(visitedNodes.includes(start)) {
		return null;
	}

	// As soon as entering the function, add the start node to visitedNode list.
	visitedNodes.push(start);
	if(start === finish) {
		return start.concat(finish);
	}
	var neighbours = this.dicRoutes[start];
	var minRoute = [];

	// FIRST, loop through the start node's neighbours to find direct route from start to finish.
	for (i = 0; i < neighbours.length; i++) {
		var neighbour = neighbours[i];
		// console.log('current neighbour', neighbour);
		if (neighbour === finish) {
			console.log('direct route found', start, neighbour);
			console.log('current start', start)
			minRoute = start.concat(neighbour);
			return minRoute
		}
	}
	console.log('direct not found');

	// If direct route is not found. 
	// loop through the start node's neighbours again to find 
	// the direct route from each neighbour to finish.

	for (i = 0; i < neighbours.length; i++) {
		var neighbour = neighbours[i];
		// if neighbour is visited, move to next neighbour
		if(visitedNodes.includes(neighbour)) {
			continue;
		}
		// find the route of this neighbour to finish;
		var newRoute = this.findRoutes(neighbour, finish, visitedNodes);
		if(minRoute===[]) {
			if(newRoute!='') {
				// update the minimum route;
				if (newRoute.length < minRoute.length) {
					minRoute = newRoute;
				}
			}
		} else {
			minRoute = newRoute;
		}
		minRoute = start.concat(minRoute);
	}
	return minRoute;
};

module.exports = RoutesFinder;

var finder = new RoutesFinder('a-b,b-c,b-m,c-d,d-e,e-f,f-g,g-h,g-i,g-n,d-h');
result = finder.findRoutes('a','g', []);
console.log(result);
result = finder.findRoutes('a','m', []);
console.log(result);
result = finder.findRoutes('a','n', []);
console.log(result);
result = finder.findRoutes('a','h', []);
console.log(result);