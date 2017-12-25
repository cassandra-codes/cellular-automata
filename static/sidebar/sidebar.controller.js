angular.module('sidebar').controller('sidebarCtrl', function(gridService) {
	var vm = this;

	vm.play = function() {
		gridService.play();
	}

});