angular.module('grid').service('gridService', function() {

	var run = false;
	var cells = [];
	var neighbors = [];
	var row_size = 100;
	var wrap = true;
	var column_size = 100;
	var editMode = false;

	generate = function() {
		if (run) {
			// var deferred = $q.defer();
			for (var i = 0; i < row_size; i++) {
				for (var j = 0; j < column_size; j++) {
					neighbors[i][j] = 0
					for (var k = i - 1; k <= i + 1; k++) {
						for (var l = j - 1; l <= j + 1; l++) {
							if (wrap) {
								var m;
								var n;
								if (k < 0) {
									m = row_size - 1;
								} else if (k >= row_size) {
									m = 0
								}
								else {
									m = k
								}
								if (l < 0) {
									n = column_size - 1;
								} else if (l >= column_size) {
									n = 0
								}
								else {
									n = l
								}
								if ((i != k) || (j != l))  {
									neighbors[i][j] = neighbors[i][j] + cells[m][n];
								}
							} else {
								if ((k >= 0) && (k < row_size) && (l >= 0) && (l < column_size)) {
									if ((i != k) || (j != l))  {
										neighbors[i][j] = neighbors[i][j] + cells[k][l];
									}
								}
							}						
						}
					}
				}
			}

			for (var i = 0; i < row_size; i++) {
				for (var j = 0; j < row_size; j++) {
					if (cells[i][j] == 1) {
						if (neighbors[i][j] < 2) {
							cells[i][j] = 0;
						}
						else if (neighbors[i][j] > 3) {
							cells[i][j] = 0;
						}
					} else {
						if (neighbors[i][j] == 3) {
							cells[i][j] = 1
						}
					}
				}
			}
		}
	}

	edit = function() {
		console.log('edit')
		run = false;
		editMode = !editMode;
	}

	getEditMode = function() {
		return editMode;
	}

	init = function() {
		console.log('init')
		cells = [];
		neighbors = [];
		for (var i = 0; i < row_size; i++) {
			cells.push([]);
			neighbors.push([]);
			for (var j = 0; j < column_size; j++) {
				cells[i].push(Math.floor(Math.random() * 2));
				neighbors[i].push(0); 
			}
		}
		return cells;
	}

	clear = function() {
		console.log('clear')
		cells = [];
		neighbors = [];
		for (var i = 0; i < row_size; i++) {
			cells.push([]);
			neighbors.push([]);
			for (var j = 0; j < column_size; j++) {
				cells[i].push(0);
				neighbors[i].push(0); 
			}
		}
		return cells;
	}

	play = function() {
		console.log('play');
		run = !run;
	}

	getCells = function() {
		return cells;
	}

	isRunning = function() {
		return run;
	}
	
	return {
		row_size: row_size,
		column_size: column_size,
		generate: generate,
		wrap: wrap,
		clear: clear,
		play: play,
		cells: cells,
		init: init,
		getCells: getCells,
		isRunning: isRunning,
		edit: edit,
		getEditMode: getEditMode
	}

});