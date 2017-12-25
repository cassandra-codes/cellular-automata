angular.module('sidebar').controller('sidebarCtrl', function(gridService) {
	var vm = this;

	vm.play = function() {
		gridService.play();
	}

	vm.reset = function() {
		gridService.init();
	}

	vm.clear = function() {
		gridService.clear();
	}

	vm.edit = function() {
		gridService.edit()
	}

});