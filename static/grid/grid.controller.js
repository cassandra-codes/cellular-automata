angular.module('grid').controller('gridCtrl', function($interval) {
	var vm = this;

	vm.row_size = 100;
	vm.column_size = 100;
	vm.rows = [];
	vm.neighbors = [];

	vm.wrap = true;

	vm.generate = function() {
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
								vm.neighbors[i][j] = vm.neighbors[i][j] + vm.rows[m][n];
							}
						} else {
							if ((k >= 0) && (k < vm.row_size) && (l >= 0) && (l < vm.column_size)) {
								if ((i != k) || (j != l))  {
									vm.neighbors[i][j] = vm.neighbors[i][j] + vm.rows[k][l];
								}
							}
						}						
					}
				}
			}
		}

		/*
    Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by overpopulation.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
		*/

		for (var i = 0; i < vm.row_size; i++) {
			for (var j = 0; j < vm.row_size; j++) {
				if (vm.rows[i][j] == 1) {
					if (vm.neighbors[i][j] < 2) {
						vm.rows[i][j] = 0;
					}
					else if (vm.neighbors[i][j] > 3) {
						vm.rows[i][j] = 0;
					}
				} else {
					if (vm.neighbors[i][j] == 3) {
						vm.rows[i][j] = 1
					}
				}
			}
		}
	}


	init = function() {
		// console.log(vm.rows.length)
		vm.rows = [];
		vm.neighbors = [];
		for (var i = 0; i < vm.row_size; i++) {
			vm.rows.push([]);
			vm.neighbors.push([]);
			for (var j = 0; j < vm.row_size; j++) {
				vm.rows[i].push(Math.floor(Math.random() * 2));
				vm.neighbors[i].push(0); 
			}
		}
	}


	vm.iterate = function() {
		$interval(function() {
			vm.generate();
		}, 150);
	}
	
	init();

	vm.iterate();


});