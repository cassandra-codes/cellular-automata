angular.module('grid').controller('gridCtrl', function($interval, gridService) {
	var vm = this;

	vm.row_size = 100;
	vm.column_size = 100;
	vm.rows = gridService.getCells;
	vm.getEditMode = false;

	vm.wrap = true;

	vm.iterate = function() {
		$interval(function() {
			vm.editMode = gridService.getEditMode();
			vm.rows = gridService.getCells();
			if (gridService.isRunning()) {
				gridService.generate();	
			}
		}, 150);
	}
	
	function init() {
		gridService.init();
	}

	vm.edit = function(i, j) {
		if vm.editMode {
			console.log('click')
			console.log(i, j)
		}
	}
	
	init();
	vm.iterate();


});