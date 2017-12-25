angular.module('grid').factory('gridService', function() {

	var start = false;
	var cells = [];
	var neighbors = [];

	generate = function() {
		// var deferred = $q.defer();
		for (var i = 0; i < vm.row_size; i++) {
			for (var j = 0; j < vm.row_size; j++) {
				vm.neighbors[i][j] = 0
				for (var k = i - 1; k <= i + 1; k++) {
					for (var l = j - 1; l <= j + 1; l++) {
						if (vm.wrap) {
							var m;
							var n;
							if (k < 0) {
								m = vm.row_size - 1;
							} else if (k >= vm.row_size) {
								m = 0
							}
							else {
								m = k
							}
							if (l < 0) {
								n = vm.column_size - 1;
							} else if (l >= vm.column_size) {
								n = 0
							}
							else {
								n = l
							}
							if ((i != k) || (j != l))  {
								vm.neighbors[i][j] = vm.neighbors[i][j] + cells[m][n];
							}
						} else {
							if ((k >= 0) && (k < vm.row_size) && (l >= 0) && (l < vm.column_size)) {
								if ((i != k) || (j != l))  {
									vm.neighbors[i][j] = vm.neighbors[i][j] + cells[k][l];
								}
							}
						}						
					}
				}
			}
		}

		for (var i = 0; i < vm.row_size; i++) {
			for (var j = 0; j < vm.row_size; j++) {
				if (cells[i][j] == 1) {
					if (vm.neighbors[i][j] < 2) {
						cells[i][j] = 0;
					}
					else if (vm.neighbors[i][j] > 3) {
						cells[i][j] = 0;
					}
				} else {
					if (vm.neighbors[i][j] == 3) {
						cells[i][j] = 1
					}
				}
			}
		}
	}

	init = function() {
		// console.log(cells.length)
		cells = [];
		vm.neighbors = [];
		for (var i = 0; i < vm.row_size; i++) {
			cells.push([]);
			vm.neighbors.push([]);
			for (var j = 0; j < vm.row_size; j++) {
				cells[i].push(Math.floor(Math.random() * 2));
				vm.neighbors[i].push(0); 
			}
		}
	}

	play = function() {
		console.log('play');
		start != start;
	}
	
	return {
		generate: generate,
		start: start,
		play: play,
		cells: cells,
		init: init
	}

});